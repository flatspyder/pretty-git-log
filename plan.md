# Refactoring and Design System Plan

This document outlines a plan to refactor the codebase to improve consistency, maintainability, and developer experience. The primary focus is on establishing a robust design system and creating reusable components.

## 1. Refactor Chip Components

The existing `SplitChip`, `StyleChip`, and `TextChip` components share a significant amount of duplicate code. They can be consolidated into a single, more flexible `PopoverChip` component.

### 1.1. Create a `PopoverChip` Base Component

*   **Goal:** Create a new `PopoverChip` component that encapsulates the common logic for displaying a chip that opens a popover.
*   **Location:** `src/components/ui/PopoverChip.tsx`
*   **Props:**
    *   `icon`: `React.ElementType` - The icon to display in the chip.
    *   `label`: `string` - The text to display in the chip.
    *   `popoverContent`: `React.ReactNode` - The content to render inside the popover.
    *   `onOpenChange`: `(open: boolean) => void` - Callback for when the popover is opened or closed.
*   **Implementation:**
    *   Use the existing `Chip` and `Popover` components from `src/components/ui`.
    *   Manage the `isOpen` state internally.
    *   Render the `icon` and `label` in the `Chip`.
    *   Render the `popoverContent` in the `PopoverContent`.

### 1.2. Refactor Existing Chip Components

*   **Goal:** Replace the implementations of `SplitChip`, `StyleChip`, and `TextChip` to use the new `PopoverChip` component.
*   **Files to modify:**
    *   `src/components/SplitChip.tsx`
    *   `src/components/StyleChip.tsx`
    *   `src/components/TextChip.tsx`
*   **Actions:**
    *   Update each component to wrap `PopoverChip`.
    *   Pass the appropriate `icon`, `label`, and `popoverContent` to the `PopoverChip`.
    *   The specific logic for each chip's popover content will remain in that chip's file, but the boilerplate for the popover and chip will be gone.

## 2. Centralize Design System Rules

The current styling is inconsistent. CSS variables are defined in `theme.css` but are not used in `tailwind.config.cjs`. This section outlines the steps to create a single source of truth for the design system.

### 2.1. Update `tailwind.config.cjs`

*   **Goal:** Modify the Tailwind configuration to use the CSS variables from `theme.css`.
*   **File to modify:** `tailwind.config.cjs`
*   **Actions:**
    *   Instead of importing `tailwindcss/colors`, reference the CSS variables defined in `theme.css`.
    *   Use the `hsl(var(--variable))` syntax to reference the colors.
    *   This will ensure that any changes to the theme in `theme.css` are automatically reflected in the Tailwind utilities.

### 2.2. Audit and Refactor Inline Styles

*   **Goal:** Identify and replace inline styles and one-off CSS classes with theme-based utility classes.
*   **Actions:**
    *   Search the codebase for `style=` attributes and arbitrary CSS classes (e.g., `text-slate-400`).
    *   Replace them with semantic utility classes that use the newly configured theme colors (e.g., `text-text-secondary`).
    *   This will improve consistency and make the app more theme-able.

## 3. Other Recommended Improvements

### 3.1. Simplify `Chip.tsx`

*   **Goal:** Refactor the `Chip` component to simplify its implementation.
*   **File to modify:** `src/components/ui/Chip.tsx`
*   **Actions:**
    *   The logic for the close button (`onRemove`) can be simplified.
    *   Consolidate the class names and reduce complexity.

### 3.2. Improve Accessibility

*   **Goal:** Enhance the accessibility of the application.
*   **Actions:**
    *   Ensure all interactive elements have `aria-label` attributes.
    *   Add `focus-visible` styles to all interactive components.
    *   Use semantic HTML elements where appropriate.

This plan provides a clear path to a more maintainable and consistent codebase. By centralizing the design system and creating reusable components, we can improve the developer experience and make future development faster and easier.
