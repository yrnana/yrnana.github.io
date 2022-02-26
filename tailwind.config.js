const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  safelist: [
    {
      pattern: /bg-(yellow|green|violet|sky|rose)-100/,
    },
    {
      pattern: /bg-(yellow|green|violet|sky|rose)-200/,
      variants: ['hover'],
    },
    {
      pattern: /text-(yellow|green|violet|sky|rose)-500/,
    },
    {
      pattern: /text-(yellow|green|violet|sky|rose)-700/,
      variants: ['hover'],
    },
    {
      pattern: /(w|h)-(5|6|14)/,
    },
  ],
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
        xl: '1024px',
        '2xl': '1024px',
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
  plugins: [],
};
