import { useRef, useState, type ReactNode } from "react";
import { AnimatePresence, m } from "framer-motion";
import { useIsomorphicLayoutEffect } from "../lib/useIsomorphicLayoutEffect";
import { SPRING } from "../lib/springs";

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
      aria-label={generic ? `Arc<${param}>` : "Arc."}
    >
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
              transition={SPRING}
              className="whitespace-nowrap font-mono font-semibold"
            >
              <span className="text-gray-500">&lt;</span>
              <span className="text-framer-blue">{param}</span>
              <span className="text-gray-500">&gt;</span>
            </m.span>
          ) : (
            <m.span
              key="dot"
              aria-hidden
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={SPRING}
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

/**
 * Animates its own width to the natural width of what it holds, so text next
 * to the mark glides instead of jumping when the dot becomes <T>.
 */
function AutoWidth({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [width, setWidth] = useState<number | null>(null);

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const report = () => setWidth(el.offsetWidth);
    report();
    const ro = new ResizeObserver(report);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <m.span
      initial={false}
      animate={{ width: width ?? "auto" }}
      transition={SPRING}
      className="relative inline-flex overflow-hidden"
    >
      <span ref={ref} className="relative inline-flex shrink-0 whitespace-nowrap">
        {children}
      </span>
    </m.span>
  );
}
