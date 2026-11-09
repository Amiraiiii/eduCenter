'use client';

import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  CheckCircle2, 
  ChevronDown, 
  MessageCircle, 
  Globe, 
  Video,
  Sparkles
} from 'lucide-react';
import { COURSES } from '@/data/courses';

export default function ContactsPage() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('+998 ');
  const [course, setCourse] = useState('frontend-react');
  const [submitted, setSubmitted] = useState(false);
  const [leadId, setLeadId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Нужен ли свой ноутбук для занятий?',
      a: 'Все аудитории оборудованы современными рабочими станциями с двумя мониторами. Однако для выполнения домашних заданий и комфортной работы в коворкинге мы рекомендуем иметь свой ноутбук (от 8 ГБ ОЗУ).'
    },
    {
      q: 'Можно ли совмещать обучение с работой или университетом?',
      a: 'Да! Более 65% наших студентов совмещают учебу. Мы специально сформировали вечерние группы (19:00 - 21:00) и группы выходного дня. Все лекции записываются и доступны онлайн.'
    },
    {
      q: 'Как проходит процедура трудоустройства?',
      a: 'После успешной защиты дипломного проекта с вами начинает персонально работать HR-куратор Карьерного центра: оформляется резюме, профиль LinkedIn, портфолио на GitHub/Behance. Мы организуем закрытые собеседования в партнерские IT-компании.'
    },
    {
      q: 'Какие условия беспроцентной рассрочки?',
      a: 'Рассрочка оформляется напрямую через банк-партнер (Anorbank, Uzum Nasiya, Paymart) на 3, 6 или 12 месяцев без первоначального взноса. Проценты за вас оплачивает академия.'
    },
    {
      q: 'Что делать, если я заболел или пропустил урок?',
      a: 'Запись каждого занятия в Full HD качестве появляется в вашем личном кабинете через 2 часа. Ментор ответит на ваши вопросы и поможет разобрать тему на индивидуальной консультации.'
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          courseId: course,
          source: 'contacts',
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Ошибка при отправке заявки');
      }

      setLeadId(data.leadId || null);
      setSubmitted(true);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Не удалось отправить заявку. Попробуйте снова.';
      setErrorMessage(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-20">
      {/* Header */}
      <div className="max-w-2xl space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-mono">
          <Phone className="w-3.5 h-3.5" />
          <span>Контакты и поддержка</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Всегда на связи с вами
        </h1>
        <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
          Приходите на чашку кофе в наши кампусы, позвоните в контакт-центр или оставьте заявку для консультации с экспертом.
        </p>
      </div>

      {/* Grid: Contacts Info + Lead Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Info Column (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-[#0e1017] border border-white/[0.08] space-y-6">
            <h3 className="text-lg font-bold text-white">Контактные данные</h3>

            <div className="space-y-4 text-xs text-zinc-300">
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] text-zinc-500 block">Единый контакт-центр:</span>
                  <a href="tel:+998712004488" className="text-sm font-bold text-white font-mono hover:text-cyan-400 transition-colors">
                    +998 (71) 200-44-88
                  </a>
                  <span className="text-[10px] text-emerald-400 block mt-0.5">Звонок бесплатный по РУз</span>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] text-zinc-500 block">Электронная почта:</span>
                  <a href="mailto:info@educenter.uz" className="text-xs font-semibold text-white hover:text-cyan-400 transition-colors">
                    info@educenter.uz
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] text-zinc-500 block">График работы:</span>
                  <span className="text-xs text-white">Пн — Вс: 09:00 — 21:00</span>
                  <span className="text-[10px] text-zinc-500 block mt-0.5">Коворкинг для студентов: 08:00 — 22:00</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/[0.06] space-y-3">
              <span className="text-xs font-semibold text-white block">Мессенджеры и соцсети:</span>
              <div className="flex items-center gap-3">
                <a
                  href="https://t.me"
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-xl bg-white/[0.04] hover:bg-cyan-500/10 border border-white/5 hover:border-cyan-500/30 text-xs font-medium text-cyan-400 flex items-center gap-2 transition-all"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Telegram</span>
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-xl bg-white/[0.04] hover:bg-pink-500/10 border border-white/5 hover:border-pink-500/30 text-xs font-medium text-pink-400 flex items-center gap-2 transition-all"
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>Instagram</span>
                </a>
              </div>
            </div>
          </div>

          {/* Campuses info */}
          <div className="p-6 rounded-3xl bg-[#0e1017] border border-white/[0.08] space-y-4">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <MapPin className="w-4 h-4 text-cyan-400" />
              <span>Адреса кампусов в Ташкенте</span>
            </h4>
            <div className="space-y-3 text-xs text-zinc-300">
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                <strong className="text-white block">Кампус Руставели:</strong>
                <span>ул. Шота Руставели, 45 (ст. метро Ойбек / Минг Урик)</span>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                <strong className="text-white block">Кампус Чиланзар:</strong>
                <span>Квартал 9, дом 14 (ориентир: метро Мирзо Улугбек)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Form Column (7 cols) */}
        <div className="lg:col-span-7">
          <div className="p-6 sm:p-10 rounded-3xl bg-[#0e1017] border border-white/[0.08] shadow-2xl space-y-6">
            <div>
              <div className="flex items-center gap-1.5 text-cyan-400 text-xs font-mono uppercase tracking-wider mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Запись на открытый урок</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">Оставьте заявку онлайн</h3>
              <p className="text-xs text-zinc-400 mt-1">
                Наш методист свяжется с вами, ответит на любые вопросы и забронирует место в группе.
              </p>
            </div>

            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold text-white">Спасибо за заявку!</h4>
                {leadId && (
                  <div className="inline-block px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-mono">
                    Номер заявки: #{leadId}
                  </div>
                )}
                <p className="text-xs text-zinc-400 max-w-sm mx-auto leading-relaxed">
                  Мы получили ваши данные и перезвоним на номер <strong className="text-white font-mono">{phone}</strong> в течение 15 минут.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setLeadId(null);
                    setName('');
                    setPhone('+998 ');
                  }}
                  className="px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold"
                >
                  Отправить еще одну заявку
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {errorMessage && (
                  <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
                    {errorMessage}
                  </div>
                )}
                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1.5">Ваше полное имя</label>
                  <input
                    type="text"
                    required
                    placeholder="Амир Темуров"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 focus:border-cyan-500 text-white text-xs outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1.5">Номер телефона</label>
                  <input
                    type="tel"
                    required
                    placeholder="+998 90 123 45 67"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 focus:border-cyan-500 text-white text-xs font-mono outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1.5">Интересующий курс</label>
                  <select
                    value={course}
                    onChange={(e) => setCourse(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[#141722] border border-white/10 focus:border-cyan-500 text-white text-xs outline-none cursor-pointer"
                  >
                    {COURSES.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.title} ({c.duration})
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:opacity-50 text-white font-semibold text-xs tracking-wide transition-all shadow-xl shadow-cyan-500/20 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Получить консультацию и скидку 10%</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>

                <p className="text-[10px] text-zinc-500 text-center">
                  Мы гарантируем конфиденциальность ваших данных и не передаем их третьим лицам.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* FAQ Accordion Section */}
      <div id="faq" className="space-y-6 pt-10 border-t border-white/[0.08]">
        <div className="max-w-2xl space-y-2">
          <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider">Ответы на вопросы</div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Часто задаваемые вопросы (FAQ)</h2>
        </div>

        <div className="space-y-3 max-w-4xl">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-[#0e1017] border border-white/[0.07] overflow-hidden transition-all"
            >
              <button
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 text-xs sm:text-sm font-semibold text-white hover:text-cyan-300 transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-zinc-400 shrink-0 transition-transform ${
                    activeFaq === idx ? 'rotate-180 text-cyan-400' : ''
                  }`}
                />
              </button>
              {activeFaq === idx && (
                <div className="px-5 pb-5 text-xs text-zinc-400 leading-relaxed border-t border-white/[0.04] pt-3 animate-in fade-in duration-150">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
