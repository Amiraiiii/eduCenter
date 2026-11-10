'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Code2, 
  Briefcase, 
  Clock, 
  ChevronRight
} from 'lucide-react';
import HeroEditorialRibbon from '@/components/HeroEditorialRibbon';
import TechMarquee from '@/components/TechMarquee';
import SkillAnatomyBlueprint from '@/components/SkillAnatomyBlueprint';
import StudentRoadmapTrack from '@/components/StudentRoadmapTrack';
import CareerQuiz from '@/components/CareerQuiz';
import SalaryCalculator from '@/components/SalaryCalculator';
import InstallmentCalculator from '@/components/InstallmentCalculator';
import StudentProjectsShowcase from '@/components/StudentProjectsShowcase';
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

  const handleAskAi = (prompt: string) => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('open-ai-chat', { detail: { prompt } }));
    }
  };

  const scrollToQuiz = () => {
    const el = document.getElementById('career-quiz');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const categories = [
    { id: 'all', label: 'Все программы' },
    { id: 'frontend', label: 'Frontend' },
    { id: 'ai', label: 'Python & AI' },
    { id: 'design', label: 'UI/UX Design' },
    { id: 'backend', label: 'Backend Go' },
    { id: 'qa', label: 'QA Testing' },
  ];

  return (
    <div className="relative overflow-hidden">
      {/* ─── Hero Section with Interactive 3D Solar Eclipse & 3D Ribbon ─── */}
      <HeroEditorialRibbon
        onOpenApply={() => openApplyFor('frontend-react')}
        onOpenQuiz={scrollToQuiz}
      />

      {/* ─── Infinite Tech & Partners Marquee ─── */}
      <TechMarquee />

      {/* ─── Technical Blueprint Anatomy ─── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <SkillAnatomyBlueprint />
      </section>

      {/* ─── Roadmap Track with 4-Point Star Rail ─── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <StudentRoadmapTrack />
      </section>

      {/* ─── Interactive Career Orientation Quiz ─── */}
      <section id="career-quiz" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 scroll-mt-24">
        <CareerQuiz 
          onSelectCourse={(courseId) => openApplyFor(courseId)} 
          onAskAi={handleAskAi}
        />
      </section>

      {/* ─── Courses Bento Catalog Section ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 text-zinc-400 text-xs font-tech uppercase tracking-widest mb-2">
              <Code2 className="w-3.5 h-3.5 text-zinc-300" />
              <span>Программы подготовки 2026</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight">
              Выберите профессию <br className="hidden sm:inline" />
              <span className="font-editorial-italic font-normal text-zinc-300 text-3xl sm:text-4xl">
                с гарантией в договоре
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-2 max-w-xl font-tech">
              Программы адаптированы под требования ведущих IT-компаний (Uzum, EPAM, Click, TBC). Обучение ведут практикующие тимлиды.
            </p>
          </div>

          <Link
            href="/courses"
            className="inline-flex items-center gap-1.5 text-xs font-tech font-semibold text-zinc-300 hover:text-white transition-colors"
          >
            <span>Полный каталог с модулями</span>
            <ChevronRight className="w-4 h-4 text-zinc-300" />
          </Link>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar font-tech">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                selectedCategory === cat.id
                  ? 'bg-white text-zinc-950 shadow-md'
                  : 'bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.06] text-zinc-400 hover:text-white'
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
              className="inspector-card rounded-3xl p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-tech px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-zinc-300">
                    {course.categoryLabel}
                  </span>
                  {course.badge && (
                    <span className="text-[10px] font-tech font-semibold px-2.5 py-0.5 rounded-full bg-white/[0.08] text-zinc-200 border border-white/20">
                      {course.badge}
                    </span>
                  )}
                </div>

                <h3 className="font-display text-lg font-bold text-white hover:text-zinc-200 transition-colors mb-2.5">
                  <Link href={`/courses/${course.id}`} className="hover:underline">
                    {course.title}
                  </Link>
                </h3>

                <p className="text-xs text-zinc-400 leading-relaxed mb-6 line-clamp-3 font-tech">
                  {course.shortDesc}
                </p>

                {/* Skills tags */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {course.skills.slice(0, 5).map((skill, i) => (
                    <span
                      key={i}
                      className="text-[10px] px-2 py-0.5 rounded-md bg-white/[0.03] text-zinc-300 border border-white/[0.05] font-tech"
                    >
                      {skill}
                    </span>
                  ))}
                  {course.skills.length > 5 && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-white/[0.02] text-zinc-400 font-tech">
                      +{course.skills.length - 5}
                    </span>
                  )}
                </div>
              </div>

              <div className="pt-5 border-t border-white/[0.06] space-y-4">
                <div className="flex items-center justify-between text-xs text-zinc-400 font-tech">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-zinc-400" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-zinc-400" />
                    <span>{course.projectsCount} проекта</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-zinc-500 block font-tech">Рассрочка 0% от:</span>
                    <span className="text-sm font-bold text-white font-tech">{course.monthlyPrice}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/courses/${course.id}`}
                      className="px-3 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-zinc-300 text-xs font-tech font-medium transition-all"
                    >
                      Инфо
                    </Link>
                    <button
                      onClick={() => openApplyFor(course.id)}
                      className="btn-shimmer px-4 py-2 rounded-xl bg-white hover:bg-zinc-200 text-zinc-950 text-xs font-tech font-bold uppercase tracking-wider transition-all active:scale-95"
                    >
                      Записаться
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Career & Salary Calculator ─── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <SalaryCalculator />
      </section>

      {/* ─── Student Capstone Projects Showcase ─── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <StudentProjectsShowcase />
      </section>

      {/* ─── 0% Installment Calculator ─── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <InstallmentCalculator onApplyForCourse={openApplyFor} />
      </section>

      {/* ─── Final Pre-Footer Action Banner (Cinematic Eclipse Noir) ─── */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="relative rounded-3xl bg-[#090b10] border border-white/[0.1] p-8 sm:p-14 text-center overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/[0.03] rounded-full blur-3xl pointer-events-none" />

          <h2 className="font-display text-3xl sm:text-5xl font-black text-white mb-3 tracking-tight">
            НАЧНИТЕ СВОЙ ПУТЬ В IT <br />
            <span className="font-editorial-italic font-normal text-zinc-300 text-3xl sm:text-4xl">
              с первого бесплатного урока
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-lg mx-auto mb-8 font-tech">
            Пройдите 20-минутную консультацию с академическим методистом или задайте вопрос нашему AI-ассистенту прямо сейчас.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 font-tech">
            <button
              onClick={() => openApplyFor('frontend-react')}
              className="btn-shimmer w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white hover:bg-zinc-200 text-zinc-950 font-bold text-xs uppercase tracking-widest transition-all shadow-md active:scale-95"
            >
              Записаться на открытый урок
            </button>
            <button
              onClick={() => handleAskAi('Привет! Помоги определиться, с чего начать новичку без опыта?')}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] text-zinc-200 font-semibold text-xs tracking-wider transition-all"
            >
              Спросить AI-консультанта
            </button>
          </div>
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
