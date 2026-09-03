export type Swatch = {
  name: string;
  hex: string;
  className: string;
  textClassName: string;
};

export const palette: Swatch[] = [
  { name: "Blue", hex: "#0099FF", className: "bg-framer-blue", textClassName: "text-framer-blue" },
  { name: "Purple", hex: "#8855FF", className: "bg-framer-purple", textClassName: "text-framer-purple" },
  { name: "Pink", hex: "#FF55A3", className: "bg-framer-pink", textClassName: "text-framer-pink" },
  { name: "Red", hex: "#FF3366", className: "bg-framer-red", textClassName: "text-framer-red" },
  { name: "Orange", hex: "#FF8855", className: "bg-framer-orange", textClassName: "text-framer-orange" },
  { name: "Teal", hex: "#05F2C7", className: "bg-framer-teal", textClassName: "text-framer-teal" },
  { name: "Ink", hex: "#0B0B0F", className: "bg-framer-ink", textClassName: "text-white" },
];
