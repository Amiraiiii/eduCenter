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
  Layers, 
  Award, 
  ShieldCheck
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
          className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-white transition-colors"
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
              <span className="text-xs font-mono px-3 py-1 rounded-full bg-white/[0.04] text-zinc-300 border border-white/[0.08]">
                {course.categoryLabel}
              </span>
              <span className="text-xs px-3 py-1 rounded-full bg-white/[0.04] text-zinc-300 border border-white/[0.08] font-medium">
                {course.level}
              </span>
              {course.badge && (
                <span className="text-xs font-tech px-3 py-1 rounded-full bg-white/[0.08] text-zinc-200 border border-white/20 font-semibold">
                  {course.badge}
                </span>
              )}
              <div className="flex items-center gap-1.5 text-xs text-zinc-200 ml-auto font-tech">
                <Star className="w-4 h-4 fill-white text-white" />
                <span className="font-bold">{course.rating}</span>
                <span className="text-zinc-500">({course.reviewsCount} отзывов)</span>
              </div>
            </div>

            <h1 className="font-display text-4xl sm:text-6xl font-black text-white tracking-tight uppercase leading-[1.05]">
              {course.title}
            </h1>

            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
              {course.fullDesc}
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div className="inspector-card rounded-2xl p-4">
              <div className="flex items-center gap-2 text-zinc-400 text-xs font-mono mb-1">
                <Clock className="w-4 h-4" />
                <span>Длительность</span>
              </div>
              <div className="text-lg font-black text-white">{course.duration}</div>
              <div className="text-[11px] text-zinc-500">3 раза в неделю по 2 часа</div>
            </div>

            <div className="inspector-card rounded-2xl p-4">
              <div className="flex items-center gap-2 text-zinc-400 text-xs font-mono mb-1">
                <Briefcase className="w-4 h-4" />
                <span>Портфолио</span>
              </div>
              <div className="text-lg font-black text-white">{course.projectsCount} кейса</div>
              <div className="text-[11px] text-zinc-500">Готовы для показа BigTech</div>
            </div>

            <div className="inspector-card rounded-2xl p-4 col-span-2 sm:col-span-1">
              <div className="flex items-center gap-2 text-zinc-400 text-xs font-tech mb-1">
                <Banknote className="w-4 h-4 text-zinc-300" />
                <span>Зарплата выпускника</span>
              </div>
              <div className="text-lg font-black text-white font-tech">{course.salaryExpectation}</div>
              <div className="text-[11px] text-zinc-500">По данным рынка Ташкента</div>
            </div>
          </div>

          {/* Stack & Skills */}
          <div className="inspector-card rounded-3xl p-6 space-y-4">
            <h3 className="text-xs font-tech text-zinc-400 uppercase tracking-widest">
              Технологический стек и инструменты программы:
            </h3>
            <div className="flex flex-wrap gap-2">
              {course.skills.map((skill, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-zinc-200 text-xs font-tech font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Syllabus Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-zinc-400 text-xs font-tech uppercase tracking-widest">
              <Layers className="w-4 h-4 text-zinc-300" />
              <span>Учебный план по модулям</span>
            </div>
            <h2 className="font-display text-2xl sm:text-4xl font-black text-white tracking-tight">
              Чему вы научитесь на курсе
            </h2>

            <div className="space-y-4">
              {course.syllabus.map((item, index) => (
                <div
                  key={index}
                  className="inspector-card rounded-2xl p-5 flex items-start gap-4"
                >
                  <div className="w-8 h-8 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white font-tech font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {index + 1}
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-white font-tech">{item.title}</h4>
                    <p className="text-xs text-zinc-400 leading-relaxed pt-1 font-tech">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Guarantees */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
            <div className="inspector-card rounded-2xl p-5 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold text-xs">
                <ShieldCheck className="w-4 h-4 text-white" />
                <span>Гарантия в официальном договоре</span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed font-tech">
                Помощь в трудоустройстве и организация собеседований в Uzum, Click, EPAM и банках закрепляется юридически.
              </p>
            </div>

            <div className="inspector-card rounded-2xl p-5 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold text-xs">
                <Award className="w-4 h-4 text-zinc-300" />
                <span>Сертификат IT Park с QR-кодом</span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed font-tech">
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
