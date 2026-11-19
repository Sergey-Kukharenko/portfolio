import { useEffect } from "react";

// ref-counted, so overlapping overlays (e.g. the command palette handing off to
// a project modal) don't unlock the page while one of them is still open
let locks = 0;

/** Freezes page scroll while `active`, padding for the scrollbar so nothing shifts. */
export function useLockBodyScroll(active: boolean) {
  useEffect(() => {
    if (!active) return;
    const { body, documentElement } = document;
    if (locks++ === 0) {
      const scrollbar = window.innerWidth - documentElement.clientWidth;
      body.style.overflow = "hidden";
      if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`;
    }
    return () => {
      if (--locks === 0) {
        body.style.overflow = "";
        body.style.paddingRight = "";
      }
    };
  }, [active]);
}
