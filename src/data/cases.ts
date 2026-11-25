import type { L } from "../i18n";

/**
 * Commercial case studies: task → solution → result. Facts only, as in the
 * resume — no invented metrics.
 */
export type Case = {
  id: string;
  company: string;
  role: string;
  period: L;
  title: L;
  /** facts of scale shown as big figures up top — taken from the resume, not invented */
  highlights: { value: string; label: L }[];
  task: L;
  solution: L<string[]>;
  result: L<string[]>;
  links: { label: string; href: string }[];
  stack: string[];
  gradient: string;
};

export const cases: Case[] = [
  {
    id: "flowwow",
    company: "Flowwow",
    role: "Senior Frontend Developer",
    period: { ru: "2025 — сейчас", en: "2025 — now" },
    title: { ru: "Один продукт — два рынка", en: "One product, two markets" },
    highlights: [
      { value: "2", label: { ru: "рынка: RU и международный", en: "markets: RU and international" } },
      { value: "Nuxt 2 → 4", label: { ru: "миграция продукта", en: "product migration" } },
      { value: "API", label: { ru: "контракты Frontend · Backend · QA", en: "contracts across Frontend · Backend · QA" } },
    ],
    task: {
      ru: "E-commerce продукт выходит на международный рынок: нужны отдельные русская и международная версии и архитектура, готовая к росту.",
      en: "An e-commerce product is going international: it needs separate Russian and international versions and an architecture ready to grow.",
    },
    solution: {
      ru: [
        "Разделил продукт на русскую и международную версии, адаптировав интерфейсы и логику под специфику рынков",
        "Мигрирую продукт на Nuxt 4: переношу модули и формирую новую масштабируемую архитектуру",
        "Внедрил регламенты взаимодействия: тех. груминги и формализованные контракты API",
      ],
      en: [
        "Split the product into Russian and international versions, adapting the interface and logic to each market",
        "Migrating the product to Nuxt 4: moving modules over and shaping a new, scalable architecture",
        "Introduced team agreements: technical grooming and formalized API contracts",
      ],
    },
    result: {
      ru: [
        "Продукт работает на двух рынках с учётом их специфики",
        "Устранены задержки в коммуникации Frontend / Backend / QA",
        "Упрощена бизнес-логика legacy-участков, проект стало проще поддерживать",
      ],
      en: [
        "The product serves two markets, each on its own terms",
        "Communication delays between Frontend, Backend and QA eliminated",
        "Legacy business logic simplified — the project is easier to maintain",
      ],
    },
    links: [{ label: "flowwow.com", href: "https://flowwow.com" }],
    stack: ["Nuxt 2 → Nuxt 4", "Vue", "TypeScript"],
    gradient: "from-framer-blue to-framer-teal",
  },
  {
    id: "myflowers",
    company: "Myflowers",
    role: "Senior Frontend Developer",
    period: { ru: "2023 — 2025", en: "2023 — 2025" },
    title: { ru: "Интернет-магазин для Великобритании", en: "An online store for the UK" },
    highlights: [
      { value: "UK", label: { ru: "новый рынок", en: "a new market" } },
      { value: "Nuxt 3", label: { ru: "новый магазин и миграция RU-версии", en: "new store, RU version migrated" } },
      { value: "2+", label: { ru: "года в проекте", en: "years on the project" } },
    ],
    task: {
      ru: "Запустить интернет-магазин для рынка Великобритании и перевести русскую версию проекта на современный стек.",
      en: "Launch an online store for the UK market and move the Russian version of the project to a modern stack.",
    },
    solution: {
      ru: [
        "Разработал магазин на Nuxt 3 для британского рынка",
        "Принимал архитектурные решения по frontend-части",
        "Участвовал в миграции русской версии на Nuxt 3",
      ],
      en: [
        "Built the UK store on Nuxt 3",
        "Made the frontend architecture decisions",
        "Took part in migrating the Russian version to Nuxt 3",
      ],
    },
    result: {
      ru: [
        "Магазин запущен и работает: myflowers.co.uk",
        "Code review и контроль качества кода в команде",
        "Участвовал в найме frontend-разработчиков",
      ],
      en: [
        "The store is live: myflowers.co.uk",
        "Code review and code quality across the team",
        "Helped hire frontend developers",
      ],
    },
    links: [{ label: "myflowers.co.uk", href: "https://myflowers.co.uk" }],
    stack: ["Nuxt 3", "Vue 3", "TypeScript", "REST API"],
    gradient: "from-framer-purple to-framer-pink",
  },
  {
    id: "irg",
    company: "Inventive Retail Group",
    role: "Lead Frontend Developer",
    period: { ru: "2018 — 2023", en: "2018 — 2023" },
    title: { ru: "Фронтенд крупных ритейл-магазинов", en: "Frontend for major retail stores" },
    highlights: [
      { value: "3", label: { ru: "магазина группы", en: "stores in the group" } },
      { value: "4", label: { ru: "инженера в команде", en: "engineers on the team" } },
      { value: "5", label: { ru: "лет в роли Lead", en: "years as Lead" } },
    ],
    task: {
      ru: "Развивать крупные интернет-магазины группы и перевести legacy-проекты на современный стек.",
      en: "Grow the group's major online stores and move legacy projects to a modern stack.",
    },
    solution: {
      ru: [
        "Руководил frontend-разработкой в команде из 4 инженеров",
        "Спроектировал архитектуру Vue-приложений: модульная структура и масштабируемые UI-компоненты",
        "Руководил миграцией legacy-проектов на Vue",
      ],
      en: [
        "Led frontend development in a team of 4 engineers",
        "Designed the Vue application architecture: modular structure and scalable UI components",
        "Led the migration of legacy projects to Vue",
      ],
    },
    result: {
      ru: [
        "Оптимизирована производительность интерфейсов, улучшен UX",
        "Выстроены code review, декомпозиция задач и техническое планирование",
        "Найм и менторинг frontend-разработчиков",
      ],
      en: [
        "Interface performance optimized, UX improved",
        "Code review, task breakdown and technical planning put in place",
        "Hiring and mentoring frontend developers",
      ],
    },
    links: [
      { label: "street-beat.ru", href: "https://street-beat.ru" },
      { label: "re-store.ru", href: "https://re-store.ru" },
      { label: "galaxystore.ru", href: "https://galaxystore.ru" },
    ],
    stack: ["Vue", "Nuxt", "TypeScript", "Vuex"],
    gradient: "from-framer-pink to-framer-red",
  },
];
