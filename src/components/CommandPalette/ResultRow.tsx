import { forwardRef, type ReactNode } from "react";
import { m, type Variants } from "framer-motion";
import { CornerDownLeftIcon } from "../../icons";
import type { CommandItem } from "./useCommandItems";

const itemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.97, filter: "blur(6px)" },
  visible: { opacity: 1, scale: 1, filter: "blur(0px)", transition: { duration: 0.22, ease: "easeOut" } },
  exit: { opacity: 0, scale: 0.97, filter: "blur(6px)", transition: { duration: 0.14, ease: "easeIn" } },
};

type Props = {
  item: CommandItem;
  active: boolean;
  justSelected: boolean;
  onHover: () => void;
  onSelect: () => void;
};

// forwardRef: AnimatePresence mode="popLayout" needs the DOM node
export const ResultRow = forwardRef<HTMLLIElement, Props>(function ResultRow(
  { item, active, justSelected, onHover, onSelect },
  ref
) {
  const Icon = item.icon;
  return (
    <m.li
      ref={ref}
      data-id={item.id}
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="relative"
    >
      {active && (
        <m.div
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
        <m.span
          animate={justSelected ? { scale: [1, 1.25, 1] } : { scale: 1 }}
          transition={{ duration: 0.35 }}
          className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${item.gradient} text-white shadow-sm`}
        >
          <Icon width={15} height={15} />
        </m.span>

        <span className="min-w-0 flex-1">
          <span className="block truncate text-[13.5px] font-medium text-white">{item.title}</span>
          <span className="block truncate text-xs text-gray-500">{item.subtitle}</span>
        </span>

        {item.shortcut ? (
          <span className="flex-shrink-0 rounded-md border border-white/10 bg-white/5 px-1.5 py-0.5 text-[11px] font-medium text-gray-400">
            {item.shortcut}
          </span>
        ) : (
          <m.span
            initial={{ opacity: 0, x: -4 }}
            animate={active ? { opacity: 1, x: 0 } : { opacity: 0, x: -4 }}
            transition={{ duration: 0.15 }}
            className="flex-shrink-0 text-gray-500"
          >
            <CornerDownLeftIcon width={13} height={13} />
          </m.span>
        )}
      </button>
    </m.li>
  );
});

export function Kbd({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={`flex h-4 w-4 items-center justify-center rounded border border-white/10 bg-white/5 text-gray-400 ${className}`}
    >
      {children}
    </span>
  );
}
