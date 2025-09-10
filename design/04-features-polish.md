# Milestone 4: Features & Polish

This plan focuses on implementing higher-level features that enhance the user workflow, provide helpful feedback, and handle edge cases gracefully.

## Tasks

### 1. Implement Presets
- **Goal:** Allow users to quickly load predefined format recipes.
- **Actions:**
    - Create a `Presets` component, likely a dropdown menu or popover.
    - Define 4-6 preset configurations (e.g., "Compact", "Graph + Author", "Full Detail"). Each preset is an array of token configurations.
    - When a user selects a preset, the current chip stack in the dropzone is replaced with the preset's chips.
    - Add a description for each preset to explain its use case.

### 2. Add Toasts / Notifications
- **Goal:** Provide non-intrusive feedback for actions like "Copy" or "Preset Loaded".
- **Actions:**
    - Integrate a library like `react-hot-toast` or build a custom toast system.
    - Design a compact toast component that matches the app's aesthetic.
    - Anchor the toasts to the bottom-right on desktop and top/bottom on mobile.
    - Trigger a "Copied!" toast when the user copies the command.
    - Trigger a "Preset Loaded" toast when a preset is applied.

### 3. Implement Empty & Error States
- **Goal:** Guide the user when the UI is in a non-ideal state.
- **Actions:**
    - Refine the empty dropzone state: include the instructional text and consider adding a faint, animated arrow pointing from the token palette to the dropzone.
    - Create an "invalid token" state for chips. This will be an inline alert with specific styling (`bg-red-50`, etc.). This state can be triggered if a token's configuration is invalid.

### 4. Create a Simple Onboarding Tour
- **Goal:** Introduce new users to the core functionality of the app.
- **Actions:**
    - Use a library like `react-joyride` or build a simple tooltip-based tour.
    - The tour should run only the first time a user visits (use `localStorage` to track).
    - Create a 3-step tour:
        1.  Point to the "Tokens Palette" with the message: "Start by dragging tokens..."
        2.  Point to a chip in the "Current Format" dropzone: "...then click to edit them."
        3.  Point to the "Copy Command" button: "When you're done, copy the command."

### 5. Refine Preview Column Functionality
- **Goal:** Make the preview column more robust and user-friendly.
- **Actions:**
    - Implement the logic for the "wrap lines" toggle in the output preview.
    - Implement the logic for the "light/dim/none" colorization toggles, which will apply different CSS classes to the sample log lines to simulate ANSI colors.
    - Ensure the preview area is scrollable for long output.
