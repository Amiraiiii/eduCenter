'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Search, 
  Code2, 
  Clock, 
  Briefcase, 
  CheckCircle2, 
  Star, 
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  ChevronDown,
  Layers,
  Banknote
} from 'lucide-react';
import { COURSES, Course } from '@/data/courses';
import ApplicationModal from '@/components/ApplicationModal';

export default function CoursesPage() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [expandedSyllabus, setExpandedSyllabus] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState('frontend-react');

  const categories = [
    { id: 'all', label: 'Все программы' },
    { id: 'frontend', label: 'Frontend & Web' },
    { id: 'ai', label: 'Python & AI' },
    { id: 'design', label: 'UI/UX Design' },
    { id: 'backend', label: 'Backend & Cloud' },
    { id: 'qa', label: 'QA Testing' },
  ];

  const filtered = COURSES.filter((c) => {
    const matchesCategory = activeCategory === 'all' || c.category === activeCategory;
    const matchesSearch = 
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.skills.some((s) => s.toLowerCase().includes(search.toLowerCase())) ||
      c.shortDesc.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleSyllabus = (id: string) => {
    setExpandedSyllabus(expandedSyllabus === id ? null : id);
  };

  const handleOpenApply = (id: string) => {
    setSelectedCourseId(id);
    setModalOpen(true);
  };

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="max-w-3xl mb-12 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-mono">
          <Code2 className="w-3.5 h-3.5" />
          <span>Каталог курсов 2026</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Программы профессиональной подготовки в IT
        </h1>
        <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
          Освойте профессию с нуля или повысьте квалификацию под руководством практикующих Senior-инженеров. Все курсы включают работу над портфолио и подготовку к собеседованиям.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8">
        {/* Category tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-medium transition-all whitespace-nowrap ${
                activeCategory === cat.id
                  ? 'bg-cyan-500 text-zinc-950 font-semibold shadow-md shadow-cyan-500/20'
                  : 'bg-white/[0.03] border border-white/[0.06] text-zinc-400 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Поиск по стеку (React, AI, Figma...)"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/[0.04] border border-white/10 focus:border-cyan-500 text-white text-xs outline-none transition-colors placeholder:text-zinc-500"
          />
        </div>
      </div>

      {/* Courses List */}
      <div className="space-y-6">
        {filtered.map((course: Course) => (
          <div
            key={course.id}
            id={course.id}
            className="rounded-3xl bg-[#0e1017] border border-white/[0.08] p-6 sm:p-8 hover:border-cyan-500/25 transition-all shadow-xl"
          >
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
              <div className="space-y-4 max-w-3xl">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-white/[0.05] border border-white/[0.08] text-zinc-300">
                    {course.categoryLabel}
                  </span>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 font-medium">
                    {course.level}
                  </span>
                  {course.badge && (
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-medium">
                      {course.badge}
                    </span>
                  )}
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  <Link href={`/courses/${course.id}`} className="hover:text-cyan-400 transition-colors">
                    {course.title}
                  </Link>
                </h3>

                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                  {course.fullDesc}
                </p>

                {/* Skills tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {course.skills.map((s, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] px-2.5 py-1 rounded-lg bg-white/[0.03] border border-white/[0.06] text-zinc-300"
                    >
                      {s}
                    </span>
                  ))}
                </div>

                {/* Metadata Row */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2 text-xs text-zinc-400">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-cyan-400" />
                    <span>Длительность: <strong className="text-white">{course.duration}</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-blue-400" />
                    <span>Проекты: <strong className="text-white">{course.projectsCount} в резюме</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Banknote className="w-4 h-4 text-emerald-400" />
                    <span>Зарплата: <strong className="text-emerald-400">{course.salaryExpectation}</strong></span>
                  </div>
                </div>
              </div>

              {/* Pricing & CTA Card */}
              <div className="lg:w-72 rounded-2xl bg-white/[0.02] border border-white/[0.06] p-5 flex flex-col justify-between shrink-0 space-y-4">
                <div>
                  <span className="text-[11px] text-zinc-400 block mb-1">Стоимость обучения</span>
                  <div className="text-xl font-bold text-white font-mono">{course.monthlyPrice}</div>
                  <div className="text-[11px] text-zinc-400 mt-1">или {course.price} при полной оплате (-10%)</div>
                </div>

                <div className="space-y-2">
                  <button
                    onClick={() => handleOpenApply(course.id)}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-xs tracking-wide transition-all shadow-md shadow-cyan-500/20"
                  >
                    Записаться на курс
                  </button>

                  <Link
                    href={`/courses/${course.id}`}
                    className="w-full py-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/15 border border-cyan-500/20 text-cyan-400 text-xs font-medium transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>Подробнее о курсе</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>

                  <button
                    onClick={() => toggleSyllabus(course.id)}
                    className="w-full py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-zinc-300 text-xs font-medium transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>{expandedSyllabus === course.id ? 'Скрыть программу' : 'Быстрый план'}</span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform ${expandedSyllabus === course.id ? 'rotate-180' : ''}`} />
                  </button>
                </div>
              </div>
            </div>

            {/* Expandable Syllabus */}
            {expandedSyllabus === course.id && (
              <div className="mt-6 pt-6 border-t border-white/[0.08] space-y-3 animate-in fade-in duration-200">
                <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-400 flex items-center gap-2 mb-3">
                  <Layers className="w-4 h-4" />
                  <span>Пошаговый учебный план курса</span>
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {course.syllabus.map((mod, i) => (
                    <div key={i} className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.05] space-y-1">
                      <div className="text-xs font-bold text-white">{mod.title}</div>
                      <div className="text-[11px] text-zinc-400 leading-relaxed">{mod.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="py-16 text-center text-zinc-400 space-y-2">
            <p className="text-sm">Ничего не найдено по запросу «{search}»</p>
            <button
              onClick={() => { setSearch(''); setActiveCategory('all'); }}
              className="text-xs text-cyan-400 hover:underline"
            >
              Сбросить фильтры
            </button>
          </div>
        )}
      </div>

      <ApplicationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        defaultCourseId={selectedCourseId}
      />
    </div>
  );
}
