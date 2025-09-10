# Milestone 3: Interactivity & Motion

This plan covers the implementation of dynamic user interactions, including drag-and-drop, contextual editors, and UI animations using Framer Motion.

## Tasks

### 1. Implement Drag-and-Drop for Chips [COMPLETED]
- **Goal:** Allow users to drag tokens from the palette and reorder them in the format builder.
- **Actions:**
    - [x] Integrate a library like `dnd-kit` or `react-beautiful-dnd`. (Note: `react-dnd` was already in use).
    - [x] Make chips in the "Tokens Palette" draggable.
    - [x] Configure the "Current Format" area as a dropzone.
    - [x] Implement reordering logic for chips within the dropzone.
    - [x] Use `Framer Motion` to animate the reordering with a smooth "spring" effect.

### 2. Add Drag & Drop Visual Feedback [COMPLETED]
- **Goal:** Provide clear visual cues during the drag-and-drop process.
- **Actions:**
    - [x] While a chip is being dragged, apply transform styles: `scale-[1.03] ring-2 ring-indigo-400`.
    - [x] When dragging over the dropzone, apply its active style: `border-dashed border-2 border-indigo-300/60`.
    - [ ] Animate the enter/exit of chips from the dropzone list. (Deferred to polish phase).

### 3. Build the Popover Token Editor [COMPLETED]
- **Goal:** Create a contextual editor that appears when a user clicks a chip in the dropzone.
- **Actions:**
    - [x] Use a library like `Headless UI` or `Radix UI` to build an accessible popover component.
    - [x] The popover should anchor to the chip that was clicked.
    - [x] The editor's content should be contextual to the selected token (e.g., showing date formatting options for a date token).
    - [ ] Include a live "mini-preview" inside the editor to show the effect of changes. (Deferred)
    - [x] Ensure the popover is fully keyboard accessible: Esc closes, arrow keys navigate, Enter confirms.

### 4. Implement Core Animations with Framer Motion [COMPLETED]
- **Goal:** Add subtle motion to enhance the user experience.
- **Actions:**
    - [ ] Implement a staggered fade-in animation on page load (50–80ms between sections). (Deferred)
    - [x] Add a micro-bounce animation for confirmation feedback (e.g., when "Copied!" is shown).
    - [x] Apply hover/tap animations to buttons and chips (`hover:shadow-md`, `active:scale-[.99]`).
    - [x] Ensure all animations respect the `prefers-reduced-motion` media query.

### 5. Wire Up "Copy Command" Interaction [COMPLETED]
- **Goal:** Allow the user to copy the generated command string to their clipboard.
- **Actions:**
    - [x] Implement the copy-to-clipboard logic for the "Copy Command" button.
    - [x] On success, trigger a confirmation message. This could be a tooltip update ("Copied!") or a toast notification (covered in the next milestone).
    - [ ] Add a `select-all` behavior on click for the command string display itself. (Deferred)
