import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        coffee: {
          50: "#faf6f1",
          100: "#f0e4d3",
          200: "#e0c8a7",
          300: "#cfa878",
          400: "#be8a55",
          500: "#a86f3f",
          600: "#8b5732",
          700: "#6e4428",
          800: "#4d2f1d",
          900: "#2e1c11",
        },
        cream: "#fdf8f2",
      },
      fontFamily: {
        display: ["Georgia", "serif"],
      },
    },
  },
  plugins: [],
};
export default config;