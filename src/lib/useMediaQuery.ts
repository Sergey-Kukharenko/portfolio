import { useSyncExternalStore } from "react";

/** Live `matchMedia` result; read synchronously on first render, so no flash. */
export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches
  );
}

/** A real mouse/trackpad — hover effects, custom cursor and hover-only demos make sense. */
export const useCanHover = () => useMediaQuery("(hover: hover) and (pointer: fine)");
