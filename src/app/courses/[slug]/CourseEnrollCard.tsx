'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2, Sparkles, Phone, User, Calendar, ShieldCheck } from 'lucide-react';
import { Course } from '@/data/courses';

interface Props {
  course: Course;
}

export default function CourseEnrollCard({ course }: Props) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('+998 ');
  const [format, setFormat] = useState<'offline' | 'online'>('offline');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [leadId, setLeadId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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
          courseId: course.id,
          format,
          source: `course_page_${course.id}`,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Не удалось отправить заявку');
      }

      setLeadId(data.leadId || null);
      setSubmitted(true);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Произошла ошибка при отправке';
      setErrorMessage(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-3xl bg-[#0e1017] border border-white/[0.08] p-6 sm:p-8 shadow-2xl space-y-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-36 h-36 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Pricing header */}
      <div>
        <span className="text-xs text-zinc-400 block mb-1">Стоимость обучения</span>
        <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
          {course.monthlyPrice}
        </div>
        <div className="text-xs text-zinc-400 mt-1">
          или <strong className="text-cyan-400 font-mono">{course.price}</strong> при полной оплате (-10%)
        </div>
        <div className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[11px]">
          <Sparkles className="w-3 h-3" />
          <span>Рассрочка 0% без переплат на 12 мес</span>
        </div>
      </div>

      <div className="pt-2 border-t border-white/[0.06]">
        {submitted ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h4 className="text-lg font-bold text-white">Вы успешно записались!</h4>
            {leadId && (
              <span className="inline-block px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-mono">
                Заявка #{leadId}
              </span>
            )}
            <p className="text-xs text-zinc-400 leading-relaxed">
              Менеджер свяжется с вами по номеру <span className="text-white font-mono">{phone}</span> для подтверждения бронирования.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setLeadId(null);
                setName('');
                setPhone('+998 ');
              }}
              className="mt-3 px-5 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold"
            >
              Записаться повторно
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="text-xs font-semibold text-zinc-200">
              Забронировать место в ближайшей группе:
            </div>

            {errorMessage && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
                {errorMessage}
              </div>
            )}

            <div>
              <label className="block text-[11px] font-medium text-zinc-400 mb-1">Формат</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setFormat('offline')}
                  className={`py-2 px-2.5 rounded-xl border text-xs font-medium transition-all ${
                    format === 'offline'
                      ? 'border-cyan-500 bg-cyan-500/10 text-cyan-300'
                      : 'border-white/10 bg-white/[0.02] text-zinc-400 hover:text-white'
                  }`}
                >
                  🏢 Офлайн (Ташкент)
                </button>
                <button
                  type="button"
                  onClick={() => setFormat('online')}
                  className={`py-2 px-2.5 rounded-xl border text-xs font-medium transition-all ${
                    format === 'online'
                      ? 'border-cyan-500 bg-cyan-500/10 text-cyan-300'
                      : 'border-white/10 bg-white/[0.02] text-zinc-400 hover:text-white'
                  }`}
                >
                  🌐 Онлайн
                </button>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-medium text-zinc-400 mb-1">Ваше имя</label>
              <div className="relative">
                <User className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  placeholder="Имя Фамилия"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 focus:border-cyan-500 text-white text-xs outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-medium text-zinc-400 mb-1">Телефон</label>
              <div className="relative">
                <Phone className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  required
                  placeholder="+998 90 123 45 67"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 focus:border-cyan-500 text-white text-xs font-mono outline-none transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:opacity-50 text-white text-xs font-semibold tracking-wide transition-all shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2"
            >
              {loading ? (
                <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>Записаться на открытый урок</span>
                  <Send className="w-3.5 h-3.5" />
                </>
              )}
            </button>

            <div className="pt-2 flex items-center justify-center gap-2 text-[11px] text-zinc-500">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Бесплатный пробный урок без обязательств</span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
