/** @type {import('tailwindcss').Config} */
const { Typography, palette } = require('ui-kit')

module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  plugins: [],
  theme: {
    extend: {
      colors: palette,
      typography: Typography,
    },
  },
}
