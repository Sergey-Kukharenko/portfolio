import { formatDuration, formatMonth, monthsBetween, type YearMonth } from "../lib/dates";
import { INTL, type L, type Locale } from "../i18n";

export type ExperienceItem = {
  id: string;
  company: string;
  role: string;
  /** first month in the role */
  start: YearMonth;
  /** last month; absent while it's the current job */
  end?: YearMonth;
  url?: string;
  points: L<string[]>;
  stack: string[];
  gradient: string;
};

export const experience: ExperienceItem[] = [
  {
    id: "flowwow",
    company: "Flowwow",
    role: "Senior Frontend Developer",
    start: [2025, 10],
    url: "https://flowwow.com",
    points: {
      ru: [
        "Развиваю frontend e-commerce продукта, который выходит на международный рынок: разделил его на русскую и международную версии",
        "Мигрирую продукт с Nuxt 2 на Nuxt 4 и закладываю новую масштабируемую архитектуру",
        "Рефакторинг сложного legacy-кода и глубокая оптимизация клиентской логики",
        "Внедрил тех. груминги и формализованные контракты API между Frontend, Backend и QA",
      ],
      en: [
        "Developing the frontend of an e-commerce product going international: split it into Russian and international versions",
        "Migrating the product from Nuxt 2 to Nuxt 4 and laying down a new, scalable architecture",
        "Refactoring complex legacy code, deep optimization of client-side logic",
        "Introduced technical grooming and formalized API contracts between Frontend, Backend and QA",
      ],
    },
    stack: ["Nuxt 2", "Nuxt 4", "Vue", "TypeScript", "JavaScript"],
    gradient: "from-framer-blue to-framer-teal",
  },
  {
    id: "myflowers",
    company: "Myflowers",
    role: "Senior Frontend Developer",
    start: [2023, 6],
    end: [2025, 10],
    url: "https://myflowers.co.uk",
    points: {
      ru: [
        "Разработал интернет-магазин на Nuxt 3 для рынка Великобритании — myflowers.co.uk",
        "Принимал архитектурные решения по frontend-части",
        "Участвовал в миграции русской версии на Nuxt 3",
        "Code review и контроль качества кода в команде, участие в найме frontend-разработчиков",
      ],
      en: [
        "Built the Nuxt 3 online store for the UK market — myflowers.co.uk",
        "Made the frontend architecture decisions",
        "Took part in migrating the Russian version to Nuxt 3",
        "Code review and code quality across the team, helped hire frontend developers",
      ],
    },
    stack: ["Nuxt 3", "Vue 3", "TypeScript", "JavaScript", "REST API"],
    gradient: "from-framer-purple to-framer-pink",
  },
  {
    id: "irg",
    company: "Inventive Retail Group",
    role: "Lead Frontend Developer",
    start: [2018, 4],
    end: [2023, 6],
    url: "https://inventive.ru",
    points: {
      ru: [
        "Руководил frontend-разработкой крупных интернет-магазинов группы в команде из 4 инженеров",
        "Спроектировал архитектуру Vue-приложений и руководил миграцией legacy-проектов на Vue",
        "Выстроил code review, декомпозицию задач и техническое планирование; нанимал и менторил разработчиков",
        "Дополнительно разработал внутренний корпоративный портал сотрудников на React",
      ],
      en: [
        "Led frontend development of the group's major online stores in a team of 4 engineers",
        "Designed the Vue application architecture and led the migration of legacy projects to Vue",
        "Put code review, task breakdown and technical planning in place; hired and mentored developers",
        "Also built an internal employee portal in React",
      ],
    },
    stack: ["Vue", "Nuxt", "TypeScript", "JavaScript", "Vuex", "React", "Redux", "Zustand"],
    gradient: "from-framer-pink to-framer-red",
  },
  {
    id: "dst",
    company: "Digital Space Technologies",
    role: "Frontend Developer",
    start: [2017, 1],
    end: [2018, 4],
    url: "https://dstglobal.net",
    points: {
      ru: [
        "Разрабатывал и поддерживал клиентские сайты и промо-проекты",
        "Создавал интерактивные элементы: калькуляторы и конфигураторы",
        "Интегрировал frontend с CMS (WordPress, Bitrix)",
      ],
      en: [
        "Built and maintained client websites and promo projects",
        "Created interactive elements: calculators and configurators",
        "Integrated the frontend with CMSs (WordPress, Bitrix)",
      ],
    },
    stack: ["HTML5", "CSS3", "SCSS", "JavaScript", "WordPress", "Bitrix"],
    gradient: "from-framer-red to-framer-orange",
  },
  {
    id: "ventra",
    company: "Ventra Employment",
    role: "HTML/CSS Developer, Frontend Developer, UX/UI Designer",
    start: [2016, 9],
    end: [2017, 1],
    url: "https://www.ventra.ru",
    points: {
      ru: [
        "Работал над внутренним проектом Samsung: новые страницы, UI-компоненты и пользовательские сценарии",
        "Проводил рефакторинг структуры и логики страниц",
      ],
      en: [
        "Worked on an internal Samsung project: new pages, UI components and user flows",
        "Refactored page structure and logic",
      ],
    },
    stack: ["HTML5", "CSS3", "JavaScript", "SVG animation"],
    gradient: "from-framer-orange to-framer-teal",
  },
  {
    id: "mokselle",
    company: "Mokselle",
    role: "HTML/CSS Developer, Frontend Developer",
    start: [2015, 6],
    end: [2016, 9],
    url: "https://mokselle.ru",
    points: {
      ru: [
        "Разрабатывал сайты и лендинги для коммерческих клиентов: адаптивная вёрстка, интерактив и анимации",
        "Полный цикл разработки: от вёрстки до логики интерфейса",
      ],
      en: [
        "Built websites and landing pages for commercial clients: responsive layouts, interactivity and animation",
        "Worked across the full cycle: from markup to interface logic",
      ],
    },
    stack: ["HTML5", "CSS3", "JavaScript", "jQuery", "Git"],
    gradient: "from-framer-teal to-framer-blue",
  },
  {
    id: "nc9",
    company: "nc9.ru",
    role: "HTML/CSS Developer",
    start: [2014, 9],
    end: [2015, 6],
    url: "http://www.nc9.ru",
    points: {
      ru: [
        "Верстал коммерческие сайты и лендинги по макетам, с кроссбраузерностью вплоть до IE8",
        "Первый коммерческий опыт на реальных клиентских проектах",
      ],
      en: [
        "Built commercial websites and landing pages from mockups, cross-browser down to IE8",
        "First commercial experience on real client projects",
      ],
    },
    stack: ["HTML5", "CSS3", "JavaScript", "jQuery"],
    gradient: "from-framer-blue to-framer-purple",
  },
];

const PRESENT: L = { ru: "настоящее время", en: "present" };

/** "Октябрь 2025 — настоящее время" / "October 2025 — present" */
export const periodOf = (e: ExperienceItem, locale: Locale) =>
  `${formatMonth(e.start, INTL[locale])} — ${e.end ? formatMonth(e.end, INTL[locale]) : PRESENT[locale]}`;

/** "1 год 2 месяца" / "1 yr 2 mos" — counted to this month for the current job, so it never goes stale */
export const durationOf = (e: ExperienceItem, locale: Locale) =>
  formatDuration(monthsBetween(e.start, e.end), INTL[locale]);
