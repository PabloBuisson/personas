import type { Config } from "tailwindcss";

const colors = require("tailwindcss/colors");

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      red: colors.red,
      orange: {
        50: "hsl(var(--orange-50))",
        100: "hsl(var(--orange-100))",
        900: "hsl(var(--orange-900))",
      },
      darkorange: {
        500: "hsl(var(--dark-orange-500))",
        600: "hsl(var(--dark-orange-600))",
      },
      pink: {
        100: "hs(var(--pink-100))",
        200: "hsl(var(--pink-200))",
        500: "hsl(var(--pink-500))",
        900: "hsl(var(--pink-900))",
      },
      purple: {
        100: "hsl(var(--purple-100))",
        200: "hs(var(--purple-200))",
        600: "hs(var(--purple-600))",
        800: "hsl(var(--purple-800))",
        900: "hsl(var(--purple-900))",
      },
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
