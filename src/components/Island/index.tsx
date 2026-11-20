import { useCallback, useEffect, useRef, useState, type MouseEvent } from "react";
import { AnimatePresence, m, useMotionValueEvent, useScroll } from "framer-motion";
import { useVisibleSections } from "../../data/sections";
import { scrollToSection } from "../../lib/navigation";
import { useOverlay } from "../../lib/useOverlay";
import { useIsDesktop } from "../../lib/useMediaQuery";
import { useActiveSection } from "../../lib/useActiveSection";
import { useFlash } from "../../lib/island";
import { BURST, SPRING } from "../../lib/springs";
import IslandView, { type Size } from "./IslandView";
import IslandBar from "./IslandBar";
import IslandMenu from "./IslandMenu";
import IslandLinks from "./IslandLinks";
import IslandFlash from "./IslandFlash";

type Props = {
  onOpenSearch: () => void;
  /** the command palette is open */
  searchOpen: boolean;
};

const AT_TOP = 80; // px of scroll under which the desktop island stays expanded
const LEAVE_DELAY = 200; // ms before a hovered island collapses again

/**
 * The site header, in the spirit of Apple's Dynamic Island: one black pill on
 * every screen instead of a header bar and a hamburger.
 *
 * - bar:   live activity — reading progress, current section as Arc<Section>
 * - links: desktop, at the top of the page or on hover/click — all sections
 * - menu:  mobile, on tap — the full section list over a dimmed page
 * - flash: a short burst message from anywhere, via `flash()` (lib/island)
 */
export default function Island({ onOpenSearch, searchOpen }: Props) {
  const isDesktop = useIsDesktop();
  const active = useActiveSection();
  const label = useVisibleSections().find((s) => s.id === active)?.label;
  const [flash, dismissFlash] = useFlash();

  const [menuOpen, setMenuOpen] = useState(false);
  const [atTop, setAtTop] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [pinned, setPinned] = useState(false); // desktop: expanded by a click
  const [keyboardOpened, setKeyboardOpened] = useState(false);
  // natural size of the view shown; null until measured (prerender → "auto")
  const [size, setSize] = useState<Size | null>(null);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => {
    setAtTop(y < AT_TOP);
    setPinned(false); // scrolling hands the island back to the page
  });

  const open = menuOpen && !isDesktop;
  const flashing = !!flash && !open;
  const view = open
    ? "menu"
    : flashing
      ? "flash"
      : isDesktop && (atTop || hovered || pinned)
        ? "links"
        : "bar";

  const closeMenu = useCallback(() => setMenuOpen(false), []);
  useOverlay(open, closeMenu);

  // hover intent: expand at once, collapse after a short grace period
  const leaveTimer = useRef<number>();
  useEffect(() => () => window.clearTimeout(leaveTimer.current), []);
  const onPointerEnter = () => {
    window.clearTimeout(leaveTimer.current);
    setHovered(true);
  };
  const onPointerLeave = () => {
    leaveTimer.current = window.setTimeout(() => setHovered(false), LEAVE_DELAY);
  };

  // only re-render when the size really changed (ResizeObserver can repeat)
  const onSize = useCallback(
    (next: Size) => setSize((prev) => (prev?.w === next.w && prev?.h === next.h ? prev : next)),
    []
  );

  // a light tap on Android when a flash appears (iOS Safari has no vibrate API)
  useEffect(() => {
    if (flashing) navigator.vibrate?.(8);
  }, [flashing, flash]);

  const expand = (e: MouseEvent) => {
    if (!isDesktop) return setMenuOpen(true);
    setKeyboardOpened(e.detail === 0); // detail 0 = Enter/Space, not a pointer
    setPinned(true);
  };

  const navigate = (id: string) => {
    closeMenu();
    scrollToSection(id);
  };

  const search = () => {
    closeMenu();
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
            onClick={closeMenu}
            className="pointer-events-auto fixed inset-0 bg-black/50 backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      {/* CSS entrance (.nav-enter) so it plays from the prerendered HTML, before JS */}
      <div className="nav-enter relative flex justify-center px-3 pt-3 md:pt-4">
        {/* width/height animate to the measured size of the current view — not
            via `layout`, whose scale transforms squash text mid-morph and lose
            track of the size when views swap */}
        <m.div
          initial={false}
          animate={{
            width: size?.w ?? "auto",
            height: size?.h ?? "auto",
            borderRadius: view === "menu" ? 28 : 29,
          }}
          transition={flashing ? BURST : SPRING}
          onPointerEnter={isDesktop ? onPointerEnter : undefined}
          onPointerLeave={isDesktop ? onPointerLeave : undefined}
          className="pointer-events-auto relative flex items-center justify-center overflow-hidden border border-white/10 bg-black shadow-[0_8px_30px_rgba(0,0,0,0.5)]"
        >
          <AnimatePresence initial={false}>
            {view === "menu" ? (
              <IslandView key="menu" onSize={onSize}>
                <IslandMenu active={active} onNavigate={navigate} onSearch={search} onClose={closeMenu} />
              </IslandView>
            ) : view === "flash" && flash ? (
              <IslandView key={`flash-${flash.id}`} onSize={onSize}>
                <IslandFlash flash={flash} onDismiss={dismissFlash} />
              </IslandView>
            ) : view === "links" ? (
              <IslandView key="links" onSize={onSize}>
                <IslandLinks
                  active={active}
                  searchOpen={searchOpen}
                  autoFocus={keyboardOpened}
                  onNavigate={navigate}
                  onSearch={search}
                />
              </IslandView>
            ) : (
              <IslandView key="bar" onSize={onSize}>
                <IslandBar label={label} onOpen={expand} onSearch={onOpenSearch} />
              </IslandView>
            )}
          </AnimatePresence>
        </m.div>
      </div>
    </header>
  );
}
