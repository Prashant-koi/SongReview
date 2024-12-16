/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        darkGray: "#1C1C1F", 
        hoverDarkGray: "#404041"
      },
    },
  },
  plugins: [],
};
