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
        "Развитие и поддержка frontend-части e-commerce продукта с выходом на международный рынок",
        "Рефакторинг сложных участков legacy-кода, глубокая оптимизация клиентской логики",
      ],
      en: [
        "Developing and maintaining the frontend of an e-commerce product expanding internationally",
        "Refactoring complex legacy code, deep optimization of client-side logic",
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
        "Взаимодействовал с backend-разработчиками, дизайнерами и бизнесом",
      ],
      en: [
        "Worked closely with backend developers, designers and the business",
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
        "Плотно взаимодействовал с backend-командой, дизайнерами и бизнесом",
        "Дополнительно разработал внутренний корпоративный портал сотрудников на React",
      ],
      en: [
        "Worked closely with the backend team, designers and the business",
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
        "Реализовывал адаптивные и кроссбраузерные интерфейсы",
        "Создавал интерактивные элементы, калькуляторы и конфигураторы",
        "Интегрировал frontend с CMS (WordPress, Bitrix)",
      ],
      en: [
        "Built and maintained client websites and promo projects",
        "Delivered responsive, cross-browser interfaces",
        "Created interactive elements, calculators and configurators",
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
        "Работал над внутренним проектом Samsung",
        "Разрабатывал новые страницы и UI-компоненты, улучшал пользовательские сценарии",
        "Проводил рефакторинг структуры и логики страниц",
        "Обеспечивал адаптивность и кроссбраузерную работу интерфейсов",
      ],
      en: [
        "Worked on an internal Samsung project",
        "Built new pages and UI components, improved user flows",
        "Refactored page structure and logic",
        "Kept interfaces responsive and cross-browser",
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
        "Разрабатывал сайты и landing-pages для коммерческих клиентов",
        "Реализовывал адаптивные интерфейсы и интерактивную логику, анимации",
        "Участвовал в полном цикле разработки: от вёрстки до внедрения логики интерфейса",
      ],
      en: [
        "Built websites and landing pages for commercial clients",
        "Implemented responsive interfaces, interactive logic and animations",
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
        "Верстал коммерческие сайты и лендинги по дизайн-макетам",
        "Обеспечивал кроссбраузерную совместимость (включая IE8+)",
        "Реализовывал адаптивную и блочную вёрстку, подключал JS-логику",
        "Первый коммерческий опыт разработки в реальных клиентских проектах",
      ],
      en: [
        "Built commercial websites and landing pages from design mockups",
        "Ensured cross-browser compatibility (including IE8+)",
        "Built responsive, component-based markup and wired up JS logic",
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
