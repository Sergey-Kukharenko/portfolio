import {
  forwardRef,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ComponentType,
  type KeyboardEvent,
  type ReactNode,
  type SVGProps,
} from "react";
import { AnimatePresence, motion, useReducedMotion, type Variants } from "framer-motion";
import { experience } from "../data/experience";
import { projects, type Project } from "../data/projects";
import {
  ArrowUpIcon,
  BoltIcon,
  BriefcaseIcon,
  CommandIcon,
  CornerDownLeftIcon,
  FileIcon,
  FolderIcon,
  GithubIcon,
  LinkedinIcon,
  MailIcon,
  SearchIcon,
  SendIcon,
  XIcon,
} from "../icons";

type Category = "Действия" | "Разделы" | "Проекты" | "Опыт";

type CommandItem = {
  id: string;
  title: string;
  subtitle: string;
  category: Category;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  gradient: string;
  shortcut?: string;
  run: () => void;
};

const categoryOrder: Category[] = ["Действия", "Разделы", "Проекты", "Опыт"];

const PLACEHOLDERS = [
  "Найти проект…",
  "Перейти в раздел…",
  "Найти компанию из опыта…",
  "Написать в Telegram…",
];

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

type Props = {
  open: boolean;
  onClose: () => void;
  onOpenProject: (project: Project) => void;
};

