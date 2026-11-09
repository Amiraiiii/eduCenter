import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { 
  ArrowLeft, 
  Clock, 
  Briefcase, 
  Banknote, 
  Star, 
  CheckCircle2, 
  Layers, 
  Award, 
  Users2, 
  Sparkles,
  ShieldCheck,
  Calendar
} from 'lucide-react';
import { COURSES } from '@/data/courses';
import CourseEnrollCard from './CourseEnrollCard';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return COURSES.map((course) => ({
    slug: course.id,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const course = COURSES.find((c) => c.id === slug);

  if (!course) {
    return {
      title: 'Курс не найден | EduCenter',
    };
  }

  return {
    title: `${course.title} — Обучение с нуля в Ташкенте | EduCenter`,
    description: course.shortDesc,
    keywords: [...course.skills, course.title, 'IT курсы Ташкент', 'EduCenter'],
  };
}

export default async function CourseDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const course = COURSES.find((c) => c.id === slug);

  if (!course) {
    notFound();
  }

  return (
    <div className="pt-28 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      {/* Back button */}
      <div>
        <Link
          href="/courses"
          className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-cyan-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Вернуться в каталог всех курсов</span>
        </Link>
      </div>

      {/* Hero section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column (8 cols): Info & Syllabus */}
        <div className="lg:col-span-8 space-y-10">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                {course.categoryLabel}
              </span>
              <span className="text-xs px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 font-medium">
                {course.level}
              </span>
              {course.badge && (
                <span className="text-xs px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">
                  {course.badge}
                </span>
              )}
              <div className="flex items-center gap-1.5 text-xs text-amber-400 ml-auto">
                <Star className="w-4 h-4 fill-amber-400" />
                <span className="font-bold">{course.rating}</span>
                <span className="text-zinc-500">({course.reviewsCount} отзывов)</span>
              </div>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-[1.15]">
              {course.title}
            </h1>

            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
              {course.fullDesc}
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-[#0e1017] border border-white/[0.08]">
              <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono mb-1">
                <Clock className="w-4 h-4" />
                <span>Длительность</span>
              </div>
              <div className="text-lg font-bold text-white">{course.duration}</div>
              <div className="text-[11px] text-zinc-500">3 раза в неделю</div>
            </div>

            <div className="p-4 rounded-2xl bg-[#0e1017] border border-white/[0.08]">
              <div className="flex items-center gap-2 text-blue-400 text-xs font-mono mb-1">
                <Briefcase className="w-4 h-4" />
                <span>Портфолио</span>
              </div>
              <div className="text-lg font-bold text-white">{course.projectsCount} реальных проекта</div>
              <div className="text-[11px] text-zinc-500">Готовы к показу HR</div>
            </div>

            <div className="p-4 rounded-2xl bg-[#0e1017] border border-white/[0.08] col-span-2 sm:col-span-1">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono mb-1">
                <Banknote className="w-4 h-4" />
                <span>Зарплата выпускника</span>
              </div>
              <div className="text-lg font-bold text-emerald-400">{course.salaryExpectation}</div>
              <div className="text-[11px] text-zinc-500">По данным рынка Ташкента</div>
            </div>
          </div>

          {/* Stack & Skills */}
          <div className="p-6 rounded-3xl bg-[#0e1017] border border-white/[0.08] space-y-4">
            <h3 className="text-sm font-mono text-cyan-400 uppercase tracking-wider">
              Технологический стек и навыки курса
            </h3>
            <div className="flex flex-wrap gap-2">
              {course.skills.map((skill, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-zinc-200 text-xs font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Syllabus Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono uppercase tracking-wider">
              <Layers className="w-4 h-4" />
              <span>Учебный план</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Чему вы научитесь на курсе
            </h2>

            <div className="space-y-4">
              {course.syllabus.map((item, index) => (
                <div
                  key={index}
                  className="p-5 rounded-2xl bg-[#0e1017] border border-white/[0.08] flex items-start gap-4"
                >
                  <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {index + 1}
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-white">{item.title}</h4>
                    <p className="text-xs text-zinc-400 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Guarantees */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-2">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs">
                <ShieldCheck className="w-4 h-4" />
                <span>Гарантия в договоре</span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Помощь в трудоустройстве и стажировке в Uzum, Click, EPAM и банках закрепляется юридически.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-2">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs">
                <Award className="w-4 h-4" />
                <span>Диплом IT Park</span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Официальный верифицируемый сертификат с QR-кодом на английском и узбекском/русском языках.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column (4 cols): Sticky Enrollment Card */}
        <div className="lg:col-span-4 sticky top-28">
          <CourseEnrollCard course={course} />
        </div>
      </div>
    </div>
  );
}
