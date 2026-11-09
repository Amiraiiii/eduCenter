// =====================================================
// EduCenter AI Assistant — RAG + Gemini API
// =====================================================
// RAG: Reads local MD files from /rag-data/ folder
// Chat UI: Floating button + slide-up widget
// API: Google Gemini 1.5 Flash
// =====================================================

'use strict';

/* ─── Config ─── */
const AI_CONFIG = {
  // Gemini API endpoint
  apiEndpoint: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent',

  // Storage key for API key
  apiKeyStorageKey: 'educenter_gemini_key',

  // RAG: list of local markdown files to load as context
  // Add more files here as you upload them to rag-data/
  ragFiles: [
    'rag-data/placeholder.md',
    // 'rag-data/courses.md',
    // 'rag-data/faq.md',
    // 'rag-data/teachers.md',
    // 'rag-data/pricing.md',
  ],

  // System prompt for AI behavior
  systemPrompt: `Ты — AI-ассистент образовательного центра EduCenter.
Твоя задача — помогать потенциальным студентам и действующим учащимся.

EduCenter — ведущий учебный центр по IT, дизайну и цифровому маркетингу.

Основные курсы:
- Full Stack Web Developer (6 мес, ₽45,000) — HTML, CSS, JS, React, Node.js
- UI/UX Design Pro (4 мес, ₽35,000) — Figma, Adobe XD, прототипирование
- Data Science & ML (8 мес, ₽55,000) — Python, pandas, TensorFlow
- Mobile Developer (5 мес, ₽42,000) — Flutter & Dart
- Digital Marketing (3 мес, ₽28,000) — SMM, SEO, таргетинг
- Кибербезопасность (6 мес, ₽50,000) — этичный хакинг, pentesting

Контакты: +7 (800) 123-45-67, info@educenter.ru
Адрес: Москва, ул. Арбат 1
График: Пн–Пт 9:00–20:00, Сб 10:00–18:00

Трудоустройство: 94% выпускников. Помогаем с резюме, портфолио, собеседованиями.

Правила общения:
1. Отвечай дружелюбно и по-русски
2. Будь кратким и конкретным
3. Если знаешь информацию из базы знаний — используй её
4. Если не знаешь — честно скажи и предложи связаться с менеджером
5. Предлагай конкретные следующие шаги (записаться, позвонить, и т.д.)

{RAG_CONTEXT}`,
};

/* ─── State ─── */
const state = {
  isOpen: false,
  apiKey: localStorage.getItem(AI_CONFIG.apiKeyStorageKey) || '',
  ragContext: '',
  messages: [], // { role: 'user'|'model', parts: [{text}] }
  isTyping: false,
};

/* ─── DOM Elements ─── */
const $floatBtn = document.getElementById('ai-float-btn');
const $widget = document.getElementById('ai-chat-widget');
const $closeBtn = document.getElementById('ai-chat-close');
const $messages = document.getElementById('ai-chat-messages');
const $input = document.getElementById('ai-input');
const $sendBtn = document.getElementById('ai-send-btn');
const $apiKeyArea = document.getElementById('ai-api-key-area');
const $apiKeyInput = document.getElementById('ai-api-key-input');
const $quickReplies = document.getElementById('ai-quick-replies');

