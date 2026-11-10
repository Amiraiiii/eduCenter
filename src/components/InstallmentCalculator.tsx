'use client';

import React, { useState } from 'react';
import { ShieldCheck, ArrowRight, Percent } from 'lucide-react';
import { COURSES } from '@/data/courses';

interface InstallmentCalculatorProps {
  onApplyForCourse: (courseId: string) => void;
}

export default function InstallmentCalculator({ onApplyForCourse }: InstallmentCalculatorProps) {
  const [selectedCourseId, setSelectedCourseId] = useState('frontend-react');
  const [months, setMonths] = useState<3 | 6 | 12>(12);

  const course = COURSES.find((c) => c.id === selectedCourseId) || COURSES[0];

  // Parse raw price
  const fullPriceNumeric = parseInt(course.price.replace(/[^\d]/g, ''), 10) || 11200000;
  const oneTimeWithDiscount = Math.round(fullPriceNumeric * 0.9);
  const monthlyInstallment = Math.round(fullPriceNumeric / months);

  const formatNumber = (num: number) => num.toLocaleString('ru-RU');

  return (
    <div className="relative rounded-3xl inspector-card p-6 sm:p-10 shadow-2xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-8 border-b border-white/[0.08] gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs text-zinc-300 font-tech mb-2">
            <Percent className="w-3.5 h-3.5 text-zinc-300" />
            <span>Честная рассрочка 0% переплат (2026)</span>
          </div>
          <h3 className="font-display text-xl sm:text-3xl font-black text-white tracking-tight">
            Калькулятор оплаты <br className="hidden sm:inline" />
            <span className="font-editorial-italic font-normal text-zinc-300 text-2xl sm:text-3xl">
              и банковской рассрочки
            </span>
          </h3>
          <p className="text-xs text-zinc-400 mt-1 max-w-xl font-tech">
            Никаких скрытых комиссий и первого взноса. Проценты за вас компенсирует академия через партнёров (Anorbank, Uzum Nasiya, Paymart).
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-tech text-zinc-300">
          <ShieldCheck className="w-4 h-4 text-white" />
          <span>Первый платеж только через 30 дней</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8">
        {/* Left Column: Course Selector & Month Tabs */}
        <div className="lg:col-span-7 space-y-6">
          <div>
            <label className="text-xs font-tech text-zinc-400 uppercase tracking-widest block mb-2.5">
              1. Выберите специальность:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {COURSES.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedCourseId(c.id)}
                  className={`p-3.5 rounded-xl text-left border transition-all ${
                    selectedCourseId === c.id
                      ? 'bg-white/[0.08] border-white/30 text-white shadow-sm'
                      : 'bg-white/[0.02] border-white/[0.05] text-zinc-300 hover:bg-white/[0.04]'
                  }`}
                >
                  <div className="text-xs font-bold font-tech">{c.title}</div>
                  <div className="text-[11px] text-zinc-400 mt-0.5 font-tech">{c.price}</div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-tech text-zinc-400 uppercase tracking-widest block mb-2.5">
              2. Выберите срок рассрочки:
            </label>
            <div className="grid grid-cols-3 gap-3">
              {([3, 6, 12] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => setMonths(m)}
                  className={`py-3 rounded-xl text-xs font-bold border transition-all font-tech ${
                    months === m
                      ? 'bg-white text-zinc-950 border-white shadow-md'
                      : 'bg-white/[0.02] border-white/[0.06] text-zinc-300 hover:bg-white/[0.05]'
                  }`}
                >
                  {m} месяцев
                </button>
              ))}
            </div>
          </div>

          {/* Partner Badges */}
          <div className="pt-2">
            <span className="text-[11px] font-tech text-zinc-500 block mb-2 uppercase tracking-wider">
              Официальные банки-партнёры программы:
            </span>
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-lg bg-white/[0.03] border border-white/[0.06] text-xs text-zinc-300 font-tech">
                Anorbank 0%
              </span>
              <span className="px-3 py-1 rounded-lg bg-white/[0.03] border border-white/[0.06] text-xs text-zinc-300 font-tech">
                Uzum Nasiya
              </span>
              <span className="px-3 py-1 rounded-lg bg-white/[0.03] border border-white/[0.06] text-xs text-zinc-300 font-tech">
                Paymart Installment
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Calculation Summary */}
        <div className="lg:col-span-5 flex flex-col justify-between p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-6">
          <div className="space-y-4">
            <span className="text-xs font-tech text-zinc-400 uppercase tracking-widest block">
              Итоговый расчет:
            </span>

            <div>
              <span className="text-xs text-zinc-400 block mb-1 font-tech">Ежемесячный платёж (рассрочка {months} мес):</span>
              <div className="text-3xl font-black text-white font-tech">
                {formatNumber(monthlyInstallment)} сум
                <span className="text-xs text-zinc-400 font-normal ml-2">/ мес</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.05] space-y-1.5 text-xs font-tech">
              <div className="flex justify-between text-zinc-400">
                <span>Первоначальный взнос:</span>
                <span className="text-white font-semibold">0 сум (без предоплаты)</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Переплата по процентам:</span>
                <span className="text-white font-semibold">0% (0 сум)</span>
              </div>
              <div className="flex justify-between text-zinc-400 pt-1 border-t border-white/[0.05]">
                <span>При разовой оплате (скидка 10%):</span>
                <span className="text-zinc-200 font-medium">{formatNumber(oneTimeWithDiscount)} сум</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => onApplyForCourse(course.id)}
            className="btn-shimmer w-full py-3.5 rounded-xl bg-white hover:bg-zinc-200 text-zinc-950 font-tech font-bold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-lg active:scale-95"
          >
            <span>Оформить заявку на {course.title}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
