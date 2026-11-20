import { formatDuration, formatMonth, monthsBetween, type YearMonth } from "../lib/dates";

export type ExperienceItem = {
  id: string;
  company: string;
  role: string;
  /** first month in the role */
  start: YearMonth;
  /** last month; absent while it's the current job */
  end?: YearMonth;
  url?: string;
  points: string[];
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
    points: [
      "Развитие и поддержка frontend-части e-commerce продукта с выходом на международный рынок",
      "Рефакторинг сложных участков legacy-кода, глубокая оптимизация клиентской логики",
    ],
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
    points: [
      "Взаимодействовал с backend-разработчиками, дизайнерами и бизнесом",
    ],
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
    points: [
      "Плотно взаимодействовал с backend-командой, дизайнерами и бизнесом",
      "Дополнительно разработал внутренний корпоративный портал сотрудников на React",
    ],
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
    points: [
      "Разрабатывал и поддерживал клиентские сайты и промо-проекты",
      "Реализовывал адаптивные и кроссбраузерные интерфейсы",
      "Создавал интерактивные элементы, калькуляторы и конфигураторы",
      "Интегрировал frontend с CMS (WordPress, Bitrix)",
    ],
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
    points: [
      "Работал над внутренним проектом Samsung",
      "Разрабатывал новые страницы и UI-компоненты, улучшал пользовательские сценарии",
      "Проводил рефакторинг структуры и логики страниц",
      "Обеспечивал адаптивность и кроссбраузерную работу интерфейсов",
    ],
    stack: ["HTML5", "CSS3", "JavaScript", "SVG-анимации"],
    gradient: "from-framer-orange to-framer-teal",
  },
  {
    id: "mokselle",
    company: "Mokselle",
    role: "HTML/CSS Developer, Frontend Developer",
    start: [2015, 6],
    end: [2016, 9],
    url: "https://mokselle.ru",
    points: [
      "Разрабатывал сайты и landing-pages для коммерческих клиентов",
      "Реализовывал адаптивные интерфейсы и интерактивную логику, анимации",
      "Участвовал в полном цикле разработки: от вёрстки до внедрения логики интерфейса",
    ],
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
    points: [
      "Верстал коммерческие сайты и лендинги по дизайн-макетам",
      "Обеспечивал кроссбраузерную совместимость (включая IE8+)",
      "Реализовывал адаптивную и блочную вёрстку, подключал JS-логику",
      "Первый коммерческий опыт разработки в реальных клиентских проектах",
    ],
    stack: ["HTML5", "CSS3", "JavaScript", "jQuery"],
    gradient: "from-framer-blue to-framer-purple",
  },
];

/** "Октябрь 2025 — настоящее время" */
export const periodOf = (e: ExperienceItem, locale = "ru-RU") =>
  `${formatMonth(e.start, locale)} — ${e.end ? formatMonth(e.end, locale) : "настоящее время"}`;

/** "1 год 2 месяца" — counted to this month for the current job, so it never goes stale */
export const durationOf = (e: ExperienceItem, locale = "ru-RU") => formatDuration(monthsBetween(e.start, e.end), locale);
