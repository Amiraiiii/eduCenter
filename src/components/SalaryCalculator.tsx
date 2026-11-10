'use client';

import React, { useState } from 'react';
import { 
  TrendingUp, 
  Check, 
  Building2, 
  ArrowUpRight 
} from 'lucide-react';

interface CareerLevel {
  grade: 'Junior' | 'Middle' | 'Senior';
  period: string;
  salaryUsd: string;
  salaryUzs: string;
  description: string;
  skills: string[];
  companies: string[];
}

interface DisciplineData {
  id: string;
  name: string;
  icon: string;
  levels: CareerLevel[];
}

const DISCIPLINES: DisciplineData[] = [
  {
    id: 'frontend',
    name: 'Frontend (React/Next)',
    icon: '💻',
    levels: [
      {
        grade: 'Junior',
        period: '0–1 год опыта',
        salaryUsd: '$700 – $1,100',
        salaryUzs: '8 800 000 – 13 800 000 сум',
        description: 'Вёрстка адаптивных интерфейсов, SPA на React 19, работа с REST API и Git.',
        skills: ['HTML5/Tailwind', 'JavaScript ES6+', 'React 19', 'Next.js', 'Git Flow'],
        companies: ['Uzum Market', 'Click', 'Payme', 'IT Park Startups'],
      },
      {
        grade: 'Middle',
        period: '1.5–3 года опыта',
        salaryUsd: '$1,300 – $2,200',
        salaryUzs: '16 300 000 – 27 500 000 сум',
        description: 'Сложные веб-приложения, оптимизация Core Web Vitals, SSR/PPR, Redux/Zustand.',
        skills: ['TypeScript', 'Next.js App Router', 'State Management', 'CI/CD Pipelines'],
        companies: ['EPAM Systems', 'TBC Bank', 'Beeline Digital', 'Outsource EU'],
      },
      {
        grade: 'Senior',
        period: '3–5+ лет опыта',
        salaryUsd: '$2,500 – $4,200',
        salaryUzs: '31 000 000 – 52 500 000 сум',
        description: 'Архитектура микрофронтендов, руководство командами, менторинг, дизайн-системы.',
        skills: ['Micro-frontends', 'Architecture Design', 'Performance Audit', 'Team Leadership'],
        companies: ['Международные IT-хабы', 'Global Remote', 'Silicon Valley Startups'],
      },
    ],
  },
  {
    id: 'python_ai',
    name: 'Python & AI Engineering',
    icon: '🤖',
    levels: [
      {
        grade: 'Junior',
        period: '0–1 год опыта',
        salaryUsd: '$800 – $1,200',
        salaryUzs: '10 000 000 – 15 000 000 сум',
        description: 'Парсинг данных, скрипты автоматизации, базовые боты Telegram, FastAPI бэкенды.',
        skills: ['Python 3.12', 'FastAPI & SQLModel', 'PostgreSQL', 'Telegram API / Docker'],
        companies: ['Fintech AI', 'Uzum Ecosystem', 'Digital Agencies'],
      },
      {
        grade: 'Middle',
        period: '1.5–3 года опыта',
        salaryUsd: '$1,500 – $2,600',
        salaryUzs: '18 800 000 – 32 500 000 сум',
        description: 'Векторные базы данных, автономные LLM-агенты, LangChain, микросервисы.',
        skills: ['Chroma/Pinecone', 'LangChain/LlamaIndex', 'Async Python', 'Redis/Kafka'],
        companies: ['EPAM Systems', 'Exadel', 'Yandex Central Asia'],
      },
      {
        grade: 'Senior',
        period: '3–5+ лет опыта',
        salaryUsd: '$3,000 – $5,500',
        salaryUzs: '37 500 000 – 68 000 000 сум',
        description: 'AI-архитектура, дообучение LLM (LoRA/Fine-tuning), распределённые MLOps конвейеры.',
        skills: ['MLOps Architecture', 'Fine-Tuning', 'Distributed Systems', 'Kubernetes'],
        companies: ['US/EU Remote AI Startups', 'Enterprise Banks', 'AI Research Labs'],
      },
    ],
  },
  {
    id: 'backend_go',
    name: 'Backend Go (Golang)',
    icon: '⚡',
    levels: [
      {
        grade: 'Junior',
        period: '0–1 год опыта',
        salaryUsd: '$900 – $1,300',
        salaryUzs: '11 300 000 – 16 300 000 сум',
        description: 'REST/gRPC микросервисы, структуры данных Go, написание SQL запросов, Docker.',
        skills: ['Go Goroutines', 'gRPC & Protobuf', 'PostgreSQL', 'Docker'],
        companies: ['Fintech Cloud', 'Payme', 'Uzum Bank'],
      },
      {
        grade: 'Middle',
        period: '1.5–3 года опыта',
        salaryUsd: '$1,800 – $3,000',
        salaryUzs: '22 500 000 – 37 500 000 сум',
        description: 'Высоконагруженные очереди Kafka, кэширование Redis, отказоустойчивость.',
        skills: ['Apache Kafka', 'Redis Caching', 'Event-Driven Arch', 'CI/CD'],
        companies: ['TBC Bank Group', 'InDrive', 'Crypto & Web3 Platforms'],
      },
      {
        grade: 'Senior',
        period: '3–5+ лет опыта',
        salaryUsd: '$3,500 – $6,000',
        salaryUzs: '43 800 000 – 75 000 000 сум',
        description: 'Highload архитектура (100k+ RPS), транзакционная целостность, Cloud Native.',
        skills: ['Highload 100k+ RPS', 'Distributed Transactions', 'Kubernetes', 'System Design'],
        companies: ['Международные банки', 'Global SaaS', 'Top European Tech'],
      },
    ],
  },
  {
    id: 'ui_ux',
    name: 'UI/UX & Product Design',
    icon: '🎨',
    levels: [
      {
        grade: 'Junior',
        period: '0–1 год опыта',
        salaryUsd: '$600 – $1,000',
        salaryUzs: '7 500 000 – 12 500 000 сум',
        description: 'Вёрстка экранов в Figma, работа с компонентами, адаптивные мобильные макеты.',
        skills: ['Figma Pro', 'Auto Layout', 'UI Kits', 'Behance Portfolio'],
        companies: ['Digital Agencies', 'Click', 'Uzum Ecosystem'],
      },
      {
        grade: 'Middle',
        period: '1.5–3 года опыта',
        salaryUsd: '$1,200 – $2,000',
        salaryUzs: '15 000 000 – 25 000 000 сум',
        description: 'Анализ пользовательского пути (CJM), дизайн-системы с переменными, UX тесты.',
        skills: ['Design Systems', 'User Research / CJM', 'Interactive Prototypes', 'Analytics'],
        companies: ['TBC Bank', 'EPAM Digital', 'Mad Devs Agency'],
      },
      {
        grade: 'Senior',
        period: '3–5+ лет опыта',
        salaryUsd: '$2,200 – $3,800',
        salaryUzs: '27 500 000 – 47 500 000 сум',
        description: 'Продуктовое лидерство, влияние на конверсию бизнеса, дизайн-стратегия.',
        skills: ['Product Strategy', 'Design Leadership', 'Data-Driven UX', 'Global Branding'],
        companies: ['Международные IT-продукты', 'Fintech Giants', 'Silicon Valley Remote'],
      },
    ],
  },
  {
    id: 'qa',
    name: 'QA Automation Engineer',
    icon: '🧪',
    levels: [
      {
        grade: 'Junior',
        period: '0–1 год опыта',
        salaryUsd: '$600 – $900',
        salaryUzs: '7 500 000 – 11 300 000 сум',
        description: 'Ручное тестирование, составление тест-кейсов и баг-репортов, Postman API.',
        skills: ['Test Cases / Jira', 'Postman API Testing', 'SQL Queries', 'Python Basics'],
        companies: ['Beeline', 'Ucell Digital', 'IT Park Outsourcing'],
      },
      {
        grade: 'Middle',
        period: '1.5–3 года опыта',
        salaryUsd: '$1,100 – $1,800',
        salaryUzs: '13 800 000 – 22 500 000 сум',
        description: 'Автоматизация E2E тестов на Python/JS, интеграция в CI/CD GitHub Actions.',
        skills: ['Playwright', 'PyTest Framework', 'CI/CD Pipelines', 'Performance Testing'],
        companies: ['EPAM Systems', 'TBC Bank', 'Uzum Technologies'],
      },
      {
        grade: 'Senior',
        period: '3–5+ лет опыта',
        salaryUsd: '$2,000 – $3,500',
        salaryUzs: '25 000 000 – 43 800 000 сум',
        description: 'QA архитектура всего проекта, нагрузочное тестирование (k6/JMeter), безопасность.',
        skills: ['QA Strategy', 'Load Testing (k6)', 'Security Scans', 'Infrastructure as Code'],
        companies: ['Global Fintech', 'US Remote Teams', 'Enterprise Software'],
      },
    ],
  },
];

