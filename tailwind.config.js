/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      fontFamily: {
        'spartan': ['League Spartan', 'sans-serif'],
      },
      screens: {
        'lg-1000': '1000px',
        'lg-header-1293': '1293px',
        'pricing-section-1050': '1050px'
      },
      colors: {}
    },
  },
  plugins: [],
}
