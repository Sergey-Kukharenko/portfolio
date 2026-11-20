import { m } from "framer-motion";
import type { Flash } from "../../lib/island";
import { brandStops } from "../../data/palette";

const FALLBACK = `linear-gradient(135deg, ${brandStops.join(", ")})`;

type Props = {
  flash: Flash;
  onDismiss: () => void;
};

/** A short burst message (e.g. "copied"); tapping it dismisses it early. */
export default function IslandFlash({ flash, onDismiss }: Props) {
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
        style={{ background: flash.color ?? FALLBACK }}
      />
      <span className="min-w-0 flex-1">
        <span className="block text-[13px] font-medium text-white">{flash.title}</span>
        {flash.detail && <span className="block truncate font-mono text-xs text-gray-400">{flash.detail}</span>}
      </span>
      {/* check mark that draws itself in */}
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
    </button>
  );
}
