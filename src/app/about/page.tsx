import React from 'react';
import Link from 'next/link';
import { 
  Building2, 
  ArrowRight
} from 'lucide-react';

export default function AboutPage() {
  const mentors = [
    {
      name: 'Фаррух Каримов',
      role: 'Lead Frontend Engineer',
      company: 'Uzum Technologies',
      exp: '8 лет опыта',
      stack: 'React, Next.js, TypeScript, Архитектура'
    },
    {
      name: 'Шерзод Алиев',
      role: 'Senior Python & AI Architect',
      company: 'EPAM Systems',
      exp: '10 лет опыта',
      stack: 'FastAPI, LangChain, Highload, LLMs'
    },
    {
      name: 'Дильноза Саидова',
      role: 'Lead Product Designer',
      company: 'Click Fintech',
      exp: '7 лет опыта',
      stack: 'Figma, Дизайн-системы, CJM, UX Research'
    },
    {
      name: 'Жасур Рустамов',
      role: 'Principal Go Engineer',
      company: 'Fintech Cloud',
      exp: '9 лет опыта',
      stack: 'Golang, gRPC, Kafka, Микросервисы'
    }
  ];

  const milestones = [
    { year: '2021', title: 'Основание академии', desc: 'Запуск первого офлайн-кампуса в Ташкенте и первые 50 студентов.' },
    { year: '2022', title: 'Аккредитация IT Park', desc: 'Получение статуса официального резидента IT Park Узбекистана и государственная лицензия.' },
    { year: '2023', title: 'Партнерство с BigTech', desc: 'Заключение договоров о стажировках с Uzum, EPAM, Click и банками.' },
    { year: '2024', title: 'Открытие 2-го кампуса', desc: 'Запуск филиала на Чиланзаре с коворкингом и лабораторией искусственного интеллекта.' },
    { year: '2026', title: 'Запуск AI Hub & RAG', desc: 'Внедрение персонального AI-ассистента и треков по AI Engineering в каждый курс.' },
  ];

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-24">
      {/* Hero */}
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] text-zinc-300 border border-white/[0.08] text-xs font-tech">
          <Building2 className="w-3.5 h-3.5 text-zinc-300" />
          <span>Об академии EduCenter</span>
        </div>
        <h1 className="font-display text-4xl sm:text-6xl font-black text-white tracking-tight uppercase">
          Формируем IT-элиту <br />
          <span className="font-editorial-italic font-normal text-zinc-300 text-3xl sm:text-5xl lowercase">
            Центральной Азии
          </span>
        </h1>
        <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed max-w-2xl font-tech">
          EduCenter создан практикующими инженерами для тех, кто хочет получить реальные навыки разработки, а не сухую академическую теорию. Мы учим работать с современным стеком технологий, мыслить архитектурно и выпускать готовые цифровые продукты.
        </p>
      </div>

      {/* Metrics Bento */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-tech">
        <div className="inspector-card rounded-2xl p-6">
          <span className="text-3xl sm:text-4xl font-black text-white">4 500+</span>
          <p className="text-xs text-zinc-400 mt-2 font-medium">Выпускников работают в индустрии</p>
        </div>
        <div className="inspector-card rounded-2xl p-6">
          <span className="text-3xl sm:text-4xl font-black text-zinc-200">94%</span>
          <p className="text-xs text-zinc-400 mt-2 font-medium">Трудоустройство в течение 3 месяцев</p>
        </div>
        <div className="inspector-card rounded-2xl p-6">
          <span className="text-3xl sm:text-4xl font-black text-white">25+</span>
          <p className="text-xs text-zinc-400 mt-2 font-medium">Компаний-партнеров (Uzum, EPAM, Click)</p>
        </div>
        <div className="inspector-card rounded-2xl p-6">
          <span className="text-3xl sm:text-4xl font-black text-zinc-200">2 Кампуса</span>
          <p className="text-xs text-zinc-400 mt-2 font-medium">В Ташкенте с коворкингами 08:00 - 22:00</p>
        </div>
      </div>

      {/* Methodology */}
      <div className="space-y-8">
        <div>
          <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest block mb-1">
            Образовательный подход
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Принципы обучения в EduCenter
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="inspector-card rounded-3xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center font-mono font-bold text-sm text-white">
              01
            </div>
            <h3 className="text-base font-bold text-white">Проектно-ориентированное обучение</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Никаких абстрактных примеров из учебников 2010 года. Студенты сразу разрабатывают сервисы: маркетплейсы, микросервисы, RAG-системы.
            </p>
          </div>

          <div className="inspector-card rounded-3xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center font-mono font-bold text-sm text-white">
              02
            </div>
            <h3 className="text-base font-bold text-white">Построчное менторское код-ревью</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Менторы проверяют каждый коммит, как в настоящей продуктовой команде, обучая лучшим практикам чистой архитектуры.
            </p>
          </div>

          <div className="inspector-card rounded-3xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center font-mono font-bold text-sm text-white">
              03
            </div>
            <h3 className="text-base font-bold text-white">Официальный Карьерный Центр</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              HR-специалисты готовят резюме, портфолио на GitHub/Behance и организуют закрытые собеседования в компании-партнёры.
            </p>
          </div>
        </div>
      </div>

      {/* Mentors */}
      <div id="mentors" className="space-y-8 scroll-mt-28">
        <div>
          <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest block mb-1">
            Команда экспертов
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Преподаватели — практикующие тимлиды
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mentors.map((mentor, index) => (
            <div
              key={index}
              className="inspector-card rounded-3xl p-6 space-y-4"
            >
              <div className="w-14 h-14 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-lg font-bold text-white font-mono">
                {mentor.name.split(' ').map((n) => n[0]).join('')}
              </div>

              <div>
                <h4 className="text-base font-bold text-white">{mentor.name}</h4>
                <div className="text-xs text-zinc-400 mt-0.5">{mentor.role}</div>
                <div className="text-xs text-zinc-300 font-tech mt-0.5">{mentor.company}</div>
              </div>

              <div className="pt-3 border-t border-white/[0.06] text-xs space-y-1 font-tech">
                <span className="text-[11px] text-zinc-500 block">Опыт: {mentor.exp}</span>
                <span className="text-[11px] text-zinc-400 block line-clamp-2">{mentor.stack}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div className="space-y-8">
        <div>
          <span className="text-xs font-tech text-zinc-400 uppercase tracking-widest block mb-1">
            История развития
          </span>
          <h2 className="font-display text-2xl sm:text-4xl font-black text-white tracking-tight">
            Таймлайн ключевых событий
          </h2>
        </div>

        <div className="space-y-4">
          {milestones.map((item, idx) => (
            <div
              key={idx}
              className="inspector-card rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center gap-4"
            >
              <div className="text-lg font-tech font-bold text-white w-20 shrink-0">
                {item.year}
              </div>
              <div className="space-y-0.5">
                <h4 className="text-sm font-bold text-white">{item.title}</h4>
                <p className="text-xs text-zinc-400">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="inspector-card rounded-3xl p-8 sm:p-12 text-center space-y-4">
        <h3 className="text-2xl sm:text-4xl font-black text-white tracking-tight uppercase">
          Готовы начать обучение <br />
          <span className="font-editorial-italic font-normal text-zinc-300 text-xl sm:text-3xl lowercase">
            в академии EduCenter?
          </span>
        </h3>
        <p className="text-xs sm:text-sm text-zinc-400 max-w-xl mx-auto">
          Приходите на бесплатный открытый урок в кампус или подключитесь онлайн.
        </p>
        <div className="pt-2">
          <Link
            href="/courses"
            className="btn-shimmer inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white hover:bg-zinc-200 text-zinc-950 font-bold text-xs uppercase tracking-wider transition-all shadow-md active:scale-95"
          >
            <span>Выбрать курс в каталоге</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
