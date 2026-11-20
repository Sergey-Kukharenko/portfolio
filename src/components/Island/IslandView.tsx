import { useRef, type ReactNode } from "react";
import { m, useIsPresent } from "framer-motion";
import { useIsomorphicLayoutEffect } from "../../lib/useIsomorphicLayoutEffect";

export type Size = { w: number; h: number };

const BORDER = 2; // the island's 1px border, both sides

const fade = {
  initial: { opacity: 0, filter: "blur(6px)" },
  animate: { opacity: 1, filter: "blur(0px)", transition: { delay: 0.08, duration: 0.2 } },
  exit: { opacity: 0, filter: "blur(6px)", transition: { duration: 0.1 } },
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

  return (
    <m.div
      ref={ref}
      {...fade}
      className={`w-max shrink-0 ${
        present ? "relative" : "pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      } ${className}`}
    >
      {children}
    </m.div>
  );
}
