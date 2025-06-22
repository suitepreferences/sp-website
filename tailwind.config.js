/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      screens: {
        'lg-1000': '1000px',
        'lg-header-1293': '1293px',
        'pricing-section-1050': '1050px'
      },
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
