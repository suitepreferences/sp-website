/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      colors: {
        'ns-gold': '#e2bf6b',
        'ns-light-blue': '#94bfcf',
        'ns-med-blue': '#37677d',
        'ns-dark-blue': '#26475a',
      }
    },
  },
  plugins: [],
}
