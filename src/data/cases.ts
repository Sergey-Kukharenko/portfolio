/**
 * Commercial case studies: task → solution → result. Facts only, as in the
 * resume — no invented metrics.
 */
export type Case = {
  id: string;
  company: string;
  role: string;
  period: string;
  title: string;
  task: string;
  solution: string[];
  result: string[];
  links: { label: string; href: string }[];
  stack: string[];
  gradient: string;
};

export const cases: Case[] = [
  {
    id: "flowwow",
    company: "Flowwow",
    role: "Senior Frontend Developer",
    period: "2025 — сейчас",
    title: "Один продукт — два рынка",
    task: "E-commerce продукт выходит на международный рынок: нужны отдельные русская и международная версии и архитектура, готовая к росту.",
    solution: [
      "Разделил продукт на русскую и международную версии, адаптировав интерфейсы и логику под специфику рынков",
      "Мигрирую продукт на Nuxt 4: переношу модули и формирую новую масштабируемую архитектуру",
      "Внедрил регламенты взаимодействия: тех. груминги и формализованные контракты API",
    ],
    result: [
      "Продукт работает на двух рынках с учётом их специфики",
      "Устранены задержки в коммуникации Frontend / Backend / QA",
      "Упрощена бизнес-логика legacy-участков, проект стало проще поддерживать",
    ],
    links: [{ label: "flowwow.com", href: "https://flowwow.com" }],
    stack: ["Nuxt 2 → Nuxt 4", "Vue", "TypeScript"],
    gradient: "from-framer-blue to-framer-teal",
  },
  {
    id: "myflowers",
    company: "Myflowers",
    role: "Senior Frontend Developer",
    period: "2023 — 2025",
    title: "Интернет-магазин для Великобритании",
    task: "Запустить интернет-магазин для рынка Великобритании и перевести русскую версию проекта на современный стек.",
    solution: [
      "Разработал магазин на Nuxt 3 для британского рынка",
      "Принимал архитектурные решения по frontend-части",
      "Участвовал в миграции русской версии на Nuxt 3",
    ],
    result: [
      "Магазин запущен и работает: myflowers.co.uk",
      "Code review и контроль качества кода в команде",
      "Участвовал в найме frontend-разработчиков",
    ],
    links: [{ label: "myflowers.co.uk", href: "https://myflowers.co.uk" }],
    stack: ["Nuxt 3", "Vue 3", "TypeScript", "REST API"],
    gradient: "from-framer-purple to-framer-pink",
  },
  {
    id: "irg",
    company: "Inventive Retail Group",
    role: "Lead Frontend Developer",
    period: "2018 — 2023",
    title: "Фронтенд крупных ритейл-магазинов",
    task: "Развивать крупные интернет-магазины группы и перевести legacy-проекты на современный стек.",
    solution: [
      "Руководил frontend-разработкой в команде из 4 инженеров",
      "Спроектировал архитектуру Vue-приложений: модульная структура и масштабируемые UI-компоненты",
      "Руководил миграцией legacy-проектов на Vue",
    ],
    result: [
      "Оптимизирована производительность интерфейсов, улучшен UX",
      "Выстроены code review, декомпозиция задач и техническое планирование",
      "Найм и менторинг frontend-разработчиков",
    ],
    links: [
      { label: "street-beat.ru", href: "https://street-beat.ru" },
      { label: "re-store.ru", href: "https://re-store.ru" },
      { label: "galaxystore.ru", href: "https://galaxystore.ru" },
    ],
    stack: ["Vue", "Nuxt", "TypeScript", "Vuex"],
    gradient: "from-framer-pink to-framer-red",
  },
];
