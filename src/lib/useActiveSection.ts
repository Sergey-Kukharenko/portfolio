import { useCallback, useEffect, useState } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { useVisibleSections } from "../data/sections";

/**
 * Id of the section being read: the last one whose top has crossed the upper
 * 40% of the viewport, or the last section once the page bottoms out (a short
 * final section may never reach that line). `"top"` above them all.
 *
 * Reads layout on scroll, so call it once (Nav) and pass the result down.
 */
export function useActiveSection() {
  const sections = useVisibleSections();
  const [active, setActive] = useState("top");
  const { scrollY } = useScroll();

  const update = useCallback(() => {
    const { innerHeight, scrollY: y } = window;
    const line = innerHeight * 0.4;
    let current = "top";
    for (const { id } of sections) {
      const top = document.getElementById(id)?.getBoundingClientRect().top;
      if (top !== undefined && top <= line) current = id;
    }
    const atBottom = innerHeight + y >= document.documentElement.scrollHeight - 2;
    if (atBottom && sections.length) current = sections[sections.length - 1].id;
    setActive(current); // same string → React bails out, no re-render
  }, [sections]);

  useEffect(update, [update]);
  useMotionValueEvent(scrollY, "change", update);

  return active;
}
