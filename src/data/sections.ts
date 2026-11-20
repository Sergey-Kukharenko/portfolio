import { useMemo } from "react";
import { useCanHover } from "../lib/useMediaQuery";
import { plural } from "../lib/plural";
import { stats } from "./stats";

export type Section = {
  id: string;
  /** short label for the nav bar */
  label: string;
  /** command palette entry */
  title: string;
  subtitle: string;
  gradient: string;
  /** hover-driven demo, not rendered on touch devices (see App) */
  hoverOnly?: boolean;
};

export const sections: Section[] = [
  {
    id: "about",
    label: "Обо мне",
    title: "Обо мне",
    subtitle: "Кто я и чем занимаюсь",
    gradient: "from-framer-blue to-framer-purple",
  },
  {
    id: "cases",
    label: "Кейсы",
    title: "Кейсы",
    subtitle: "Flowwow, Myflowers, Inventive Retail",
    gradient: "from-framer-teal to-framer-purple",
  },
  {
    id: "experience",
    label: "Опыт",
    title: "Опыт работы",
    subtitle: `${stats.years} ${plural(stats.years, ["год", "года", "лет"])}, ${stats.companies} ${plural(stats.companies, ["компания", "компании", "компаний"])}`,
    gradient: "from-framer-purple to-framer-pink",
  },
  {
    id: "skills",
    label: "Навыки",
    title: "Навыки",
    subtitle: "Стек, инструменты и палитра",
    gradient: "from-framer-pink to-framer-teal",
  },
  {
    id: "code",
    label: "Код",
    title: "Код",
    subtitle: "JS, TS, Vue, React, Nuxt, Next",
    gradient: "from-framer-blue to-framer-teal",
    hoverOnly: true,
  },
  {
    id: "projects",
    label: "Проекты",
    title: "Проекты",
    subtitle: `${stats.projects} ${plural(stats.projects, ["pet-проект", "pet-проекта", "pet-проектов"])}`,
    gradient: "from-framer-teal to-framer-blue",
  },
  {
    id: "contact",
    label: "Контакты",
    title: "Контакты",
    subtitle: "Telegram, Email, WhatsApp",
    gradient: "from-framer-orange to-framer-pink",
  },
];

/** Sections actually present on this device. */
export function useVisibleSections() {
  const canHover = useCanHover();
  // memoized so consumers can safely use the result as a hook dependency
  return useMemo(() => (canHover ? sections : sections.filter((s) => !s.hoverOnly)), [canHover]);
}
