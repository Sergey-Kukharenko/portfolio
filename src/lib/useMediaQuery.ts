import { useSyncExternalStore } from "react";

/**
 * Live `matchMedia` result. The prerendered HTML (and hydration) assume `false`,
 * then React re-renders with the real value right after — so media-gated UI is
 * added on the client instead of causing a hydration mismatch.
 */
export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => false
  );
}

/** A real mouse/trackpad — hover effects, custom cursor and hover-only demos make sense. */
export const useCanHover = () => useMediaQuery("(hover: hover) and (pointer: fine)");

