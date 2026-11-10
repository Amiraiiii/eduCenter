'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Rocket, 
  CreditCard, 
  Sparkles, 
  Lightbulb, 
  Lock, 
  Bookmark, 
  CheckCircle2, 
  Pause, 
  Play
} from 'lucide-react';

interface StageNode {
  step: string;
  title: string;
  duration: string;
  icon: any;
  desc: string;
  outcome: string;
}

export default function StudentRoadmapTrack() {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0); // 0 to 100% for the current active step
  const animationRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);

  const STEP_DURATION_MS = 4000; // 4 seconds per stage

  const stages: StageNode[] = [
    {
      step: '01',
      title: 'Старт и фундаментальный код',
      duration: 'Месяц 1–2',
      icon: Rocket,
      desc: 'Погружение в базовый синтаксис, алгоритмы, систему контроля версий Git и стандарты чистоты кода.',
      outcome: 'Первые 2 мини-приложения в вашем GitHub-репозитории',
    },
    {
      step: '02',
      title: 'Архитектура и фреймворки',
      duration: 'Месяц 3–4',
      icon: CreditCard,
      desc: 'Работа со сложными компонентами, серверным рендерингом, базами данных и микросервисной архитектурой.',
      outcome: 'Умение строить отказоустойчивые веб-системы',
    },
    {
      step: '03',
      title: 'Дипломный стартап и AI',
      duration: 'Месяц 5–6',
      icon: Sparkles,
      desc: 'Командная разработка полноценного коммерческого продукта с интеграцией AI-моделей и RAG-поиска.',
      outcome: 'Масштабный проект, готовый к демонстрации работодателям',
    },
    {
      step: '04',
      title: 'Карьерный акселератор',
      duration: 'Месяц 6–7',
      icon: Lightbulb,
      desc: 'Подготовка резюме, тренировочные mock-собеседования с Senior-инженерами и решение алгоритмических задач.',
      outcome: 'Готовность к прохождению реальных технических интервью',
    },
    {
      step: '05',
      title: 'Оффер в BigTech компанию',
      duration: 'Финал',
      icon: Lock,
      desc: 'Направление резюме напрямую партнерам академии (Uzum, EPAM, Click, TBC) и подписание оффера.',
      outcome: 'Выход на работу со стартовой зарплатой от $800–$1,200',
    },
  ];

  // 60fps Smooth Auto-Advance Engine
  useEffect(() => {
    lastTimeRef.current = performance.now();

    const tick = (now: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = now;
      const delta = now - lastTimeRef.current;
      lastTimeRef.current = now;

      if (!isPaused) {
        setProgress((prev) => {
          const next = prev + (delta / STEP_DURATION_MS) * 100;
          if (next >= 100) {
            setActiveStepIndex((curr) => (curr + 1) % stages.length);
            return 0;
          }
          return next;
        });
      }

      animationRef.current = requestAnimationFrame(tick);
    };

    animationRef.current = requestAnimationFrame(tick);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isPaused, stages.length]);

  const handleSelectStep = (idx: number) => {
    setActiveStepIndex(idx);
    setProgress(0);
    lastTimeRef.current = performance.now();
  };

  const currentStage = stages[activeStepIndex];

  // Calculate rail active percentage: 0% to 100% across the 5 nodes
  const railPercent = (activeStepIndex / (stages.length - 1)) * 100;

  return (
    <div 
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative rounded-3xl inspector-card p-6 sm:p-12 overflow-hidden shadow-2xl select-none group/container border border-white/10 bg-[#07090e]/70 backdrop-blur-2xl"
    >
      {/* ─── Ambient Cosmic Mist & Orbital Halo Behind Track (Туман и свечение) ─── */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Horizontal Starlight Nebula Glow behind Rail */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-48 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.06)_0%,rgba(148,163,184,0.02)_50%,transparent_80%)] blur-2xl" />
        {/* Ethereal Corner Mist */}
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-white/[0.03] rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-white/[0.03] rounded-full blur-3xl" />
      </div>

      {/* ─── Top Bookmark Header & Playback Control ─── */}
      <div className="flex items-center justify-between pb-8 border-b border-white/[0.08] text-xs font-tech text-zinc-400">
        <div className="flex items-center gap-2">
          <Bookmark className="w-3.5 h-3.5 text-white fill-white" />
          <span className="font-bold tracking-widest text-white uppercase">МЕТОДОЛОГИЯ 2026</span>
          <span className="text-zinc-600">/</span>
          <span className="text-[11px] text-zinc-400 font-tech">АВТОСКРОЛЛ ОБУЧЕНИЯ</span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-[11px] font-tech text-zinc-300 transition-colors"
            title={isPaused ? 'Возобновить автоскролл' : 'Приостановить'}
          >
            {isPaused ? (
              <>
                <Play className="w-3 h-3 text-white fill-white" />
                <span>Возобновить</span>
              </>
            ) : (
              <>
                <Pause className="w-3 h-3 text-zinc-300" />
                <span>Пауза</span>
              </>
            )}
          </button>
          <div className="text-[11px] text-zinc-500 font-tech hidden sm:block">
            EDU_CENTER / OFFICIAL_GUIDE
          </div>
        </div>
      </div>

      {/* ─── Track of Nodes with 4-Point Star and Animated Rail ─── */}
      <div className="py-14 max-w-4xl mx-auto">
        <div className="relative flex items-center justify-between">
          {/* Base Inactive Rail Line */}
          <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-0.5 bg-white/10 pointer-events-none" />

          {/* Active Glowing Progress Rail Line */}
          <div 
            className="absolute left-6 top-1/2 -translate-y-1/2 h-0.5 bg-gradient-to-r from-white via-white to-zinc-200 shadow-[0_0_12px_rgba(255,255,255,0.7)] pointer-events-none transition-all duration-700 ease-out"
            style={{
              width: `calc(${railPercent}% * (100% - 3rem) / 100)`,
            }}
          />

          {stages.map((st, idx) => {
            const isActive = idx === activeStepIndex;
            const isPassed = idx < activeStepIndex;
            const Icon = st.icon;

            return (
              <button
                key={st.step}
                onClick={() => handleSelectStep(idx)}
                className="relative z-10 group flex flex-col items-center focus:outline-none"
              >
                {/* Node Circle */}
                <div
                  className={`relative w-12 sm:w-16 h-12 sm:h-16 rounded-full flex items-center justify-center transition-all duration-500 ${
                    isActive
                      ? 'bg-[#151924] border-2 border-white shadow-[0_0_24px_rgba(255,255,255,0.5)] scale-110'
                      : isPassed
                      ? 'bg-[#11141c] border border-white/40 text-white'
                      : 'bg-[#0a0c10] border border-white/15 hover:border-white/40 hover:bg-[#12151e]'
                  }`}
                >
                  {/* Subtle timer ring around active node */}
                  {isActive && (
                    <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none">
                      <circle
                        cx="50%"
                        cy="50%"
                        r="calc(50% - 2px)"
                        fill="none"
                        stroke="rgba(255, 255, 255, 0.35)"
                        strokeWidth="2"
                        strokeDasharray="180"
                        strokeDashoffset={180 - (180 * progress) / 100}
                        className="transition-[stroke-dashoffset] duration-75"
                      />
                    </svg>
                  )}

                  {/* Central Active Luminous 4-Point Star */}
                  {isActive ? (
                    <div className="relative flex items-center justify-center animate-in zoom-in-75 duration-300">
                      <svg
                        className="w-7 sm:w-8 h-7 sm:h-8 text-white star-glow"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
                      </svg>
                    </div>
                  ) : (
                    <Icon className={`w-5 h-5 transition-colors ${isPassed ? 'text-zinc-200' : 'text-zinc-500 group-hover:text-white'}`} />
                  )}
                </div>

                {/* Step badge */}
                <span className={`text-[10px] font-tech mt-2 transition-colors ${
                  isActive ? 'text-white font-bold' : isPassed ? 'text-zinc-300' : 'text-zinc-500'
                }`}>
                  {st.step}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ─── Detail Presentation for the Active Step with Smooth Cross-Fade ─── */}
      <div 
        key={activeStepIndex}
        className="max-w-2xl mx-auto text-center space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500 ease-out"
      >
        {/* Step Indicator */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.1] text-xs font-tech text-zinc-300">
          <span>ЭТАП {currentStage.step}</span>
          <span className="text-zinc-600">/</span>
          <span className="text-white">{currentStage.duration}</span>
        </div>

        {/* Editorial Headline */}
        <h3 className="font-display text-2xl sm:text-4xl font-black text-white tracking-tight">
          {currentStage.title}
        </h3>

        <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-tech">
          {currentStage.desc}
        </p>

        {/* Outcome Box */}
        <div className="mt-6 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.08] inline-flex items-center gap-3 text-xs text-left max-w-lg">
          <div className="w-7 h-7 rounded-xl bg-white/[0.08] border border-white/20 flex items-center justify-center shrink-0 text-white">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <div>
            <span className="font-tech text-zinc-400 block text-[10px] uppercase tracking-wider">
              Результат модуля:
            </span>
            <span className="text-white font-medium">
              {currentStage.outcome}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
