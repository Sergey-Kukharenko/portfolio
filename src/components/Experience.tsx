import { useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { experience } from "../data/experience";
import { BriefcaseIcon, ExternalLinkIcon } from "../icons";
import SectionHeading from "./SectionHeading";

export default function Experience() {
  const [openId, setOpenId] = useState<string | null>(experience[0]?.id ?? null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const firstIconRef = useRef<HTMLSpanElement>(null);
  const lastIconRef = useRef<HTMLSpanElement>(null);
  // the line's top/bottom insets used to be guessed in px, which drifted
  // away from the actual icon centers (especially the first card, open by
  // default, and the last one, whose height depends on what's above it) —
  // measure the real icon positions instead
  const [lineInset, setLineInset] = useState({ top: 8, bottom: 8 });

  useLayoutEffect(() => {
    const container = timelineRef.current;
    if (!container) return;

    // offsetTop/offsetHeight are layout values and ignore CSS transforms, so the
    // whileInView translateY reveal doesn't skew them — measuring the final
    // resting position directly, no scroll listener or delayed re-measures needed
    const centerOf = (icon: HTMLElement) => {
      const li = icon.offsetParent as HTMLElement; // icon is absolute inside its <li>
      return li.offsetTop + icon.offsetTop + icon.offsetHeight / 2;
    };

    const measure = () => {
      const first = firstIconRef.current;
      const last = lastIconRef.current;
      if (!first || !last) return;
      const top = centerOf(first);
      const bottom = container.offsetHeight - centerOf(last);
      // bail out when nothing changed so React skips the re-render
      setLineInset((prev) => (prev.top === top && prev.bottom === bottom ? prev : { top, bottom }));
    };

    measure();
    // container height changes when a card opens/closes or the viewport resizes
    const ro = new ResizeObserver(measure);
    ro.observe(container);
    return () => ro.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 0.8", "end 0.55"],
  });
  const lineProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, mass: 0.3 });

  return (
    <section id="experience" className="relative mx-auto max-w-4xl px-4 py-24 sm:px-6">
      <SectionHeading
        eyebrow="Опыт работы"
        title="12 лет — от вёрстки до архитектуры"
        description="Путь от HTML/CSS-верстальщика до Senior / Lead Frontend Developer в e-commerce."
      />

      <div ref={timelineRef} className="relative">
        {/* faint full-length track showing the whole path, with the actual
            gradient drawing itself on top as you scroll through the story —
            top/bottom come from the measured centers of the first and last
            icons, not guessed pixels, so it never overshoots them */}
        <div
          className="absolute left-[15px] w-px bg-white/10 sm:left-[19px]"
          style={{ top: lineInset.top, bottom: lineInset.bottom }}
        />
        <motion.div
          className="absolute left-[15px] w-px origin-top bg-gradient-to-b from-framer-blue via-framer-purple to-framer-pink sm:left-[19px]"
          style={{ top: lineInset.top, bottom: lineInset.bottom, scaleY: lineProgress }}
        />

        <ul className="flex flex-col gap-3">
          {experience.map((exp, i) => {
            const isOpen = openId === exp.id;
            return (
              <motion.li
                key={exp.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="relative pl-10 sm:pl-14"
              >
                <motion.span
                  ref={i === 0 ? firstIconRef : i === experience.length - 1 ? lastIconRef : undefined}
                  className={`absolute left-0 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br ${exp.gradient} text-white shadow-glow sm:h-10 sm:w-10`}
                  whileHover={{ scale: 1.1, rotate: 8 }}
                >
                  <BriefcaseIcon width={14} height={14} />
                </motion.span>

                <motion.button
                  type="button"
                  onClick={() => setOpenId(isOpen ? null : exp.id)}
                  layout
                  className={`w-full rounded-2xl border px-4 py-4 text-left backdrop-blur-md transition-colors sm:px-5 ${
                    isOpen
                      ? "border-white/15 bg-white/[0.06]"
                      : "border-white/10 bg-white/[0.02] hover:bg-white/[0.04]"
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-semibold text-white sm:text-lg">
                          {exp.company}
                        </h3>
                        {exp.url && (
                          <a
                            href={exp.url}
                            target="_blank"
                            rel="noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="text-gray-500 hover:text-framer-teal"
                          >
                            <ExternalLinkIcon width={12} height={12} />
                          </a>
                        )}
                      </div>
                      <p className="text-sm text-gray-400">{exp.role}</p>
                    </div>
                    <div className="text-left text-xs text-gray-500 sm:text-right">
                      <p>{exp.period}</p>
                      <p>{exp.duration}</p>
                    </div>
                  </div>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <ul className="mt-4 flex flex-col gap-2 border-t border-white/10 pt-4">
                          {exp.points.map((p) => (
                            <li key={p} className="flex gap-2 text-sm text-gray-400">
                              <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-framer-purple" />
                              {p}
                            </li>
                          ))}
                        </ul>
                        <div className="mt-4 flex flex-wrap gap-1.5">
                          {exp.stack.map((s) => (
                            <span
                              key={s}
                              className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] text-gray-300"
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
