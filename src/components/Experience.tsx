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
    const measure = () => {
      const container = timelineRef.current;
      const first = firstIconRef.current;
      const last = lastIconRef.current;
      if (!container || !first || !last) return;
      const containerRect = container.getBoundingClientRect();
      const firstCenter = first.getBoundingClientRect().top + first.offsetHeight / 2 - containerRect.top;
      const lastCenter = last.getBoundingClientRect().top + last.offsetHeight / 2 - containerRect.top;
      setLineInset({ top: firstCenter, bottom: containerRect.height - lastCenter });
    };

    measure();

    // the per-card whileInView reveal moves each icon with a transform
    // (translateY), not a size change, so ResizeObserver never sees it —
    // re-measure on scroll (rAF-throttled) to catch icons settling into
    // their final position as they animate into view
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        measure();
        ticking = false;
      });
    };
    // and a few delayed re-measures to catch the entrance transition
    // finishing even when nothing scrolls afterwards (e.g. already in view)
    const timeouts = [100, 400, 800, 1400].map((t) => window.setTimeout(measure, t));

    window.addEventListener("resize", measure);
    window.addEventListener("scroll", onScroll, { passive: true });
    const ro = new ResizeObserver(measure);
    if (timelineRef.current) ro.observe(timelineRef.current);
    return () => {
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", onScroll);
      timeouts.forEach((id) => window.clearTimeout(id));
      ro.disconnect();
    };
  }, [openId]);

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
                    <div className="text-right text-xs text-gray-500">
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
