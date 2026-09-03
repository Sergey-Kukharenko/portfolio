import { motion } from "framer-motion";
import { skillGroups } from "../data/skills";
import SectionHeading from "./SectionHeading";
import ColorPalette from "./ColorPalette";

export default function Skills() {
  return (
    <section id="skills" className="relative mx-auto max-w-5xl px-4 py-24 sm:px-6">
      <SectionHeading
        eyebrow="Навыки"
        title="Стек и инструменты"
        description="От вёрстки до архитектуры — то, с чем я работаю каждый день."
      />

      <div className="mb-14 grid gap-4 sm:grid-cols-2">
        {skillGroups.map((group, gi) => (
          <motion.div
            key={group.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: gi * 0.08 }}
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-md"
          >
            <div className="mb-4 flex items-center gap-2">
              <span className={`h-2 w-2 rounded-full bg-gradient-to-r ${group.gradient}`} />
              <h3 className="text-sm font-semibold text-white">{group.title}</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {group.skills.map((skill, si) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: gi * 0.08 + si * 0.03 }}
                  whileHover={{ scale: 1.08, y: -2, backgroundColor: "rgba(255,255,255,0.08)" }}
                  className="cursor-default rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-medium text-gray-200"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <ColorPalette />
    </section>
  );
}
