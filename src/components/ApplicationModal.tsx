'use client';

import React, { useState } from 'react';
import { X, CheckCircle2, Phone, User, BookOpen, Send, Sparkles } from 'lucide-react';
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
    setName('');
    setPhone('+998 ');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-3xl bg-[#0e1017] border border-white/10 shadow-2xl p-6 sm:p-8 text-zinc-100 overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <button
          onClick={handleClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-white/[0.05] hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white">Заявка принята!</h3>
            {leadId && (
              <div className="inline-block px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-mono">
                Номер заявки: #{leadId}
              </div>
            )}
            <p className="text-xs text-zinc-400 max-w-sm mx-auto leading-relaxed">
              Наш менеджер свяжется с вами по номеру <span className="text-zinc-200 font-mono">{phone}</span> в течение 15 минут для подтверждения бронирования и приглашения на вводный урок.
            </p>
            <button
              onClick={handleClose}
              className="mt-4 px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold transition-colors"
            >
              Закрыть
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Запись на обучение</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-1">Начните свой путь в IT</h3>
            <p className="text-xs text-zinc-400 mb-6">
              Заполните контакты, мы перезвоним, ответим на вопросы и запишем на бесплатный открытый урок.
            </p>

            {errorMessage && (
              <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1.5">Ваше имя</label>
                <div className="relative">
                  <User className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="Амир Темуров"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 focus:border-cyan-500 focus:bg-white/[0.07] text-white text-xs outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1.5">Номер телефона</label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    required
                    placeholder="+998 90 123 45 67"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 focus:border-cyan-500 focus:bg-white/[0.07] text-white text-xs font-mono outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1.5">Направление</label>
                <div className="relative">
                  <BookOpen className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <select
                    value={selectedCourse}
                    onChange={(e) => setSelectedCourse(e.target.value)}
                    className="w-full pl-10 pr-8 py-2.5 rounded-xl bg-[#141722] border border-white/10 focus:border-cyan-500 text-white text-xs outline-none transition-all appearance-none cursor-pointer"
                  >
                    {COURSES.map((c) => (
                      <option key={c.id} value={c.id} className="bg-[#141722] text-white">
                        {c.title} ({c.duration})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1.5">Формат обучения</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setFormat('offline')}
                    className={`py-2 px-3 rounded-xl border text-xs font-medium transition-all ${
                      format === 'offline'
                        ? 'border-cyan-500 bg-cyan-500/10 text-cyan-300'
                        : 'border-white/10 bg-white/[0.02] text-zinc-400 hover:text-white'
                    }`}
                  >
                    🏢 Офлайн в кампусе
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormat('online')}
                    className={`py-2 px-3 rounded-xl border text-xs font-medium transition-all ${
                      format === 'online'
                        ? 'border-cyan-500 bg-cyan-500/10 text-cyan-300'
                        : 'border-white/10 bg-white/[0.02] text-zinc-400 hover:text-white'
                    }`}
                  >
                    💻 Онлайн с ментором
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-semibold tracking-wide transition-all shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Отправить заявку</span>
                    <Send className="w-3.5 h-3.5" />
                  </>
                )}
              </button>

              <p className="text-[10px] text-zinc-400 text-center">
                Нажимая кнопку, вы соглашаетесь на обработку персональных данных.
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
