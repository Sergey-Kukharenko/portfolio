/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
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
      },
    },
  },
  plugins: [],
};
