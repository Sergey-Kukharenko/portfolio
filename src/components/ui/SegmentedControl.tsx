import { m } from "framer-motion";

type Props<T extends string> = {
  options: readonly { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
  /** unique per instance — the gradient pill glides between options via layoutId */
  layoutId: string;
  className?: string;
  /** padding of each option */
  itemClassName?: string;
};

/** Pill-shaped tab switcher with an animated gradient highlight. */
export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  layoutId,
  className = "",
  itemClassName = "px-4",
}: Props<T>) {
  return (
    <div
      role="tablist"
      className={`flex gap-1 rounded-full border border-white/10 bg-white/[0.03] p-1 ${className}`}
    >
      {options.map((o) => {
        const selected = o.value === value;
        return (
          <button
            key={o.value}
            type="button"
            role="tab"
            aria-selected={selected}
            onClick={() => onChange(o.value)}
            className={`relative rounded-full py-1.5 text-xs font-medium transition-colors sm:text-sm ${itemClassName}`}
          >
            {selected && (
              <m.span
                layoutId={layoutId}
                className="absolute inset-0 rounded-full bg-gradient-to-r from-framer-blue via-framer-purple to-framer-pink"
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
              />
            )}
            <span className={`relative z-10 ${selected ? "text-white" : "text-gray-400"}`}>
              {o.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
