import { useEffect, useState } from "react";

/**
 * Keyboard-navigable "current item" over a list that can change under it
 * (e.g. while filtering): always points at an item that still exists,
 * falling back to the first one, and wraps around with move(±1).
 */
export function useActiveItem<T extends { id: string }>(items: T[]) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (items.length === 0) setActiveId(null);
    else if (!activeId || !items.some((i) => i.id === activeId)) setActiveId(items[0].id);
  }, [items, activeId]);

  const move = (delta: 1 | -1) => {
    if (items.length === 0) return;
    const idx = items.findIndex((i) => i.id === activeId);
    const next = (idx + delta + items.length) % items.length;
    setActiveId(items[next].id);
  };

  const active = items.find((i) => i.id === activeId) ?? null;

  return { activeId, setActiveId, active, move };
}
