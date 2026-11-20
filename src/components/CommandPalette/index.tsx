import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, m, useReducedMotion, type Variants } from "framer-motion";
import type { Project } from "../../data/projects";
import { ArrowUpIcon, CommandIcon, CornerDownLeftIcon, SearchIcon, XIcon } from "../../icons";
import { useLockBodyScroll } from "../../lib/useLockBodyScroll";
import { Kbd, ResultRow } from "./ResultRow";
import { searchItems, useCommandItems, type CommandItem } from "./useCommandItems";
import { useActiveItem } from "./useActiveItem";
import { useLocale } from "../../i18n";


type Props = {
  open: boolean;
  onClose: () => void;
  onOpenProject: (project: Project) => void;
};

export default function CommandPalette({ open, onClose, onOpenProject }: Props) {
  useLockBodyScroll(open);

  return (
    <AnimatePresence>
      {open && (
        <m.div
          className="fixed inset-0 z-[70] flex items-start justify-center px-4 pt-[10vh] sm:pt-[14vh]"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={overlayVariants}
        >
          <m.div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={onClose} />

          {/* all palette state lives in Panel, which mounts on open — so the
              query, selection and placeholder start fresh every time */}
          <Panel onClose={onClose} onOpenProject={onOpenProject} />
        </m.div>
      )}
    </AnimatePresence>
  );
}

