import { useState } from "react";
import { m, useReducedMotion } from "framer-motion";
import Typewriter from "./Typewriter";

// what the architect builds — the T in Arc<T>: code, decisions, life
const PARAMS = ["Code", "Decisions", "Life"];
// fixed width (longest param, monospace) so typing doesn't sway the centered line
const LONGEST = Math.max(...PARAMS.map((p) => p.length)) + "Arc<>".length + 1; // +1: the caret

/**
 * Both registers of the mark side by side, as on the LinkedIn and GitHub
 * banners: the business line, a divider, the developer type. Its own component
 * so the divider's pulse re-renders this line only, not the whole hero.
 */
export default function BrandLine() {
  const [pulse, setPulse] = useState(0);

  return (
    <>
      <span className="font-medium text-framer-teal">The art of structure.</span>
      <Divider pulse={pulse} />
      <span
        className="inline-block bg-gradient-to-r from-framer-pink via-framer-purple to-framer-blue bg-clip-text text-left font-mono text-transparent"
        style={{ minWidth: `${LONGEST}ch` }}
      >
        Arc&lt;
        <Typewriter words={PARAMS} caretClassName="bg-framer-blue" onWordTyped={() => setPulse((p) => p + 1)} />
        &gt;
      </span>
    </>
  );
}

/**
 * Teal → pink, bridging the teal business line and the gradient type. Every
 * time a word lands, a spark runs down it — a signal passed from "structure"
 * to Arc<…>.
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
