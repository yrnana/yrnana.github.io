const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        mono: ['"JetBrains Mono"', ...defaultTheme.fontFamily.mono],
      },
      borderWidth: {
        6: '6px',
      },
      listStyleType: {
        circle: 'circle',
        'lower-roman': 'lower-roman',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
