# Visual Chips Plan

This plan outlines the steps to create a new visual way to build the git log format string using chips.

## 1. [x] Create Chip Data Structures and Constants

- **Define Chip Types:** Created TypeScript interfaces for `Chip` and `ChipCategory` in `types.ts`.
- **Define Available Chips:** Created a constant array of all available chips in `components/chipConstants.ts`, categorized into "Element", "Color", and "Other".

## 2. [x] Create New React Components

- **`Chip.tsx`:** Created a small, reusable component to display a single chip.
- **`ChipPalette.tsx`:** Created a component to display the list of all available chips, grouped by category.
- **`ChipEditor.tsx`:** Created the main component for the chip-based editor.
- **`DraggableChip.tsx`:** Created a component to handle dragging and dropping of chips within the editor.

## 3. [x] Integrate the Chip Editor into the Main App

- **Modify `App.tsx`:**
    - Replaced the existing `textarea` with the new `ChipEditor` and `ChipPalette` components.
    - The `ChipEditor` now manages the `activeChips` state, which is used to generate the `formatString`.

## 4. [x] Implement Drag-and-Drop Functionality

- **Install `react-dnd`:** Added `react-dnd` and `react-dnd-html5-backend` to the project.
- **Implement `useDrag` and `useDrop`:** Used the hooks from `react-dnd` to enable dragging from the palette, dropping into the editor, and reordering within the editor.

## 5. [x] Styling

- **Apply Tailwind CSS:** Styled the new components using Tailwind CSS to match the existing application's theme, including hover effects and drag-and-drop feedback.

## 6. [x] Testing

- **Write Unit Tests:**
    - Extracted chip formatting logic into `services/chipFormatter.ts`.
    - Wrote unit tests for the new service in `tests/chipFormatter.test.ts`.
    - Configured the test environment to correctly handle TypeScript module resolution for Node.js.
    - All tests are passing.

## 7. [x] Update the Plan

- Kept this plan updated as each step was completed.
