# Milestone 3: Interactivity & Motion

This plan covers the implementation of dynamic user interactions, including drag-and-drop, contextual editors, and UI animations using Framer Motion.

## Tasks

### 1. Implement Drag-and-Drop for Chips
- **Goal:** Allow users to drag tokens from the palette and reorder them in the format builder.
- **Actions:**
    - Integrate a library like `dnd-kit` or `react-beautiful-dnd`.
    - Make chips in the "Tokens Palette" draggable.
    - Configure the "Current Format" area as a dropzone.
    - Implement reordering logic for chips within the dropzone.
    - Use `Framer Motion` to animate the reordering with a smooth "spring" effect.

### 2. Add Drag & Drop Visual Feedback
- **Goal:** Provide clear visual cues during the drag-and-drop process.
- **Actions:**
    - While a chip is being dragged, apply transform styles: `scale-[1.03] ring-2 ring-indigo-400`.
    - When dragging over the dropzone, apply its active style: `border-dashed border-2 border-indigo-300/60`.
    - Animate the enter/exit of chips from the dropzone list.

### 3. Build the Popover Token Editor
- **Goal:** Create a contextual editor that appears when a user clicks a chip in the dropzone.
- **Actions:**
    - Use a library like `Headless UI` or `Radix UI` to build an accessible popover component.
    - The popover should anchor to the chip that was clicked.
    - The editor's content should be contextual to the selected token (e.g., showing date formatting options for a date token).
    - Include a live "mini-preview" inside the editor to show the effect of changes.
    - Ensure the popover is fully keyboard accessible (Esc to close, etc.).

### 4. Implement Core Animations with Framer Motion
- **Goal:** Add subtle motion to enhance the user experience.
- **Actions:**
    - Implement a staggered fade-in animation for the main sections on page load.
    - Add a micro-bounce animation for confirmation feedback (e.g., when "Copied!" is shown).
    - Apply hover/tap animations to buttons and chips (`hover:shadow-md`, `active:scale-[.99]`).
    - Ensure all animations respect the `prefers-reduced-motion` media query.

### 5. Wire Up "Copy Command" Interaction
- **Goal:** Allow the user to copy the generated command string to their clipboard.
- **Actions:**
    - Implement the copy-to-clipboard logic for the "Copy Command" button.
    - On success, trigger a confirmation message. This could be a tooltip update ("Copied!") or a toast notification (covered in the next milestone).
    - Add a `select-all` behavior on click for the command string display itself.