/* ─── Init ─── */
async function initAIAssistant() {
  // Load RAG context
  state.ragContext = await loadRAGContext();

  // Setup API key display
  if (!state.apiKey) {
    if ($apiKeyArea) $apiKeyArea.classList.add('visible');
  }

  // Bind events
  $floatBtn?.addEventListener('click', toggleChat);
  $closeBtn?.addEventListener('click', closeChat);
  $sendBtn?.addEventListener('click', handleSend);

  $input?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  });

  // Auto-resize textarea
  $input?.addEventListener('input', () => {
    $input.style.height = 'auto';
    $input.style.height = Math.min($input.scrollHeight, 120) + 'px';
  });

  // API key save on input
  $apiKeyInput?.addEventListener('change', () => {
    state.apiKey = $apiKeyInput.value.trim();
    if (state.apiKey) {
      localStorage.setItem(AI_CONFIG.apiKeyStorageKey, state.apiKey);
      if ($apiKeyArea) $apiKeyArea.classList.remove('visible');
    }
  });

  // Quick reply buttons
  document.querySelectorAll('.ai-quick-reply').forEach(btn => {
    btn.addEventListener('click', () => {
      const text = btn.textContent;
      // Fade out quick replies
      if ($quickReplies) $quickReplies.style.display = 'none';
      sendMessage(text);
    });
  });

  // Listen for events from main.js (course card clicks)
  document.addEventListener('eduOpenAI', (e) => {
    openChat();
    if (e.detail?.message) {
      if ($quickReplies) $quickReplies.style.display = 'none';
      sendMessage(e.detail.message);
    }
  });
}

/* =====================================================
   RAG: Load context from local MD files
   ===================================================== */
async function loadRAGContext() {
  const contexts = [];

  for (const filePath of AI_CONFIG.ragFiles) {
    try {
      const response = await fetch(filePath);
      if (response.ok) {
        const text = await response.text();
        if (text.trim()) {
          contexts.push(`### Файл: ${filePath}\n${text}`);
        }
      }
    } catch (err) {
      // File not accessible (normal for placeholder)
      console.debug(`RAG: could not load ${filePath}`);
    }
  }

  if (contexts.length > 0) {
    return `\n\n## База знаний (RAG контекст):\n${contexts.join('\n\n---\n\n')}`;
  }

  return '';
}

/* =====================================================
   CHAT TOGGLE
   ===================================================== */
function openChat() {
  if (state.isOpen) return;
  state.isOpen = true;
  $widget?.classList.remove('hidden');
  $widget?.classList.add('visible');
  $floatBtn?.classList.add('open');
  setTimeout(() => $input?.focus(), 400);
}

function closeChat() {
  state.isOpen = false;
  $widget?.classList.add('hidden');
  $widget?.classList.remove('visible');
  $floatBtn?.classList.remove('open');
}

function toggleChat() {
  state.isOpen ? closeChat() : openChat();
}

/* =====================================================
   MESSAGE HANDLING
   ===================================================== */
function handleSend() {
  const text = $input?.value.trim();
  if (!text || state.isTyping) return;

  $input.value = '';
  $input.style.height = 'auto';

  // Hide quick replies on first message
  if ($quickReplies) $quickReplies.style.display = 'none';

  sendMessage(text);
}

async function sendMessage(text) {
  // Add user message to UI
  appendMessage('user', text);

  // Add to conversation history
  state.messages.push({ role: 'user', parts: [{ text }] });

  // Show typing indicator
  showTyping();

  // Get AI response
  const reply = await getAIResponse(text);

  // Hide typing & show response
  hideTyping();
  appendMessage('bot', reply);

  // Add to history
  state.messages.push({ role: 'model', parts: [{ text: reply }] });
}

/* =====================================================
   GEMINI API CALL (RAG)
   ===================================================== */
