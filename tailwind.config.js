/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,tsx,jsx}"],
  theme: {
    fontFamily: { sans: ["Nunito", "sans-serif"] },
    extend: {
      colors: {
        // primary: "#fdc427",
        primary: "#136eb4",
        secondary: {
          100: "#38607d",
          200: "#888883",
        },
      },
    },
  },
  plugins: [],
};
