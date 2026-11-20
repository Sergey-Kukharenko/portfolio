import { useCallback, useEffect, useState } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";

/**
 * Id of the section currently being read: the last one whose top has crossed
 * the upper 40% of the viewport (or the last one, once the page bottoms out —
 * a short final section may never reach that line). `"top"` above them all.
 */
export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState("top");
  const { scrollY } = useScroll();

  const update = useCallback(() => {
    const { innerHeight, scrollY: y } = window;
    const atBottom = innerHeight + y >= document.documentElement.scrollHeight - 2;
    let current = "top";
    for (const id of ids) {
      const el = document.getElementById(id);
      if (el && el.getBoundingClientRect().top <= innerHeight * 0.4) current = id;
    }
    if (atBottom && ids.length) current = ids[ids.length - 1];
    setActive(current);
  }, [ids]);

  useEffect(update, [update]);
  useMotionValueEvent(scrollY, "change", update);

  return active;
}
