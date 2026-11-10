export interface Course {
  id: string;
  title: string;
  category: 'frontend' | 'backend' | 'ai' | 'design' | 'qa';
  categoryLabel: string;
  badge?: string;
  duration: string;
  level: string;
  rating: number;
  reviewsCount: number;
  price: string;
  monthlyPrice: string;
  shortDesc: string;
  fullDesc: string;
  skills: string[];
  projectsCount: number;
  salaryExpectation: string;
  syllabus: { title: string; desc: string }[];
  schedule?: string;
  nextCohort?: string;
  instructor?: { name: string; role: string };
}

export const COURSES: Course[] = [
  {
    id: 'frontend-react',
    title: 'Frontend-разработчик: React & Next.js',
    category: 'frontend',
    categoryLabel: 'Веб-разработка',
    badge: 'Хит продаж',
    duration: '7 месяцев',
    level: 'С нуля',
    rating: 4.95,
    reviewsCount: 340,
    price: '11 200 000 сум',
    monthlyPrice: '1 800 000 сум/мес',
    shortDesc: 'Освойте современный стек фронтенда: от семантического HTML и TypeScript до серверного рендеринга на Next.js.',
    fullDesc: 'Глубокий практический курс подготовки Middle-фронтендера. Вы научитесь строить высоконагруженные SPA/PWA приложения, работать с глобальным состоянием, оптимизировать Web Vitals и работать в команде по Agile/Scrum.',
    skills: ['HTML5 & CSS3', 'JavaScript ES6+', 'TypeScript', 'React 19', 'Next.js 15', 'Tailwind CSS', 'Redux Toolkit', 'REST & GraphQL', 'Git & CI/CD'],
    projectsCount: 5,
    salaryExpectation: 'от $800 до $2,200',
    syllabus: [
      { title: 'Модуль 1: Базовый веб и JS Core', desc: 'Верстка, адаптивность, современные стандарты JavaScript, асинхронность и работа с DOM.' },
      { title: 'Модуль 2: TypeScript & Инструменты', desc: 'Строгая типизация, интерфейсы, дженерики, сборка Vite и линтеры.' },
      { title: 'Модуль 3: Архитектура React 19', desc: 'Хуки, управление состоянием, кастомные хуки, производительность и профилирование.' },
      { title: 'Модуль 4: Next.js App Router', desc: 'Server Components, SSR/SSG, кэширование, маршрутизация и SEO-оптимизация.' },
      { title: 'Модуль 5: Дипломный стартап', desc: 'Командная разработка маркетплейса с авторизацией, платежами и админкой.' }
    ]
  },
  {
    id: 'python-ai',
    title: 'Python & AI Engineering',
    category: 'ai',
    categoryLabel: 'AI & Python',
    badge: 'Трендовый',
    duration: '8 месяцев',
    level: 'С нуля до Pro',
    rating: 4.98,
    reviewsCount: 280,
    price: '14 500 000 сум',
    monthlyPrice: '2 100 000 сум/мес',
    shortDesc: 'Разработка надежных микросервисов на FastAPI, интеграция LLM нейросетей, RAG-систем и автономных AI-агентов.',
    fullDesc: 'Курс объединяет классический бэкенд на Python и передовые технологии искусственного интеллекта. Вы научитесь настраивать пайплайны векторного поиска, обучать эмбеддинги и внедрять LLM в бизнес-процессы.',
    skills: ['Python 3.12', 'FastAPI & Django', 'PostgreSQL & Redis', 'Docker', 'LangChain & LlamaIndex', 'RAG-архитектура', 'Vector DBs (Chroma/Pinecone)', 'OpenAI & Gemini API'],
    projectsCount: 4,
    salaryExpectation: 'от $900 до $2,500',
    syllabus: [
      { title: 'Модуль 1: Python Advanced & ООП', desc: 'Паттерны проектирования, генераторы, декораторы, многопоточность и асинхронный asyncio.' },
      { title: 'Модуль 2: Базы данных и FastAPI', desc: 'Реляционные базы, SQLAlchemy, Pydantic v2, JWT авторизация и кэширование.' },
      { title: 'Модуль 3: Основы нейросетей и LLM', desc: 'Принципы работы трансформеров, промпт-инжиниринг, Fine-tuning и Embedding модели.' },
      { title: 'Модуль 4: RAG & AI Агенты', desc: 'Создание вопросно-ответных систем по корпоративным базам знаний, векторные индексы.' },
      { title: 'Модуль 5: Production & DevOps', desc: 'Контейнеризация, GitHub Actions, деплой на облачные серверы с мониторингом.' }
    ]
  },
  {
    id: 'ui-ux-design',
    title: 'UI/UX & Product Design',
    category: 'design',
    categoryLabel: 'Дизайн',
    badge: 'Для креативных',
    duration: '5 месяцев',
    level: 'С нуля',
    rating: 4.92,
    reviewsCount: 195,
    price: '8 250 000 сум',
    monthlyPrice: '1 650 000 сум/мес',
    shortDesc: 'Проектируйте современные интерфейсы веб-сервисов и мобильных приложений в Figma с глубоким анализом UX.',
    fullDesc: 'От пользовательских исследований (CJM, Jobs To Be Done) до создания масштабируемых дизайн-систем с переменными и автолейаутами. Защита дипломных кейсов перед арт-директорами ведущих студий.',
    skills: ['Figma Pro', 'Auto Layout & Variables', 'User Research & CJM', 'Прототипирование', 'UI Kit & Дизайн-системы', 'Типографика и сетки', 'Behance Portfolio'],
    projectsCount: 3,
    salaryExpectation: 'от $700 до $1,800',
    syllabus: [
      { title: 'Модуль 1: UX-исследования и логика', desc: 'Понимание аудитории, Jobs To Be Done, User Flow, построение информационной архитектуры.' },
      { title: 'Модуль 2: Figma Mastery', desc: 'Компоненты, свойства, Auto Layout, Variables, интерактивное прототипирование.' },
      { title: 'Модуль 3: Мобильные приложения (iOS/Android)', desc: 'Human Interface Guidelines, Material Design 3, адаптация под экраны.' },
      { title: 'Модуль 4: Web & SaaS интерфейсы', desc: 'Сложные таблицы, дашборды, адаптивная верстка, подготовка макетов к разработке.' },
      { title: 'Модуль 5: Оформление кейсов и Behance', desc: 'Презентация проектов, сторителлинг, анимация макетов и портфолио.' }
    ]
  },
  {
    id: 'backend-golang',
    title: 'Backend-разработка на Go (Golang)',
    category: 'backend',
    categoryLabel: 'Бэкенд',
    badge: 'Высокие зарплаты',
    duration: '6 месяцев',
    level: 'Базовый опыт в коде',
    rating: 4.96,
    reviewsCount: 160,
    price: '12 800 000 сум',
    monthlyPrice: '2 300 000 сум/мес',
    shortDesc: 'Создание отказоустойчивых микросервисов, распределенных систем и работа с Highload нагрузками.',
    fullDesc: 'Go — фаворит в финтехе, банках и облачных платформах. Изучите конкурентность (goroutines, channels), gRPC коммуникацию, Kafka стриминг и архитектуру без узких мест.',
    skills: ['Golang', 'Goroutines & Channels', 'gRPC & Protocol Buffers', 'PostgreSQL & Redis', 'Apache Kafka', 'Docker & Kubernetes basics', 'Highload Architecture'],
    projectsCount: 4,
    salaryExpectation: 'от $1,100 до $3,000',
    syllabus: [
      { title: 'Модуль 1: Синтаксис и Concurrency в Go', desc: 'Типизация, интерфейсы, горутины, каналы, sync package, контексты.' },
      { title: 'Модуль 2: REST & gRPC API', desc: 'Чистая архитектура (Clean Architecture), валидация, middleware, protobuf.' },
      { title: 'Модуль 3: Базы данных и кэширование', desc: 'Оптимизация запросов, индексы, Redis pub/sub, транзакции.' },
      { title: 'Модуль 4: Очереди и микросервисы', desc: 'Асинхронные события через Apache Kafka, Distributed Tracing.' },
      { title: 'Модуль 5: Финальный Highload проект', desc: 'Разработка платежного процессинга с гарантией доставки сообщений.' }
    ]
  },
  {
    id: 'qa-automation',
    title: 'QA Automation Engineer (Python/JS)',
    category: 'qa',
    categoryLabel: 'Тестирование',
    badge: 'Быстрый старт',
    duration: '4 месяца',
    level: 'С нуля',
    rating: 4.91,
    reviewsCount: 140,
    price: '6 000 000 сум',
    monthlyPrice: '1 500 000 сум/мес',
    shortDesc: 'Освойте ручное и автоматизированное тестирование веб и мобильных приложений. Самый надежный порог входа в IT.',
    fullDesc: 'Практика на реальных баг-трекерах, составление тест-планов, автоматизация UI через Playwright/Selenium и тестирование API через Postman и PyTest.',
    skills: ['Тест-дизайн', 'Postman & Swagger', 'SQL запросы', 'Python / JavaScript', 'Playwright & Selenium', 'PyTest', 'CI/CD GitHub Actions'],
    projectsCount: 3,
    salaryExpectation: 'от $600 до $1,500',
    syllabus: [
      { title: 'Модуль 1: QA Manual Основы', desc: 'Виды тестирования, жизненный цикл бага, чек-листы, тест-кейсы в Jira.' },
      { title: 'Модуль 2: API & Базы данных', desc: 'REST запросы, коды ответов, валидация JSON Schema, сложные SQL выборки.' },
      { title: 'Модуль 3: Автоматизация на Python', desc: 'Основы кода, PyTest фикстуры, параметризация, генерация Allure отчетов.' },
      { title: 'Модуль 4: End-to-End тестирование (Playwright)', desc: 'Автоматизация браузерных сценариев, перехват сетевых запросов.' },
      { title: 'Модуль 5: CI/CD пайплайн', desc: 'Интеграция автотестов в процесс сборки проектов.' }
    ]
  }
];
