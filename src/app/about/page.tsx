import React from 'react';
import { 
  Building2, 
  Award, 
  Users2, 
  Target, 
  Sparkles, 
  CheckCircle2, 
  GraduationCap, 
  Clock, 
  Briefcase,
  MapPin
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
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-mono">
          <Building2 className="w-3.5 h-3.5" />
          <span>Об академии EduCenter</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Формируем будущее IT-индустрии в Центральной Азии
        </h1>
        <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
          EduCenter создан практикующими инженерами для тех, кто хочет получить реальные навыки разработки, а не сухую академическую теорию. Мы учим работать с современным стеком технологий, мыслить архитектурно и выпускать готовые цифровые продукты.
        </p>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="p-6 rounded-3xl bg-[#0e1017] border border-white/[0.08]">
          <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono">4 500+</div>
          <div className="text-xs text-zinc-400 mt-2">Выпускников трудоустроено</div>
        </div>
        <div className="p-6 rounded-3xl bg-[#0e1017] border border-white/[0.08]">
          <div className="text-3xl sm:text-4xl font-extrabold text-cyan-400 font-mono">94%</div>
          <div className="text-xs text-zinc-400 mt-2">Офферов в первые 3 месяца</div>
        </div>
        <div className="p-6 rounded-3xl bg-[#0e1017] border border-white/[0.08]">
          <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono">45+</div>
          <div className="text-xs text-zinc-400 mt-2">Senior-менторов в штате</div>
        </div>
        <div className="p-6 rounded-3xl bg-[#0e1017] border border-white/[0.08]">
          <div className="text-3xl sm:text-4xl font-extrabold text-blue-400 font-mono">2</div>
          <div className="text-xs text-zinc-400 mt-2">Современных кампуса в Ташкенте</div>
        </div>
      </div>

      {/* Mentors Team */}
      <div id="mentors" className="space-y-8">
        <div>
          <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-2">Команда экспертов</div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Действующие практики из индустрии</h2>
          <p className="text-xs text-zinc-400 mt-1">Никаких теоретиков — вас обучают сеньоры, которые ежедневно пишут продакшн-код.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mentors.map((m, idx) => (
            <div key={idx} className="p-6 rounded-3xl bg-[#0e1017] border border-white/[0.08] hover:border-cyan-500/30 transition-all space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500/20 to-blue-600/20 border border-cyan-500/30 text-cyan-400 flex items-center justify-center font-bold text-sm">
                {m.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <h3 className="text-base font-bold text-white">{m.name}</h3>
                <div className="text-xs text-cyan-400">{m.role}</div>
                <div className="text-[11px] text-zinc-400 font-mono mt-0.5">{m.company} • {m.exp}</div>
              </div>
              <p className="text-[11px] text-zinc-400 pt-2 border-t border-white/[0.05]">
                {m.stack}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* History Timeline */}
      <div className="space-y-8">
        <div>
          <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-2">История развития</div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Путь от первых групп до IT-хаба</h2>
        </div>

        <div className="relative pl-6 sm:pl-8 border-l border-white/10 space-y-10">
          {milestones.map((item, i) => (
            <div key={i} className="relative group">
              <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-[#08090d] border-2 border-cyan-400 group-hover:scale-125 transition-transform" />
              <div className="text-xs font-mono text-cyan-400 font-bold">{item.year}</div>
              <h3 className="text-base font-bold text-white mt-0.5">{item.title}</h3>
              <p className="text-xs text-zinc-400 mt-1 max-w-xl leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Campus environment */}
      <div className="rounded-3xl bg-gradient-to-br from-[#0e111a] to-[#0a0c12] border border-white/10 p-8 sm:p-12 space-y-6">
        <div className="max-w-2xl space-y-2">
          <h3 className="text-xl sm:text-2xl font-bold text-white">Атмосфера и кампусы</h3>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Наши филиалы спроектированы так, чтобы студенты чувствовали себя как в офисе технологической компании: скоростной интернет 500 Мбит/с, рабочие станции Apple и мощные ПК, зоны для командных митингов, бесплатный кофе-бар и зоны отдыха с PlayStation.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-zinc-300">
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05] flex items-start gap-3">
            <MapPin className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block mb-0.5">Кампус Руставели (Центральный)</strong>
              <span>ул. Шота Руставели, 45 (м. Ойбек) — 4 этажа, лекторий на 120 мест, коворкинг.</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05] flex items-start gap-3">
            <MapPin className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block mb-0.5">Кампус Чиланзар</strong>
              <span>Квартал 9, дом 14 — лаборатория нейросетей, 6 аудиторий и зона код-хакатона.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
