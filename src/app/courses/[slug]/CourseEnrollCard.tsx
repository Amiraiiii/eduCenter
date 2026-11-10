'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2, Phone, User, ShieldCheck } from 'lucide-react';
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
    <div className="inspector-card rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 relative overflow-hidden">
      {/* Pricing header */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs text-zinc-400 font-tech uppercase tracking-widest">Рассрочка 0%</span>
          <span className="text-[10px] px-2 py-0.5 rounded bg-white/[0.08] text-zinc-200 font-tech border border-white/20">
            Без первого взноса
          </span>
        </div>
        <div className="text-2xl sm:text-3xl font-black text-white font-tech tracking-tight">
          {course.monthlyPrice}
        </div>
        <div className="text-xs text-zinc-400 font-tech mt-1">
          Полная стоимость: {course.price}
        </div>
      </div>

      {/* Course highlights */}
      <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-2.5 text-xs text-zinc-300 font-tech">
        <div className="flex items-center justify-between">
          <span className="text-zinc-500">Длительность:</span>
          <span className="font-semibold text-white">{course.duration}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-zinc-500">График:</span>
          <span className="font-semibold text-white">{course.schedule || '3 раза в неделю по 2 часа'}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-zinc-500">Проектов в резюме:</span>
          <span className="font-semibold text-white">{course.projectsCount} коммерческих кейса</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-zinc-500">Ближайший поток:</span>
          <span className="font-semibold text-zinc-200">{course.nextCohort || 'Весенний набор'}</span>
        </div>
      </div>

      {!submitted ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest block">
            Забронировать место в группе:
          </span>

          {errorMessage && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
              {errorMessage}
            </div>
          )}

          <div>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ваше имя"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white text-xs placeholder:text-zinc-500 focus:outline-none focus:border-white/30 transition-colors"
              />
            </div>
          </div>

          <div>
            <div className="relative">
              <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+998 90 123 45 67"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white text-xs placeholder:text-zinc-500 focus:outline-none focus:border-white/30 transition-colors font-mono"
              />
            </div>
          </div>

          {/* Format selector */}
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setFormat('offline')}
              className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                format === 'offline'
                  ? 'bg-white text-zinc-950 border-white shadow-md'
                  : 'bg-white/[0.03] border-white/[0.06] text-zinc-400 hover:text-white'
              }`}
            >
              Офлайн в кампусе
            </button>
            <button
              type="button"
              onClick={() => setFormat('online')}
              className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                format === 'online'
                  ? 'bg-white text-zinc-950 border-white shadow-md'
                  : 'bg-white/[0.03] border-white/[0.06] text-zinc-400 hover:text-white'
              }`}
            >
              Онлайн с ментором
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-shimmer w-full py-3.5 rounded-xl bg-white hover:bg-zinc-200 text-zinc-950 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md active:scale-95 disabled:opacity-50"
          >
            {loading ? (
              <div className="w-4 h-4 rounded-full border-2 border-zinc-950 border-t-transparent animate-spin" />
            ) : (
              <>
                <span>Записаться на открытый урок</span>
                <Send className="w-3.5 h-3.5" />
              </>
            )}
          </button>

          <div className="flex items-center justify-center gap-1.5 text-[11px] text-zinc-400 font-tech">
            <ShieldCheck className="w-3.5 h-3.5 text-white" />
            <span>Договор с гарантией возврата средств</span>
          </div>
        </form>
      ) : (
        <div className="py-6 text-center space-y-3 font-tech">
          <div className="w-12 h-12 rounded-full bg-white/[0.08] border border-white/20 text-white flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h4 className="font-display text-base font-bold text-white">Место забронировано!</h4>
          <p className="text-xs text-zinc-400">
            Мы перезвоним вам в течение 15 минут для подтверждения расписания.
          </p>
          {leadId && (
            <div className="text-[11px] text-zinc-400 pt-1">
              ID заявки: <span className="text-white font-bold">{leadId}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
