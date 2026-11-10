'use client';

import React, { useState } from 'react';
import { CheckCircle2, FolderGit2 } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  courseTitle: string;
  author: string;
  hiredAt: string;
  description: string;
  stack: string[];
  metrics: string;
}

const PROJECTS: Project[] = [
  {
    id: 'fintech_app',
    title: 'Fintech Micro-Investments & P2P Platform',
    courseTitle: 'Frontend (React & Next.js)',
    author: 'Сардор Исаев',
    hiredAt: 'Junior Frontend в Uzum',
    description: 'Веб-приложение для быстрых переводов и инвестиций с интерактивными графиками, поддержкой карт Humo/Uzcard и биометрической авторизацией.',
    stack: ['React 19', 'Next.js App Router', 'Tailwind CSS', 'TypeScript', 'Chart.js'],
    metrics: 'Выдерживает 5 000 онлайн пользователей, 99 Lighthouse Score',
  },
  {
    id: 'ai_rag_support',
    title: 'Enterprise RAG Customer Support Hub',
    courseTitle: 'Python & AI Engineering',
    author: 'Мадина Рахимова',
    hiredAt: 'AI Developer в Click',
    description: 'Автономный AI-ассистент для службы поддержки банка, индексирующий 20 000+ страниц корпоративной документации и отвечающий на 3 языках.',
    stack: ['Python 3.12', 'FastAPI', 'ChromaDB', 'LangChain', 'Gemini API', 'Docker'],
    metrics: '91% точность ответов, сокращение нагрузки на операторов на 45%',
  },
  {
    id: 'highload_backend',
    title: 'High-Throughput Order Processing Engine',
    courseTitle: 'Backend на Go (Golang)',
    author: 'Бобур Шарипов',
    hiredAt: 'Backend Go Engineer в TBC Bank',
    description: 'Микросервисный бэкенд службы экспресс-доставки с асинхронными очередями событий, распределёнными блокировками и кэшированием.',
    stack: ['Go (Golang)', 'gRPC & Protobuf', 'PostgreSQL', 'Apache Kafka', 'Redis'],
    metrics: '12 000 RPS при p99 задержке менее 15 мс',
  },
  {
    id: 'design_system',
    title: 'E-commerce SuperApp Design System',
    courseTitle: 'UI/UX & Product Design',
    author: 'Камила Турсунова',
    hiredAt: 'Product Designer в EPAM',
    description: 'Масштабируемая дизайн-система из 400+ компонентов с Auto Layout, переменными токенами для тёмной/светлой темы и полным CJM прототипом.',
    stack: ['Figma Pro', 'Variables & Tokens', 'Design System', 'User Research', 'Behance'],
    metrics: '3 200+ просмотров на Behance, награда Product Design Award',
  },
];

export default function StudentProjectsShowcase() {
  const [activeProjectId, setActiveProjectId] = useState(PROJECTS[0].id);

  const activeProject = PROJECTS.find((p) => p.id === activeProjectId) || PROJECTS[0];

  return (
    <div className="relative rounded-3xl inspector-card p-6 sm:p-10 shadow-2xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-8 border-b border-white/[0.08] gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs text-zinc-300 font-tech mb-2">
            <FolderGit2 className="w-3.5 h-3.5 text-zinc-300" />
            <span>Реальные портфолио выпускников</span>
          </div>
          <h3 className="font-display text-xl sm:text-3xl font-black text-white tracking-tight">
            Дипломные проекты <br className="hidden sm:inline" />
            <span className="font-editorial-italic font-normal text-zinc-300 text-2xl sm:text-3xl">
              студентов EduCenter
            </span>
          </h3>
          <p className="text-xs text-zinc-400 mt-1 max-w-xl font-tech">
            Каждый студент заканчивает курс не абстрактной теорией, а коммерческим кейсом, за который работодатели готовы бороться.
          </p>
        </div>

        <span className="text-xs font-tech text-zinc-500">
          Все проекты защищаются перед техлидами партнеров
        </span>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto py-6 no-scrollbar border-b border-white/[0.06] font-tech">
        {PROJECTS.map((p) => (
          <button
            key={p.id}
            onClick={() => setActiveProjectId(p.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              activeProjectId === p.id
                ? 'bg-white text-zinc-950 shadow-md'
                : 'bg-white/[0.02] border border-white/[0.06] text-zinc-400 hover:text-white hover:bg-white/[0.05]'
            }`}
          >
            {p.courseTitle}
          </button>
        ))}
      </div>

      {/* Project Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8">
        <div className="lg:col-span-8 space-y-5">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-tech text-zinc-300">
              <span>{activeProject.courseTitle}</span>
              <span className="text-zinc-600">•</span>
              <span className="text-zinc-400">{activeProject.author}</span>
            </div>
            <h4 className="font-display text-2xl font-black text-white tracking-tight">
              {activeProject.title}
            </h4>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed pt-1 font-tech">
              {activeProject.description}
            </p>
          </div>

          <div>
            <span className="text-xs font-tech text-zinc-400 uppercase tracking-widest block mb-2.5">
              Использованный стек:
            </span>
            <div className="flex flex-wrap gap-2">
              {activeProject.stack.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-lg bg-white/[0.03] border border-white/[0.08] text-xs text-zinc-200 font-tech"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-white animate-pulse shrink-0" />
            <div className="text-xs text-zinc-300 font-tech">
              <span className="font-semibold text-white">Результат защиты: </span>
              {activeProject.metrics}
            </div>
          </div>
        </div>

        {/* Right Author Badge */}
        <div className="lg:col-span-4 p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <span className="text-xs font-tech text-zinc-400 uppercase tracking-widest block">
              Трудоустройство автора:
            </span>

            <div>
              <div className="font-display text-lg font-bold text-white">
                {activeProject.author}
              </div>
              <div className="text-xs text-zinc-300 font-medium mt-0.5 font-tech">
                {activeProject.hiredAt}
              </div>
            </div>

            <p className="text-xs text-zinc-400 leading-relaxed pt-2 border-t border-white/[0.06] font-tech">
              Получил оффер на 5-м месяце обучения после прохождения технического скрининга с карьерным центром.
            </p>
          </div>

          <div className="inline-flex items-center gap-1.5 text-xs text-zinc-300 font-tech">
            <CheckCircle2 className="w-3.5 h-3.5 text-white" />
            <span>Верифицированный выпускник EduCenter</span>
          </div>
        </div>
      </div>
    </div>
  );
}
