const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class', // Enable dark mode via class
  theme: {
    extend: {
      colors: {
        // New semantic colors
        background: 'rgb(var(--color-bg) / <alpha-value>)',
        surface: 'rgb(var(--color-surface) / <alpha-value>)',
        'surface-hover': 'rgb(var(--color-surface-hover) / <alpha-value>)',
        border: 'rgb(var(--color-border) / <alpha-value>)',
        danger: 'rgb(var(--color-danger) / <alpha-value>)',
        success: 'rgb(var(--color-success) / <alpha-value>)',
        warning: 'rgb(var(--color-warning) / <alpha-value>)',
        info: 'rgb(var(--color-info) / <alpha-value>)',
        magenta: 'rgb(var(--color-magenta) / <alpha-value>)',
        terminal: 'rgb(var(--color-terminal) / <alpha-value>)',
        text: {
          primary: 'rgb(var(--color-text-primary) / <alpha-value>)',
          secondary: 'rgb(var(--color-text-secondary) / <alpha-value>)',
          muted: 'rgb(var(--color-text-muted) / <alpha-value>)',
        },
        accent: {
          start: 'rgb(var(--color-accent-start) / <alpha-value>)',
          end: 'rgb(var(--color-accent-end) / <alpha-value>)',
        },
        // Full color palette for swatches and other specific cases
        gray: colors.gray,
        red: colors.red,
        green: colors.green,
        yellow: colors.yellow,
        blue: colors.blue,
        purple: colors.purple,
        cyan: colors.cyan,
        white: colors.white,
        slate: colors.slate,
        zinc: colors.zinc,
        indigo: colors.indigo,
        violet: colors.violet,
        fuchsia: colors.fuchsia,
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif', 'system-ui'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      ringOffsetColor: {
        background: 'rgb(var(--color-bg))',
      },
    },
  },
  plugins: [],
};
