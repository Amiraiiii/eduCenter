'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowRight, 
  Sparkles, 
  Code2, 
  Cpu, 
  Palette, 
  Server, 
  ShieldCheck, 
  Briefcase, 
  Clock, 
  Star, 
  CheckCircle2, 
  ChevronRight,
  GraduationCap,
  Users2,
  Building2,
  Award
} from 'lucide-react';
import HeroCanvas from '@/components/HeroCanvas';
import ApplicationModal from '@/components/ApplicationModal';
import { COURSES, Course } from '@/data/courses';

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState<string>('frontend-react');

  const filteredCourses = selectedCategory === 'all'
    ? COURSES
    : COURSES.filter((c) => c.category === selectedCategory);

  const openApplyFor = (courseId: string) => {
    setSelectedCourseId(courseId);
    setModalOpen(true);
  };

  const categories = [
    { id: 'all', label: 'Все направления' },
    { id: 'frontend', label: 'Frontend' },
    { id: 'ai', label: 'Python & AI' },
    { id: 'design', label: 'UI/UX Design' },
    { id: 'backend', label: 'Backend Go' },
    { id: 'qa', label: 'QA Testing' },
  ];

  return (
    <div className="relative overflow-hidden pt-24 pb-16">
      {/* ─── Hero Section ─── */}
      <section className="relative min-h-[85vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
        <HeroCanvas />

        {/* Ambient background glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative max-w-5xl mx-auto text-center space-y-8 z-10 py-12">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-md text-xs text-zinc-300 shadow-xl">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="font-mono text-cyan-400">EduCenter 2026</span>
            <span className="text-zinc-500">•</span>
            <span>Набор на весенний поток открыт</span>
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
            Станьте востребованным <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500 bg-clip-text text-transparent">
              IT-специалистом
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-sm sm:text-base text-zinc-400 leading-relaxed font-normal">
            Практическое обучение программированию, искусственному интеллекту и дизайну. Реальные проекты для портфолио, кураторство Senior-менторов и гарантия трудоустройства в договоре.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={() => openApplyFor('frontend-react')}
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-sm transition-all shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:-translate-y-0.5 flex items-center justify-center gap-2 group"
            >
              <span>Записаться на открытый урок</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <Link
              href="/courses"
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-zinc-200 font-semibold text-sm transition-all flex items-center justify-center gap-2"
            >
              <span>Каталог курсов</span>
            </Link>
          </div>

          {/* Metrics bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-12 max-w-4xl mx-auto">
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-sm">
              <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">94%</div>
              <div className="text-xs text-zinc-400 mt-1">Трудоустройство выпускников</div>
            </div>
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-sm">
              <div className="text-2xl sm:text-3xl font-extrabold text-cyan-400 font-mono">4 500+</div>
              <div className="text-xs text-zinc-400 mt-1">Выпускников за 5 лет</div>
            </div>
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-sm">
              <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">25+</div>
              <div className="text-xs text-zinc-400 mt-1">IT-партнеров (Uzum, EPAM)</div>
            </div>
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-sm">
              <div className="text-2xl sm:text-3xl font-extrabold text-blue-400 font-mono">IT Park</div>
              <div className="text-xs text-zinc-400 mt-1">Официальный резидент</div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Courses Catalog Section ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono uppercase tracking-wider mb-2">
              <Code2 className="w-3.5 h-3.5" />
              <span>Актуальные программы 2026</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Выберите свою специальность
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-2 max-w-xl">
              Программы обновлены под требования работодателей. Обучение ведут практикующие тимлиды и сеньоры.
            </p>
          </div>

          <a
            href="/courses"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            <span>Смотреть все курсы с программой</span>
            <ChevronRight className="w-4 h-4" />
          </a>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-medium transition-all shrink-0 ${
                selectedCategory === cat.id
                  ? 'bg-cyan-500 text-zinc-950 font-semibold shadow-lg shadow-cyan-500/20'
                  : 'bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.06] text-zinc-400 hover:text-zinc-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course: Course) => (
            <div
              key={course.id}
              className="group relative rounded-3xl bg-[#0e1017] border border-white/[0.08] hover:border-cyan-500/30 p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-cyan-500/10"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-white/[0.05] border border-white/[0.08] text-zinc-300">
                    {course.categoryLabel}
                  </span>
                  {course.badge && (
                    <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                      {course.badge}
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors mb-2.5">
                  <Link href={`/courses/${course.id}`} className="hover:underline">
                    {course.title}
                  </Link>
                </h3>

                <p className="text-xs text-zinc-400 leading-relaxed mb-6 line-clamp-3">
                  {course.shortDesc}
                </p>

                {/* Skills tags */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {course.skills.slice(0, 5).map((skill, i) => (
                    <span
                      key={i}
                      className="text-[10px] px-2 py-0.5 rounded-md bg-white/[0.03] text-zinc-400 border border-white/[0.05]"
                    >
                      {skill}
                    </span>
                  ))}
                  {course.skills.length > 5 && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-white/[0.02] text-zinc-400">
                      +{course.skills.length - 5}
                    </span>
                  )}
                </div>
              </div>

              <div className="pt-5 border-t border-white/[0.06] space-y-4">
                <div className="flex items-center justify-between text-xs text-zinc-400">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-blue-400" />
                    <span>{course.projectsCount} проекта в портфолио</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-zinc-400 block">Рассрочка от:</span>
                    <span className="text-sm font-bold text-white font-mono">{course.monthlyPrice}</span>
                  </div>
                  <button
                    onClick={() => openApplyFor(course.id)}
                    className="px-4 py-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500 hover:text-zinc-950 border border-cyan-500/25 text-cyan-400 text-xs font-semibold transition-all"
                  >
                    Записаться
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Methodology & Advantages (Unslop craft) ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-white/[0.06]">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400 uppercase tracking-wider">
            <Award className="w-3.5 h-3.5" />
            <span>Почему студенты выбирают нас</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Стандарты обучения мирового уровня
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400">
            Мы отказались от устаревших лекций и обучаем по системе симуляции реальной работы в IT-компании.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-3xl bg-[#0e1017] border border-white/[0.07] space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center font-mono font-bold text-lg">
              01
            </div>
            <h3 className="text-base font-bold text-white">80% Практики и код-ревью</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Каждое домашнее задание проверяется ментором вручную с подробными комментариями по чистоте архитектуры.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-[#0e1017] border border-white/[0.07] space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center font-mono font-bold text-lg">
              02
            </div>
            <h3 className="text-base font-bold text-white">BigTech Менторы</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Преподают действующие Senior & Lead инженеры из Uzum, EPAM, Click и международных стартапов.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-[#0e1017] border border-white/[0.07] space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center font-mono font-bold text-lg">
              03
            </div>
            <h3 className="text-base font-bold text-white">Гарантия оффера</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Карьерный центр готовит к техническим интервью, формирует резюме и организует собеседования у партнеров.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-[#0e1017] border border-white/[0.07] space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center font-mono font-bold text-lg">
              04
            </div>
            <h3 className="text-base font-bold text-white">Круглосуточный Кампус</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Студенты получают бесплатный доступ в коворкинг с 08:00 до 22:00: чай, кофе, скоростной интернет и комьюнити.
            </p>
          </div>
        </div>
      </section>

      {/* ─── CTA Banner ─── */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="relative rounded-3xl bg-gradient-to-r from-blue-950/60 via-[#111624] to-cyan-950/60 border border-cyan-500/20 p-8 sm:p-12 text-center overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <h2 className="text-2xl sm:text-4xl font-extrabold text-white mb-3">
            Не уверены, какое направление выбрать?
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-lg mx-auto mb-8">
            Пройдите бесплатную 20-минутную консультацию с методистом академии или задайте вопрос нашему AI-ассистенту в правом нижнем углу.
          </p>

          <button
            onClick={() => openApplyFor('frontend-react')}
            className="px-8 py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-bold text-xs uppercase tracking-wider transition-all shadow-xl shadow-cyan-500/20"
          >
            Записаться на бесплатную консультацию
          </button>
        </div>
      </section>

      {/* Application Modal */}
      <ApplicationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        defaultCourseId={selectedCourseId}
      />
    </div>
  );
}
