# Milestone 2: Core Components & Information Architecture

This plan focuses on building the main UI components and laying out the primary information architecture of the builder and preview columns.

## Tasks

### 1. Layout Builder & Preview Columns
- **Goal:** Implement the two-column responsive grid.
- **Actions:**
    - Create the main layout using a 12-column grid.
    - Designate the left column for the "Builder" and the right for the "Live Preview".
    - Ensure the layout is responsive: it should stack to a single column on mobile.

### 2. Build the Builder Column Sections
- **Goal:** Create the distinct sections within the builder area.
- **Actions:**
    - Create a "Tokens Palette" section.
    - Create a "Current Format" section, which will serve as the dropzone.
    - Create a "Token Settings" section.
    - Create a "Separators & Wrapping" section.
    - Use the `Card` and section heading styles defined in Milestone 1 for each section.

### 3. Implement the Chip Component
- **Goal:** Create a versatile `Chip` component with support for different states and icons.
- **Actions:**
    - Create the base chip component with styles for its default state (`inline-flex items-center...`).
    - Add props to handle different states: `default`, `hover`, `active`, `error`.
    - Implement the visual styles for each state (e.g., gradient for `active`).
    - Integrate an icon library like `lucide-react` to display token-specific glyphs.
    - Populate the "Tokens Palette" with instances of the `Chip` component for each available Git token (e.g., `%H`, `%an`, `%cs`).

### 4. Implement the Dropzone Component
- **Goal:** Create the area where users will drag and arrange chips.
- **Actions:**
    - Create a `Dropzone` component.
    - Apply the base styles: `rounded-xl border-2 border-dashed...`.
    - Implement the empty state with instructional text ("Drag tokens here to build your format").
    - This task focuses on the static appearance; drag-and-drop functionality will be added in the next milestone.

### 5. Build Button Components
- **Goal:** Create reusable primary and secondary button components.
- **Actions:**
    - Create a `Button` component with a `variant` prop.
    - Implement the "primary" variant with the gradient fill (`bg-gradient-to-r from-indigo...`).
    - Implement the "secondary" variant with the ghost/outline style.
    - Create a circular "icon" variant for buttons like "Copy" and "Reset".
    - Add tooltips to all icon buttons.

### 6. Structure the Preview Column
- **Goal:** Build the static structure for the command string and output preview.
- **Actions:**
    - Create a "Command String" card. Inside, add a read-only input or styled `<code>` block to display the generated Git command.
    - Add a "Copy" icon button to this card.
    - Create an "Output Preview" card with a terminal-like aesthetic (`bg-zinc-950`, monospace font).
    - Add placeholder content to the preview card to simulate sample Git log output.
    - Add toggles for "light/dim/none" colorization and "wrap lines".
