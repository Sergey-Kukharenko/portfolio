import type { ComponentType, SVGProps } from "react";
import { m } from "framer-motion";
import { CodeIcon, ReactLogo, VueLogo, WrenchIcon } from "../icons";
import { primarySkills, skillGroups } from "../data/skills";
import SectionHeading from "./SectionHeading";
import { useLocale } from "../i18n";

type Icon = ComponentType<SVGProps<SVGSVGElement>>;

const groupIcons: Record<string, Icon> = {
  core: CodeIcon,
  tools: WrenchIcon,
};

/** The two framework groups wear their own brand instead of the site gradient:
    the real logos on the dark tiles their sites use. */
const brandTiles: Record<string, { Icon: Icon; className: string; size: number }> = {
  vue: { Icon: VueLogo, className: "border border-[#41B883]/30 bg-[#1a1a1a]", size: 18 },
  react: { Icon: ReactLogo, className: "border border-[#58C4DC]/30 bg-[#23272f]", size: 20 },
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
          const brand = brandTiles[group.id];
          const Icon = brand?.Icon ?? groupIcons[group.id] ?? CodeIcon;
          const size = brand?.size ?? 17;
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
                className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl shadow-sm ${
                  brand ? brand.className : `bg-gradient-to-br ${group.gradient} text-white`
                }`}
              >
                <Icon width={size} height={size} />
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
