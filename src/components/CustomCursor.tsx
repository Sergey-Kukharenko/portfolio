import { useEffect, useState } from "react";
import { m, useMotionValue, useSpring } from "framer-motion";
import { useCanHover } from "../lib/useMediaQuery";

const INTERACTIVE_SELECTOR = "a, button, [role='button'], input, textarea, summary";

type Mode = "invert" | "label" | null;

// The native cursor stays everywhere except two zones where a custom one says
// something: a big color-inverting circle over the hero headline
// ([data-cursor-invert]) and a pill with a caption over the code showcase
// ([data-cursor-label]). Over links and buttons the native cursor comes back,
// so their own hover states aren't fought. index.css hides the native cursor
// inside the zones to match.
export default function CustomCursor() {
  const enabled = useCanHover();
  const [mode, setMode] = useState<Mode>(null);
  // the last zone's look, kept while fading out so the shape doesn't morph on exit
  const [look, setLook] = useState<Exclude<Mode, null>>("invert");
  const [label, setLabel] = useState("");

  // tracked even while hidden, so the cursor appears right under the mouse
  // when it enters a zone instead of flying in from where it was last seen
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const springX = useSpring(x, { stiffness: 300, damping: 30, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 300, damping: 30, mass: 0.5 });

  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add("has-custom-cursor");

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const over = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest?.(INTERACTIVE_SELECTOR)) return setMode(null);
      const labelEl = target.closest?.("[data-cursor-label]");
      if (labelEl) {
        setLabel(labelEl.getAttribute("data-cursor-label") ?? "");
        setLook("label");
        return setMode("label");
      }
      if (target.closest?.("[data-cursor-invert]")) {
        setLook("invert");
        return setMode("invert");
      }
      setMode(null);
    };
    const leave = () => setMode(null);

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    document.documentElement.addEventListener("mouseleave", leave);
    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      document.documentElement.removeEventListener("mouseleave", leave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <m.div
      aria-hidden
      layout
      style={{
        x: springX,
        y: springY,
        mixBlendMode: look === "invert" ? "difference" : "normal",
        borderRadius: 9999,
      }}
      transformTemplate={(_, generated) => `translate(-50%, -50%) ${generated}`}
      initial={false}
      animate={{ opacity: mode ? 1 : 0, scale: mode ? 1 : 0.6 }}
      transition={{ type: "spring", stiffness: 320, damping: 26 }}
      className={`pointer-events-none fixed left-0 top-0 z-[100] flex items-center justify-center overflow-hidden whitespace-nowrap ${
        look === "label"
          ? // opaque gradient, no backdrop blur: a blur moving with the mouse stutters in WebKit
            "border border-white/20 bg-gradient-to-r from-framer-blue via-framer-purple to-framer-pink px-4 py-2.5 text-xs font-semibold text-white shadow-[0_10px_40px_-10px_rgba(136,85,255,0.55)] sm:text-sm"
          : "h-36 w-36 bg-white"
      }`}
    >
      {look === "label" && label}
    </m.div>
  );
}
