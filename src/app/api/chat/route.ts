import { NextResponse } from 'next/server';
import { RAG_KNOWLEDGE_BASE } from '@/data/ragKnowledge';
import { COURSES } from '@/data/courses';

interface KnowledgeChunk {
  id: string;
  title: string;
  keywords: string[];
  content: string;
}

// ─── Structured RAG Knowledge Base Chunks ───
const KNOWLEDGE_CHUNKS: KnowledgeChunk[] = [
  {
    id: 'frontend',
    title: 'Курс: Frontend-разработчик (React & Next.js)',
    keywords: ['frontend', 'фронтенд', 'react', 'next', 'nextjs', 'javascript', 'js', 'typescript', 'ts', 'верстка', 'html', 'css', 'tailwind', 'redux'],
    content: `💻 **Курс: Frontend-разработчик (React & Next.js)**
• **Длительность:** 7 месяцев (3 раза в неделю по 2 часа).
• **Формат:** Офлайн в кампусе (Ташкент) или живой Онлайн с ментором.
• **Стек:** HTML5, CSS3, Tailwind CSS v4, JavaScript ES6+, TypeScript, React 19, Next.js (App Router), Redux Toolkit, REST/GraphQL, Git.
• **Стоимость:** 1 800 000 сум/мес (или 11 200 000 сум при разовой оплате со скидкой 10%).
• **Рассрочка:** 0% переплат от 150 000 сум/мес (Anorbank, Uzum Nasiya) без первого взноса.
• **Проекты в резюме:** 5 коммерческих проектов, включая дипломный маркетплейс.
• **Ментор курса:** Фаррух Каримов (Lead Frontend в Uzum Technologies, 8+ лет опыта).
• **Зарплата выпускника:** от $800 до $2,200/мес.`
  },
  {
    id: 'python_ai',
    title: 'Курс: Python & AI Engineering',
    keywords: ['python', 'питон', 'пайтон', 'ai', 'ии', 'нейросети', 'fastapi', 'django', 'langchain', 'rag', 'llm', 'машинное обучение', 'агенты', 'бэкенд'],
    content: `🤖 **Курс: Python & AI Engineering**
• **Длительность:** 8 месяцев (3 раза в неделю по 2 часа).
• **Формат:** Офлайн или Онлайн.
• **Стек:** Python 3.12, FastAPI, Django, PostgreSQL, Docker, LangChain, RAG-системы, векторные базы данных (Chroma/Pinecone), OpenAI & Gemini API.
• **Стоимость:** 2 100 000 сум/мес (или 14 500 000 сум разово со скидкой 10%).
• **Проекты в резюме:** 4 проекта (микросервисы, автономные AI-ассистенты, умный поиск по корпоративным документам).
• **Ментор курса:** Шерзод Алиев (Senior Python & AI Architect в EPAM Systems, 10+ лет опыта).
• **Зарплата выпускника:** от $900 до $2,500/мес.`
  },
  {
    id: 'ui_ux_design',
    title: 'Курс: UI/UX & Product Design',
    keywords: ['дизайн', 'design', 'ui', 'ux', 'uiux', 'figma', 'фигма', 'интерфейс', 'cjm', 'прототип', 'behance', 'продуктовый'],
    content: `🎨 **Курс: UI/UX & Product Design**
• **Длительность:** 5 месяцев (3 раза в неделю по 2 часа).
• **Формат:** Офлайн или Онлайн.
• **Стек:** Figma Pro, Auto Layout, Variables, Дизайн-системы, CJM, User Flow, Прототипирование, подготовка кейсов для Behance.
• **Стоимость:** 1 650 000 сум/мес (или 8 250 000 сум разово со скидкой 10%).
• **Проекты в резюме:** 3 масштабных кейса на Behance (мобильное приложение, веб-сервис, дизайн-система).
• **Ментор курса:** Дильноза Саидова (Lead Product Designer в Click Fintech, 7+ лет опыта).
• **Зарплата выпускника:** от $700 до $1,800/мес.`
  },
  {
    id: 'backend_golang',
    title: 'Курс: Backend на Go (Golang & Microservices)',
    keywords: ['go', 'golang', 'го', 'голанг', 'бэкенд', 'backend', 'grpc', 'микросервисы', 'kafka', 'highload', 'docker', 'redis', 'postgres'],
    content: `⚡ **Курс: Backend на Go (Golang)**
• **Длительность:** 6 месяцев (3 раза в неделю по 2 часа).
• **Формат:** Офлайн или Онлайн.
• **Стек:** Go, Goroutines & Channels, gRPC, Protobuf, PostgreSQL, Redis, Apache Kafka, Docker, микросервисная архитектура.
• **Стоимость:** 2 300 000 сум/мес (или 12 800 000 сум разово).
• **Уровень:** Базовое понимание алгоритмов и программирования.
• **Ментор курса:** Жасур Рустамов (Principal Go Engineer в Fintech Cloud, 9+ лет опыта).
• **Зарплата выпускника:** от $1,100 до $3,000/мес.`
  },
  {
    id: 'qa_automation',
    title: 'Курс: QA Automation Engineer',
    keywords: ['qa', 'тестирование', 'тестировщик', 'тест', 'automation', 'автоматизация', 'playwright', 'selenium', 'pytest', 'postman', 'баги'],
    content: `🧪 **Курс: QA Automation Engineer (Python/JS)**
• **Длительность:** 4 месяца — самый быстрый старт в IT с нуля.
• **Формат:** Офлайн или Онлайн.
• **Стек:** Ручное тестирование (тест-дизайн, Jira, чек-листы), Postman, SQL запросы, автотесты на Python, Playwright, PyTest, CI/CD.
• **Стоимость:** 1 500 000 сум/мес (или 6 000 000 сум разово).
• **Ментор курса:** Камила Юсупова (Lead QA в Beeline, 6 лет опыта).
• **Зарплата выпускника:** от $600 до $1,500/мес.`
  },
  {
    id: 'pricing_installments',
    title: 'Цены, скидки и беспроцентная рассрочка',
    keywords: ['цена', 'цены', 'стоимость', 'оплата', 'оплатить', 'рассрочка', 'скидка', 'скидки', 'сум', 'банк', 'anorbank', 'uzum', 'кредит', 'top talents', 'грант', 'narx', 'narxi', 'qancha'],
    content: `💰 **Стоимость обучения и условия оплаты в EduCenter (2026):**
• **Frontend:** 1 800 000 сум/мес (разово: 11 200 000 сум)
• **Python & AI:** 2 100 000 сум/мес (разово: 14 500 000 сум)
• **UI/UX Design:** 1 650 000 сум/мес (разово: 8 250 000 сум)
• **Backend Go:** 2 300 000 сум/мес (разово: 12 800 000 сум)
• **QA Automation:** 1 500 000 сум/мес (разово: 6 000 000 сум)

✨ **Специальные условия:**
• **Беспроцентная рассрочка 0%:** На 3, 6 или 12 месяцев через банки-партнеры (Anorbank, Uzum Nasiya, Paymart) без первоначального взноса. Проценты за вас выплачивает академия.
• **Скидка 10%** при оплате всего курса единоразово.
• **Скидка 15%** для студентов вузов и школьников выпускных классов.`
  },
  {
    id: 'mentors',
    title: 'Преподаватели и менторы академии',
    keywords: ['преподаватель', 'преподаватели', 'ментор', 'менторы', 'учитель', 'учителя', 'кто учит', 'спикер', 'фаррух', 'шерзод', 'дильноза', 'жасур', 'камила', 'uzum', 'epam', 'click'],
    content: `👨‍🏫 **Наши преподаватели — Senior-практики из ведущих IT-компаний:**
1. **Фаррух Каримов** — Lead Frontend Engineer в Uzum Technologies (8+ лет опыта).
2. **Шерзод Алиев** — Senior Python & AI Architect в EPAM Systems (10+ лет опыта).
3. **Дильноза Саидова** — Lead Product Designer в Click Fintech (7+ лет опыта).
4. **Жасур Рустамов** — Principal Go Engineer в Fintech Cloud (9+ лет опыта).
5. **Камила Юсупова** — Lead QA Automation Engineer в Beeline (6 лет опыта).

Каждый студент получает регулярный персональный код-ревью и разбор ошибок от ментора.`
  },
  {
    id: 'schedule_campus',
    title: 'Расписание, смены, адреса и коворкинг',
    keywords: ['расписание', 'график', 'время', 'когда', 'смена', 'смены', 'вечер', 'утро', 'адрес', 'где', 'филиал', 'кампус', 'руставели', 'чиланзар', 'ойбек', 'коворкинг', 'ноутбук', 'qayerda', 'manzil', 'dars', 'darslar', 'jadval', 'vaqt', 'filiallar'],
    content: `📍 **Кампусы и контакты EduCenter в Ташкенте:**
1. **Главный кампус (Руставели):** ул. Шота Руставели, 45 (рядом с метро Ойбек).
2. **Кампус Чиланзар:** 9-й квартал, дом 14 (рядом с метро Мирзо Улугбек).
📞 **Телефон:** +998 (71) 200-44-88 | **Telegram:** @educenter_support

⏰ **График занятий (3 раза в неделю по 2 часа):**
• **Утренняя смена:** 09:00 — 11:00
• **Дневная смена:** 14:00 — 16:00
• **Вечерняя смена:** 19:00 — 21:00 (для работающих и студентов вузов)
• **Группы выходного дня:** Сб и Вс по 3 часа
🚀 **Коворкинг:** Открыт бесплатно для студентов с 08:00 до 22:00 ежедневно (Wi-Fi 500 Мбит/с, чай, кофе, тихие зоны).`
  },
  {
    id: 'guarantee_career',
    title: 'Трудоустройство, карьерный центр и гарантии',
    keywords: ['работа', 'трудоустройство', 'гарантия', 'вакансия', 'оффер', 'договор', 'стажировка', 'резюме', 'карьера', 'it park', 'ish', 'kafolat'],
    content: `🎯 **Гарантия трудоустройства и Карьерный центр EduCenter:**
• **Статистика:** 94% выпускников получают оффер в первые 3 месяца после защиты диплома.
• **Юридическая гарантия:** Закрепляется в официальном договоре при посещаемости от 85% и защите дипломного проекта.
• **Поддержка:** Персональный HR-куратор помогает оформить резюме, портфолио на GitHub/Behance и проводит мок-интервью.
• **Компании-партнеры:** Направляем выпускников напрямую на закрытые собеседования в Uzum, EPAM, Click, Payme, Beeline и банки.`
  },
  {
    id: 'faq_general',
    title: 'Частые вопросы (ноутбук, пропуски, сертификат)',
    keywords: ['ноутбук', 'компьютер', 'пропуск', 'пропустил', 'заболел', 'сертификат', 'диплом', 'лицензия', 'совмещать', 'университет', 'с нуля', 'опыт'],
    content: `💡 **Часто задаваемые вопросы (FAQ):**
• **Нужен ли свой ноутбук?** Аудитории оснащены ПК с двумя мониторами. Для домашних заданий и коворкинга рекомендуется ноутбук от 8 ГБ ОЗУ.
• **Можно ли с нуля?** Да, 80% студентов приходят без опыта. Обучение начинается с пошагового ввода в базу.
• **Можно ли совмещать с учебой/работой?** Да, 65% студентов совмещают благодаря вечерним группам (19:00 - 21:00) и группам выходного дня.
• **Что если пропустить урок?** Запись каждого урока в Full HD доступна в личном кабинете через 2 часа. Ментор доступен для вопросов в чате.
• **Выдается ли диплом?** Выдается официальный верифицируемый диплом резидента IT Park с уникальным QR-кодом на английском и узбекском языках.`
  }
];

