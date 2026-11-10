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
  ShieldCheck
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
          source: 'contacts_page',
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Не удалось отправить сообщение');
      }

      setLeadId(data.leadId || null);
      setSubmitted(true);
      setName('');
      setPhone('+998 ');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Произошла непредвиденная ошибка';
      setErrorMessage(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-20">
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] text-zinc-300 border border-white/[0.08] text-xs font-tech">
          <MapPin className="w-3.5 h-3.5 text-zinc-300" />
          <span>Кампусы в Ташкенте и контакты</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight uppercase">
          Приходите в гости <br />
          <span className="font-editorial-italic font-normal text-zinc-300 text-3xl sm:text-5xl lowercase">
            или напишите нам онлайн
          </span>
        </h1>
        <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed max-w-2xl">
          Наши двери открыты ежедневно с 09:00 до 21:00. Вы можете записаться на бесплатную экскурсию, протестировать оборудование коворкинга и пообщаться с преподавателями.
        </p>
      </div>

      {/* Campuses & Form Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Campuses and Info */}
        <div className="lg:col-span-7 space-y-6">
          <div className="inspector-card rounded-3xl p-6 sm:p-8 space-y-6">
            <h3 className="text-base sm:text-lg font-black text-white uppercase tracking-tight">Кампус 1: Главный образовательный хаб (Шота Руставели)</h3>
            <div className="space-y-3 text-xs text-zinc-300">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-zinc-400 shrink-0 mt-0.5" />
                <span>г. Ташкент, Яккасарайский район, ул. Шота Руставели, 45 (ориентир: м. Ойбек)</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-zinc-400 shrink-0" />
                <span>Учебные аудитории: 09:00 – 21:00 | Коворкинг для студентов: 08:00 – 22:00</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-zinc-400 shrink-0" />
                <a href="tel:+998712004488" className="hover:text-white font-mono">+998 (71) 200-44-88</a>
              </div>
            </div>
          </div>

          <div className="inspector-card rounded-3xl p-6 sm:p-8 space-y-6">
            <h3 className="text-base sm:text-lg font-black text-white uppercase tracking-tight">Кампус 2: Чиланзарский филиал &amp; AI Lab</h3>
            <div className="space-y-3 text-xs text-zinc-300">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-zinc-400 shrink-0 mt-0.5" />
                <span>г. Ташкент, Чиланзарский район, квартал 9, дом 12/1 (ориентир: м. Мирзо Улугбек)</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-zinc-400 shrink-0" />
                <span>Ежедневно: 09:00 – 20:00</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-zinc-400 shrink-0" />
                <a href="mailto:chilonzor@educenter.uz" className="hover:text-white font-mono">chilonzor@educenter.uz</a>
              </div>
            </div>
          </div>

          {/* Socials & Messenger Links */}
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex flex-wrap items-center justify-between gap-4">
            <div className="text-xs text-zinc-400">
              <span className="text-white font-semibold block">Онлайн-поддержка 24/7</span>
              Отвечаем на узбекском и русском языках
            </div>

            <div className="flex items-center gap-2">
              <a
                href="https://t.me"
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-white border border-white/[0.08] text-xs font-medium transition-all font-mono"
              >
                Telegram: @educenter_support
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Contact & Enroll Form */}
        <div className="lg:col-span-5 inspector-card rounded-3xl p-6 sm:p-8 space-y-6">
          <div>
            <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest block mb-1">
              Форма обратной связи
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Задайте вопрос или запишитесь
            </h3>
            <p className="text-xs text-zinc-400 mt-1">
              Оставьте контакты — мы перезвоним и подробно расскажем обо всех программах.
            </p>
          </div>

          {errorMessage && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
              {errorMessage}
            </div>
          )}

          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1.5 uppercase tracking-wider">
                  Ваше имя:
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Тимур"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white text-xs placeholder:text-zinc-600 focus:outline-none focus:border-white/30 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1.5 uppercase tracking-wider">
                  Номер телефона:
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+998 90 123 45 67"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white text-xs placeholder:text-zinc-600 focus:outline-none focus:border-white/30 transition-colors font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1.5 uppercase tracking-wider">
                  Интересующий курс:
                </label>
                <select
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0f1117] border border-white/[0.08] text-white text-xs focus:outline-none focus:border-white/30 transition-colors"
                >
                  {COURSES.map((c) => (
                    <option key={c.id} value={c.id} className="bg-[#0f1117] text-white">
                      {c.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-shimmer w-full py-3.5 rounded-xl bg-white hover:bg-zinc-200 text-zinc-950 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md active:scale-95 disabled:opacity-50"
                >
                  {loading ? (
                    <div className="w-4 h-4 rounded-full border-2 border-zinc-950 border-t-transparent animate-spin" />
                  ) : (
                    <>
                      <span>Отправить заявку</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-zinc-400 font-tech">
                <ShieldCheck className="w-3.5 h-3.5 text-white" />
                <span>Ответ в течение 15 минут в рабочее время</span>
              </div>
            </form>
          ) : (
            <div className="py-6 text-center space-y-3 font-tech">
              <div className="w-12 h-12 rounded-full bg-white/[0.08] border border-white/20 text-white flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="font-display text-base font-bold text-white">Заявка принята!</h4>
              <p className="text-xs text-zinc-400">
                Мы свяжемся с вами в ближайшее время.
              </p>
              {leadId && (
                <div className="text-[11px] text-zinc-400 pt-1">
                  ID: <span className="text-white font-bold">{leadId}</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* FAQ Section */}
      <div id="faq" className="space-y-8 max-w-4xl mx-auto pt-10 scroll-mt-28">
        <div className="text-center space-y-2">
          <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest block">
            База знаний
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Часто задаваемые вопросы
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400">
            Всё, что нужно знать перед началом обучения в EduCenter.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = activeFaq === index;
            return (
              <div
                key={index}
                className="inspector-card rounded-2xl p-5 cursor-pointer"
                onClick={() => setActiveFaq(isOpen ? null : index)}
              >
                <div className="flex items-center justify-between gap-4">
                  <h4 className="text-sm font-bold text-white">{faq.q}</h4>
                  <ChevronDown className={`w-4 h-4 text-zinc-400 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                </div>
                {isOpen && (
                  <p className="text-xs text-zinc-400 leading-relaxed mt-3 pt-3 border-t border-white/[0.06]">
                    {faq.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
