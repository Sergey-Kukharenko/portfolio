import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { useVisibleSections } from "../../data/sections";
import { scrollToSection } from "../../lib/navigation";
import { useOverlay } from "../../lib/useOverlay";
import { useFlash } from "../../lib/island";
import { BURST, SPRING } from "../../lib/springs";
import IslandView, { type Size } from "./IslandView";
import IslandBar from "./IslandBar";
import IslandMenu from "./IslandMenu";
import IslandFlash from "./IslandFlash";

type Props = {
  /** id of the section being read (from useActiveSection, owned by Nav) */
  active: string;
  onOpenSearch: () => void;
};

/**
 * Mobile navigation in the spirit of Apple's Dynamic Island: a small black pill
 * instead of a full-width header bar and hamburger (below `md`). Collapsed it
 * is a live activity, tapped it morphs into the section list, and any component
 * can make it burst out with a short message via `flash()` from lib/island.
 */
export default function MobileIsland({ active, onOpenSearch }: Props) {
  const [open, setOpen] = useState(false);
  // natural size of the view shown; null until measured (prerender → "auto")
  const [size, setSize] = useState<Size | null>(null);
  const [flash, dismissFlash] = useFlash();
  const sections = useVisibleSections();
  const label = sections.find((s) => s.id === active)?.label;
  const flashing = !!flash && !open;

  const close = useCallback(() => setOpen(false), []);
  useOverlay(open, close);

  // only re-render when the size really changed (ResizeObserver can repeat)
  const onSize = useCallback(
    (next: Size) => setSize((prev) => (prev?.w === next.w && prev?.h === next.h ? prev : next)),
    []
  );

  // a light tap on Android when a flash appears (iOS Safari has no vibrate API)
  useEffect(() => {
    if (flashing) navigator.vibrate?.(8);
  }, [flashing, flash]);

  const navigate = (id: string) => {
    close();
    scrollToSection(id);
  };

  const search = () => {
    close();
    onOpenSearch();
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="pointer-events-auto fixed inset-0 bg-black/50 backdrop-blur-sm md:hidden"
          />
        )}
      </AnimatePresence>

      <div className="nav-enter relative flex justify-center px-3 pt-3 md:hidden">
        {/* width/height animate to the measured size of the current view — not
            via `layout`, whose scale transforms squash text mid-morph and lose
            track of the size when views swap */}
        <m.div
          initial={false}
          animate={{
            width: size?.w ?? "auto",
            height: size?.h ?? "auto",
            borderRadius: open ? 28 : flashing ? 29 : 21,
          }}
          transition={flashing ? BURST : SPRING}
          className="pointer-events-auto relative flex items-center justify-center overflow-hidden border border-white/10 bg-black shadow-[0_8px_30px_rgba(0,0,0,0.5)]"
        >
          <AnimatePresence initial={false}>
            {open ? (
              <IslandView key="menu" onSize={onSize}>
                <IslandMenu active={active} onNavigate={navigate} onSearch={search} onClose={close} />
              </IslandView>
            ) : flashing ? (
              <IslandView key={`flash-${flash.id}`} onSize={onSize}>
                <IslandFlash flash={flash} onDismiss={dismissFlash} />
              </IslandView>
            ) : (
              <IslandView key="bar" onSize={onSize}>
                <IslandBar label={label} onOpen={() => setOpen(true)} onSearch={onOpenSearch} />
              </IslandView>
            )}
          </AnimatePresence>
        </m.div>
      </div>
    </>
  );
}
