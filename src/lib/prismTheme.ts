import type { PrismTheme } from "prism-react-renderer";

// A syntax theme built from the same seven Framer colors used across the
// rest of the site (see src/data/palette.ts), so the code panel reads as
// part of the same visual system instead of a generic dark theme.
export const framerCodeTheme: PrismTheme = {
  plain: {
    color: "#E5E7EB",
    backgroundColor: "transparent",
  },
  styles: [
    { types: ["comment", "prolog", "doctype", "cdata"], style: { color: "#6B7280", fontStyle: "italic" } },
    { types: ["punctuation"], style: { color: "#8A8F98" } },
    { types: ["keyword", "operator", "rule"], style: { color: "#FF55A3" } },
    { types: ["boolean", "number"], style: { color: "#FF8855" } },
    { types: ["string", "char", "attr-value"], style: { color: "#05F2C7" } },
    { types: ["function", "function-variable"], style: { color: "#0099FF" } },
    { types: ["class-name", "maybe-class-name", "builtin"], style: { color: "#8855FF" } },
    { types: ["tag"], style: { color: "#8855FF" } },
    { types: ["attr-name"], style: { color: "#05F2C7" } },
    { types: ["variable", "constant"], style: { color: "#E5E7EB" } },
  ],
};
