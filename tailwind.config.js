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
          50: "#ffe0f0",
          100: "#ffbfd4",
          200: "#ff9fb8",
          300: "#ff809c",
          400: "#ff6080",
          500: "#ff4064",
          600: "#ff2048",
          700: "#ff002c",
          800: "#e00020",
          900: "#c00014",
          DEFAULT: "#ff809c",
          foreground: "#ffffff",
        },
        focus: "#6366f1",
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
