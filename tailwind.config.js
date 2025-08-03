/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        rayonblue: "#3435FF",
        rayonorange: "#FF8200",
        red: "#FF0000",
        black: "#000000",
        white: "#FFFFFF",
        gray: "#eeeeeeff",
        rayonlightblue: "#0080ffff",
        green: "#2bc92bff"

      },
    },
  },
  plugins: [],
}
