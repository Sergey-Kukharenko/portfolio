import { useState } from "react";
import { CommandIcon, SearchIcon } from "../../icons";
import { useVisibleSections } from "../../data/sections";
import ArcMark from "../ArcMark";

type Props = {
  active: string;
  /** the command palette is open — a developer moment for the mark */
  searchOpen: boolean;
  /** opened from the keyboard: move focus into the links */
  autoFocus: boolean;
  onNavigate: (id: string) => void;
  onSearch: () => void;
};

/** The expanded desktop island: mark, section links and ⌘K search. */
export default function IslandLinks({ active, searchOpen, autoFocus, onNavigate, onSearch }: Props) {
  const sections = useVisibleSections();
  const [logoHovered, setLogoHovered] = useState(false);
  // Arc. is the business face; it turns into Arc<T> in developer moments
  const generic = logoHovered || searchOpen || active === "code";

  return (
    <div className="flex h-12 items-center gap-1 pl-5 pr-1.5">
      <button
        type="button"
        onClick={() => onNavigate("top")}
        onPointerEnter={() => setLogoHovered(true)}
        onPointerLeave={() => setLogoHovered(false)}
        onFocus={() => setLogoHovered(true)}
        onBlur={() => setLogoHovered(false)}
        aria-label="Sergey Kukharenko — наверх"
        className="mr-3 flex items-baseline"
      >
        <ArcMark generic={generic} className="text-lg" />
      </button>

      <nav aria-label="Разделы" className="flex items-center">
        {sections.map((s, i) => (
          <button
            key={s.id}
            type="button"
            autoFocus={autoFocus && i === 0}
            onClick={() => onNavigate(s.id)}
            aria-current={s.id === active ? "location" : undefined}
            className="rounded-full px-3 py-1.5 text-sm text-gray-400 transition-colors hover:bg-white/10 hover:text-white aria-[current]:bg-white/[0.08] aria-[current]:text-white"
          >
            {s.label}
          </button>
        ))}
      </nav>

      <button
        type="button"
        onClick={onSearch}
        aria-label="Поиск (⌘K)"
        className="ml-2 flex items-center gap-2 rounded-full bg-white/[0.06] py-1.5 pl-3 pr-1.5 text-xs text-gray-400 transition-colors hover:bg-white/10 hover:text-white"
      >
        <SearchIcon width={13} height={13} />
        <span className="flex items-center gap-0.5 rounded-full bg-white/10 px-1.5 py-0.5 text-[10px]">
          <CommandIcon width={9} height={9} />K
        </span>
      </button>
    </div>
  );
}
