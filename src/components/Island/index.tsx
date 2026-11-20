import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { useVisibleSections } from "../../data/sections";
import { scrollToSection } from "../../lib/navigation";
import { useOverlay } from "../../lib/useOverlay";
import { useActiveSection } from "../../lib/useActiveSection";
import { useFlash } from "../../lib/island";
import { BURST, MORPH } from "../../lib/springs";
import { useAnimateTo } from "../../lib/useAnimateTo";
import IslandView, { type Size } from "./IslandView";
import IslandBar from "./IslandBar";
import IslandMenu from "./IslandMenu";
import IslandFlash from "./IslandFlash";

type Props = {
  onOpenSearch: () => void;
};

/**
 * The site header, in the spirit of Apple's Dynamic Island: one black pill,
 * the same on every screen, instead of a header bar and a hamburger.
 *
 * - bar:   live activity — reading progress, current section as Arc<Section>
 * - menu:  on click/tap — every section over a dimmed page
 * - flash: a short burst message from anywhere, via `flash()` (lib/island)
 *
 * It changes shape on its own only for flashes; the menu is always the
 * reader's doing, so it reads as one object growing, not two headers swapping.
 */
export default function Island({ onOpenSearch }: Props) {
  const active = useActiveSection();
  const label = useVisibleSections().find((s) => s.id === active)?.label;
  const [flash, dismissFlash] = useFlash();
  const [open, setOpen] = useState(false);
  // natural size of the view shown; null until measured (prerender → "auto")
  const [size, setSize] = useState<Size | null>(null);

  const close = useCallback(() => setOpen(false), []);
  useOverlay(open, close);

  const flashing = !!flash && !open;

  // the island's shape follows the measured view: a soft morph for the
  // reader's own open/close, a livelier burst for flashes
  const boxRef = useRef<HTMLDivElement>(null);
  useAnimateTo(
    boxRef,
    size && { width: size.w, height: size.h, borderRadius: open ? 28 : 29 },
    flashing ? BURST : MORPH
  );

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
    // the header must stay transform-free: a transformed ancestor would turn
    // the menu's `position: fixed` backdrop into page-relative
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
      <AnimatePresence>
        {open && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="pointer-events-auto fixed inset-0 bg-black/50 backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      {/* CSS entrance (.nav-enter) so it plays from the prerendered HTML, before JS */}
      <div className="nav-enter relative flex justify-center px-3 pt-3 md:pt-4">
        {/* width/height animate to the measured size of the current view — not
            via `layout`, whose scale transforms squash text mid-morph and lose
            track of the size when views swap */}
        <div
          ref={boxRef}
          className="pointer-events-auto relative flex items-center justify-center overflow-hidden rounded-[29px] border border-white/10 bg-black shadow-[0_8px_30px_rgba(0,0,0,0.5)] transition-shadow duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.5),0_0_36px_-2px_rgba(136,85,255,0.7)]"
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
        </div>
      </div>
    </header>
  );
}
