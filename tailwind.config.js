import { nextui } from "@nextui-org/theme";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        foreground: "#64748b",
        black: "#1e293b",
        primary: {
          50: "#e6f0ff",
          100: "#cddfff",
          200: "#b3ceff",
          300: "#99beff",
          400: "#80adff",
          500: "#669cff",
          600: "#4d8bff",
          700: "#337aff",
          800: "#1a69ff",
          900: "#0058f0",
          DEFAULT: "#337aff",
          foreground: "#ffffff",
        },
        focus: "#3f73b6",
      },
      variants: {
        extend: {
          fontWeight: ["placeholder"], // add this line
          textColor: ["placeholder"], // add this line
        },
      },
    },
  },
  darkMode: "class", // or 'media' or false
  plugins: [nextui()],
};
