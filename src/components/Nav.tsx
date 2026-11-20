import { useState } from "react";
import { m, useScroll, useMotionValueEvent } from "framer-motion";
import { CommandIcon, SearchIcon } from "../icons";
import { useVisibleSections } from "../data/sections";
import { scrollToSection } from "../lib/navigation";
import MobileIsland from "./MobileIsland";

type Props = {
  onOpenSearch: () => void;
};

export default function Nav({ onOpenSearch }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  const links = useVisibleSections();

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 12));

  const scrollTo = scrollToSection;

  return (
    // the header itself must stay transform-free: a transformed ancestor would
    // turn the island's `position: fixed` backdrop into page-relative
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
      {/* phones get a compact island instead of a full-width bar + hamburger */}
      <MobileIsland onOpenSearch={onOpenSearch} />

      {/* CSS entrance (.nav-enter) so it plays from the prerendered HTML, before JS */}
      <div
        className={`nav-enter pointer-events-auto mx-auto hidden max-w-6xl items-center md:flex justify-between px-4 transition-all duration-300 sm:px-6 ${
          scrolled ? "mt-3" : "mt-0"
        }`}
      >
        <div
          className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3 transition-all duration-300 ${
            scrolled
              ? "border-white/10 bg-[#0B0B0F]/80 shadow-glow backdrop-blur-xl"
              : "border-transparent bg-transparent"
          }`}
        >
          <button
            type="button"
            onClick={() => scrollTo("top")}
            className="flex items-center gap-2 text-sm font-semibold tracking-tight text-white"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-framer-blue via-framer-purple to-framer-pink text-xs font-bold">
              SK
            </span>
            <span>Sergey Kukharenko</span>
          </button>

          <nav className="flex items-center gap-1">
            {links.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="rounded-lg px-3 py-1.5 text-sm text-gray-400 transition-colors hover:bg-white/5 hover:text-white"
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
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
      </div>
    </header>
  );
}
