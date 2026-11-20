import { useEffect, useState } from "react";
import { AnimatePresence, m, useReducedMotion, type Variants } from "framer-motion";
import { brandStops } from "../data/palette";
import AutoWidth from "./AutoWidth";

// what the architect builds — the T in Arc<T>: code, decisions, life
const PARAMS = ["Code", "Decisions", "Life"];
const HOLD = 2600; // ms each word stays
// fixed width (longest param, monospace) so the centered line never sways
const LONGEST = Math.max(...PARAMS.map((p) => p.length)) + "Arc<>".length;

/*
 * Each character carries its own color sampled from the brand gradient:
 * background-clip:text stops painting letters once they move with transforms,
 * and in a monospace face per-character colors read as one smooth gradient.
 */
const rgb = (hex: string) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
// pink → purple → blue, like the mark (brandStops runs the other way)
const STOPS = [...brandStops].reverse().map(rgb);
function tint(index: number) {
  const t = Math.min(1, index / (LONGEST - 1)) * (STOPS.length - 1);
  const seg = Math.min(Math.floor(t), STOPS.length - 2);
  const [a, b] = [STOPS[seg], STOPS[seg + 1]];
  return `rgb(${a.map((v, i) => Math.round(v + (b[i] - v) * (t - seg))).join(",")})`;
}

// letters roll through the window: out the top, in from below, in a cascade
const word: Variants = {
  in: { transition: { staggerChildren: 0.04, delayChildren: 0.08 } },
  out: { transition: { staggerChildren: 0.025 } },
};
const letter: Variants = {
  hidden: { y: "0.9em", opacity: 0, filter: "blur(3px)" },
  in: {
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    // the spring may overshoot; blur must not go negative, so it gets a tween
    transition: { type: "spring", stiffness: 420, damping: 26, filter: { duration: 0.25 } },
  },
  out: { y: "-0.9em", opacity: 0, filter: "blur(3px)", transition: { duration: 0.2, ease: "easeIn" } },
};

/**
 * Both registers of the mark side by side, as on the LinkedIn and GitHub
 * banners: the business line, a divider, the developer type.
 */
export default function BrandLine() {
  const [index, setIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return; // a still "Arc<Code>" for reduced motion
    const id = window.setInterval(() => setIndex((i) => (i + 1) % PARAMS.length), HOLD);
    return () => window.clearInterval(id);
  }, [reduceMotion]);

  const param = PARAMS[index];

  return (
    <>
      <span className="font-medium text-framer-teal">The art of structure.</span>
      <Divider pulse={index} />
      <span className="sr-only">Arc&lt;{PARAMS.join(", ")}&gt;</span>
      <span aria-hidden className="inline-flex items-baseline font-mono" style={{ minWidth: `${LONGEST}ch` }}>
        {[..."Arc<"].map((ch, i) => (
          <span key={i} style={{ color: tint(i) }}>
            {ch}
          </span>
        ))}
        <AutoWidth className="py-1">
          <AnimatePresence mode="popLayout" initial={false}>
            <m.span key={param} className="inline-flex" initial="hidden" animate="in" exit="out" variants={word}>
              {[...param].map((ch, i) => (
                <m.span key={i} variants={letter} className="inline-block" style={{ color: tint(4 + i) }}>
                  {ch}
                </m.span>
              ))}
            </m.span>
          </AnimatePresence>
        </AutoWidth>
        <span style={{ color: tint(4 + param.length) }}>&gt;</span>
      </span>
    </>
  );
}

/**
 * Teal → pink, bridging the teal business line and the gradient type. Every
 * time a new word rolls in, a spark runs down it — a signal passed from
 * "structure" to Arc<…>.
 */
function Divider({ pulse }: { pulse: number }) {
  const reduceMotion = useReducedMotion();

  return (
    <span aria-hidden className="relative h-5 w-[2px] shrink-0">
      <m.span
        key={`line-${pulse}`}
        initial={{ opacity: 0.55 }}
        animate={{ opacity: [0.55, 1, 0.55] }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="absolute inset-0 rounded-full bg-gradient-to-b from-framer-teal to-framer-pink shadow-[0_0_10px_rgba(5,242,199,0.35)]"
      />
      {!reduceMotion && (
        <m.span
          key={`spark-${pulse}`}
          initial={{ top: "-30%", opacity: 0 }}
          animate={{ top: ["-30%", "100%"], opacity: [0, 1, 0] }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="absolute -left-[2px] h-2 w-[6px] rounded-full bg-white shadow-[0_0_10px_3px_rgba(5,242,199,0.8)]"
        />
      )}
    </span>
  );
}
