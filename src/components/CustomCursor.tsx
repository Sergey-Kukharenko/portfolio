import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const INTERACTIVE_SELECTOR = "a, button, [role='button'], input, textarea, summary";

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  // a big, solid, color-inverting circle — reserved for empty space inside
  // the hero (over the headline) so it never fights with reading dense text
  // or with a button's own hover state elsewhere on the page
  const [inverting, setInverting] = useState(false);
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 300, damping: 30, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 300, damping: 30, mass: 0.5 });

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    setEnabled(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setEnabled(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add("has-custom-cursor");

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
    };
    const over = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const labelEl = target.closest?.("[data-cursor-label]") as HTMLElement | null;
      const labelText = labelEl?.getAttribute("data-cursor-label") ?? null;
      const isLink = !!target.closest?.(INTERACTIVE_SELECTOR);
      const isInvertZone = !!target.closest?.("[data-cursor-invert]");
      setLabel(labelText);
      setHovering(isLink);
      setInverting(isInvertZone && !isLink && !labelText);
    };
    const leave = () => setVisible(false);

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
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] h-1.5 w-1.5 rounded-full bg-white mix-blend-difference"
        style={{ x, y }}
        transformTemplate={(_, generated) => `translate(-50%, -50%) ${generated}`}
        animate={{ opacity: visible && !label && !inverting ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      />
      <motion.div
        aria-hidden
        layout
        style={{
          x: ringX,
          y: ringY,
          mixBlendMode: label ? "normal" : "difference",
          borderRadius: 9999,
        }}
        transformTemplate={(_, generated) => `translate(-50%, -50%) ${generated}`}
        animate={{ opacity: visible ? 1 : 0 }}
        transition={{ type: "spring", stiffness: 320, damping: 26 }}
        className={`pointer-events-none fixed left-0 top-0 z-[100] flex items-center justify-center overflow-hidden whitespace-nowrap border ${
          label
            ? "border-white/20 bg-gradient-to-r from-framer-blue/50 via-framer-purple/55 to-framer-pink/50 px-4 py-2.5 text-xs font-semibold text-white shadow-[0_10px_40px_-10px_rgba(136,85,255,0.55)] backdrop-blur-2xl sm:text-sm"
            : inverting
              ? "h-36 w-36 border-transparent bg-white"
              : hovering
                ? "border-white bg-white/10 h-14 w-14"
                : "border-white h-7 w-7"
        }`}
      >
        {label}
      </motion.div>
    </>
  );
}
