import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from "framer-motion";
import { CommandIcon, SearchIcon, XIcon } from "../icons";

const LINKS = [
  { id: "about", label: "Обо мне" },
  { id: "experience", label: "Опыт" },
  { id: "skills", label: "Навыки" },
  { id: "code", label: "Код" },
  { id: "projects", label: "Проекты" },
  { id: "contact", label: "Контакты" },
];

type Props = {
  onOpenSearch: () => void;
};

export default function Nav({ onOpenSearch }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 12));

  useEffect(() => {
    if (menuOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div
        className={`mx-auto flex max-w-6xl items-center justify-between px-4 transition-all duration-300 sm:px-6 ${
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
            <span className="hidden sm:inline">Sergey Kukharenko</span>
          </button>

          <nav className="hidden items-center gap-1 md:flex">
            {LINKS.map((link) => (
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
            <motion.button
              type="button"
              onClick={onOpenSearch}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="hidden items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-gray-400 sm:flex"
            >
              <SearchIcon width={13} height={13} />
              <span>Поиск</span>
              <span className="flex items-center gap-0.5 rounded border border-white/10 bg-white/5 px-1 py-0.5 text-[10px]">
                <CommandIcon width={9} height={9} />K
              </span>
            </motion.button>

            <button
              type="button"
              onClick={onOpenSearch}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-gray-300 sm:hidden"
              aria-label="Открыть поиск"
            >
              <SearchIcon width={15} height={15} />
            </button>

            <button
              type="button"
              onClick={() => setMenuOpen((o) => !o)}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-gray-300 md:hidden"
              aria-label="Меню"
            >
              {menuOpen ? <XIcon width={15} height={15} /> : <MenuGlyph />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden px-4 sm:px-6 md:hidden"
          >
            <div className="mt-2 flex flex-col gap-1 rounded-2xl border border-white/10 bg-[#0B0B0F]/95 p-2 shadow-glow backdrop-blur-xl">
              {LINKS.map((link, i) => (
                <motion.button
                  key={link.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  onClick={() => scrollTo(link.id)}
                  className="rounded-lg px-3 py-2.5 text-left text-sm text-gray-300 hover:bg-white/5 hover:text-white"
                >
                  {link.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

function MenuGlyph() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}
