'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Search, 
  Clock, 
  Briefcase, 
  ArrowRight,
  Sparkles,
  ChevronDown
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
      {/* Editorial Header */}
      <div className="max-w-3xl mb-12 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] text-zinc-300 border border-white/[0.08] text-xs font-tech">
          <Sparkles className="w-3.5 h-3.5 text-zinc-300" />
          <span>Каталог авторизованных программ 2026</span>
        </div>
        <h1 className="font-display text-4xl sm:text-6xl font-black text-white tracking-tight uppercase">
          Практические курсы <br />
          <span className="font-editorial-italic font-normal text-zinc-300 text-3xl sm:text-5xl lowercase">
            для старта в IT-индустрии
          </span>
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-2xl font-tech">
          Каждая программа разработана с участием тимлидов из Uzum, EPAM, Click и TBC. 
          80% времени посвящено созданию коммерческих проектов в портфолио с код-ревью ментора.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 justify-between items-stretch md:items-center">
        {/* Category buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                activeCategory === cat.id
                  ? 'bg-white text-zinc-950 shadow-md'
                  : 'bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] text-zinc-400 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search input */}
        <div className="relative min-w-[260px]">
          <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Поиск по стеку (React, AI, Go...)"
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/[0.03] border border-white/[0.08] text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-white/30 transition-colors font-mono"
          />
        </div>
      </div>

      {/* Course List Grid */}
      <div className="grid grid-cols-1 gap-6">
        {filtered.map((course: Course) => (
          <div
            key={course.id}
            id={course.id}
            className="spotlight-card rounded-3xl p-6 sm:p-8 flex flex-col justify-between"
          >
            <div className="space-y-6">
              {/* Header inside card */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-tech px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-zinc-300">
                    {course.categoryLabel}
                  </span>
                  {course.badge && (
                    <span className="text-xs font-tech font-semibold px-2.5 py-0.5 rounded-full bg-white/[0.08] text-zinc-200 border border-white/20">
                      {course.badge}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-4 text-xs font-mono text-zinc-400">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-zinc-400" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-zinc-400" />
                    <span>{course.projectsCount} проекта в резюме</span>
                  </div>
                </div>
              </div>

              {/* Title & Desc */}
              <div>
                <h2 className="text-2xl sm:text-3xl font-black text-white hover:text-zinc-200 transition-colors tracking-tight">
                  <Link href={`/courses/${course.id}`}>
                    {course.title}
                  </Link>
                </h2>
                <p className="text-xs sm:text-sm text-zinc-400 mt-2 leading-relaxed max-w-4xl">
                  {course.shortDesc}
                </p>
              </div>

              {/* Stats Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
                <div>
                  <span className="text-[10px] text-zinc-500 font-mono uppercase block">Стартовая зарплата</span>
                  <span className="text-xs sm:text-sm font-bold text-white font-mono">{course.salaryExpectation}</span>
                </div>
                <div>
                  <span className="text-[10px] text-zinc-500 font-mono uppercase block">Рассрочка 0%</span>
                  <span className="text-xs sm:text-sm font-bold text-white font-mono">{course.monthlyPrice}</span>
                </div>
                <div>
                  <span className="text-[10px] text-zinc-500 font-mono uppercase block">Единоразово (-10%)</span>
                  <span className="text-xs sm:text-sm font-bold text-zinc-300 font-mono">{course.price}</span>
                </div>
                <div>
                  <span className="text-[10px] text-zinc-500 font-mono uppercase block">Уровень курса</span>
                  <span className="text-xs sm:text-sm font-semibold text-white truncate block">{course.level}</span>
                </div>
              </div>

              {/* Tech Stack Chips */}
              <div>
                <span className="text-[11px] font-mono text-zinc-400 block mb-2 uppercase tracking-wider">Технологии курса:</span>
                <div className="flex flex-wrap gap-1.5">
                  {course.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="text-xs px-2.5 py-1 rounded-md bg-white/[0.03] text-zinc-200 border border-white/[0.06] font-mono"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Accordion Syllabus */}
              <div>
                <button
                  onClick={() => toggleSyllabus(course.id)}
                  className="flex items-center gap-2 text-xs font-semibold text-zinc-300 hover:text-white transition-colors py-2"
                >
                  <span>{expandedSyllabus === course.id ? 'Скрыть программу курса' : 'Посмотреть программу по модулям'}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${expandedSyllabus === course.id ? 'rotate-180' : ''}`} />
                </button>

                {expandedSyllabus === course.id && (
                  <div className="mt-4 pt-4 border-t border-white/[0.06] grid grid-cols-1 md:grid-cols-2 gap-4">
                    {course.syllabus.map((mod, idx) => (
                      <div key={idx} className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] space-y-1.5">
                        <div className="flex items-center justify-between text-xs font-tech">
                          <span className="text-zinc-200 font-semibold">{mod.title}</span>
                        </div>
                        <p className="text-xs text-zinc-400 leading-relaxed">{mod.desc}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-6 mt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-xs font-bold text-white font-mono">
                  {course.instructor?.name ? course.instructor.name.split(' ').map((n: string) => n[0]).join('') : 'EC'}
                </div>
                <div className="text-left">
                  <span className="text-xs font-semibold text-white block">{course.instructor?.name || 'Senior Менторы BigTech'}</span>
                  <span className="text-[11px] text-zinc-400 block">{course.instructor?.role || 'Команда экспертов EduCenter'}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <Link
                  href={`/courses/${course.id}`}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.08] text-xs font-semibold text-zinc-300 text-center transition-all"
                >
                  Подробнее о курсе
                </Link>

                <button
                  onClick={() => handleOpenApply(course.id)}
                  className="btn-shimmer w-full sm:w-auto px-5 py-2.5 rounded-xl bg-white hover:bg-zinc-200 text-zinc-950 text-xs font-bold transition-all shadow-md active:scale-95 text-center flex items-center justify-center gap-1.5 uppercase tracking-wider"
                >
                  <span>Записаться</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Application Modal */}
      <ApplicationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        defaultCourseId={selectedCourseId}
      />
    </div>
  );
}
