import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import {
  AnimatePresence,
  m,
  useIsPresent,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";
import { SearchIcon, XIcon } from "../icons";
import { useVisibleSections } from "../data/sections";
import { scrollToSection } from "../lib/navigation";
import { useLockBodyScroll } from "../lib/useLockBodyScroll";
import { useActiveSection } from "../lib/useActiveSection";
import { useFlash, type Flash } from "../lib/island";
import { useIsomorphicLayoutEffect } from "../lib/useIsomorphicLayoutEffect";

type Size = { w: number; h: number };

type Props = {
  onOpenSearch: () => void;
};

const SPRING = { type: "spring", stiffness: 420, damping: 34, mass: 0.9 } as const;
// flashes overshoot a little more — the island "bursts" out, like on iPhone
const BURST = { type: "spring", stiffness: 520, damping: 24, mass: 0.8 } as const;
const fade = {
  initial: { opacity: 0, filter: "blur(6px)" },
  animate: { opacity: 1, filter: "blur(0px)", transition: { delay: 0.08, duration: 0.2 } },
  exit: { opacity: 0, filter: "blur(6px)", transition: { duration: 0.1 } },
};

/**
 * Mobile navigation in the spirit of Apple's Dynamic Island: a small black pill
 * instead of a full-width header bar. Collapsed, it works like a live activity —
 * reading progress and the current section; tapped, it morphs into the section
 * list. Replaces the hamburger menu below `md`. Other components can make it
 * burst out with a short message via `flash()` from lib/island.
 */
export default function MobileIsland({ onOpenSearch }: Props) {
  const [open, setOpen] = useState(false);
  // size of the view currently shown; null until measured (prerender → "auto")
  const [size, setSize] = useState<Size | null>(null);
  const reduceMotion = useReducedMotion();
  const sections = useVisibleSections();
  const ids = useMemo(() => sections.map((s) => s.id), [sections]);
  const active = useActiveSection(ids);
  const activeLabel = sections.find((s) => s.id === active)?.label ?? "Sergey Kukharenko";

  const [current, dismissFlash] = useFlash();
  const flashing = !!current && !open;

  useLockBodyScroll(open);

  // a light tap on Android when a flash appears (iOS Safari has no vibrate API)
  useEffect(() => {
    if (current && !open) navigator.vibrate?.(8);
  }, [current, open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const go = (id: string) => {
    setOpen(false);
    scrollToSection(id);
  };

  const search = () => {
    setOpen(false);
    onOpenSearch();
  };

  const transition = reduceMotion ? { duration: 0 } : flashing ? BURST : SPRING;

  return (
    <>
      <AnimatePresence>
        {open && (
          <m.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="pointer-events-auto fixed inset-0 bg-black/50 backdrop-blur-sm md:hidden"
          />
        )}
      </AnimatePresence>

      <div className="nav-enter relative flex justify-center px-3 pt-3 md:hidden">
        {/* Width/height are animated explicitly to the measured size of the
            current view — not via `layout`, whose scale transforms squash the
            text mid-morph and lose track of the size when views swap. */}
        <m.div
          initial={false}
          animate={{
            width: size ? size.w : "auto",
            height: size ? size.h : "auto",
            borderRadius: open ? 28 : flashing ? 29 : 21,
          }}
          transition={transition}
          className="pointer-events-auto relative flex items-center justify-center overflow-hidden border border-white/10 bg-black shadow-[0_8px_30px_rgba(0,0,0,0.5)]"
        >
          <AnimatePresence initial={false}>
            {open ? (
              <View key="expanded" onSize={setSize} className="!w-[min(calc(100vw-24px),24rem)] p-2">
                <div className="flex items-center gap-3 px-2 pb-2 pt-1">
                  <Avatar />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-white">Sergey Kukharenko</p>
                    <p className="truncate text-xs text-gray-500">Senior Frontend Developer</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    aria-label="Закрыть навигацию"
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-gray-300"
                  >
                    <XIcon width={14} height={14} />
                  </button>
                </div>

                <nav aria-label="Разделы" className="flex flex-col">
                  {sections.map((s) => {
                    const isActive = s.id === active;
                    return (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => go(s.id)}
                        aria-current={isActive ? "location" : undefined}
                        className={`flex items-center gap-3 rounded-2xl px-3 py-2.5 text-left transition-colors ${
                          isActive ? "bg-white/[0.08]" : "active:bg-white/5"
                        }`}
                      >
                        <span className={`h-2 w-2 shrink-0 rounded-full bg-gradient-to-br ${s.gradient}`} />
                        <span className="min-w-0 flex-1">
                          <span className="block text-sm text-white">{s.title}</span>
                          <span className="block truncate text-xs text-gray-500">{s.subtitle}</span>
                        </span>
                        {isActive && <span className="text-[10px] uppercase tracking-wider text-gray-500">вы здесь</span>}
                      </button>
                    );
                  })}
                </nav>

                <button
                  type="button"
                  onClick={search}
                  className="mt-2 flex w-full items-center justify-center gap-2 rounded-2xl bg-white/[0.06] py-3 text-sm text-gray-300 active:bg-white/10"
                >
                  <SearchIcon width={14} height={14} />
                  Поиск по сайту
                </button>
              </View>
            ) : flashing ? (
              <View key={`flash-${current.id}`} onSize={setSize}>
                <FlashView flash={current} onDismiss={dismissFlash} />
              </View>
            ) : (
              <View key="collapsed" onSize={setSize} className="flex h-10 items-center gap-1 pl-1.5 pr-1">
                <button
                  type="button"
                  onClick={() => setOpen(true)}
                  aria-expanded={open}
                  aria-label={`Навигация, сейчас: ${activeLabel}`}
                  className="flex h-full items-center gap-2.5 pr-2"
                >
                  <ProgressRing />
                  <span className="relative block overflow-hidden text-[13px] font-medium text-white">
                    <AnimatePresence mode="popLayout" initial={false}>
                      <m.span
                        key={activeLabel}
                        initial={{ y: 14, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -14, opacity: 0 }}
                        transition={transition}
                        className="block whitespace-nowrap"
                      >
                        {activeLabel}
                      </m.span>
                    </AnimatePresence>
                  </span>
                </button>
                <span className="h-4 w-px bg-white/10" />
                <button
                  type="button"
                  onClick={onOpenSearch}
                  aria-label="Открыть поиск"
                  className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 active:bg-white/10"
                >
                  <SearchIcon width={14} height={14} />
                </button>
              </View>
            )}
          </AnimatePresence>
        </m.div>
      </div>
    </>
  );
}

/**
 * One state of the island. While present it sits in flow and reports its
 * natural size, which the island animates to; once leaving, it is lifted out
 * of flow (centered on top) to fade away without affecting that size.
 */
function View({
  onSize,
  className = "",
  children,
}: {
  onSize: (size: Size) => void;
  className?: string;
  children: ReactNode;
}) {
  const present = useIsPresent();
  const ref = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!present || !el) return;
    const report = () => onSize({ w: el.offsetWidth + 2, h: el.offsetHeight + 2 }); // + 1px border each side
    report();
    const ro = new ResizeObserver(report);
    ro.observe(el);
    return () => ro.disconnect();
  }, [present, onSize]);

  return (
    <m.div
      ref={ref}
      {...fade}
      className={`w-max shrink-0 ${
        present ? "relative" : "pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      } ${className}`}
    >
      {children}
    </m.div>
  );
}

