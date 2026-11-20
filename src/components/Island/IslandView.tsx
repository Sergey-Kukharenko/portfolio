import { useRef, type ReactNode } from "react";
import { m, useIsPresent } from "framer-motion";
import { useIsomorphicLayoutEffect } from "../../lib/useIsomorphicLayoutEffect";

export type Size = { w: number; h: number };

const BORDER = 2; // the island's 1px border, both sides

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

// the old view clears out fast; the new one surfaces once the island has
// mostly grown into its shape, so the content never fights the morph
const fade = {
  initial: { opacity: 0, scale: 0.96, filter: "blur(8px)" },
  animate: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { delay: 0.12, duration: 0.35, ease: EASE_OUT },
  },
  exit: { opacity: 0, scale: 0.98, filter: "blur(6px)", transition: { duration: 0.12 } },
};

type Props = {
  onSize: (size: Size) => void;
  className?: string;
  children: ReactNode;
};

/**
 * One state of the island (bar, menu, flash). While present it sits in flow
 * and reports its natural size, which the island animates to; once leaving it
 * is lifted out of flow, centered on top, and fades without affecting that size.
 */
export default function IslandView({ onSize, className = "", children }: Props) {
  const present = useIsPresent();
  const ref = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!present || !el) return;
    const report = () => onSize({ w: el.offsetWidth + BORDER, h: el.offsetHeight + BORDER });
    report();
    const ro = new ResizeObserver(report);
    ro.observe(el);
    return () => ro.disconnect();
  }, [present, onSize]);

  // a leaving view is centered with inset + auto margins, not translate:
  // framer owns `transform` here (the scale in `fade`)
  const position = present ? "relative" : "pointer-events-none absolute inset-0 m-auto h-fit";

  return (
    <m.div ref={ref} {...fade} className={`w-max shrink-0 ${position} ${className}`}
    >
      {children}
    </m.div>
  );
}
