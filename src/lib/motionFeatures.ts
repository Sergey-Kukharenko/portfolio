// The full framer-motion feature set (animations, gestures, layout / layoutId,
// drag). Kept in its own module so <LazyMotion> can load it as a separate
// chunk in parallel with the page instead of bundling it into the entry.
export { domMax as default } from "framer-motion";