async function getAIResponse(userMessage) {
  if (!state.apiKey) {
    // Show API key input if not set
    if ($apiKeyArea) $apiKeyArea.classList.add('visible');
    return '⚠️ Для работы AI-ассистента введите Gemini API ключ в поле выше. Получить его можно бесплатно на [ai.google.dev](https://ai.google.dev)';
  }

  // Build system prompt with RAG context injected
  const systemContent = AI_CONFIG.systemPrompt.replace(
    '{RAG_CONTEXT}',
    state.ragContext
      ? `\n## Информация из базы знаний:\n${state.ragContext}`
      : '\n(База знаний пока пуста — отвечай на основе информации выше)'
  );

  // Build conversation history for multi-turn
  const history = state.messages.slice(-10); // last 10 messages for context window

  const requestBody = {
    system_instruction: {
      parts: [{ text: systemContent }]
    },
    contents: history,
    generationConfig: {
      temperature: 0.7,
      topK: 40,
      topP: 0.95,
      maxOutputTokens: 800,
      stopSequences: [],
    },
    safetySettings: [
      { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
      { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
    ],
  };

  try {
    const response = await fetch(
      `${AI_CONFIG.apiEndpoint}?key=${state.apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      console.error('Gemini API error:', error);

      if (response.status === 400) {
        return '⚠️ Неверный API ключ. Проверьте ключ в поле настроек.';
      }
      if (response.status === 429) {
        return '⏳ Превышен лимит запросов. Попробуйте через минуту.';
      }

      return '😔 Ошибка подключения к AI. Попробуйте позже или свяжитесь с нами по телефону +7 (800) 123-45-67.';
    }

    const data = await response.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      return 'Не могу ответить прямо сейчас. Пожалуйста, свяжитесь с нами: +7 (800) 123-45-67';
    }

    return text;

  } catch (err) {
    console.error('AI fetch error:', err);

    if (err.name === 'TypeError' && err.message.includes('fetch')) {
      return '🌐 Нет подключения к интернету. Проверьте соединение.';
    }

    return 'Произошла ошибка. Позвоните нам: +7 (800) 123-45-67 или напишите info@educenter.ru';
  }
}

/* =====================================================
   UI HELPERS
   ===================================================== */
function appendMessage(type, text) {
  const isBot = type === 'bot';

  const msgDiv = document.createElement('div');
  msgDiv.className = `ai-msg ai-msg-${isBot ? 'bot' : 'user'}`;

  const avatarDiv = document.createElement('div');
  avatarDiv.className = 'ai-msg-avatar';
  avatarDiv.textContent = isBot ? '🤖' : '👤';

  const bubbleDiv = document.createElement('div');
  bubbleDiv.className = 'ai-msg-bubble';

  // Simple markdown: bold, links, line breaks
  bubbleDiv.innerHTML = formatMessage(text);

  msgDiv.appendChild(avatarDiv);
  msgDiv.appendChild(bubbleDiv);

  $messages?.appendChild(msgDiv);
  scrollToBottom();
}

function formatMessage(text) {
  return text
    // Escape HTML
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    // Bold: **text**
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    // Inline code: `code`
    .replace(/`([^`]+)`/g, '<code style="background:rgba(255,255,255,0.1);padding:2px 6px;border-radius:4px;font-size:0.9em;">$1</code>')
    // Links: [text](url)
    .replace(/\[([^\]]+)\]\((https?:\/\/[^\)]+)\)/g, '<a href="$2" target="_blank" rel="noopener" style="color:#a78bfa;text-decoration:underline;">$1</a>')
    // Bullet points: - item or • item
    .replace(/^[-•]\s(.+)$/gm, '• $1')
    // Line breaks
    .replace(/\n/g, '<br>');
}

let $typingEl = null;

function showTyping() {
  state.isTyping = true;
  $sendBtn && ($sendBtn.disabled = true);

  $typingEl = document.createElement('div');
  $typingEl.className = 'ai-typing';
  $typingEl.id = 'ai-typing-indicator';
  $typingEl.innerHTML = '<span></span><span></span><span></span>';

  const wrapper = document.createElement('div');
  wrapper.className = 'ai-msg ai-msg-bot';
  wrapper.id = 'ai-typing-wrapper';

  const avatar = document.createElement('div');
  avatar.className = 'ai-msg-avatar';
  avatar.textContent = '🤖';

  wrapper.appendChild(avatar);
  wrapper.appendChild($typingEl);
  $messages?.appendChild(wrapper);

  scrollToBottom();
}

function hideTyping() {
  state.isTyping = false;
  $sendBtn && ($sendBtn.disabled = false);

  const wrapper = document.getElementById('ai-typing-wrapper');
  wrapper?.remove();
}

function scrollToBottom() {
  if ($messages) {
    $messages.scrollTop = $messages.scrollHeight;
  }
}

/* ─── Bootstrap ─── */
document.addEventListener('DOMContentLoaded', initAIAssistant);
