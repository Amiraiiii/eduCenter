'use client';

import React, { useState } from 'react';
import { 
  Sliders, 
  ShieldCheck, 
  Boxes
} from 'lucide-react';

interface InspectorCard {
  id: string;
  title: string;
  category: string;
  position: 'top-left' | 'bottom-left' | 'top-right' | 'bottom-right' | 'bottom-center';
  params: { label: string; value: string }[];
  highlight: string;
}

export default function SkillAnatomyBlueprint() {
  const [activeCard, setActiveCard] = useState<string>('frontend');

  const cards: InspectorCard[] = [
    {
      id: 'frontend',
      title: 'Frontend Architecture',
      category: 'React 19 & Next.js 16',
      position: 'top-left',
      params: [
        { label: 'Rendering', value: 'PPR + Server Components' },
        { label: 'Style Engine', value: 'Tailwind CSS v4' },
        { label: 'State Sync', value: 'Zustand + React Query' },
        { label: 'Lighthouse', value: '98 / 100 Performance' },
      ],
      highlight: 'Чистая компонентная архитектура без лишних ререндеров',
    },
    {
      id: 'ai',
      title: 'AI & RAG Engine',
      category: 'Python 3.12 & LangChain',
      position: 'top-right',
      params: [
        { label: 'LLM Gateway', value: 'Gemini 3.5 & OpenAI' },
        { label: 'Vector Store', value: 'ChromaDB / Pinecone' },
        { label: 'Chunking', value: 'Semantic Recursive' },
        { label: 'Latency', value: '< 650 ms streaming' },
      ],
      highlight: 'Интеллектуальный поиск по корпоративным базам знаний',
    },
    {
      id: 'backend',
      title: 'Highload Backend',
      category: 'Go & Microservices',
      position: 'bottom-left',
      params: [
        { label: 'Protocol', value: 'gRPC + Protobuf' },
        { label: 'Concurrency', value: 'Go Goroutines' },
        { label: 'Message Broker', value: 'Apache Kafka' },
        { label: 'Target RPS', value: '15 000+ req/sec' },
      ],
      highlight: 'Отказоустойчивая микросервисная шина для финтеха',
    },
    {
      id: 'design',
      title: 'Design Tokens & CJM',
      category: 'Figma Pro System',
      position: 'bottom-right',
      params: [
        { label: 'Variables', value: 'Light / Dark Mode' },
        { label: 'Layout Grid', value: '8pt Fluid Scaled' },
        { label: 'Interaction', value: 'Micro-Animations' },
        { label: 'Accessibility', value: 'WCAG AAA Compliant' },
      ],
      highlight: 'Дизайн-система из 400+ синхронизированных токенов',
    },
  ];

  return (
    <div className="relative rounded-3xl inspector-card p-6 sm:p-12 overflow-hidden shadow-2xl select-none border border-white/10 bg-[#07090e]/70 backdrop-blur-2xl">
      {/* ─── Ambient Cosmic Mist & Ethereal Core Glow (Туман и свечение) ─── */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Core Volumetric Nebula Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(255,255,255,0.08)_0%,rgba(200,215,240,0.03)_40%,transparent_70%)] blur-2xl pointer-events-none" />
        {/* Top & Bottom Atmospheric Mist Plumes */}
        <div className="absolute -top-24 left-1/4 w-96 h-96 bg-white/[0.03] rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 right-1/4 w-96 h-96 bg-white/[0.03] rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Editorial Header */}
      <div className="relative z-10 text-center max-w-2xl mx-auto space-y-2 mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-tech text-zinc-300">
          <Sliders className="w-3.5 h-3.5 text-zinc-300" />
          <span>Анатомия инженерного стека EduCenter</span>
        </div>
        <h3 className="font-display text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          Как устроен современный цифровой продукт
        </h3>
        <p className="text-xs sm:text-sm text-zinc-400">
          Вместо поверхностной теории вы собираете каждый слой реального продакшена по стандартам BigTech.
        </p>
      </div>

      {/* Main Interactive Stage */}
      <div className="relative min-h-[520px] flex items-center justify-center">
        {/* Concentric Cosmic Orbital Rings behind Core */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[320px] h-[320px] rounded-full border border-white/[0.08] border-dashed animate-[spin_60s_linear_infinite]" />
          <div className="absolute w-[440px] h-[440px] rounded-full border border-white/[0.05] animate-[spin_90s_linear_infinite_reverse]" />
          <div className="absolute w-[560px] h-[560px] rounded-full border border-white/[0.03] border-dashed" />
        </div>

        {/* Central Frosted Glass Core */}
        <div className="relative z-10 w-44 sm:w-56 h-44 sm:h-56 rounded-3xl bg-white/[0.03] backdrop-blur-3xl border border-white/20 p-6 flex flex-col items-center justify-center text-center shadow-2xl transition-all duration-500 hover:border-white/40">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-white/10 via-transparent to-white/5 pointer-events-none" />

          <div className="w-12 h-12 rounded-2xl bg-white/[0.06] border border-white/[0.12] flex items-center justify-center text-white mb-3 shadow-inner">
            <Boxes className="w-6 h-6" />
          </div>

          <div className="font-tech text-xs font-bold text-white tracking-widest">
            PRODUCT CORE
          </div>
          <div className="text-[10px] text-zinc-400 font-tech mt-0.5">
            EduCenter Architecture
          </div>

          <div className="mt-3 px-3 py-1 rounded-full bg-white/[0.06] border border-white/20 text-[10px] font-tech text-zinc-200 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            <span>Production Ready</span>
          </div>
        </div>

        {/* Floating Inspector Cards (Around Core) */}
        <div className="absolute inset-0 pointer-events-none grid grid-cols-1 md:grid-cols-2 gap-6 p-2 sm:p-4">
          {cards.map((card) => {
            const isSelected = activeCard === card.id;
            return (
              <div
                key={card.id}
                onClick={() => setActiveCard(card.id)}
                className={`pointer-events-auto inspector-card rounded-2xl p-4 sm:p-5 cursor-pointer max-w-sm transition-all duration-300 ${
                  card.position.includes('right') ? 'md:ml-auto' : 'md:mr-auto'
                } ${
                  isSelected
                    ? 'border-white/40 shadow-2xl ring-1 ring-white/25 scale-[1.02]'
                    : 'opacity-85 hover:opacity-100'
                }`}
              >
                {/* Inspector Window Header */}
                <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-white/[0.08]">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-zinc-400" />
                    <span className="text-[11px] font-tech font-bold text-white tracking-wider uppercase">
                      {card.title}
                    </span>
                  </div>
                  <span className="text-[10px] font-tech px-2 py-0.5 rounded bg-white/[0.05] text-zinc-300 border border-white/[0.08]">
                    {card.category}
                  </span>
                </div>

                {/* Technical Parameters Table */}
                <div className="space-y-1.5 text-[11px] font-tech">
                  {card.params.map((p, idx) => (
                    <div key={idx} className="flex justify-between items-center text-zinc-400">
                      <span>{p.label}:</span>
                      <span className="text-zinc-200 font-medium">{p.value}</span>
                    </div>
                  ))}
                </div>

                {/* Highlight note */}
                <div className="mt-3 pt-2.5 border-t border-white/[0.06] text-[10px] text-zinc-300 font-medium">
                  → {card.highlight}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Summary Bar */}
      <div className="mt-8 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400 font-tech">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-white" />
          <span>Каждый модуль валидирован действующими техлидами индустрии</span>
        </div>
        <div className="text-[11px] text-zinc-400">
          Стек актуализирован под требования 2026 года
        </div>
      </div>
    </div>
  );
}