// ─── Simple Multi-language Stemmer (RU / EN / UZ) ───
function stem(word: string): string {
  if (word.length <= 3) return word;
  return word
    .replace(/(ости|ость|ение|ения|ению|ением|ниях|ния|ние|нием|ями|ами|ого|его|ому|ему|ыми|ими|ых|их|ую|юю|ая|яя|ое|ее|ые|ие|ов|ев|ей|ам|ям|ах|ях|ом|ем|ой|ей|ка|ки|ку|ке|кой|ок|ек|ий|ый|ть|ти|ет|ут|ют|ит|ат|ят|ал|ил|ял|ла|ли|ло|ся|сь|lar|ning|dan|gacha|ga|da)$/gi, '')
    .toLowerCase();
}

// ─── RAG Search / Retrieval Algorithm ───
function retrieveKnowledge(query: string): { chunk: KnowledgeChunk; score: number }[] {
  const normalizedQuery = query.toLowerCase().replace(/[^a-zа-яё0-9\s]/gi, ' ');
  const rawTokens = normalizedQuery.split(/\s+/).filter((t) => t.length > 1);
  const stemmedTokens = rawTokens.map(stem);

  const scored = KNOWLEDGE_CHUNKS.map((chunk) => {
    let score = 0;
    const lowerContent = chunk.content.toLowerCase();

    // 1. Direct and stemmed keyword matching
    for (const kw of chunk.keywords) {
      const stemmedKw = stem(kw);

      if (normalizedQuery.includes(kw) || normalizedQuery.includes(stemmedKw)) {
        score += 3.5;
      }

      for (let i = 0; i < rawTokens.length; i++) {
        const raw = rawTokens[i];
        const s = stemmedTokens[i];

        if (raw === kw || s === stemmedKw || raw.startsWith(stemmedKw) || kw.startsWith(s)) {
          score += 2.0;
        }
      }
    }

    // 2. Title matching bonus
    const lowerTitle = chunk.title.toLowerCase();
    for (const s of stemmedTokens) {
      if (lowerTitle.includes(s)) {
        score += 2.5;
      }
    }

    // 3. Content matching
    for (const s of stemmedTokens) {
      if (s.length >= 3 && lowerContent.includes(s)) {
        score += 0.8;
      }
    }

    return { chunk, score };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored;
}

export async function POST(req: Request) {
  try {
    const { message, history } = await req.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    // 1. RAG Retrieval Step: Find the most relevant chunks for this query
    const searchResults = retrieveKnowledge(message);
    const topMatches = searchResults.filter((r) => r.score > 1);
    const primaryChunk = searchResults[0];

    const apiKey = process.env.GEMINI_API_KEY;

    // 2. If GEMINI_API_KEY is configured on server, generate through Gemini with RAG context
    if (apiKey) {
      try {
        const retrievedContext = topMatches.length > 0
          ? topMatches.slice(0, 3).map((m) => m.chunk.content).join('\n\n---\n\n')
          : RAG_KNOWLEDGE_BASE;

        const systemInstruction = `Ты — профессиональный, доброжелательный AI-консультант академии EduCenter (Ташкент).
Твоя задача — отвечать на вопросы абитуриентов, используя ТОЛЬКО факты из предоставленной базы знаний EduCenter ниже.

ПРАВИЛА:
1. Опирайся исключительно на факты из предоставленного контекста. Не придумывай несуществующие скидки, филиалы или цены.
2. Отвечай структурированно, красиво (маркированные списки, жирный шрифт для ключевых цифр и дат).
3. При необходимости предложи записаться на бесплатный вводный урок или консультацию.
4. Отвечай на языке вопроса (русский / узбекский / английский).

КОНТЕКСТ БАЗЫ ЗНАНИЙ EDUCENTER (RAG):
${retrievedContext}`;

        const contents = [
          ...(Array.isArray(history) ? history.map((h: { role: string; content: string }) => ({
            role: h.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: h.content }]
          })) : []),
          {
            role: 'user',
            parts: [{ text: message }]
          }
        ];

        // Primary model: gemini-3.5-flash-lite (fast and reliable) with fallback to gemini-flash-latest
        const modelNames = ['gemini-3.5-flash-lite', 'gemini-3.5-flash', 'gemini-flash-latest'];
        let generatedText: string | null = null;
        let usedModel: string = 'gemini-3.5-flash-lite';

        for (const model of modelNames) {
          try {
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                contents,
                systemInstruction: {
                  parts: [{ text: systemInstruction }]
                },
                generationConfig: {
                  temperature: 0.2,
                  maxOutputTokens: 900,
                }
              })
            });

            if (response.ok) {
              const data = await response.json();
              generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text;
              if (generatedText) {
                usedModel = model;
                break;
              }
            }
          } catch (modelErr) {
            console.warn(`Model ${model} request failed, trying next...`, modelErr);
          }
        }

        if (generatedText) {
          return NextResponse.json({
            reply: generatedText,
            source: `RAG + ${usedModel} (${topMatches[0]?.chunk.title || 'EduCenter Base'})`,
          });
        }
      } catch (geminiError) {
        console.error('Gemini API error:', geminiError);
      }
    }

    // 3. Local Intelligent RAG Synthesis Step (works without any external API key!)
    let reply = '';
    let source = 'RAG База знаний EduCenter';

    if (primaryChunk && primaryChunk.score > 0.8) {
      source = `RAG: ${primaryChunk.chunk.title}`;
      reply = `${primaryChunk.chunk.content}\n\n💬 *Если у вас остались вопросы или вы хотите забронировать место в группе, нажмите кнопку «Записаться» вверху сайта или напишите нам в Telegram: @educenter_support.*`;
    } else {
      // General overview response synthesized from catalog
      reply = `Здравствуйте! Я AI-консультант EduCenter, подключенный к официальной базе знаний академии.\n\n` +
        `**Чем я могу вам помочь прямо сейчас:**\n\n` +
        `• **Курсы обучения:** Frontend (React/Next.js), Python & AI, UI/UX Design, Backend Go, QA Automation.\n` +
        `• **Стоимость и рассрочка:** Беспроцентная рассрочка 0% на 3, 6 или 12 месяцев (Anorbank, Uzum Nasiya).\n` +
        `• **Кампусы в Ташкенте:** ул. Шота Руставели, 45 (м. Ойбек) и Чиланзар 9 (м. Мирзо Улугбек).\n` +
        `• **Трудоустройство:** 94% выпускников находят работу, гарантия в официальном договоре.\n` +
        `• **График:** Утренние (09:00), дневные (14:00) и вечерние (19:00) смены + коворкинг с 08:00 до 22:00.\n\n` +
        `Напишите, какое направление или вопрос вас интересует, и я подробно расскажу!`;
    }

    return NextResponse.json({
      reply,
      source,
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Internal Server Error';
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}
