import { NextResponse } from 'next/server';
import { COURSES } from '@/data/courses';

interface ApplyRequestBody {
  name?: string;
  phone?: string;
  courseId?: string;
  format?: 'offline' | 'online';
  message?: string;
  source?: string;
}

export async function POST(req: Request) {
  try {
    const body: ApplyRequestBody = await req.json();
    const { name, phone, courseId, format = 'offline', message, source = 'modal' } = body;

    // 1. Validation
    if (!name || name.trim().length < 2) {
      return NextResponse.json(
        { success: false, error: 'Пожалуйста, укажите ваше имя (минимум 2 символа).' },
        { status: 400 }
      );
    }

    const cleanPhone = (phone || '').replace(/[^\d+]/g, '');
    if (!cleanPhone || cleanPhone.length < 9) {
      return NextResponse.json(
        { success: false, error: 'Пожалуйста, укажите корректный номер телефона.' },
        { status: 400 }
      );
    }

    // Match course name
    const course = COURSES.find((c) => c.id === courseId);
    const courseTitle = course ? course.title : (courseId || 'Общая консультация');

    const leadId = `ED-${Date.now().toString().slice(-6)}`;
    const timestamp = new Date().toLocaleString('ru-RU', { timeZone: 'Asia/Tashkent' });

    // 2. Dispatch to Telegram Bot (if configured)
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    let telegramSent = false;
    if (botToken && chatId) {
      try {
        const text = [
          `🎓 *Новая заявка на обучение в EduCenter!*`,
          `━━━━━━━━━━━━━━━━━━`,
          `🆔 *Номер заявки:* \`#${leadId}\``,
          `👤 *Имя:* ${name.trim()}`,
          `📞 *Телефон:* [${cleanPhone}](tel:${cleanPhone})`,
          `📚 *Курс:* ${courseTitle}`,
          `💻 *Формат:* ${format === 'online' ? '🌐 Онлайн' : '🏢 Офлайн (Ташкент)'}`,
          `📍 *Источник:* ${source === 'contacts' ? 'Страница контактов' : 'Всплывающая форма'}`,
          message ? `💬 *Сообщение:* ${message.trim()}` : null,
          `⏰ *Время (Ташкент):* ${timestamp}`,
        ].filter(Boolean).join('\n');

        const tgRes = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: chatId,
            text,
            parse_mode: 'Markdown',
          }),
        });

        if (tgRes.ok) {
          telegramSent = true;
        } else {
          console.warn('Telegram API response error:', await tgRes.text());
        }
      } catch (tgErr) {
        console.error('Failed to notify Telegram bot:', tgErr);
      }
    }

    // Log the lead on server
    console.log(`[LEAD RECEIVED #${leadId}] Name: ${name}, Phone: ${cleanPhone}, Course: ${courseTitle}, TelegramSent: ${telegramSent}`);

    return NextResponse.json({
      success: true,
      leadId,
      message: 'Заявка успешно принята! Наш менеджер свяжется с вами в течение 15 минут.',
      telegramSent,
    });
  } catch (error: unknown) {
    console.error('Error processing application:', error);
    return NextResponse.json(
      { success: false, error: 'Произошла ошибка при отправке заявки. Пожалуйста, позвоните нам напрямую.' },
      { status: 500 }
    );
  }
}
