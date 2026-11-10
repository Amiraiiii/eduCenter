'use client';

import React, { useState } from 'react';
import { ArrowRight, Compass } from 'lucide-react';
import Moon3D from './Moon3D';
import CelestialCosmosField from './CelestialCosmosField';

interface HeroEditorialRibbonProps {
  onOpenApply: () => void;
  onOpenQuiz: () => void;
}

export default function HeroEditorialRibbon({ onOpenApply, onOpenQuiz }: HeroEditorialRibbonProps) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -20;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  const skillsTrack1 = [
    'REACT 19',
    'PYTHON 3.12',
    'AI AGENTS',
    'GOLANG',
    'FIGMA PRO',
    'DOCKER',
    'POSTGRESQL',
    'LANGCHAIN',
    'PLAYWRIGHT',
  ];

  const skillsTrack2 = [
    'NEXT.JS 16',
    'RAG SYSTEMS',
    'MICROSERVICES',
    'KAFKA',
    'DESIGN TOKENS',
    'FASTAPI',
    'KUBERNETES',
    'UZUM HIRING',
    'EPAM PARTNER',
  ];

  return (
    <div 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[94vh] flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 pt-20 pb-16 overflow-hidden select-none"
    >
      {/* ─── Ambient Cosmic Sky: Star Shards, Asteroids, Orbital Rings & Light Pillar ─── */}
      <CelestialCosmosField />

      {/* ─── Interactive 3D Raymarched Solar Eclipse with Cursor Physics ─── */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] sm:w-[760px] lg:w-[960px] h-[520px] sm:h-[760px] lg:h-[960px] pointer-events-none z-0 transition-transform duration-500 ease-out opacity-95"
        style={{
          transform: `translate(-50%, -50%) translate3d(${mousePos.x * 0.25}px, ${-mousePos.y * 0.25}px, 0)`,
        }}
      >
        <Moon3D className="w-full h-full" />
      </div>

      {/* Atmospheric noise backdrop */}
      <div className="absolute inset-0 noise-overlay pointer-events-none opacity-30 z-0" />

      {/* Water ripple reflection gradient at base */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#050608] via-[#050608]/75 to-transparent pointer-events-none z-10" />

      {/* Content Layer */}
      <div className="relative z-20 max-w-5xl mx-auto space-y-6">
        {/* Editorial Tag */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.12] backdrop-blur-2xl text-xs text-zinc-300 shadow-2xl">
          <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
          <span className="font-tech text-white tracking-widest font-semibold uppercase">НАБОР 2026</span>
          <span className="text-zinc-600">/</span>
          <span className="text-zinc-300">Официальный резидент IT Park</span>
          <span className="text-zinc-200 font-tech text-[11px] px-2 py-0.5 rounded bg-white/[0.08] border border-white/20">
            6 мест
          </span>
        </div>

        {/* Avant-Garde Editorial Headline */}
        <div className="space-y-3">
          <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl font-black uppercase tracking-tight text-white leading-[0.92]">
            ВОСТРЕБОВАННЫЙ <br />
            <span className="text-zinc-200">
              IT-ИНЖЕНЕР
            </span>
          </h1>

          <div className="inline-block mt-2">
            <span className="inline-flex items-center gap-2 px-6 py-2 rounded-2xl bg-white text-zinc-950 font-display font-extrabold text-sm sm:text-base tracking-widest uppercase shadow-2xl">
              ЗА 6 МЕСЯЦЕВ С НУЛЯ
            </span>
          </div>

          <p className="max-w-2xl mx-auto text-sm sm:text-base text-zinc-300 font-normal leading-relaxed pt-3">
            Программы подготовки разработчиков, AI-инженеров и дизайнеров.
            Обучение через симуляцию реальной работы <span className="font-editorial-italic text-white text-xl sm:text-2xl">в продуктовых командах BigTech</span>.
          </p>
        </div>

        {/* ─── 3D Rotating Skill Ribbon ─── */}
        <div className="relative py-7 ribbon-container max-w-4xl mx-auto overflow-hidden">
          {/* Upper ribbon track */}
          <div 
            className="flex items-center gap-4 animate-marquee whitespace-nowrap opacity-90 transition-transform duration-500 ease-out"
            style={{
              transform: `perspective(600px) rotateX(${mousePos.y * 0.3}deg) rotateY(${mousePos.x * 0.3}deg)`,
            }}
          >
            {[...skillsTrack1, ...skillsTrack1].map((skill, idx) => (
              <span
                key={idx}
                className="px-4 py-1.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-xs font-tech font-bold tracking-wider text-zinc-300 backdrop-blur-md shadow-lg"
              >
                {skill}
              </span>
            ))}
          </div>

          {/* Lower ribbon track with offset */}
          <div 
            className="flex items-center gap-4 animate-marquee whitespace-nowrap mt-3 opacity-75"
            style={{
              animationDirection: 'reverse',
              animationDuration: '40s',
            }}
          >
            {[...skillsTrack2, ...skillsTrack2].map((skill, idx) => (
              <span
                key={idx}
                className="px-4 py-1.5 rounded-xl bg-white/[0.02] border border-white/[0.06] text-xs font-tech font-medium tracking-wider text-zinc-400 backdrop-blur-md"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
          <button
            onClick={onOpenApply}
            className="btn-shimmer w-full sm:w-auto px-8 py-4 rounded-xl bg-white hover:bg-zinc-200 text-zinc-950 font-tech font-bold text-xs uppercase tracking-widest transition-all shadow-xl active:scale-95 flex items-center justify-center gap-2"
          >
            <span>Записаться на открытый урок</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onOpenQuiz}
            className="w-full sm:w-auto px-7 py-4 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.12] text-zinc-200 font-tech font-semibold text-xs tracking-wider transition-all flex items-center justify-center gap-2 hover:border-white/25 active:scale-95"
          >
            <Compass className="w-4 h-4 text-zinc-300" />
            <span>Тест: «Моя профессия в IT»</span>
          </button>
        </div>

        {/* Minimalist Monochrome Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-8 max-w-3xl mx-auto text-left">
          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
            <div className="text-xl font-tech font-bold text-white">94%</div>
            <div className="text-[11px] text-zinc-400 mt-0.5">Трудоустройство в договоре</div>
          </div>
          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
            <div className="text-xl font-tech font-bold text-zinc-200">4 500+</div>
            <div className="text-[11px] text-zinc-400 mt-0.5">Выпускников за 5 лет</div>
          </div>
          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
            <div className="text-xl font-tech font-bold text-white">$1,450</div>
            <div className="text-[11px] text-zinc-400 mt-0.5">Средний оклад Middle</div>
          </div>
          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
            <div className="text-xl font-tech font-bold text-zinc-200">0%</div>
            <div className="text-[11px] text-zinc-400 mt-0.5">Переплат в рассрочку</div>
          </div>
        </div>
      </div>
    </div>
  );
}
