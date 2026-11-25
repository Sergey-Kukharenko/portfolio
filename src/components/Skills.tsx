import type { ComponentType, SVGProps } from "react";
import { m } from "framer-motion";
import { CodeIcon, ReactIcon, VueIcon, WrenchIcon } from "../icons";
import { primarySkills, skillGroups } from "../data/skills";
import SectionHeading from "./SectionHeading";
import { useLocale } from "../i18n";

const groupIcons: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  core: CodeIcon,
  vue: VueIcon,
  react: ReactIcon,
  tools: WrenchIcon,
};

export default function Skills() {
  const { t, ui } = useLocale();
  return (
    <section id="skills" className="relative mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24">
      <SectionHeading
        title={ui.skills.title}
        description={ui.skills.description}
      />

      <div className="grid gap-4 sm:grid-cols-2">
        {skillGroups.map((group, gi) => {
          const Icon = groupIcons[group.id] ?? CodeIcon;
          return (
          <m.div
            key={group.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: gi * 0.08 }}
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
          >
            <div className="mb-4 flex items-center gap-3">
              <span
                className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${group.gradient} text-white shadow-sm`}
              >
                <Icon width={17} height={17} />
              </span>
              <h3 className="text-sm font-semibold text-white">{t(group.title)}</h3>
              <span className="ml-auto text-xs tabular-nums text-gray-500">{group.skills.length}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {group.skills.map((skill, si) => (
                <m.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: gi * 0.08 + si * 0.03 }}
                  whileHover={{ scale: 1.08, y: -2, backgroundColor: "rgba(255,255,255,0.08)" }}
                  className={`cursor-default rounded-lg border px-2.5 py-1 text-xs font-medium ${
                    primarySkills.has(skill)
                      ? "border-framer-teal/40 bg-framer-teal/10 text-framer-teal"
                      : "border-white/10 bg-white/5 text-gray-200"
                  }`}
                >
                  {skill}
                </m.span>
              ))}
            </div>
          </m.div>
          );
        })}
      </div>

    </section>
  );
}
