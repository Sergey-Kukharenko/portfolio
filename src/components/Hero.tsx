import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowUpIcon, CommandIcon, SendIcon, SparkleIcon } from "../icons";
import Magnetic from "./Magnetic";
import Counter from "./Counter";
import Typewriter from "./Typewriter";

const ROLES = [
  "Senior Frontend Developer",
  "Vue / Nuxt Architect",
  "React & Next.js Engineer",
  "whoami → Architect",
];

const blobs = [
  { className: "bg-framer-purple", top: "-10%", left: "5%", size: 520, delay: 0 },
  { className: "bg-framer-pink", top: "35%", left: "62%", size: 480, delay: 1.2 },
  { className: "bg-framer-blue", top: "60%", left: "-5%", size: 460, delay: 2.4 },
  { className: "bg-framer-teal", top: "5%", left: "72%", size: 340, delay: 0.6 },
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

type Props = {
  onOpenSearch: () => void;
};

export default function Hero({ onOpenSearch }: Props) {
  const prefersReducedMotion = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  // background drifts down slower than the page scrolls past it, and fades
  // out — a light parallax touch, kept to just this one section on purpose
  const blobsY = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const blobsOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <section
      ref={heroRef}
      id="top"
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-24"
    >
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={prefersReducedMotion ? undefined : { y: blobsY, opacity: blobsOpacity }}
      >
        {blobs.map((b, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full ${b.className} opacity-30 blur-3xl mix-blend-screen`}
            style={{ top: b.top, left: b.left, width: b.size, height: b.size }}
            animate={
              prefersReducedMotion
                ? undefined
                : { x: [0, 40, -20, 0], y: [0, -30, 20, 0], scale: [1, 1.15, 0.95, 1] }
            }
            transition={{ duration: 16, delay: b.delay, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto flex max-w-4xl flex-col items-center gap-6 px-4 text-center sm:px-6"
      >
        <motion.span
          variants={item}
          className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-gray-400"
        >
          <SparkleIcon width={12} height={12} className="text-framer-teal" />
          Открыт для новых проектов
        </motion.span>

        <motion.h1
          variants={item}
          data-cursor-invert
          className="max-w-3xl text-4xl font-bold leading-[1.1] tracking-tight sm:text-6xl"
        >
          Сергей Кухаренко —{" "}
          <span className="bg-gradient-to-r from-framer-blue via-framer-purple to-framer-pink bg-clip-text text-transparent">
            Senior Frontend
          </span>{" "}
          Developer
        </motion.h1>

        <motion.div
          variants={item}
          className="flex min-h-[1.5em] items-center gap-2 font-mono text-sm text-framer-teal sm:text-base"
        >
          <span aria-hidden className="text-gray-500">
            ➜
          </span>
          <Typewriter words={ROLES} />
        </motion.div>

        <motion.p variants={item} className="max-w-2xl text-base text-gray-400 sm:text-lg">
          12+ лет создаю быстрые и аккуратные e-commerce и корпоративные интерфейсы на Vue/Nuxt
          и React. От вёрстки лендингов до архитектуры и найма команды — прошёл весь путь.
        </motion.p>

        <motion.div variants={item} className="flex flex-wrap items-center justify-center gap-3">
          <Magnetic strength={0.4} className="inline-block">
            <motion.button
              type="button"
              onClick={() => scrollTo("projects")}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="rounded-xl bg-gradient-to-r from-framer-blue via-framer-purple to-framer-pink px-5 py-3 text-sm font-semibold text-white shadow-glow"
            >
              Смотреть проекты
            </motion.button>
          </Magnetic>

          <Magnetic strength={0.4} className="inline-block">
            <motion.a
              href="https://t.me/SergeyKukharenko"
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white backdrop-blur-md"
            >
              <SendIcon width={14} height={14} />
              Написать в Telegram
            </motion.a>
          </Magnetic>

          <motion.button
            type="button"
            onClick={onOpenSearch}
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="hidden items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm text-gray-400 sm:flex"
          >
            Быстрый переход
            <span className="flex items-center gap-0.5 rounded border border-white/10 bg-white/5 px-1.5 py-0.5 text-[11px]">
              <CommandIcon width={9} height={9} />K
            </span>
          </motion.button>
        </motion.div>

        <motion.div
          variants={item}
          className="mt-6 grid grid-cols-3 gap-6 rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-4 backdrop-blur-md sm:gap-10 sm:px-10"
        >
          {[
            { value: 12, suffix: "+", label: "лет в разработке" },
            { value: 7, suffix: "", label: "компаний" },
            { value: 12, suffix: "", label: "pet-проектов" },
          ].map((s) => (
            <div key={s.label} className="flex flex-col items-center">
              <span className="bg-gradient-to-r from-framer-blue to-framer-teal bg-clip-text text-2xl font-bold text-transparent sm:text-3xl">
                <Counter value={s.value} suffix={s.suffix} />
              </span>
              <span className="text-[11px] text-gray-500 sm:text-xs">{s.label}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      <motion.button
        type="button"
        onClick={() => scrollTo("about")}
        aria-label="Прокрутить вниз"
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-gray-500"
        animate={prefersReducedMotion ? undefined : { y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      >
        <ArrowUpIcon width={18} height={18} className="rotate-180" />
      </motion.button>
    </section>
  );
}
