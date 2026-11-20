import type { ReactNode } from "react";
import { plural } from "../lib/plural";

const years = (n: number) => plural(n, ["год", "года", "лет"]);
const enYears = (n: number) => (n === 1 ? "year" : "years");

const Teal = ({ children }: { children: ReactNode }) => <span className="text-framer-teal">{children}</span>;
const Pink = ({ children }: { children: ReactNode }) => <span className="text-framer-pink">{children}</span>;
const Mono = ({ children }: { children: ReactNode }) => (
  <span className="font-mono text-[0.95em] text-violet-300">{children}</span>
);
const Strong = ({ children }: { children: ReactNode }) => <span className="font-semibold text-white">{children}</span>;

/** Interface strings. `en` is typed as `typeof ru`, so a missing translation fails the build. */
const ru = {
  name: "Сергей Кухаренко",
  hero: {
    status: "Открыт для новых проектов",
    intro: (n: number) =>
      `${n}+ ${years(n)} создаю быстрые и аккуратные e-commerce и корпоративные интерфейсы на Vue/Nuxt и React. От вёрстки лендингов до архитектуры и найма команды — прошёл весь путь.`,
    viewProjects: "Смотреть проекты",
    telegram: "Написать в Telegram",
    statYears: (n: number) => `${years(n)} в разработке`,
    statCompanies: (n: number) => plural(n, ["компания", "компании", "компаний"]),
    statLead: (n: number) => `${years(n)} в роли Lead`,
    scrollDown: "Прокрутить вниз",
  },
  about: {
    title: "Кто я и чем занимаюсь",
    paragraphs: (n: number): ReactNode[] => [
      <>
        Senior / Lead Frontend Developer с более чем{" "}
        <Strong>
          {n} {plural(n, ["годом", "годами", "годами"])} опыта
        </Strong>{" "}
        в разработке e-commerce и корпоративных веб-приложений.
      </>,
      <>
        В продакшене — <Teal>Vue / Nuxt / TypeScript</Teal>. <Pink>React-экосистему</Pink> (React, Next.js,
        Redux, Zustand) применял в коммерческой работе и продолжаю развивать в своих проектах — этот сайт
        тоже на React.
      </>,
      <>
        Есть опыт роли Lead: архитектура проектов, code review, найм и менторинг разработчиков, прямое
        взаимодействие с бизнесом.
      </>,
      <>
        <Strong>Arc.</Strong> — сокращение от Architect: сначала структура, потом код. Отсюда и{" "}
        <Mono>Arc&lt;T&gt;</Mono> — тот же знак как дженерик, где T — то, что строится: код, решения, жизнь.
      </>,
    ],
    facts: [
      { label: "Формат", value: "Удалённо · МСК (UTC+3)" },
      { label: "Специализация", value: "Vue / Nuxt, React" },
      { label: "Роль", value: "Senior / Lead Frontend" },
      { label: "Английский", value: "B1 — Intermediate" },
    ],
  },
  cases: {
    title: "Кейсы",
    description: "Три истории из коммерческой работы: задача, решение, результат.",
    solution: "Решение",
    result: "Результат",
  },
  experience: {
    title: (n: number) => `${n} ${years(n)} — от вёрстки до архитектуры`,
    description: "Путь от HTML/CSS-верстальщика до Senior / Lead Frontend Developer в e-commerce.",
    present: "настоящее время",
    toggle: (company: string, open: boolean) => `${company} — ${open ? "свернуть" : "подробнее"}`,
    site: (company: string) => `Сайт ${company}`,
    caseLink: (title: string) => `Кейс: «${title}» →`,
  },
  skills: {
    title: "Стек и инструменты",
    description: "От вёрстки до архитектуры — то, с чем я работаю каждый день.",
  },
  code: {
    title: "JS, TS, Vue, React, Nuxt, Next — один стиль мышления",
    description: "Рекурсия — потому что хорошая архитектура умеет повторять себя. Наведите на блок кода.",
  },
  palette: {
    title: "Палитра Framer Motion",
    hint: "Нажмите на цвет, чтобы скопировать hex-код — вся палитра сайта построена на этих семи оттенках Framer.",
  },
  projects: {
    title: "Вне работы — React / Next.js",
    description:
      "В продакшене я пишу на Vue / Nuxt, а React-экосистему развиваю в своих проектах, чтобы не стоять на месте. Нажмите на карточку, чтобы узнать подробнее.",
    all: "Все",
    showAll: (n: number) => `Показать все ${n}`,
    showLess: "Свернуть",
    more: "Подробнее",
    close: "Закрыть",
    features: "Что реализовано",
    demo: "Открыть демо",
    code: "Код на GitHub",
  },
  contact: {
    title: "Готов обсудить проект",
    description: "Открыт к предложениям по удалённой работе. Отвечаю быстрее всего в Telegram.",
    copy: (label: string, value: string) => `Скопировать ${label}: ${value}`,
  },
  copied: (what: string) => `Скопировано · ${what}`,
  copyFailed: "Не удалось скопировать",
  island: {
    navigation: "Навигация: ",
    openSearch: "Открыть поиск",
    close: "Закрыть навигацию",
    sections: "Разделы",
    here: "вы здесь",
    search: "Поиск по сайту",
  },
  footer: {
    line: (year: number) => `© ${year} Сергей Кухаренко · Удалённо, UTC+3`,
  },
  /** label of the link to the *other* language */
  switchTo: "English",
  command: {
    label: "Быстрый переход",
    placeholders: ["Найти проект…", "Перейти в раздел…", "Найти компанию из опыта…", "Написать в Telegram…"],
    clear: "Очистить",
    empty: "Ничего не найдено",
    tryAnother: (q: string) => `Попробуйте другой запрос — «${q}»`,
    navigate: "для навигации",
    select: "выбрать",
    open: "открыть",
    categories: { actions: "Действия", sections: "Разделы", projects: "Проекты", experience: "Опыт" },
    top: "Наверх страницы",
    topHint: "Вернуться к началу",
  },
};

