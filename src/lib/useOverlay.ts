import { useEffect } from "react";
import { useLockBodyScroll } from "./useLockBodyScroll";

/** Overlay plumbing shared by modals and menus: freezes page scroll and closes on Escape while `open`. */
export function useOverlay(open: boolean, onClose: () => void) {
  useLockBodyScroll(open);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);
}
