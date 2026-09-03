import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";

const facts = [
  { label: "Локация", value: "Москва, удалённо" },
  { label: "Специализация", value: "Vue / Nuxt, React" },
  { label: "Роль", value: "Senior / Lead Frontend" },
  { label: "Английский", value: "B1 — Intermediate" },
];

export default function About() {
  return (
    <section id="about" className="relative mx-auto max-w-5xl px-4 py-24 sm:px-6">
      <SectionHeading eyebrow="Обо мне" title="Кто я и чем занимаюсь" />

      <div className="grid gap-8 md:grid-cols-5">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="md:col-span-3"
        >
          <p className="text-base leading-relaxed text-gray-300 sm:text-lg">
            Senior / Lead Frontend Developer с более чем{" "}
            <span className="font-semibold text-white">11 годами опыта</span> в разработке
            e-commerce и корпоративных веб-приложений.
          </p>
          <p className="mt-4 text-base leading-relaxed text-gray-400 sm:text-lg">
            Основной стек — <span className="text-framer-teal">Vue / Nuxt / TypeScript</span>.
            Также есть опыт работы с <span className="text-framer-pink">React-экосистемой</span>:
            React, Next.js, Redux, Zustand.
          </p>
          <p className="mt-4 text-base leading-relaxed text-gray-400 sm:text-lg">
            Есть опыт роли Lead: архитектура проектов, code review, найм и менторинг
            разработчиков, прямое взаимодействие с бизнесом.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-2 gap-3 md:col-span-2 md:grid-cols-1"
        >
          {facts.map((f, i) => (
            <motion.div
              key={f.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.15 + i * 0.08 }}
              whileHover={{ y: -3, borderColor: "rgba(136,85,255,0.4)" }}
              className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 backdrop-blur-md"
            >
              <p className="text-[11px] uppercase tracking-wider text-gray-500">{f.label}</p>
              <p className="mt-1 text-sm font-semibold text-white">{f.value}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
