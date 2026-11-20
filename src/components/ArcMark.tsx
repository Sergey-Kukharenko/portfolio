import { AnimatePresence, m } from "framer-motion";
import { SPRING } from "../lib/springs";
import AutoWidth from "./AutoWidth";

// a spring overshoots below zero, and a negative blur() is an invalid keyframe —
// so the blur gets a plain tween while position and scale keep the spring
const SWAP = { ...SPRING, filter: { duration: 0.2, ease: "easeOut" } } as const;

/*
 * The personal mark, in its two registers:
 *   Arc.     — the business face (LinkedIn, Telegram): "the art of structure"
 *   Arc<T>   — the developer face (GitHub): the same mark as a generic type,
 *              where T is whatever is being built — code, decisions, life.
 * The site sits between the two audiences, so the dot turns into <T> in
 * developer moments (hovering the logo, ⌘K, the code section).
 */

type Props = {
  /** developer register: show `<param>` instead of the dot */
  generic?: boolean;
  /** type parameter shown in the generic form */
  param?: string;
  className?: string;
};

export default function ArcMark({ generic = false, param = "T", className = "" }: Props) {
  return (
    <span
      className={`inline-flex items-baseline font-bold tracking-tight ${className}`}
    >
      <span className="sr-only">{generic ? `Arc<${param}>` : "Arc."}</span>
      <span
        aria-hidden
        className="bg-gradient-to-r from-framer-pink via-framer-purple to-framer-blue bg-clip-text text-transparent"
      >
        Arc
      </span>
      <AutoWidth>
        <AnimatePresence mode="popLayout" initial={false}>
          {generic ? (
            <m.span
              key={`generic-${param}`}
              aria-hidden
              initial={{ opacity: 0, y: "0.35em", filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: "-0.35em", filter: "blur(4px)" }}
              transition={SWAP}
              className="whitespace-nowrap font-mono font-semibold"
            >
              <span className="text-gray-500">&lt;</span>
              {/* a monospace space reads as a hole in "Обо мне" — tighten it */}
              <span className="text-framer-blue [word-spacing:-0.35em]">{param}</span>
              <span className="text-gray-500">&gt;</span>
            </m.span>
          ) : (
            <m.span
              key="dot"
              aria-hidden
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={SWAP}
              className="inline-block origin-bottom text-framer-teal"
            >
              .
            </m.span>
          )}
        </AnimatePresence>
      </AutoWidth>
    </span>
  );
}
