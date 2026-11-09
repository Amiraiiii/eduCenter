import { NextResponse } from 'next/server';
import { RAG_KNOWLEDGE_BASE } from '@/data/ragKnowledge';

export async function POST(req: Request) {
  try {
    const { message, history, apiKey: clientApiKey } = await req.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const apiKey = clientApiKey || process.env.GEMINI_API_KEY;

    // If API key is available, call Google Gemini 1.5 Flash API
    if (apiKey) {
      const systemInstruction = `Ты — квалифицированный, дружелюбный AI-консультант учебного центра EduCenter.
Твоя цель — консультировать студентов и абитуриентов по курсам, стоимости, форматам обучения, трудоустройству и расписанию, опираясь на достоверную базу знаний учебного центра ниже.

ВАЖНЫЕ ПРАВИЛА:
1. Используй ТОЛЬКО факты из предоставленной базы знаний. Не выдумывай несуществующие скидки, филиалы или курсы.
2. Отвечай кратко, доброжелательно, структурированно (с маркированными списками и выделением ключевых моментов).
3. Если пользователь спрашивает о записи на курс или пробный урок, предложи оставить заявку через форму на сайте или по телефону +998 (71) 200-44-88.
4. Отвечай на языке запроса пользователя (русский / узбекский / английский).

БАЗА ЗНАНИЙ EDUCENTER (RAG):
${RAG_KNOWLEDGE_BASE}`;

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

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents,
          systemInstruction: {
            parts: [{ text: systemInstruction }]
          },
          generationConfig: {
            temperature: 0.3,
            maxOutputTokens: 1000,
          }
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        return NextResponse.json({
          error: errorData.error?.message || 'Gemini API Error',
          reply: `⚠️ Ошибка Gemini API: ${errorData.error?.message || 'Проверьте корректность API ключа'}`
        }, { status: 200 });
      }

      const data = await response.json();
      const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Извините, не удалось сформировать ответ. Попробуйте еще раз.';

      return NextResponse.json({ reply: generatedText, source: 'gemini-1.5-flash' });
    }

    // Fallback RAG search when API key is not yet set
    const lower = message.toLowerCase();
    let reply = '';

    if (lower.includes('цен') || lower.includes('стоим') || lower.includes('сум') || lower.includes('оплат') || lower.includes('рассрочк')) {
      reply = `**Стоимость обучения и варианты оплаты в EduCenter:**\n\n` +
        `• **Frontend (React/Next.js):** 1 800 000 сум/мес (7 месяцев)\n` +
        `• **Python & AI Engineering:** 2 100 000 сум/мес (8 месяцев)\n` +
        `• **UI/UX Design:** 1 650 000 сум/мес (5 месяцев)\n` +
        `• **Golang Backend:** 2 300 000 сум/мес (6 месяцев)\n` +
        `• **QA Automation:** 1 500 000 сум/мес (4 месяца)\n\n` +
        `✨ **Рассрочка:** Доступна беспроцентная рассрочка на 3, 6 или 12 месяцев через Anorbank, Uzum Nasiya без первого взноса! При единовременной оплате всего курса действует скидка **10%**.\n\n` +
        `💡 *Для активации нейросетевых ответов укажите Gemini API ключ в настройках чата.*`;
    } else if (lower.includes('начин') || lower.includes('нович') || lower.includes('нуля') || lower.includes('опыт')) {
      reply = `**С чего начать обучение с нуля:**\n\n` +
        `80% наших студентов приходят без какого-либо опыта в программировании!\n\n` +
        `Лучшие направления для старта:\n` +
        `1. **Frontend-разработка** — быстрый визуальный результат, высокий спрос на Junior-специалистов.\n` +
        `2. **UI/UX Дизайн** — если вам ближе проектирование интерфейсов и визуальная логика без сложного кода.\n` +
        `3. **QA Automation** — самый быстрый и надежный порог входа в IT (4 месяца обучения).\n\n` +
        `Каждый курс начинается с вводного модуля и настройки инструментов под кураторством ментора.`;
    } else if (lower.includes('трудоустро') || lower.includes('работ') || lower.includes('гарант') || lower.includes('ваканс')) {
      reply = `**Гарантия трудоустройства в EduCenter:**\n\n` +
        `• 94% наших выпускников находят работу в первые 3 месяца после выпуска.\n` +
        `• При выполнении 85%+ домашних заданий и защите дипломного проекта гарантия трудоустройства закрепляется в **договоре**.\n` +
        `• Наш Карьерный центр организует мок-интервью, аудит резюме и направляет портфолио напрямую HR-партнерам (Uzum, EPAM, Click, Payme, IT Park).`;
    } else if (lower.includes('ментор') || lower.includes('преподават') || lower.includes('учител') || lower.includes('кто учит')) {
      reply = `**Преподаватели и менторы EduCenter:**\n\n` +
        `Все наши преподаватели — действующие Senior и Lead практики:\n` +
        `• **Фаррух Каримов** — Lead Frontend Engineer в Uzum Technologies (8+ лет опыта)\n` +
        `• **Шерзод Алиев** — Senior Python & AI Architect в EPAM Systems (10+ лет опыта)\n` +
        `• **Дильноза Саидова** — Lead Product Designer в Click Fintech (7+ лет опыта)\n` +
        `• **Жасур Рустамов** — Principal Go Engineer в Fintech Cloud (9+ лет опыта)\n` +
        `• **Камила Юсупова** — Lead QA Automation Engineer в Beeline (6 лет опыта)\n\n` +
        `Каждый студент получает регулярный персональный код-ревью своих проектов.`;
    } else if (lower.includes('расписан') || lower.includes('график') || lower.includes('когд') || lower.includes('смен') || lower.includes('время')) {
      reply = `**Расписание и график занятий:**\n\n` +
        `Занятия проходят 3 раза в неделю по 2 часа:\n` +
        `• **Утренняя смена:** 09:00 — 11:00\n` +
        `• **Дневная смена:** 14:00 — 16:00\n` +
        `• **Вечерняя смена:** 19:00 — 21:00 (для совмещения с работой/учебой)\n` +
        `• **Группы выходного дня:** Сб и Вс по 3 часа\n\n` +
        `🚀 Коворкинг и лаборатории открыты с 08:00 до 22:00 ежедневно!`;
    } else if (lower.includes('адрес') || lower.includes('контакт') || lower.includes('где') || lower.includes('телефон') || lower.includes('филиал')) {
      reply = `**Контакты и филиалы EduCenter:**\n\n` +
        `📍 **Главный кампус:** г. Ташкент, ул. Шота Руставели, 45 (метро Ойбек)\n` +
        `📍 **Филиал Чиланзар:** кв-л 9, дом 14\n` +
        `📞 **Телефон:** +998 (71) 200-44-88\n` +
        `⏰ **Режим работы:** Ежедневно с 09:00 до 21:00\n` +
        `💻 Коворкинг открыт для студентов с 08:00 до 22:00 бесплатно!`;
    } else {
      reply = `Здравствуйте! Я AI-ассистент EduCenter, работаю на основе базы знаний академии.\n\n` +
        `Я могу рассказать:\n` +
        `• О программах обучения (**Frontend, Python & AI, Go, UI/UX, QA**)\n` +
        `• О стоимости, скидках и беспроцентной рассрочке\n` +
        `• О гарантии трудоустройства и карьерном центре\n` +
        `• О графике занятий и наших кампусах\n\n` +
        `Задайте интересующий вас вопрос! *(Также вы можете подключить свой Gemini API ключ в шапке чата для развернутого диалога).*`;
    }

    return NextResponse.json({ reply, source: 'rag-local-fallback' });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Internal Server Error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
