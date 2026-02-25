/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        // "hero-image": "url('./images/hero-image.png')",
      },
      fontFamily: {
        "inter": ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
