import type { ReactNode } from "react";

/** Small tech-stack chip. */
export function Tag({ children, muted = false }: { children: ReactNode; muted?: boolean }) {
  return (
    <span
      className={`rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] ${
        muted ? "text-gray-300" : "text-gray-200"
      }`}
    >
      {children}
    </span>
  );
}

export function TagList({ items, muted }: { items: string[]; muted?: boolean }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {items.map((s) => (
        <Tag key={s} muted={muted}>
          {s}
        </Tag>
      ))}
    </div>
  );
}
