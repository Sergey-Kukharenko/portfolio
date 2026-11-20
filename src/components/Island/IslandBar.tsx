import type { MouseEvent } from "react";
import { m, useScroll, useSpring } from "framer-motion";
import { SearchIcon } from "../../icons";
import { brandStops } from "../../data/palette";
import ArcMark from "../ArcMark";

type Props = {
  /** current section label; undefined above the first section */
  label?: string;
  onOpen: (e: MouseEvent<HTMLButtonElement>) => void;
  onSearch: () => void;
};

/**
 * The collapsed island — a live activity: reading progress, and the current
 * section as the T in Arc<T> (plain "Arc." on the first screen).
 */
export default function IslandBar({ label, onOpen, onSearch }: Props) {
  return (
    <div className="flex h-10 items-center gap-1 pl-1.5 pr-1">
      <button
        type="button"
        onClick={onOpen}
        aria-expanded={false}
        aria-label={`Навигация, сейчас: ${label ?? "начало страницы"}`}
        className="flex h-full items-center gap-2.5 pr-2"
      >
        <ProgressRing />
        <ArcMark generic={!!label} param={label} className="text-[15px]" />
      </button>
      <span className="h-4 w-px bg-white/10" />
      <button
        type="button"
        onClick={onSearch}
        aria-label="Открыть поиск"
        className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 active:bg-white/10"
      >
        <SearchIcon width={14} height={14} />
      </button>
    </div>
  );
}

const R = 12.5;

/** "SK" badge wrapped in a ring that fills as the page is read. */
function ProgressRing() {
  const { scrollYProgress } = useScroll();
  const pathLength = useSpring(scrollYProgress, { stiffness: 320, damping: 40, mass: 0.3 });

  return (
    <span className="relative flex h-7 w-7 shrink-0 items-center justify-center">
      <svg viewBox="0 0 28 28" className="absolute inset-0 -rotate-90" aria-hidden>
        <defs>
          <linearGradient id="island-ring" x1="0" y1="0" x2="1" y2="1">
            {brandStops.map((color, i) => (
              <stop key={color} offset={i / (brandStops.length - 1)} stopColor={color} />
            ))}
          </linearGradient>
        </defs>
        <circle cx="14" cy="14" r={R} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="2" />
        <m.circle
          cx="14"
          cy="14"
          r={R}
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
