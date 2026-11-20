import { useMemo } from "react";
import { useCanHover } from "../lib/useMediaQuery";
import { pluralize, type L } from "../i18n";
import { stats } from "./stats";

export type Section = {
  id: string;
  /** short label for the nav bar */
  label: L;
  /** command palette entry */
  title: L;
  subtitle: L;
  gradient: string;
  /** hover-driven demo, not rendered on touch devices (see App) */
  hoverOnly?: boolean;
};

const same = (v: string): L => ({ ru: v, en: v });
const YEARS = { ru: ["год", "года", "лет"], en: ["year", "years"] } as const satisfies Parameters<typeof pluralize>[2];
const COMPANIES = { ru: ["компания", "компании", "компаний"], en: ["company", "companies"] } as const satisfies Parameters<typeof pluralize>[2];
const PROJECTS = { ru: ["pet-проект", "pet-проекта", "pet-проектов"], en: ["pet project", "pet projects"] } as const satisfies Parameters<typeof pluralize>[2];

export const sections: Section[] = [
  {
    id: "about",
    label: { ru: "Обо мне", en: "About" },
    title: { ru: "Обо мне", en: "About" },
    subtitle: { ru: "Кто я и чем занимаюсь", en: "Who I am and what I do" },
    gradient: "from-framer-blue to-framer-purple",
  },
  {
    id: "cases",
    label: { ru: "Кейсы", en: "Cases" },
    title: { ru: "Кейсы", en: "Case studies" },
    subtitle: same("Flowwow, Myflowers, Inventive Retail"),
    gradient: "from-framer-teal to-framer-purple",
  },
  {
    id: "experience",
    label: { ru: "Опыт", en: "Experience" },
    title: { ru: "Опыт работы", en: "Experience" },
    subtitle: {
      ru: `${stats.years} ${pluralize("ru", stats.years, YEARS)}, ${stats.companies} ${pluralize("ru", stats.companies, COMPANIES)}`,
      en: `${stats.years} ${pluralize("en", stats.years, YEARS)}, ${stats.companies} ${pluralize("en", stats.companies, COMPANIES)}`,
    },
    gradient: "from-framer-purple to-framer-pink",
  },
  {
    id: "skills",
    label: { ru: "Навыки", en: "Skills" },
    title: { ru: "Навыки", en: "Skills" },
    subtitle: { ru: "Стек и инструменты", en: "Stack and tools" },
    gradient: "from-framer-pink to-framer-teal",
  },
  {
    id: "code",
    label: { ru: "Код", en: "Code" },
    title: { ru: "Код", en: "Code" },
    subtitle: same("JS, TS, Vue, React, Nuxt, Next"),
    gradient: "from-framer-blue to-framer-teal",
    hoverOnly: true,
  },
  {
    id: "projects",
    label: { ru: "Проекты", en: "Projects" },
    title: { ru: "Проекты", en: "Projects" },
    subtitle: {
      ru: `${stats.projects} ${pluralize("ru", stats.projects, PROJECTS)}`,
      en: `${stats.projects} ${pluralize("en", stats.projects, PROJECTS)}`,
    },
    gradient: "from-framer-teal to-framer-blue",
  },
  {
    id: "contact",
    label: { ru: "Контакты", en: "Contact" },
    title: { ru: "Контакты", en: "Contact" },
    subtitle: same("Telegram, Email, WhatsApp"),
    gradient: "from-framer-orange to-framer-pink",
  },
];

/** Sections actually present on this device. */
export function useVisibleSections() {
  const canHover = useCanHover();
  // memoized so consumers can safely use the result as a hook dependency
  return useMemo(() => (canHover ? sections : sections.filter((s) => !s.hoverOnly)), [canHover]);
}
