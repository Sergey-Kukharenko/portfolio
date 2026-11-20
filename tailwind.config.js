/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // the site's "muted text" tone: Tailwind's #6b7280 fails WCAG AA on our
        // dark surfaces (3.4–4.3:1); this one keeps ≥4.8:1 on black, cards and
        // the island while staying a step below gray-400
        gray: { 500: "#848b98" },
        framer: {
          blue: "#0099FF",
          purple: "#8855FF",
          pink: "#FF55A3",
          red: "#FF3366",
          orange: "#FF8855",
          teal: "#05F2C7",
          ink: "#0B0B0F",
        },
      },
      fontFamily: {
        sans: [
          "Inter Variable",
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(255,255,255,0.06), 0 20px 60px -15px rgba(136,85,255,0.45)",
      },
      backgroundImage: {
        "framer-conic":
          "conic-gradient(from 0deg, #0099FF, #8855FF, #FF55A3, #FF3366, #FF8855, #05F2C7, #0099FF)",
        // the conic as a spinning glow, without `filter: blur()`: blurring a
        // rotating layer is redone every frame and dropped Safari/iOS to ~15 fps.
        // Around the circle the conic is smooth already; only its center pinches
        // to a point, so a soft disc of the colors' average (#977DB0) covers it.
        "framer-conic-soft":
          "radial-gradient(closest-side, #977DB0 0%, #977DB0cc 12%, #977DB000 45%), conic-gradient(from 0deg, #0099FF, #8855FF, #FF55A3, #FF3366, #FF8855, #05F2C7, #0099FF)",
      },
    },
  },
  plugins: [],
};
