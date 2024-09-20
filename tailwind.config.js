const { palette } = require('uikit-inctagram')

/** @type {import('tailwindcss').Config} */
// const { palette } = require('uikit-inctagram')

module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  plugins: [],
  theme: {
    extend: {
      colors: palette,
      height: {
        header: 'calc(100dvh - 60px)',
      },
    },
  },
}
