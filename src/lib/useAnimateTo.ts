import { useRef, type RefObject } from "react";
import { animate, useReducedMotion } from "framer-motion";
import { useIsomorphicLayoutEffect } from "./useIsomorphicLayoutEffect";

type Box = { width?: number; height?: number; borderRadius?: number };
type Options = Parameters<typeof animate>[2];

/**
 * Drives an element's box toward `target`: the first value is applied at once,
 * every later change is animated with `transition`.
 *
 * Imperative on purpose: an `animate` prop that changes before LazyMotion's
 * features have loaded is silently dropped, leaving e.g. `width: auto`, which
 * the first real animation then can't interpolate from — it jumps instead.
 */
export function useAnimateTo<T extends HTMLElement>(ref: RefObject<T>, target: Box | null, transition: Options) {
  const reduceMotion = useReducedMotion();
  const placed = useRef(false);
  const { width, height, borderRadius } = target ?? {};

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el || !target) return;
    const values: Record<string, number> = {};
    for (const [key, v] of Object.entries({ width, height, borderRadius })) if (v !== undefined) values[key] = v;
    if (!placed.current || reduceMotion) {
      placed.current = true;
      for (const [key, v] of Object.entries(values)) el.style.setProperty(kebab(key), `${v}px`);
      return;
    }
    // uses the transition of the render that changed the target (e.g. BURST for a flash)
    const controls = animate(el as HTMLElement, values, transition);
    return () => controls.stop(); // a retarget continues from the current value
  }, [width, height, borderRadius]);
}

const kebab = (s: string) => s.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`);
