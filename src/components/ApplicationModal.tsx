'use client';

import React, { useState } from 'react';
import { X, CheckCircle2, Phone, User, BookOpen, Send, Sparkles, ShieldCheck } from 'lucide-react';
import { COURSES } from '@/data/courses';

interface ApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultCourseId?: string;
}

export default function ApplicationModal({ isOpen, onClose, defaultCourseId }: ApplicationModalProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('+998 ');
  const [selectedCourse, setSelectedCourse] = useState(defaultCourseId || 'frontend-react');
  const [format, setFormat] = useState<'offline' | 'online'>('offline');
  const [submitted, setSubmitted] = useState(false);
  const [leadId, setLeadId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

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
          courseId: selectedCourse,
          format,
          source: 'modal',
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Не удалось отправить заявку. Попробуйте еще раз.');
      }

      setLeadId(data.leadId || null);
      setSubmitted(true);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Произошла непредвиденная ошибка';
      setErrorMessage(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setSubmitted(false);
    setLeadId(null);
    setErrorMessage(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg rounded-3xl bg-[#0f1117] border border-white/[0.1] p-6 sm:p-8 shadow-2xl text-left overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Subtle graphite ambient glow (zero neon) */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-white/[0.02] rounded-full blur-2xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-zinc-400 hover:text-white transition-colors"
          aria-label="Закрыть"
        >
          <X className="w-4 h-4" />
        </button>

        {!submitted ? (
          <div>
            <div className="mb-6 font-tech">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-[11px] text-zinc-300 mb-2">
                <Sparkles className="w-3 h-3 text-zinc-300" />
                <span>Набор открыт • Весенний поток 2026</span>
              </div>
              <h3 className="font-display text-xl font-bold text-white tracking-tight">
                Запись на бесплатный открытый урок
              </h3>
              <p className="text-xs text-zinc-400 mt-1">
                Попробуйте формат обучения, пообщайтесь с ментором и получите персональный карьерный план.
              </p>
            </div>

            {errorMessage && (
              <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1.5">
                  Ваше имя:
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Азиз Каримов"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white text-xs placeholder:text-zinc-600 focus:outline-none focus:border-white/30 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1.5">
                  Номер телефона:
                </label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+998 90 123 45 67"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white text-xs placeholder:text-zinc-600 focus:outline-none focus:border-white/30 transition-colors font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1.5">
                  Направление обучения:
                </label>
                <div className="relative">
                  <BookOpen className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                  <select
                    value={selectedCourse}
                    onChange={(e) => setSelectedCourse(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#141720] border border-white/[0.08] text-white text-xs focus:outline-none focus:border-white/30 transition-colors"
                  >
                    {COURSES.map((course) => (
                      <option key={course.id} value={course.id} className="bg-[#141720] text-white">
                        {course.title} ({course.duration})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1.5">
                  Удобный формат:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setFormat('offline')}
                    className={`py-2 px-3 rounded-xl text-xs font-medium border transition-all ${
                      format === 'offline'
                        ? 'bg-white text-zinc-950 border-white shadow-sm font-semibold'
                        : 'bg-white/[0.03] border-white/[0.06] text-zinc-400 hover:text-white'
                    }`}
                  >
                    Офлайн в Ташкенте
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormat('online')}
                    className={`py-2 px-3 rounded-xl text-xs font-medium border transition-all ${
                      format === 'online'
                        ? 'bg-white text-zinc-950 border-white shadow-sm font-semibold'
                        : 'bg-white/[0.03] border-white/[0.06] text-zinc-400 hover:text-white'
                    }`}
                  >
                    Онлайн с ментором
                  </button>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-shimmer w-full py-3.5 rounded-xl bg-white hover:bg-zinc-200 text-zinc-950 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg shadow-white/5 active:scale-95 disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <div className="w-3.5 h-3.5 rounded-full border-2 border-zinc-950 border-t-transparent animate-spin" />
                      <span>Отправка заявки...</span>
                    </>
                  ) : (
                    <>
                      <span>Забронировать место</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-zinc-400 pt-1 font-tech">
                <ShieldCheck className="w-3.5 h-3.5 text-white" />
                <span>Гарантия конфиденциальности • Без спама</span>
              </div>
            </form>
          </div>
        ) : (
          <div className="py-6 text-center space-y-4 font-tech">
            <div className="w-14 h-14 rounded-full bg-white/[0.08] border border-white/20 text-white flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7" />
            </div>

            <div>
              <h3 className="font-display text-xl font-bold text-white tracking-tight">
                Заявка успешно принята!
              </h3>
              <p className="text-xs text-zinc-400 mt-1 max-w-sm mx-auto">
                Менеджер академической поддержки свяжется с вами в течение 15 минут для подтверждения времени урока.
              </p>
            </div>

            {leadId && (
              <div className="inline-block px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-xs text-zinc-300">
                Номер заявки: <span className="text-white font-bold">{leadId}</span>
              </div>
            )}

            <div className="pt-4">
              <button
                onClick={handleClose}
                className="px-6 py-2.5 rounded-xl bg-white hover:bg-zinc-200 text-zinc-950 text-xs font-semibold transition-all"
              >
                Вернуться к сайту
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
