import { useRef, useState } from "react";
import { AnimatePresence, m, useScroll, useSpring } from "framer-motion";
import { durationOf, experience, periodOf } from "../data/experience";
import { cases } from "../data/cases";
import { scrollToSection } from "../lib/navigation";
import { ExternalLinkIcon } from "../icons";
import SectionHeading from "./SectionHeading";
import { BulletList } from "./ui/BulletList";
import { TagList } from "./ui/Tag";
import { stats } from "../data/stats";
import { useLocale } from "../i18n";
import { useIsomorphicLayoutEffect } from "../lib/useIsomorphicLayoutEffect";

const caseFor = (id: string) => cases.find((c) => c.id === id);

export default function Experience() {
  const { locale, t, ui } = useLocale();
  const [openId, setOpenId] = useState<string | null>(experience[0]?.id ?? null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const firstIconRef = useRef<HTMLSpanElement>(null);
  const lastIconRef = useRef<HTMLSpanElement>(null);
  // the line's top/bottom insets used to be guessed in px, which drifted
  // away from the actual icon centers (especially the first card, open by
  // default, and the last one, whose height depends on what's above it) —
  // measure the real icon positions instead
  const [lineInset, setLineInset] = useState({ top: 8, bottom: 8 });

  useIsomorphicLayoutEffect(() => {
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
        title={ui.experience.title(stats.years)}
        description={ui.experience.description}
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
        <m.div
          className="absolute left-[15px] w-px origin-top bg-gradient-to-b from-framer-blue via-framer-purple to-framer-pink sm:left-[19px]"
          style={{ top: lineInset.top, bottom: lineInset.bottom, scaleY: lineProgress }}
        />

        <ul className="flex flex-col gap-3">
          {experience.map((exp, i) => {
            const isOpen = openId === exp.id;
            return (
              <m.li
                key={exp.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="relative pl-10 sm:pl-14"
              >
                <m.span
                  ref={i === 0 ? firstIconRef : i === experience.length - 1 ? lastIconRef : undefined}
                  className={`absolute left-0 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br ${exp.gradient} text-sm font-bold text-white shadow-glow sm:h-10 sm:w-10 sm:text-base`}
                  whileHover={{ scale: 1.1, rotate: 8 }}
                >
                  <span aria-hidden>{exp.company[0].toUpperCase()}</span>
                </m.span>

                <m.div
                  layout
                  className={`relative w-full rounded-2xl border px-4 py-4 text-left transition-colors sm:px-5 ${
                    isOpen
                      ? "border-white/15 bg-white/[0.06]"
                      : "border-white/10 bg-white/[0.02] hover:bg-white/[0.04]"
                  }`}
                >
                  {/* "stretched button": an invisible toggle covering the whole card.
                      The content sits above it with pointer-events off, so a click
                      anywhere still toggles — while the external link stays a real,
                      separately clickable <a> instead of being nested in a <button>
                      (invalid HTML, confusing for screen readers) */}
                  <button
                    type="button"
                    onClick={() => setOpenId(isOpen ? null : exp.id)}
                    aria-expanded={isOpen}
                    aria-controls={`exp-${exp.id}`}
                    aria-label={ui.experience.toggle(exp.company, isOpen)}
                    className="absolute inset-0 rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-framer-purple/60"
                  />
                  <div className="pointer-events-none relative flex flex-wrap items-center justify-between gap-2">
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
                            aria-label={ui.experience.site(exp.company)}
                            className="pointer-events-auto text-gray-500 hover:text-framer-teal"
                          >
                            <ExternalLinkIcon width={12} height={12} />
                          </a>
                        )}
                      </div>
                      <p className="text-sm text-gray-400">{exp.role}</p>
                    </div>
                    <div className="text-left text-xs text-gray-500 sm:text-right">
                      <p>{periodOf(exp, locale)}</p>
                      {/* counted to the current month: the prerendered HTML may be a month behind */}
                      <p suppressHydrationWarning>{durationOf(exp, locale)}</p>
                    </div>
                  </div>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <m.div
                        id={`exp-${exp.id}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="pointer-events-none relative overflow-hidden"
                      >
                        <BulletList items={t(exp.points)} className="mt-4 border-t border-white/10 pt-4" />
                        {/* the full story lives in the case study — link instead of repeating it */}
                        {caseFor(exp.id) && (
                          <button
                            type="button"
                            onClick={() => scrollToSection(`case-${exp.id}`)}
                            className="pointer-events-auto mt-3 text-sm text-framer-teal hover:underline"
                          >
                            {ui.experience.caseLink(t(caseFor(exp.id)!.title))}
                          </button>
                        )}
                        <div className="mt-4">
                          <TagList items={exp.stack} />
                        </div>
                      </m.div>
                    )}
                  </AnimatePresence>
                </m.div>
              </m.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
