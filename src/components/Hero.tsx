import { useRef } from "react";
import { m, useInView, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowUpIcon, SendIcon, SparkleIcon } from "../icons";
import Magnetic from "./Magnetic";
import Counter from "./Counter";
import BrandLine from "./BrandLine";
import { telegram } from "../data/contacts";
import { stats } from "../data/stats";
import { scrollToSection as scrollTo } from "../lib/navigation";
import { useLocale } from "../i18n";

const blobs = [
  { className: "bg-framer-purple", top: "-10%", left: "5%", size: 520, delay: 0 },
  { className: "bg-framer-pink", top: "35%", left: "62%", size: 480, delay: 1.2 },
  { className: "bg-framer-blue", top: "60%", left: "-5%", size: 460, delay: 2.4 },
  { className: "bg-framer-teal", top: "5%", left: "72%", size: 340, delay: 0.6 },
];

// The hero's staggered entrance is plain CSS (.hero-enter in index.css), not
// framer-motion: the page is prerendered, and a CSS animation starts with the
// very first paint of that HTML — before any JS has loaded — whereas a motion
// `initial` would ship the text as opacity:0 until hydration.
const enter = (i: number) => ({ animationDelay: `${0.1 + i * 0.09}s` });

export default function Hero() {
  const { ui } = useLocale();
  const prefersReducedMotion = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  // four huge blurred blobs are expensive to repaint — only loop them while
  // the hero is on screen, otherwise let them settle and go idle
  const heroInView = useInView(heroRef);
  const blobsAnimate = !prefersReducedMotion && heroInView;
  // background drifts down slower than the page scrolls past it, and fades
  // out — a light parallax touch, kept to just this one section on purpose
  const blobsY = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const blobsOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={heroRef}
      id="top"
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-24"
    >
      <m.div
        className="pointer-events-none absolute inset-0"
        style={prefersReducedMotion ? undefined : { y: blobsY, opacity: blobsOpacity }}
      >
        {blobs.map((b, i) => (
          <m.div
            key={i}
            className={`absolute rounded-full ${b.className} opacity-30 blur-3xl mix-blend-screen`}
            style={{ top: b.top, left: b.left, width: b.size, height: b.size }}
            animate={
              blobsAnimate
                ? { x: [0, 40, -20, 0], y: [0, -30, 20, 0], scale: [1, 1.15, 0.95, 1] }
                : { x: 0, y: 0, scale: 1 }
            }
            transition={
              blobsAnimate
                ? { duration: 16, delay: b.delay, repeat: Infinity, ease: "easeInOut" }
                : { duration: 0.6 }
            }
          />
        ))}
      </m.div>

      <div
        className="relative z-10 mx-auto flex max-w-4xl flex-col items-center gap-6 px-4 text-center sm:px-6"
      >
        <span
          style={enter(0)}
          className="hero-enter flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-gray-400"
        >
          <SparkleIcon width={12} height={12} className="text-framer-teal" />
          {ui.hero.status}
        </span>

        <h1
          style={enter(1)}
          data-cursor-invert
          className="hero-enter max-w-3xl text-4xl font-bold leading-[1.1] tracking-tight sm:text-6xl"
        >
          {ui.name} —{" "}
          <span className="bg-gradient-to-r from-framer-blue via-framer-purple to-framer-pink bg-clip-text text-transparent">
            Senior Frontend
          </span>{" "}
          Developer
        </h1>

        <div
          style={enter(2)}
          className="hero-enter flex min-h-[1.5em] flex-wrap items-center justify-center gap-x-3 gap-y-1 text-sm sm:gap-x-4 sm:text-base"
        >
          <BrandLine />
        </div>

        <p style={enter(3)} className="hero-enter max-w-2xl text-base text-gray-400 sm:text-lg">
          {ui.hero.intro(stats.years)}
        </p>

        <div style={enter(4)} className="hero-enter flex flex-wrap items-center justify-center gap-3">
          <Magnetic strength={0.4} className="inline-block">
            <m.button
              type="button"
              onClick={() => scrollTo("projects")}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="rounded-xl bg-gradient-to-r from-framer-blue via-framer-purple to-framer-pink px-5 py-3 text-sm font-semibold text-white shadow-glow"
            >
              {ui.hero.viewProjects}
            </m.button>
          </Magnetic>

          <Magnetic strength={0.4} className="inline-block">
            <m.a
              href={telegram.href}
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white backdrop-blur-md"
            >
              <SendIcon width={14} height={14} />
              {ui.hero.telegram}
            </m.a>
          </Magnetic>
        </div>

        <div
          style={enter(5)}
          className="hero-enter mt-6 grid grid-cols-3 gap-6 rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-4 backdrop-blur-md sm:gap-10 sm:px-10"
        >
          {[
            {
              value: stats.years,
              suffix: "+",
              label: ui.hero.statYears(stats.years),
            },
            {
              value: stats.companies,
              suffix: "",
              label: ui.hero.statCompanies(stats.companies),
            },
            {
              value: stats.leadYears,
              suffix: "",
              label: ui.hero.statLead(stats.leadYears),
            },
          ].map((s) => (
            <div key={s.label} className="flex flex-col items-center">
              <span className="bg-gradient-to-r from-framer-blue to-framer-teal bg-clip-text text-2xl font-bold text-transparent sm:text-3xl">
                <Counter value={s.value} suffix={s.suffix} />
              </span>
              <span className="text-[11px] text-gray-300 sm:text-xs">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      <m.button
        type="button"
        onClick={() => scrollTo("about")}
        aria-label={ui.hero.scrollDown}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-gray-500"
        animate={prefersReducedMotion ? undefined : { y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      >
        <ArrowUpIcon width={18} height={18} className="rotate-180" />
      </m.button>
    </section>
  );
}
