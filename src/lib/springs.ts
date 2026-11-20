/** Default UI spring: quick, settles without a visible wobble. */
export const SPRING = { type: "spring", stiffness: 420, damping: 34, mass: 0.9 } as const;

/** Livelier spring with a little overshoot — for things that "burst" into view. */
export const BURST = { type: "spring", stiffness: 520, damping: 24, mass: 0.8 } as const;

/** Unhurried shape change with a whisper of overshoot — the island growing and shrinking. */
export const MORPH = { type: "spring", duration: 0.55, bounce: 0.15 } as const;
