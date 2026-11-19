import { useState } from "react";
import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { palette } from "../data/palette";
import { PaletteIcon } from "../icons";

export default function ColorPalette() {
  const prefersReducedMotion = useReducedMotion();
  const [copied, setCopied] = useState<string | null>(null);
  const [activeHex, setActiveHex] = useState(palette[1].hex);

  const copy = async (hex: string) => {
    try {
      await navigator.clipboard.writeText(hex);
    } catch {
      // clipboard may be unavailable — animation still gives feedback
    }
    setCopied(hex);
    window.setTimeout(() => setCopied((c) => (c === hex ? null : c)), 1100);
  };

  return (
    <m.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
      className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-md sm:p-10"
    >
      {!prefersReducedMotion && (
        <m.div
          aria-hidden
          className="pointer-events-none absolute -inset-32 -z-10 opacity-30 blur-3xl"
          style={{ background: "conic-gradient(from 0deg, #0099FF, #8855FF, #FF55A3, #FF3366, #FF8855, #05F2C7, #0099FF)" }}
          animate={{ rotate: 360 }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        />
      )}

      <div className="mb-8 flex items-center gap-2">
        <PaletteIcon width={18} height={18} className="text-framer-pink" />
        <h3 className="text-lg font-semibold text-white">Палитра Framer Motion</h3>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 md:grid-cols-7">
        {palette.map((swatch, i) => (
          <m.button
            key={swatch.hex}
            type="button"
            initial={{ opacity: 0, y: 16, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: i * 0.06, ease: "easeOut" }}
            onHoverStart={() => setActiveHex(swatch.hex)}
            onFocus={() => setActiveHex(swatch.hex)}
            onClick={() => copy(swatch.hex)}
            whileHover={{ y: -6 }}
            whileTap={{ scale: 0.95 }}
            className="group relative flex flex-col items-center gap-2 focus:outline-none"
          >
            <m.span
              layoutId={`swatch-${swatch.hex}`}
              className={`relative flex h-16 w-full items-center justify-center rounded-2xl border border-white/10 shadow-glow sm:h-20 ${swatch.className}`}
              whileHover={{ boxShadow: `0 20px 45px -15px ${swatch.hex}88` }}
            >
              <AnimatePresence>
                {copied === swatch.hex && (
                  <m.span
                    initial={{ opacity: 0, scale: 0.6, y: 4 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.6 }}
                    className="absolute -top-8 rounded-md bg-black/80 px-2 py-1 text-[10px] font-medium text-white"
                  >
                    Скопировано
                  </m.span>
                )}
              </AnimatePresence>
            </m.span>
            <span className="text-xs font-medium text-gray-300">{swatch.name}</span>
            <span className="font-mono text-[11px] text-gray-500">{swatch.hex}</span>
          </m.button>
        ))}
      </div>

      <m.div
        className="mt-8 h-2 w-full overflow-hidden rounded-full bg-white/5"
      >
        <m.div
          className="h-full rounded-full"
          animate={{ backgroundColor: activeHex }}
          transition={{ duration: 0.4 }}
          style={{ width: "100%" }}
          initial={false}
        >
          {!prefersReducedMotion && (
            <m.div
              className="h-full w-1/3 rounded-full bg-white/40"
              animate={{ x: ["-10%", "260%"] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
            />
          )}
        </m.div>
      </m.div>

      <p className="mt-4 text-center text-xs text-gray-500">
        Наведите или нажмите на цвет, чтобы скопировать hex-код — вся палитра сайта построена на
        этих семи оттенках Framer.
      </p>
    </m.div>
  );
}