function FlashView({ flash, onDismiss }: { flash: Flash; onDismiss: () => void }) {
  return (
    <button
      type="button"
      onClick={onDismiss}
      // announced politely by screen readers, without stealing focus
      role="status"
      aria-live="polite"
      className="flex h-14 min-w-[240px] items-center gap-3 pl-2.5 pr-4 text-left"
    >
      <m.span
        initial={{ scale: 0.4 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 600, damping: 18, delay: 0.05 }}
        className="h-9 w-9 shrink-0 rounded-full border border-white/15"
        style={{ background: flash.color ?? "linear-gradient(135deg,#0099FF,#8855FF,#FF55A3)" }}
      />
      <span className="min-w-0 flex-1">
        <span className="block text-[13px] font-medium text-white">{flash.title}</span>
        {flash.detail && (
          <span className="block truncate font-mono text-xs text-gray-400">{flash.detail}</span>
        )}
      </span>
      <CheckGlyph />
    </button>
  );
}

/** Check mark that draws itself in. */
function CheckGlyph() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden className="shrink-0 text-framer-teal">
      <m.path
        d="M5 12.5l4.5 4.5L19 7.5"
        stroke="currentColor"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.35, delay: 0.15, ease: "easeOut" }}
      />
    </svg>
  );
}

function Avatar() {
  return (
    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-framer-blue via-framer-purple to-framer-pink text-xs font-bold text-white">
      SK
    </span>
  );
}

/** "SK" badge wrapped in a ring that fills as the page is read. */
function ProgressRing() {
  const { scrollYProgress } = useScroll();
  const pathLength = useSpring(scrollYProgress, { stiffness: 320, damping: 40, mass: 0.3 });
  return (
    <span className="relative flex h-7 w-7 shrink-0 items-center justify-center">
      <svg viewBox="0 0 28 28" className="absolute inset-0 -rotate-90" aria-hidden>
        <defs>
          <linearGradient id="island-ring" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0099FF" />
            <stop offset="50%" stopColor="#8855FF" />
            <stop offset="100%" stopColor="#FF55A3" />
          </linearGradient>
        </defs>
        <circle cx="14" cy="14" r="12.5" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="2" />
        <m.circle
          cx="14"
          cy="14"
          r="12.5"
          fill="none"
          stroke="url(#island-ring)"
          strokeWidth="2"
          strokeLinecap="round"
          style={{ pathLength }}
        />
      </svg>
      <span className="text-[9px] font-bold text-white">SK</span>
    </span>
  );
}
