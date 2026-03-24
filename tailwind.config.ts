import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: "#050505",
        panel: "#0c0c11",
        line: "rgba(255,255,255,0.12)",
        accent: "#d946ef",
        muted: "#a1a1aa",
      },
      boxShadow: {
        glow: "0 0 80px rgba(217, 70, 239, 0.16)",
      },
      backgroundImage: {
        "grid-fade":
          "linear-gradient(to right, rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.07) 1px, transparent 1px)",
      },
      fontFamily: {
        sans: ["Manrope", "Avenir Next", "Segoe UI", "sans-serif"],
        display: ["Space Grotesk", "Avenir Next", "Arial Narrow", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
