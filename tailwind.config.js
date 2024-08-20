/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,tsx,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#fdc427",
        secondary: {
          100: "#38607d",
          200: "#888883",
        },
      },
    },
  },
  plugins: [],
};
