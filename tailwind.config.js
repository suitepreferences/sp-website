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
      colors: {
        // Primary brand colors
        'sp-primary': {
          400: '#818cf8', // indigo-400
          500: '#6366f1', // indigo-500
          600: '#4f46e5', // indigo-600
          700: '#4338ca', // indigo-700
        },
        // Secondary brand colors
        'sp-secondary': {
          600: '#9333ea', // purple-600
          700: '#7c3aed', // purple-700
          800: '#6b21a8', // purple-800
          900: '#581c87', // purple-900
        },
        // Success/CTA colors
        'sp-success': {
          400: '#4ade80', // green-400
          600: '#059669', // emerald-600
          700: '#047857', // emerald-700
        },
        // Error colors
        'sp-error': {
          400: '#f87171', // red-400
        },
        // Background colors
        'sp-bg': {
          950: '#0a0a0a', // gray-950
          900: '#111827', // gray-900
          800: '#1f2937', // gray-800
          700: '#374151', // gray-700
        },
        // Text colors
        'sp-text': {
          100: '#f3f4f6', // gray-100
          200: '#e5e7eb', // gray-200
          300: '#d1d5db', // gray-300
          400: '#9ca3af', // gray-400
          500: '#6b7280', // gray-500
          600: '#4b5563', // gray-600
        },
        // White
        'sp-white': '#ffffff',
      }
    },
  },
  plugins: [],
}
