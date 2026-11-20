import { useRef, useState, type ReactNode } from "react";
import { useIsomorphicLayoutEffect } from "../lib/useIsomorphicLayoutEffect";
import { useAnimateTo } from "../lib/useAnimateTo";
import { SPRING } from "../lib/springs";

/**
 * Animates its own width to the natural width of what it holds, so whatever
 * sits next to it glides instead of jumping when the content swaps (the dot
 * becoming <T>, one word rolling into another). Clips, so it doubles as the
 * "window" content rolls through.
 */
export default function AutoWidth({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const boxRef = useRef<HTMLSpanElement>(null);
  const [width, setWidth] = useState<number | null>(null);
  useAnimateTo(boxRef, width === null ? null : { width }, SPRING);

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
    <span ref={boxRef} className={`relative inline-flex overflow-hidden ${className}`}>
      <span ref={ref} className="relative inline-flex shrink-0 whitespace-nowrap">
        {children}
      </span>
    </span>
  );
}
