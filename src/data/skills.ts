export type SkillGroup = {
  id: string;
  title: string;
  gradient: string;
  skills: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    id: "core",
    title: "Язык и вёрстка",
    gradient: "from-framer-blue to-framer-teal",
    skills: ["HTML5", "CSS3", "SCSS", "JavaScript", "TypeScript"],
  },
  {
    id: "vue",
    title: "Vue-экосистема",
    gradient: "from-framer-purple to-framer-pink",
    skills: ["Vue 2", "Vue 3", "Nuxt 2", "Nuxt 3", "Nuxt 4", "Vuex", "Pinia"],
  },
  {
    id: "react",
    title: "React-экосистема",
    gradient: "from-framer-pink to-framer-red",
    skills: ["React", "Next.js", "Redux", "Zustand"],
  },
  {
    id: "tools",
    title: "Инструменты и API",
    gradient: "from-framer-orange to-framer-teal",
    skills: ["Webpack", "Vite", "REST API", "Figma", "Adobe Photoshop", "MongoDB", "Mongoose", "Git"],
  },
];
