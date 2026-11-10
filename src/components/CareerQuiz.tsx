'use client';

import React, { useState } from 'react';
import { 
  ArrowRight, 
  RotateCcw, 
  TrendingUp, 
  Clock, 
  MessageSquare,
  Compass,
  Briefcase
} from 'lucide-react';
import { COURSES } from '@/data/courses';

interface CareerQuizProps {
  onSelectCourse: (courseId: string) => void;
  onAskAi?: (prompt: string) => void;
}

function FourPointStar({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 36 36" fill="none" className={className}>
      <path d="M18 2 L19.6 15.4 L33 18 L19.6 20.6 L18 34 L16.4 20.6 L3 18 L16.4 15.4 Z" fill="currentColor" />
    </svg>
  );
}

export default function CareerQuiz({ onSelectCourse, onAskAi }: CareerQuizProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isCalculating, setIsCalculating] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const questions = [
    {
      id: 0,
      title: 'Что вам ближе по духу и ежедневной работе?',
      subtitle: 'Выберите направление, которое вызывает наибольший интерес',
      options: [
        { id: 'visual', label: 'Визуальный дизайн, удобные интерфейсы, анимации и эстетика', icon: '🎨', bias: 'ui-ux-design' },
        { id: 'web', label: 'Создание современных сайтов, сервисов и интерактивных веб-приложений', icon: '💻', bias: 'frontend-react' },
        { id: 'ai', label: 'Искусственный интеллект, нейросети, анализ данных и автоматизация', icon: '🤖', bias: 'python-ai' },
        { id: 'backend', label: 'Высоконагруженные серверы, базы данных, архитектура и микросервисы', icon: '⚡', bias: 'backend-golang' },
        { id: 'qa', label: 'Поиск багов, автоматические тесты, качество продукта и быстрый старт в IT', icon: '🧪', bias: 'qa-automation' },
      ],
    },
    {
      id: 1,
      title: 'Какой у вас текущий уровень в IT и программировании?',
      subtitle: 'Наши программы адаптированы под разные стартовые позиции',
      options: [
        { id: 'zero', label: 'Полный ноль — никогда не писал код и не работал в дизайне', icon: '🌱' },
        { id: 'basics', label: 'Знаю базовые понятия / смотрел бесплатные видео на YouTube', icon: '📚' },
        { id: 'adjacent', label: 'Работаю в смежной сфере (маркетинг, продажи, инженерия, 1С)', icon: '🔄' },
        { id: 'tech', label: 'Студент технического вуза или junior с опытом', icon: '🚀' },
      ],
    },
    {
      id: 2,
      title: 'Сколько времени вы готовы уделять обучению в неделю?',
      subtitle: 'Чтобы мы подобрали комфортный темп без перегрузок',
      options: [
        { id: 'part_time', label: '8–12 часов (вечерние группы + домашние задания на выходных)', icon: '⏱️' },
        { id: 'intensive', label: '15–20 часов (интенсивный фокус на быстрое трудоустройство)', icon: '🔥' },
        { id: 'full', label: 'Более 25 часов (хочу жить в кампусе коворкинга и учиться с менторами)', icon: '🏢' },
      ],
    },
    {
      id: 3,
      title: 'Какая ваша главная карьерная цель на 2026 год?',
      subtitle: 'Подстроим рекомендации под ваши ожидания по доходу',
      options: [
        { id: 'career_switch', label: 'Сменить профессию и получить первый оффер в IT за 4-8 месяцев', icon: '🎯' },
        { id: 'remote_usd', label: 'Выйти на удалённую работу с доходом в валюте ($1,000+)', icon: '🌍' },
        { id: 'own_startup', label: 'Создать собственный IT-продукт, стартап или AI-сервис', icon: '💡' },
      ],
    },
  ];

  const handleSelectOption = (optionId: string) => {
    const updatedAnswers = { ...answers, [currentStep]: optionId };
    setAnswers(updatedAnswers);

    if (currentStep < questions.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      // Calculate result
      setIsCalculating(true);
      setTimeout(() => {
        setIsCalculating(false);
        setShowResult(true);
      }, 700);
    }
  };

  const resetQuiz = () => {
    setCurrentStep(0);
    setAnswers({});
    setShowResult(false);
    setIsCalculating(false);
  };

  // Determine recommended course
  const firstChoice = answers[0] || 'web';
  let recommendedCourseId = 'frontend-react';
  if (firstChoice === 'visual') recommendedCourseId = 'ui-ux-design';
  else if (firstChoice === 'ai') recommendedCourseId = 'python-ai';
  else if (firstChoice === 'backend') recommendedCourseId = 'backend-golang';
  else if (firstChoice === 'qa') recommendedCourseId = 'qa-automation';

  const matchedCourse = COURSES.find((c) => c.id === recommendedCourseId) || COURSES[0];

  return (
    <div className="relative rounded-3xl inspector-card p-6 sm:p-10 shadow-2xl overflow-hidden border border-white/10 bg-[#07090e]/70 backdrop-blur-2xl">
      {/* ─── Ambient Cosmic Mist & Nebula Glow (Туман и свечение) ─── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(255,255,255,0.05)_0%,rgba(148,163,184,0.02)_40%,transparent_70%)] blur-2xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/[0.03] rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/[0.08] gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs text-zinc-300 font-tech mb-2">
            <Compass className="w-3.5 h-3.5 text-zinc-300" />
            <span>Интерактивный профориентатор 2026</span>
          </div>
          <h3 className="font-display text-xl sm:text-3xl font-extrabold text-white tracking-tight">
            Подберите идеальную IT-профессию <br className="hidden sm:inline" />
            <span className="font-editorial-italic font-normal text-zinc-300 text-2xl sm:text-3xl">
              за 2 минуты тестирования
            </span>
          </h3>
          <p className="text-xs text-zinc-400 mt-1 font-tech">
            Ответьте на 4 простых вопроса — алгоритм рассчитает соответствие, срок обучения и зарплатную вилку.
          </p>
        </div>

        {!showResult && !isCalculating && (
          <div className="flex items-center gap-3 text-xs font-tech text-zinc-400 shrink-0">
            <span>Вопрос {currentStep + 1} из {questions.length}</span>
            <div className="w-24 h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
              <div 
                className="h-full bg-white transition-all duration-300 rounded-full"
                style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Calculating State */}
      {isCalculating && (
        <div className="py-20 text-center space-y-4">
          <div className="w-10 h-10 border-2 border-zinc-700 border-t-white rounded-full animate-spin mx-auto" />
          <p className="text-sm font-medium text-white font-tech">Анализируем ваши ответы и требования рынка IT Ташкента...</p>
          <p className="text-xs text-zinc-500 font-tech">Сопоставление с 4 500+ выпускниками EduCenter</p>
        </div>
      )}

      {/* Quiz Questions */}
      {!isCalculating && !showResult && (
        <div className="pt-8 space-y-6">
          <div>
            <h4 className="font-display text-base sm:text-lg font-bold text-white">
              {questions[currentStep].title}
            </h4>
            <p className="text-xs text-zinc-400 mt-1 font-editorial-italic text-sm">
              {questions[currentStep].subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {questions[currentStep].options.map((opt) => (
              <button
                key={opt.id}
                onClick={() => handleSelectOption(opt.id)}
                className="group flex items-center justify-between p-4 rounded-2xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.06] hover:border-white/20 text-left transition-all duration-200 hover:translate-x-1"
              >
                <div className="flex items-center gap-3.5">
                  <span className="text-xl shrink-0 p-2 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                    {opt.icon}
                  </span>
                  <span className="text-xs sm:text-sm font-medium text-zinc-200 group-hover:text-white font-tech">
                    {opt.label}
                  </span>
                </div>
                <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-white group-hover:translate-x-1 transition-all shrink-0 ml-2" />
              </button>
            ))}
          </div>

          {currentStep > 0 && (
            <button
              onClick={() => setCurrentStep((prev) => prev - 1)}
              className="text-xs font-tech text-zinc-400 hover:text-white transition-colors flex items-center gap-1.5 pt-2"
            >
              ← Вернуться к предыдущему вопросу
            </button>
          )}
        </div>
      )}

      {/* Quiz Result View */}
      {!isCalculating && showResult && (
        <div className="pt-8 space-y-6">
          <div className="p-6 sm:p-8 rounded-2xl bg-white/[0.02] border border-white/[0.12] space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.08] text-white border border-white/20 text-xs font-semibold font-tech">
                <FourPointStar className="w-3.5 h-3.5 text-white fill-white" />
                <span>Идеальное совпадение: 97% Match</span>
              </div>
              <span className="text-xs font-tech text-zinc-400">
                Категория: {matchedCourse.categoryLabel}
              </span>
            </div>

            <div>
              <span className="text-xs text-zinc-400 uppercase tracking-widest font-tech">
                Рекомендованный курс обучения:
              </span>
              <h4 className="font-display text-2xl sm:text-3xl font-black text-white mt-1 tracking-tight">
                {matchedCourse.title}
              </h4>
              <p className="text-xs sm:text-sm text-zinc-300 mt-2 leading-relaxed font-tech">
                {matchedCourse.shortDesc}
              </p>
            </div>

            {/* Metrics cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                <div className="flex items-center gap-1.5 text-xs text-zinc-400 mb-1 font-tech">
                  <TrendingUp className="w-3.5 h-3.5 text-zinc-300" />
                  <span>Стартовая зарплата</span>
                </div>
                <div className="text-sm font-bold text-white font-tech">
                  {matchedCourse.salaryExpectation}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                <div className="flex items-center gap-1.5 text-xs text-zinc-400 mb-1 font-tech">
                  <Clock className="w-3.5 h-3.5 text-zinc-300" />
                  <span>Срок обучения</span>
                </div>
                <div className="text-sm font-bold text-white font-tech">
                  {matchedCourse.duration}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                <div className="flex items-center gap-1.5 text-xs text-zinc-400 mb-1 font-tech">
                  <Briefcase className="w-3.5 h-3.5 text-zinc-300" />
                  <span>Проекты в резюме</span>
                </div>
                <div className="text-sm font-bold text-white font-tech">
                  {matchedCourse.projectsCount} коммерческих кейса
                </div>
              </div>
            </div>

            {/* Key Skills */}
            <div className="pt-2">
              <span className="text-[11px] font-tech text-zinc-400 block mb-2 uppercase tracking-wider">
                Технологический стек программы:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {matchedCourse.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.08] text-zinc-200 font-tech"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <button
              onClick={() => onSelectCourse(matchedCourse.id)}
              className="btn-shimmer w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white hover:bg-zinc-200 text-zinc-950 font-tech font-bold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-lg active:scale-95"
            >
              <span>Записаться на открытый урок</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {onAskAi && (
              <button
                onClick={() => onAskAi(`Расскажи подробнее про курс ${matchedCourse.title}, программу обучения и перспективы зарплаты`)}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] text-zinc-200 font-tech font-semibold text-xs transition-all flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-3.5 h-3.5 text-zinc-300" />
                <span>Задать вопрос AI-консультанту</span>
              </button>
            )}

            <button
              onClick={resetQuiz}
              className="w-full sm:w-auto px-4 py-3.5 rounded-xl text-xs font-tech text-zinc-400 hover:text-white transition-colors flex items-center justify-center gap-1.5 sm:ml-auto"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Пройти тест заново</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
