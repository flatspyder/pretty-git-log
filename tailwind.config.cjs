const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/index.html',
    './src/**/*.{ts,tsx}',
  ],
  darkMode: 'class', // Enable dark mode via class
  theme: {
    extend: {
      colors: {
        // Base neutrals from the design guide
        slate: colors.slate,
        zinc: colors.zinc,
        // Accent colors from the design guide
        indigo: colors.indigo,
        violet: colors.violet,
        fuchsia: colors.fuchsia,
      },
      fontFamily: {
        // Set Inter as the default sans-serif font
        sans: ['Inter', 'sans-serif', 'system-ui'],
        // Set JetBrains Mono as the default monospace font
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
};
