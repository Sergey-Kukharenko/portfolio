import { useState } from "react";
import { m, useMotionValueEvent, useScroll } from "framer-motion";
import { CommandIcon, SearchIcon } from "../icons";
import { useVisibleSections } from "../data/sections";
import { scrollToSection } from "../lib/navigation";
import { useActiveSection } from "../lib/useActiveSection";
import MobileIsland from "./MobileIsland";
import ArcMark from "./ArcMark";

type Props = {
  onOpenSearch: () => void;
  /** the command palette is open — a developer moment for the mark */
  searchOpen?: boolean;
};

export default function Nav({ onOpenSearch, searchOpen = false }: Props) {
  // scroll-driven layout reads happen here once, shared by both layouts
  const active = useActiveSection();

  return (
    // the header itself must stay transform-free: a transformed ancestor would
    // turn the island's `position: fixed` backdrop into page-relative
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
      <MobileIsland active={active} onOpenSearch={onOpenSearch} />
      <DesktopBar active={active} searchOpen={searchOpen} onOpenSearch={onOpenSearch} />
    </header>
  );
}

function DesktopBar({ active, searchOpen, onOpenSearch }: Props & { active: string }) {
  const links = useVisibleSections();
  const [scrolled, setScrolled] = useState(false);
  const [logoHovered, setLogoHovered] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 12));

  // Arc. is the business face; it turns into Arc<T> in developer moments
  const generic = logoHovered || searchOpen || active === "code";

  return (
    // CSS entrance (.nav-enter) so it plays from the prerendered HTML, before JS
    <div
      className={`nav-enter pointer-events-auto mx-auto hidden max-w-6xl px-4 transition-[margin] duration-300 sm:px-6 md:block ${
        scrolled ? "mt-3" : "mt-0"
      }`}
    >
      <div
        className={`flex items-center justify-between rounded-2xl border px-4 py-3 transition-colors duration-300 ${
          scrolled ? "border-white/10 bg-[#0B0B0F]/80 shadow-glow backdrop-blur-xl" : "border-transparent"
        }`}
      >
        <button
          type="button"
          onClick={() => scrollToSection("top")}
          onPointerEnter={() => setLogoHovered(true)}
          onPointerLeave={() => setLogoHovered(false)}
          onFocus={() => setLogoHovered(true)}
          onBlur={() => setLogoHovered(false)}
          aria-label="Sergey Kukharenko — наверх"
          className="flex items-baseline gap-2.5"
        >
          <ArcMark generic={generic} className="text-xl" />
          <span className="text-sm font-medium text-gray-400">Sergey Kukharenko</span>
        </button>

        <nav className="flex items-center gap-1">
          {links.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => scrollToSection(link.id)}
              aria-current={link.id === active ? "location" : undefined}
              className="rounded-lg px-3 py-1.5 text-sm text-gray-400 transition-colors hover:bg-white/5 hover:text-white aria-[current]:text-white"
            >
              {link.label}
            </button>
          ))}
        </nav>

        <m.button
          type="button"
          onClick={onOpenSearch}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-gray-400"
        >
          <SearchIcon width={13} height={13} />
          <span>Поиск</span>
          <span className="flex items-center gap-0.5 rounded border border-white/10 bg-white/5 px-1 py-0.5 text-[10px]">
            <CommandIcon width={9} height={9} />K
          </span>
        </m.button>
      </div>
    </div>
  );
}
