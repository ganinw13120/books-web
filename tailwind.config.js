const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      'roboto': ['Roboto', 'sans-serif'],
      'sarabun': ['Sarabun', 'sans-serif'],
    },
    extend: {
    },
    colors : {
      red : colors.red,
      'white-pure' : '#FFFFFF',
      white : '#F2F2F2',
      'light-gray' : '#BFBFBF',
      gray : '#8C8C8C',
      'dark-gray' : '#595959',
      black : '#404040'
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
