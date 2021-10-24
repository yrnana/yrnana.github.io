const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  purge: {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    safelist: [
      'text-yellow-500',
      'bg-yellow-100',
      'hover:text-yellow-700',
      'hover:bg-yellow-200',
      'text-green-500',
      'bg-green-100',
      'hover:text-green-700',
      'hover:bg-green-200',
      'text-blue-500',
      'bg-blue-100',
      'hover:text-blue-700',
      'hover:bg-blue-200',
      'text-purple-500',
      'bg-purple-100',
      'hover:text-purple-700',
      'hover:bg-purple-200',
      'text-pink-500',
      'bg-pink-100',
      'hover:text-pink-700',
      'hover:bg-pink-200',
      'w-5',
      'h-5',
      'w-6',
      'h-6',
      'w-14',
      'h-14',
    ],
  },
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
      screens: {
        xl: null,
        '2xl': null,
      },
      maxWidth: {
        '2/5': '40%',
      },
      lineHeight: {
        relaxed: '1.75',
        inherit: 'inherit',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