export default function SalaryCalculator() {
  const [selectedDisciplineId, setSelectedDisciplineId] = useState('frontend');
  const [selectedGrade, setSelectedGrade] = useState<'Junior' | 'Middle' | 'Senior'>('Junior');

  const currentDiscipline = DISCIPLINES.find((d) => d.id === selectedDisciplineId) || DISCIPLINES[0];
  const currentLevel = currentDiscipline.levels.find((l) => l.grade === selectedGrade) || currentDiscipline.levels[0];

  return (
    <div className="relative rounded-3xl inspector-card p-6 sm:p-10 shadow-2xl">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-8 border-b border-white/[0.08] gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs text-zinc-300 font-tech mb-2">
            <TrendingUp className="w-3.5 h-3.5 text-zinc-300" />
            <span>Аналитика рынка труда Узбекистана &amp; Remote (2026)</span>
          </div>
          <h3 className="font-display text-xl sm:text-3xl font-black text-white tracking-tight">
            Калькулятор карьеры <br className="hidden sm:inline" />
            <span className="font-editorial-italic font-normal text-zinc-300 text-2xl sm:text-3xl">
              и зарплатной траектории
            </span>
          </h3>
          <p className="text-xs text-zinc-400 mt-1 max-w-xl font-tech">
            Посмотрите, сколько зарабатывают выпускники на разных этапах карьеры и какие навыки требуются для роста.
          </p>
        </div>

        {/* Grade Switcher */}
        <div className="inline-flex p-1 rounded-xl bg-white/[0.04] border border-white/[0.08] self-start md:self-auto font-tech">
          {(['Junior', 'Middle', 'Senior'] as const).map((grade) => (
            <button
              key={grade}
              onClick={() => setSelectedGrade(grade)}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                selectedGrade === grade
                  ? 'bg-white text-zinc-950 shadow-md'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              {grade}
            </button>
          ))}
        </div>
      </div>

      {/* Disciplines horizontal scroll */}
      <div className="flex items-center gap-2 overflow-x-auto py-6 no-scrollbar border-b border-white/[0.06] font-tech">
        {DISCIPLINES.map((d) => (
          <button
            key={d.id}
            onClick={() => setSelectedDisciplineId(d.id)}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${
              selectedDisciplineId === d.id
                ? 'bg-white/[0.1] border border-white/25 text-white shadow-sm'
                : 'bg-white/[0.02] border border-white/[0.06] text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.05]'
            }`}
          >
            <span>{d.icon}</span>
            <span>{d.name}</span>
          </button>
        ))}
      </div>

      {/* Main Stats Display */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8">
        {/* Left Column: Salary Figures */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-tech text-zinc-400 uppercase tracking-widest">
                Ориентировочный доход ({currentLevel.grade})
              </span>
              <span className="text-[11px] px-2.5 py-0.5 rounded bg-white/[0.08] text-zinc-200 font-tech border border-white/20">
                {currentLevel.period}
              </span>
            </div>

            <div>
              <div className="text-3xl sm:text-4xl font-black text-white font-tech tracking-tight">
                {currentLevel.salaryUsd}
                <span className="text-xs text-zinc-400 font-normal ml-2">/ месяц</span>
              </div>
              <div className="text-xs sm:text-sm text-zinc-400 font-tech mt-1">
                ≈ {currentLevel.salaryUzs}
              </div>
            </div>

            <p className="text-xs text-zinc-300 leading-relaxed pt-2 border-t border-white/[0.06] font-tech">
              {currentLevel.description}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center gap-3">
            <Building2 className="w-5 h-5 text-zinc-400 shrink-0" />
            <div className="text-xs text-zinc-400 font-tech">
              <span className="text-white font-medium">Где работают на этом уровне: </span>
              {currentLevel.companies.join(', ')}
            </div>
          </div>
        </div>

        {/* Right Column: Required Skills & Roadmap */}
        <div className="lg:col-span-7 space-y-6">
          <div>
            <span className="text-xs font-tech text-zinc-400 uppercase tracking-widest block mb-3">
              Ключевой стек и требования работодателей:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {currentLevel.skills.map((skill, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center gap-2.5 text-xs text-zinc-200 font-tech"
                >
                  <div className="w-5 h-5 rounded-full bg-white/[0.08] border border-white/20 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <span>{skill}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Guarantee Note */}
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-tech">
            <div className="space-y-0.5">
              <span className="text-xs font-semibold text-white">
                Гарантия трудоустройства в официальном договоре
              </span>
              <p className="text-[11px] text-zinc-400">
                Карьерный центр EduCenter сопровождает каждого выпускника до подписания оффера.
              </p>
            </div>
            <a
              href="/contacts"
              className="text-xs font-semibold text-zinc-200 hover:text-white transition-colors inline-flex items-center gap-1 shrink-0"
            >
              <span>Подробнее о гарантии</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
