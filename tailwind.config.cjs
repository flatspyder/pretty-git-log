/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');

module.exports = {
  darkMode: 'class', // Enable class-based dark mode
  content: [
    './src/index.html',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Add full color palettes
        slate: colors.slate,
        zinc: colors.zinc,
        indigo: colors.indigo,
        violet: colors.violet,
        fuchsia: colors.fuchsia,

        // Preserve existing semantic color names (will be defined in CSS)
        background: 'var(--color-bg)',
        surface: 'var(--color-surface)',
        'surface-muted': 'var(--color-surface-muted)',
        'surface-hover': 'var(--color-surface-hover)',
        border: 'var(--color-border)',
        primary: 'var(--color-text)',
        secondary: 'var(--color-text-secondary)',
        muted: 'var(--color-text-muted)',
        light: 'var(--color-text-light)',
        accent: 'var(--color-accent)',
        'accent-dark': 'var(--color-accent-dark)',
        'accent-darker': 'var(--color-accent-darker)',
        danger: 'var(--color-danger)',
        white: '#ffffff',
        black: '#000000',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      // Add other theme extensions from the design brief if needed
      borderRadius: {
        '2xl': '1rem', // As per spec
      },
      boxShadow: {
        sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
      },
    },
  },
  plugins: [],
};
