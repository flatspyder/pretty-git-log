# Plan to Redesign the App Layout

1.  **Create a new `SelectComponents` component.** This component will display the available chips that can be added to the format.
    *   Create a new file `components/SelectComponents.tsx`.
    *   Move the chip definitions (`HASH_CHIPS`, `AUTHOR_CHIPS`, etc.) from `components/FormatBuilder.tsx` to `components/SelectComponents.tsx`.
    *   The component will render the lists of available element and style chips.
    *   It will take an `onSelect` function as a prop to add a chip to the format builder.

2.  **Refactor `FormatBuilder` to be the "Build your format" area.**
    *   This component will now only be responsible for displaying the currently selected chips.
    *   It will receive the list of chips as a prop.
    *   It will handle reordering of chips (drag and drop).
    *   It will handle removing chips.
    *   It will handle changing chip styles (e.g., via a dropdown).

3.  **Update `App.tsx` to implement the new 4-section vertical layout.**
    *   I will use flexbox or CSS grid to create the four vertically stacked sections.
    *   The sections will be:
        1.  `SelectComponents`
        2.  `FormatBuilder`
        3.  The formatted string `textarea` (with a copy button).
        4.  `LogDisplay` for the example output.
    *   I will manage the state of the selected chips in `App.tsx` and pass it down to the `FormatBuilder` and `SelectComponents` components.

4.  **Implement drag-and-drop for reordering chips.**
    *   I will use a library like `react-dnd` or a simpler solution if possible to enable reordering of chips in the `FormatBuilder` component.

5.  **Add a copy-to-clipboard button.**
    *   Next to the "Formatted string" `textarea`, I will add a button that copies the content of the `textarea` to the clipboard.

6.  **Style the new components and layout.**
    *   I will use Tailwind CSS to style the new components and ensure the layout is clean and responsive.

7.  **Create a new `plan.md` file.**
    *   I will create a new `plan.md` file to document the steps of my work.

8.  **Keep the `plan.md` file up to date.**
    *   I will update the `plan.md` file as I complete each step.
