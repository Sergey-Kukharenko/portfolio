import { SearchIcon, XIcon } from "../../icons";
import { useVisibleSections } from "../../data/sections";
import ArcMark from "../ArcMark";

type Props = {
  active: string;
  onNavigate: (id: string) => void;
  onSearch: () => void;
  onClose: () => void;
};

/** The expanded island: who, every section (current one marked), and search. */
export default function IslandMenu({ active, onNavigate, onSearch, onClose }: Props) {
  const sections = useVisibleSections();

  return (
    <div className="w-[min(calc(100vw-24px),24rem)] p-2">
      <div className="flex items-center gap-3 px-2 pb-2 pt-1">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-gradient-to-br from-[#1a0b24] to-[#0b0820]">
          <ArcMark className="text-[12px]" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-white">Sergey Kukharenko</p>
          <p className="truncate text-xs text-gray-500">Senior Frontend Developer</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Закрыть навигацию"
          className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-gray-300"
        >
          <XIcon width={14} height={14} />
        </button>
      </div>

      <nav aria-label="Разделы" className="flex flex-col">
        {sections.map((s, i) => {
          const current = s.id === active;
          return (
            <button
              key={s.id}
              type="button"
              // focus lands on the current section (or the first), so the
              // menu is usable from the keyboard right away
              autoFocus={current || (active === "top" && i === 0)}
              onClick={() => onNavigate(s.id)}
              aria-current={current ? "location" : undefined}
              className={`flex items-center gap-3 rounded-2xl px-3 py-2.5 text-left transition-colors ${
                current ? "bg-white/[0.08]" : "active:bg-white/5"
              }`}
            >
              <span className={`h-2 w-2 shrink-0 rounded-full bg-gradient-to-br ${s.gradient}`} />
              <span className="min-w-0 flex-1">
                <span className="block text-sm text-white">{s.title}</span>
                <span className="block truncate text-xs text-gray-500">{s.subtitle}</span>
              </span>
              {current && <span className="text-[10px] uppercase tracking-wider text-gray-500">вы здесь</span>}
            </button>
          );
        })}
      </nav>

      <button
        type="button"
        onClick={onSearch}
        className="mt-2 flex w-full items-center justify-center gap-2 rounded-2xl bg-white/[0.06] py-3 text-sm text-gray-300 active:bg-white/10"
      >
        <SearchIcon width={14} height={14} />
        Поиск по сайту
      </button>
    </div>
  );
}
