/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/index.html', // remains for the root html file
    './src/**/*.{ts,tsx}', // scans only inside the src folder
  ],
  theme: {
    extend: {
      colors: {
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
        white: 'var(--color-white)',
        black: 'var(--color-black)',
      },
    },
  },
  plugins: [],
};