export default function CommandPalette({ open, onClose, onOpenProject }: Props) {
  const [query, setQuery] = useState("");
  const [activeId, setActiveId] = useState<string | null>(null);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [isFocused, setIsFocused] = useState(false);
  const [justSelected, setJustSelected] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const items: CommandItem[] = useMemo(
    () => [
      {
        id: "action-telegram",
        title: "Написать в Telegram",
        subtitle: "@SergeyKukharenko",
        category: "Действия",
        icon: SendIcon,
        gradient: "from-framer-blue to-framer-teal",
        shortcut: "↗",
        run: () => window.open("https://t.me/SergeyKukharenko", "_blank"),
      },
      {
        id: "action-mail",
        title: "Написать на почту",
        subtitle: "iamksergey@mail.ru",
        category: "Действия",
        icon: MailIcon,
        gradient: "from-framer-purple to-framer-pink",
        run: () => window.open("mailto:iamksergey@mail.ru", "_blank"),
      },
      {
        id: "action-github",
        title: "Открыть GitHub",
        subtitle: "Sergey-Kukharenko",
        category: "Действия",
        icon: GithubIcon,
        gradient: "from-framer-teal to-framer-blue",
        shortcut: "↗",
        run: () => window.open("https://github.com/Sergey-Kukharenko", "_blank"),
      },
      {
        id: "action-linkedin",
        title: "Открыть LinkedIn",
        subtitle: "Профиль",
        category: "Действия",
        icon: LinkedinIcon,
        gradient: "from-framer-orange to-framer-teal",
        shortcut: "↗",
        run: () =>
          window.open(
            "https://www.linkedin.com/in/%D1%81%D0%B5%D1%80%D0%B3%D0%B5%D0%B9-%D0%BA%D1%83%D1%85%D0%B0%D1%80%D0%B5%D0%BD%D0%BA%D0%BE-51154b350/",
            "_blank"
          ),
      },
      {
        id: "action-top",
        title: "Наверх страницы",
        subtitle: "Вернуться к началу",
        category: "Действия",
        icon: BoltIcon,
        gradient: "from-framer-pink to-framer-red",
        run: () => scrollTo("top"),
      },
      {
        id: "section-about",
        title: "Обо мне",
        subtitle: "Кто я и чем занимаюсь",
        category: "Разделы",
        icon: FileIcon,
        gradient: "from-framer-blue to-framer-purple",
        run: () => scrollTo("about"),
      },
      {
        id: "section-experience",
        title: "Опыт работы",
        subtitle: "12 лет, 7 компаний",
        category: "Разделы",
        icon: FileIcon,
        gradient: "from-framer-purple to-framer-pink",
        run: () => scrollTo("experience"),
      },
      {
        id: "section-skills",
        title: "Навыки",
        subtitle: "Стек, инструменты и палитра",
        category: "Разделы",
        icon: FileIcon,
        gradient: "from-framer-pink to-framer-teal",
        run: () => scrollTo("skills"),
      },
      {
        id: "section-code",
        title: "Код",
        subtitle: "JS, TS, Vue, React, Nuxt, Next",
        category: "Разделы",
        icon: FileIcon,
        gradient: "from-framer-blue to-framer-teal",
        run: () => scrollTo("code"),
      },
      {
        id: "section-projects",
        title: "Проекты",
        subtitle: "12 pet-проектов",
        category: "Разделы",
        icon: FileIcon,
        gradient: "from-framer-teal to-framer-blue",
        run: () => scrollTo("projects"),
      },
      {
        id: "section-contact",
        title: "Контакты",
        subtitle: "Telegram, Email, WhatsApp",
        category: "Разделы",
        icon: FileIcon,
        gradient: "from-framer-orange to-framer-pink",
        run: () => scrollTo("contact"),
      },
      ...projects.map<CommandItem>((project) => ({
        id: `project-${project.id}`,
        title: project.title,
        subtitle: `${project.tagline} · ${project.stack[0]}`,
        category: "Проекты",
        icon: FolderIcon,
        gradient: project.gradient,
        run: () => {
          scrollTo("projects");
          window.setTimeout(() => onOpenProject(project), 250);
        },
      })),
      ...experience.map<CommandItem>((exp) => ({
        id: `exp-${exp.id}`,
        title: exp.company,
        subtitle: `${exp.role} · ${exp.period}`,
        category: "Опыт",
        icon: BriefcaseIcon,
        gradient: exp.gradient,
        run: () => scrollTo("experience"),
      })),
    ],
    [onOpenProject]
  );

  const { groups, flat } = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = q
      ? items.filter(
          (r) =>
            r.title.toLowerCase().includes(q) ||
            r.subtitle.toLowerCase().includes(q) ||
            r.category.toLowerCase().includes(q)
        )
      : items;

    const grouped = categoryOrder
      .map((category) => ({ category, items: filtered.filter((r) => r.category === category) }))
      .filter((g) => g.items.length > 0);

    return { groups: grouped, flat: grouped.flatMap((g) => g.items) };
  }, [items, query]);

  useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(() => inputRef.current?.focus(), 40);
    return () => window.clearTimeout(t);
  }, [open]);

  useEffect(() => {
    if (!open) {
      setQuery("");
      setActiveId(null);
      setJustSelected(null);
    }
  }, [open]);

  useEffect(() => {
    if (flat.length === 0) {
      setActiveId(null);
      return;
    }
    if (!activeId || !flat.some((r) => r.id === activeId)) {
      setActiveId(flat[0].id);
    }
  }, [flat, activeId]);

  useEffect(() => {
    if (!open || !isFocused) return;
    if (query.length > 0) return;
    const interval = window.setInterval(() => {
      setPlaceholderIndex((i) => (i + 1) % PLACEHOLDERS.length);
    }, 2200);
    return () => window.clearInterval(interval);
  }, [open, isFocused, query]);

  useEffect(() => {
    if (!activeId || !listRef.current) return;
    const el = listRef.current.querySelector<HTMLElement>(`[data-id="${CSS.escape(activeId)}"]`);
    el?.scrollIntoView({ block: "nearest" });
  }, [activeId]);

  const handleSelect = (item: CommandItem) => {
    setJustSelected(item.id);
    window.setTimeout(() => {
      item.run();
      onClose();
    }, 220);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      e.preventDefault();
      onClose();
      return;
    }
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      if (flat.length === 0) return;
      const idx = flat.findIndex((r) => r.id === activeId);
      const next =
        e.key === "ArrowDown" ? (idx + 1 + flat.length) % flat.length : (idx - 1 + flat.length) % flat.length;
      setActiveId(flat[next].id);
      return;
    }
    if (e.key === "Enter") {
      e.preventDefault();
      const item = flat.find((r) => r.id === activeId);
      if (item) handleSelect(item);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-start justify-center px-4 pt-[10vh] sm:pt-[14vh]"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={overlayVariants}
        >
          <motion.div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={onClose} />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Быстрый переход"
            variants={panelVariants}
            className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-white/20 bg-gradient-to-br from-framer-blue/25 via-framer-purple/20 to-framer-pink/20 shadow-glow backdrop-blur-2xl backdrop-saturate-150"
          >
            {!prefersReducedMotion && (
              <motion.div
                aria-hidden
                className="pointer-events-none absolute -inset-24 -z-10 opacity-40 blur-3xl"
                style={{
                  background:
                    "conic-gradient(from 0deg, #0099FF, #8855FF, #FF55A3, #FF3366, #FF8855, #05F2C7, #0099FF)",
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
              />
            )}

            <div className="relative flex items-center gap-3 border-b border-white/10 px-5 py-4">
              <motion.div
                animate={isFocused ? { scale: 1.08, color: "#8855FF" } : { scale: 1, color: "#9CA3AF" }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="flex-shrink-0"
              >
                <SearchIcon width={18} height={18} />
              </motion.div>

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
                      <motion.span
                        key={placeholderIndex}
                        initial={{ y: 14, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -14, opacity: 0 }}
                        transition={{ duration: 0.32, ease: "easeOut" }}
                        className="text-[15px] font-medium text-gray-500"
                      >
                        {PLACEHOLDERS[placeholderIndex]}
                      </motion.span>
                    </AnimatePresence>
                  </div>
                )}
              </div>

              <AnimatePresence initial={false}>
                {query.length > 0 ? (
                  <motion.button
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
                    aria-label="Очистить"
                  >
                    <XIcon width={13} height={13} />
                  </motion.button>
                ) : (
                  <motion.kbd
                    key="esc"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex-shrink-0 rounded-md border border-white/10 bg-white/5 px-1.5 py-0.5 text-[11px] font-medium text-gray-400"
                  >
                    esc
                  </motion.kbd>
                )}
              </AnimatePresence>
            </div>

            <div className="h-[min(60vh,28rem)]">
              <div ref={listRef} className="results-scroll h-full overflow-y-auto p-2">
                {flat.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex h-full flex-col items-center justify-center gap-2 px-6 text-center"
                  >
                    <motion.div
                      animate={{ rotate: [0, -12, 12, -8, 0] }}
                      transition={{ duration: 0.6 }}
                      className="text-3xl"
                    >
                      🔎
                    </motion.div>
                    <p className="text-sm font-medium text-gray-300">Ничего не найдено</p>
                    <p className="text-xs text-gray-500">Попробуйте другой запрос — «{query}»</p>
                  </motion.div>
                ) : (
                  <motion.div variants={listContainerVariants} initial="hidden" animate="visible">
                    {groups.map((group) => (
                      <div key={group.category} className="mb-1 last:mb-0">
                        <p className="px-3 pb-1 pt-2 text-[11px] font-semibold uppercase tracking-wider text-gray-500">
                          {group.category}
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
                  </motion.div>
                )}
              </div>
            </div>

            <motion.div
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
                  для навигации
                </span>
                <span className="flex items-center gap-1">
                  <Kbd>
                    <CornerDownLeftIcon width={11} height={11} />
                  </Kbd>
                  выбрать
                </span>
              </div>
              <span className="flex items-center gap-1">
                <Kbd>
                  <CommandIcon width={10} height={10} />
                </Kbd>
                <Kbd>K</Kbd>
                открыть
              </span>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
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

const itemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.97, filter: "blur(6px)" },
  visible: { opacity: 1, scale: 1, filter: "blur(0px)", transition: { duration: 0.22, ease: "easeOut" } },
  exit: { opacity: 0, scale: 0.97, filter: "blur(6px)", transition: { duration: 0.14, ease: "easeIn" } },
};

function Kbd({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={`flex h-4 w-4 items-center justify-center rounded border border-white/10 bg-white/5 text-gray-400 ${className}`}
    >
      {children}
    </span>
  );
}

const ResultRow = forwardRef<HTMLLIElement, {
  item: CommandItem;
  active: boolean;
  justSelected: boolean;
  onHover: () => void;
  onSelect: () => void;
}>(function ResultRow({ item, active, justSelected, onHover, onSelect }, ref) {
  const Icon = item.icon;
  return (
    <motion.li
      ref={ref}
      data-id={item.id}
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="relative"
    >
      {active && (
        <motion.div
          layoutId="active-pill"
          className="absolute inset-0 rounded-xl bg-white/[0.07]"
          transition={{ type: "spring", stiffness: 500, damping: 40 }}
        />
      )}
      <button
        type="button"
        onMouseMove={onHover}
        onClick={onSelect}
        className="relative flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left"
      >
        <motion.span
          animate={justSelected ? { scale: [1, 1.25, 1] } : { scale: 1 }}
          transition={{ duration: 0.35 }}
          className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${item.gradient} text-white shadow-sm`}
        >
          <Icon width={15} height={15} />
        </motion.span>

        <span className="min-w-0 flex-1">
          <span className="block truncate text-[13.5px] font-medium text-white">{item.title}</span>
          <span className="block truncate text-xs text-gray-500">{item.subtitle}</span>
        </span>

        {item.shortcut ? (
          <span className="flex-shrink-0 rounded-md border border-white/10 bg-white/5 px-1.5 py-0.5 text-[11px] font-medium text-gray-400">
            {item.shortcut}
          </span>
        ) : (
          <motion.span
            initial={{ opacity: 0, x: -4 }}
            animate={active ? { opacity: 1, x: 0 } : { opacity: 0, x: -4 }}
            transition={{ duration: 0.15 }}
            className="flex-shrink-0 text-gray-500"
          >
            <CornerDownLeftIcon width={13} height={13} />
          </motion.span>
        )}

        <AnimatePresence>
          {justSelected && (
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center rounded-xl bg-framer-purple/20 text-framer-teal"
            >
              ✓
            </motion.span>
          )}
        </AnimatePresence>
      </button>
    </motion.li>
  );
});
