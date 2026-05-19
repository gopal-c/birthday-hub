import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#EEEDFE",
          100: "#CECBF6",
          200: "#AFA9EC",
          400: "#7F77DD",
          600: "#534AB7",
          800: "#3C3489",
          900: "#26215C",
        },
        amber: {
          50: "#FAEEDA",
          100: "#FAC775",
          400: "#EF9F27",
          600: "#BA7517",
          800: "#854F0B",
        },
        coral: {
          50: "#FAECE7",
          200: "#F0997B",
          400: "#D85A30",
          600: "#993C1D",
        },
        teal: {
          50: "#E1F5EE",
          200: "#5DCAA5",
          400: "#1D9E75",
          600: "#0F6E56",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
