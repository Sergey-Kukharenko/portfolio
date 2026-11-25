import type { L } from "../i18n";

export type SkillGroup = {
  id: string;
  title: L;
  gradient: string;
  skills: string[];
};

/** The main stack — highlighted among the rest: Vue / Nuxt in production, React / Next.js in my own projects. */
export const primarySkills = new Set(["TypeScript", "Vue 2/3", "Nuxt 2–4", "React", "Next.js"]);

export const skillGroups: SkillGroup[] = [
  {
    id: "core",
    title: { ru: "Язык и вёрстка", en: "Language and markup" },
    gradient: "from-framer-blue to-framer-teal",
    skills: ["HTML5", "CSS3", "SCSS", "JavaScript", "TypeScript"],
  },
  {
    id: "vue",
    title: { ru: "Vue-экосистема", en: "Vue ecosystem" },
    gradient: "from-framer-purple to-framer-pink",
    skills: ["Vue 2/3", "Nuxt 2–4", "Vuex", "Pinia"],
  },
  {
    id: "react",
    title: { ru: "React-экосистема", en: "React ecosystem" },
    gradient: "from-framer-pink to-framer-red",
    skills: ["React", "Next.js", "Redux", "Zustand"],
  },
  {
    id: "tools",
    title: { ru: "Инструменты и API", en: "Tools and APIs" },
    gradient: "from-framer-orange to-framer-teal",
    skills: ["Webpack", "Vite", "REST API", "Figma", "Adobe Photoshop", "MongoDB", "Mongoose", "Git"],
  },
];
