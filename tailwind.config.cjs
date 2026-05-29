/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "Noto Sans TC", "Noto Sans JP", "sans-serif"],
        cjk: ["Noto Sans TC", "Noto Sans JP", "Inter", "sans-serif"],
        pixel: ["Public Pixel", "Pixel", "Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
