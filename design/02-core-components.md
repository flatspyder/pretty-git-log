# Milestone 2: Core Components & Information Architecture

This plan focuses on building the main UI components and laying out the primary information architecture of the builder and preview columns.

## Tasks

### 1. Layout Builder & Preview Columns [COMPLETED]
- **Goal:** Implement the two-column responsive grid.
- **Actions:**
    - [x] Create the main layout using a 12-column grid.
    - [x] Designate the left column for the "Builder" and the right for the "Live Preview".
    - [x] Ensure the layout is responsive: it should stack to a single column on mobile.

### 2. Build the Builder Column Sections [COMPLETED]
- **Goal:** Create the distinct sections within the builder area.
- **Actions:**
    - [x] Create a "Tokens Palette" section.
    - [x] Create a "Current Format" section, which will serve as the dropzone.
    - [ ] Create a "Token Settings" section. (Deferred)
    - [ ] Create a "Separators & Wrapping" section. (Deferred)
    - [x] Use the `Card` and section heading styles defined in Milestone 1 for each section.

### 3. Implement the Chip Component [COMPLETED]
- **Goal:** Create a versatile `Chip` component with support for different states and icons.
- **Actions:**
    - [x] Create the base chip component with styles for its default state (`inline-flex items-center...`).
    - [x] Add props to handle different states: `default`, `hover`, `active`, `error`.
    - [x] Implement the visual styles for each state (e.g., gradient for `active`).
    - [x] Integrate an icon library like `lucide-react` to display token-specific glyphs.
    - [x] Populate the "Tokens Palette" with instances of the `Chip` component for each available Git token (e.g., `%H`, `%an`, `%cs`).

### 4. Implement the Dropzone Component [COMPLETED]
- **Goal:** Create the area where users will drag and arrange chips.
- **Actions:**
    - [x] Create a `Dropzone` component.
    - [x] Apply the base styles: `rounded-xl border-2 border-dashed...`.
    - [x] Implement the empty state with instructional text ("Drag tokens here to build your format").
    - [ ] This task focuses on the static appearance; drag-and-drop functionality will be added in the next milestone. (Note: Drag and drop already exists, but will be refined).

### 5. Build Button Components [COMPLETED]
- **Goal:** Create reusable primary and secondary button components.
- **Actions:**
    - [x] Create a `Button` component with a `variant` prop.
    - [x] Implement the "primary" variant with the gradient fill (`bg-gradient-to-r from-indigo...`).
    - [x] Implement the "secondary" variant with the ghost/outline style.
    - [x] Create a circular "icon" variant for buttons like "Copy" and "Reset".
    - [ ] Add tooltips to all icon buttons. (Deferred)

### 6. Structure the Preview Column [COMPLETED]
- **Goal:** Build the static structure for the command string and output preview.
- **Actions:**
    - [x] Create a "Command String" card. Inside, add a read-only input or styled `<code>` block to display the generated Git command.
    - [x] Add a "Copy" icon button to this card.
    - [x] Create an "Output Preview" card with a terminal-like aesthetic (`bg-zinc-950`, monospace font).
    - [x] Add placeholder content to the preview card to simulate sample Git log output.
    - [ ] Add toggles for "light/dim/none" colorization and "wrap lines". (Deferred)