const en: typeof ru = {
  name: "Sergey Kukharenko",
  hero: {
    status: "Open to new projects",
    intro: (n) =>
      `${n}+ years building fast, polished e-commerce and enterprise interfaces with Vue/Nuxt and React. From landing pages to architecture and hiring a team — I've walked the whole path.`,
    viewProjects: "View projects",
    telegram: "Message on Telegram",
    statYears: (n) => `${enYears(n)} in frontend`,
    statCompanies: (n) => (n === 1 ? "company" : "companies"),
    statLead: (n) => `${enYears(n)} as Lead`,
    scrollDown: "Scroll down",
  },
  about: {
    title: "Who I am and what I do",
    paragraphs: (n) => [
      <>
        Senior / Lead Frontend Developer with{" "}
        <Strong>
          {n}+ {enYears(n)} of experience
        </Strong>{" "}
        building e-commerce and enterprise web applications.
      </>,
      <>
        In production — <Teal>Vue / Nuxt / TypeScript</Teal>. The <Pink>React ecosystem</Pink> (React,
        Next.js, Redux, Zustand) I've used in commercial work and keep growing in my own projects — this site
        is React too.
      </>,
      <>
        Lead experience: project architecture, code review, hiring and mentoring developers, working directly with
        the business.
      </>,
      <>
        <Strong>Arc.</Strong> is short for Architect: structure first, then code. Hence <Mono>Arc&lt;T&gt;</Mono> —
        the same mark as a generic, where T is whatever is being built: code, decisions, life.
      </>,
    ],
    facts: [
      { label: "Format", value: "Remote · UTC+3" },
      { label: "Focus", value: "Vue / Nuxt, React" },
      { label: "Role", value: "Senior / Lead Frontend" },
      { label: "English", value: "B1 — Intermediate" },
    ],
  },
  cases: {
    title: "Case studies",
    description: "Three stories from commercial work: the task, the solution, the result.",
    solution: "Solution",
    result: "Result",
  },
  experience: {
    title: (n) => `${n} ${enYears(n)} — from markup to architecture`,
    description: "From HTML/CSS developer to Senior / Lead Frontend Developer in e-commerce.",
    present: "present",
    toggle: (company, open) => `${company} — ${open ? "collapse" : "details"}`,
    site: (company) => `${company} website`,
    caseLink: (title) => `Case study: “${title}” →`,
  },
  skills: {
    title: "Stack and tools",
    description: "From markup to architecture — what I work with every day.",
  },
  code: {
    title: "JS, TS, Vue, React, Nuxt, Next — one way of thinking",
    description: "Recursion — because good architecture knows how to repeat itself. Hover over the code.",
  },
  palette: {
    title: "The Framer Motion palette",
    hint: "Click a color to copy its hex code — the whole site is built on these seven Framer shades.",
  },
  projects: {
    title: "Outside work — React / Next.js",
    description:
      "In production I write Vue / Nuxt; the React ecosystem I keep growing in my own projects, so I never stand still. Click a card for details.",
    all: "All",
    showAll: (n) => `Show all ${n}`,
    showLess: "Show less",
    more: "Details",
    close: "Close",
    features: "What's built",
    demo: "Open demo",
    code: "Code on GitHub",
  },
  contact: {
    title: "Let's talk about your project",
    description: "Open to remote opportunities. Telegram is the fastest way to reach me.",
    copy: (label, value) => `Copy ${label}: ${value}`,
  },
  copied: (what) => `Copied · ${what}`,
  copyFailed: "Couldn't copy",
  island: {
    navigation: "Navigation: ",
    openSearch: "Open search",
    close: "Close navigation",
    sections: "Sections",
    here: "you are here",
    search: "Search the site",
  },
  footer: {
    line: (year) => `© ${year} Sergey Kukharenko · Remote, UTC+3`,
  },
  switchTo: "Русский",
  command: {
    label: "Quick jump",
    placeholders: ["Find a project…", "Jump to a section…", "Find a company…", "Message on Telegram…"],
    clear: "Clear",
    empty: "Nothing found",
    tryAnother: (q) => `Try another query — “${q}”`,
    navigate: "to navigate",
    select: "select",
    open: "open",
    categories: { actions: "Actions", sections: "Sections", projects: "Projects", experience: "Experience" },
    top: "Back to top",
    topHint: "Return to the start",
  },
};

export const ui = { ru, en };
