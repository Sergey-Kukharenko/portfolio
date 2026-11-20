import { useCallback, useEffect, useState } from "react";

/** A short-lived message the mobile island bursts out with, Live Activity style. */
export type Flash = {
  id: number;
  title: string;
  detail?: string;
  /** accent swatch shown on the left (any CSS color) */
  color?: string;
};

type Listener = (flash: Flash) => void;

const listeners = new Set<Listener>();
let seq = 0;

/**
 * Shows a flash in the island. Fire-and-forget from anywhere — no context or
 * provider needed; with nothing subscribed (desktop) it simply goes nowhere.
 */
export function flash(message: Omit<Flash, "id">) {
  const next = { ...message, id: ++seq };
  listeners.forEach((l) => l(next));
}

/** Current flash (or null), cleared after `duration` ms; a newer one replaces it. */
export function useFlash(duration = 1800) {
  const [current, setCurrent] = useState<Flash | null>(null);

  useEffect(() => {
    listeners.add(setCurrent);
    return () => {
      listeners.delete(setCurrent);
    };
  }, []);

  useEffect(() => {
    if (!current) return;
    const t = window.setTimeout(() => setCurrent(null), duration);
    return () => window.clearTimeout(t);
  }, [current, duration]);

  const dismiss = useCallback(() => setCurrent(null), []);
  return [current, dismiss] as const;
}
