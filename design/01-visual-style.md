# Milestone 1: Visual Foundation & Global Shell

This plan covers the initial setup of the application's visual identity, including color palette, typography, layout containers, and the main page shell.

## Tasks

### 1. Setup Tailwind CSS Configuration [COMPLETED]
- **Goal:** Configure `tailwind.config.js` to match the new design system.
- **Actions:**
    - [x] Define the new color palette (zinc/slate neutrals, indigo/violet/fuchsia accents).
    - [x] Add custom gradient utility classes (`bg-gradient-to-r from-indigo-500...`).
    - [x] Configure font families: `Inter` or `Satoshi` for sans-serif, `JetBrains Mono` for mono.
    - [x] Set up responsive breakpoints if they differ from Tailwind defaults.
    - [x] Ensure the JIT/purge configuration is set up to remove unused classes.

### 2. Implement Global Page Layout [COMPLETED]
- **Goal:** Create the main application shell with proper spacing and structure.
- **Actions:**
    - [x] Create a root layout component.
    - [x] Implement the `container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8` class for the main content area.
    - [x] Set the base page background color (`bg-white dark:bg-zinc-950`).

### 3. Build the Header / Top Bar [COMPLETED]
- **Goal:** Implement the main application header.
- **Actions:**
    - [x] Create a `Header` component.
    - [x] Add the app title ("GitFormat") and a short description.
    - [x] Add a gradient accent underline to the title.
    - [x] Add placeholder buttons for "Copy Command", "Reset", and "Presets".
    - [x] Add an icon link to the project's GitHub repository.

### 4. Implement Theme Switching [COMPLETED]
- **Goal:** Add light and dark mode support with a user-facing toggle.
- **Actions:**
    - [x] Use `next-themes` or a similar library to manage theme state.
    - [x] Create a theme switcher component (e.g., a sun/moon icon button).
    - [x] Add the theme switcher to the header.
    - [x] Ensure the app respects `prefers-color-scheme` by default.
    - [x] Verify that base colors for text, backgrounds, and borders work correctly in both modes.

### 5. Define Base Card & Section Styles [COMPLETED]
- **Goal:** Create the reusable "glassmorphism" card style for content surfaces.
- **Actions:**
    - [x] Create a `Card` component.
    - [x] Apply the core card styles: `rounded-2xl border border-white/10 dark:border-white/5 bg-white/70 dark:bg-zinc-900/60 backdrop-blur shadow-sm`.
    - [x] Create a style for section headings: `text-[10px] uppercase tracking-widest text-slate-400` with a small overline.

### 6. Establish Base Typography [COMPLETED]
- **Goal:** Apply the new typographic styles globally.
- **Actions:**
    - [x] Set the default body font, size, and color in the global CSS file (`text-sm leading-6 text-slate-600 dark:text-slate-300`).
    - [x] Define styles for headings (`font-semibold tracking-tight`).
    - [x] Define styles for monospace code blocks (`font-mono text-sm sm:text-base`).