function Panel({ onClose, onOpenProject }: Omit<Props, "open">) {
  const [query, setQuery] = useState("");
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [isFocused, setIsFocused] = useState(false);
  const [justSelected, setJustSelected] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { ui } = useLocale();
  const placeholders = ui.command.placeholders;
  const items = useCommandItems(onOpenProject);
  const { groups, flat } = useMemo(() => searchItems(items, query), [items, query]);
  const { activeId, setActiveId, active, move } = useActiveItem(flat);

  // focus after the entrance animation has started, not mid-mount
  useEffect(() => {
    const t = window.setTimeout(() => inputRef.current?.focus(), 40);
    return () => window.clearTimeout(t);
  }, []);

  // rotating placeholder hints while the empty input is focused
  useEffect(() => {
    if (!isFocused || query.length > 0) return;
    const interval = window.setInterval(() => {
      setPlaceholderIndex((i) => (i + 1) % placeholders.length);
    }, 2200);
    return () => window.clearInterval(interval);
  }, [isFocused, query, placeholders.length]);

  // keep the keyboard-selected row in view
  useEffect(() => {
    if (!activeId || !listRef.current) return;
    const el = listRef.current.querySelector<HTMLElement>(`[data-id="${CSS.escape(activeId)}"]`);
    el?.scrollIntoView({ block: "nearest" });
  }, [activeId]);

  const handleSelect = (item: CommandItem) => {
    setJustSelected(item.id);
    // let the icon "pop" play before navigating away
    window.setTimeout(() => {
      item.run();
      onClose();
    }, 220);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      e.preventDefault();
      onClose();
    } else if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      move(e.key === "ArrowDown" ? 1 : -1);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (active) handleSelect(active);
    }
  };

  return (
    // no backdrop-filter of its own: the overlay behind already blurs the page, and a
    // second 40px blur re-rendered on every frame of the scale-in made weaker GPUs
    // (M1) stutter. A dark tint keeps the page from showing through; `isolate`
    // keeps the -z-10 conic glow inside the panel (backdrop-filter used to do that).
    <m.div
      role="dialog"
      aria-modal="true"
      aria-label={ui.command.label}
      variants={panelVariants}
      className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-white/20 isolate bg-[#0c0c12]/55 bg-gradient-to-br from-framer-blue/25 via-framer-purple/20 to-framer-pink/20 shadow-glow"
    >
      {!prefersReducedMotion && (
        // no blur filter (see framer-conic-soft); a centered square wider than
        // the panel's diagonal keeps the corners filled mid-turn, which the blur
        // used to smear over (margins, not translate: framer owns transform)
        <m.div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 -z-10 -ml-[30rem] -mt-[30rem] h-[60rem] w-[60rem] bg-framer-conic-soft opacity-40"
          animate={{ rotate: 360 }}
          transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
        />
      )}

      <div className="relative flex items-center gap-3 border-b border-white/10 px-5 py-4">
        <m.div
          animate={isFocused ? { scale: 1.08, color: "#8855FF" } : { scale: 1, color: "#9CA3AF" }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="flex-shrink-0"
        >
          <SearchIcon width={18} height={18} />
        </m.div>

        <div className="relative flex-1">
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onKeyDown={handleKeyDown}
            className="peer w-full bg-transparent text-[15px] font-medium text-white outline-none placeholder:text-transparent"
            spellCheck={false}
            autoComplete="off"
          />
          {query.length === 0 && (
            <div className="pointer-events-none absolute inset-0 flex items-center overflow-hidden">
              <AnimatePresence mode="wait">
                <m.span
                  key={placeholderIndex}
                  initial={{ y: 14, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -14, opacity: 0 }}
                  transition={{ duration: 0.32, ease: "easeOut" }}
                  className="text-[15px] font-medium text-gray-500"
                >
                  {placeholders[placeholderIndex]}
                </m.span>
              </AnimatePresence>
            </div>
          )}
        </div>

        <AnimatePresence initial={false}>
          {query.length > 0 ? (
            <m.button
              key="clear"
              type="button"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                setQuery("");
                inputRef.current?.focus();
              }}
              className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-white/10 text-gray-300 hover:bg-white/20"
              aria-label={ui.command.clear}
            >
              <XIcon width={13} height={13} />
            </m.button>
          ) : (
            <m.kbd
              key="esc"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-shrink-0 rounded-md border border-white/10 bg-white/5 px-1.5 py-0.5 text-[11px] font-medium text-gray-400"
            >
              esc
            </m.kbd>
          )}
        </AnimatePresence>
      </div>

      <div className="h-[min(60vh,28rem)]">
        <div ref={listRef} className="results-scroll h-full overflow-y-auto p-2">
          {flat.length === 0 ? (
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex h-full flex-col items-center justify-center gap-2 px-6 text-center"
            >
              <m.div
                animate={{ rotate: [0, -12, 12, -8, 0] }}
                transition={{ duration: 0.6 }}
                className="text-3xl"
              >
                🔎
              </m.div>
              <p className="text-sm font-medium text-gray-300">{ui.command.empty}</p>
              <p className="text-xs text-gray-500">{ui.command.tryAnother(query)}</p>
            </m.div>
          ) : (
            <m.div variants={listContainerVariants} initial="hidden" animate="visible">
              {groups.map((group) => (
                <div key={group.category} className="mb-1 last:mb-0">
                  <p className="px-3 pb-1 pt-2 text-[11px] font-semibold uppercase tracking-wider text-gray-500">
                    {group.label}
                  </p>
                  <ul>
                    <AnimatePresence initial={false} mode="popLayout">
                      {group.items.map((item) => (
                        <ResultRow
                          key={item.id}
                          item={item}
                          active={item.id === activeId}
                          justSelected={justSelected === item.id}
                          onHover={() => setActiveId(item.id)}
                          onSelect={() => handleSelect(item)}
                        />
                      ))}
                    </AnimatePresence>
                  </ul>
                </div>
              ))}
            </m.div>
          )}
        </div>
      </div>

      <m.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.12, duration: 0.25 }}
        className="flex items-center justify-between gap-3 border-t border-white/10 bg-white/[0.02] px-5 py-3 text-[11px] text-gray-500"
      >
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <Kbd>
              <ArrowUpIcon width={11} height={11} />
            </Kbd>
            <Kbd className="rotate-180">
              <ArrowUpIcon width={11} height={11} />
            </Kbd>
            {ui.command.navigate}
          </span>
          <span className="flex items-center gap-1">
            <Kbd>
              <CornerDownLeftIcon width={11} height={11} />
            </Kbd>
            {ui.command.select}
          </span>
        </div>
        <span className="flex items-center gap-1">
          <Kbd>
            <CommandIcon width={10} height={10} />
          </Kbd>
          <Kbd>K</Kbd>
          {ui.command.open}
        </span>
      </m.div>
    </m.div>
  );
}

const overlayVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25, ease: "easeOut" } },
  exit: { opacity: 0, transition: { duration: 0.18, ease: "easeIn" } },
};

const panelVariants: Variants = {
  hidden: { opacity: 0, y: -18, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 420, damping: 34, mass: 0.9 },
  },
  exit: { opacity: 0, y: -10, scale: 0.97, transition: { duration: 0.16, ease: "easeIn" } },
};

const listContainerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.035, delayChildren: 0.02 } },
};

