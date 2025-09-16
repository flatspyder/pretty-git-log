# Project Analysis and Improvement Plan

## 1. Analysis of the Current Implementation

This document provides an analysis of the existing codebase and a plan to refactor and improve its functionality. The primary focus of this analysis is on how the application transforms a user-defined format into a styled log output, and how accurately this simulates the behavior of `git log --pretty=format:...`.

### Current Architecture

The current process can be summarized in three main steps:

1.  **`chipFormatter.ts`**: Converts an array of "chip" objects into a raw Git format string (e.g., `%C(yellow)%h %C(reset)%s`).
2.  **`gitFormatter.ts`**: Takes this format string and a list of mock Git commits. It replaces data placeholders (like `%h`, `%s`, `%an`) with the corresponding data from each commit object. It explicitly ignores styling placeholders (like `%C(yellow)`), leaving them in the string.
3.  **`LogDisplay.tsx`**: Receives the final formatted strings (one per commit). It contains a `parseLineToJsx` function that parses the string *again*, this time looking for the styling placeholders. It uses a regex `split` to break the string into parts and then wraps each part in a `<span>` with the appropriate Tailwind CSS classes for color and style.

### Identified Issues and Inaccuracies

While the application provides a good basic simulation, the current approach has several significant drawbacks, primarily related to the parsing logic in `LogDisplay.tsx`.

1.  **Brittle Parsing Logic**: The use of `line.split(/(%C\(.*?\)|\%<\|.*?\(.*?\)|\%>\|.*?\(.*?\))/g)` is not robust. It's unable to handle nested or complex formatting scenarios that a real stateful parser could. It is also susceptible to errors if commit data itself contains text that mimics a format placeholder (e.g., a subject of `Fix issue with %C(red)`).

2.  **Incomplete Feature Support**: The simulation is not a faithful representation of Git's capabilities.
    *   **Color Support**: The `COLOR_MAP` is limited to a few basic named colors. It lacks support for the 256-color palette and, more importantly, for dynamic RGB hex code colors (`%C(#RRGGBB)`).
    *   **Sizing and Alignment**: The implementation for truncation (`%<|`) and padding (`%>|`) is partial. It does not support the full range of alignment features, such as right-padding or the conditional `...` block (`%<|...%|>`).
    *   **`%C(auto)`**: This special placeholder is hardcoded to a single style, whereas in Git, its color is context-dependent and often configured by the user.

3.  **Fragmented Logic and Repetition**: The overall formatting logic is split between two services. `gitFormatter.ts` understands data placeholders, and `LogDisplay.tsx` understands styling placeholders. This separation of concerns is inefficient, as the string is processed multiple times. A unified parsing step would be cleaner and more performant.

## 2. Actionable Tasks for Improvement

To address these issues, the following refactoring and implementation tasks are proposed. The goal is to create a more accurate, robust, and maintainable simulation of Git's pretty formatting.

### Task 1: Consolidate Utility Functions

- **Action**: Create a new file at `src/lib/dateUtils.ts`.
- **Details**: Move the date-formatting helper functions (`timeAgo`, `pad`, `timezoneOffset`, `formatIsoLike`, `formatStrictIso`) from `src/services/gitFormatter.ts` into this new utility file. Update the import statements in `gitFormatter.ts` accordingly.
- **Benefit**: Improves code organization by separating pure utility functions from the core formatting logic.

### Task 2: Create a Unified, State-Aware Log Parser

- **Action**: Create a new central service at `src/services/logParser.ts`.
- **Details**: This service will be responsible for parsing the entire format string in a single pass. It will take the format string and a single commit object as input. Its output will be a structured array of objects, where each object contains a text segment and its associated styling information (e.g., `{ text: "a1b2c3d", styles: { color: "yellow", weight: "bold" } }`). This new service will entirely replace the string-replacement logic in `gitFormatter.ts` and the parsing logic in `LogDisplay.tsx`.

### Task 3: Implement a Robust Parsing Engine

- **Action**: Within `logParser.ts`, implement a stateful parser.
- **Details**: Instead of using a regex `split`, the parser should iterate through the format string token by token. It will maintain the "current style state" (color, font weight, etc.) and apply it to the text it processes. It should process data placeholders (`%h`), styling placeholders (`%C(...)`), and sizing placeholders (`%<...>` etc.) within the same parsing loop.

### Task 4: Enhance Styling and Sizing Capabilities

- **Action**: Extend the new parser to support a wider range of Git formatting features.
- **Details**:
    - **Colors**: Add logic to parse RGB hex codes (`%C(#RRGGBB)`). The output data structure should accommodate this by allowing a style object like `{ color: "#FF5733" }`.
    - **Sizing**: Implement the full specification for sizing and alignment, including left/right padding and truncation.
- **Benefit**: This will bring the application much closer to feature-parity with native Git, making it a more powerful and accurate tool.

### Task 5: Refactor the `LogDisplay` Component

- **Action**: Simplify `LogDisplay.tsx` to be a "dumb" rendering component.
- **Details**:
    - Remove the `parseLineToJsx` function entirely.
    - The component will now receive the structured data array from `logParser.ts` as a prop.
    - Its only job will be to map over this array and render `<span>` elements, applying either Tailwind classes for named colors or inline `style` attributes for dynamic RGB colors.
- **Benefit**: Decouples logic from presentation, making the component simpler, more predictable, and easier to test.

### Task 6: Integrate the New Parser into the Application

- **Action**: Update the main application component (`App.tsx` or equivalent) to use the new `logParser.ts`.
- **Details**: The application flow will change. Instead of `chips -> format string -> data-filled string -> JSX`, it will be `chips -> format string -> (logParser) -> structured data array -> JSX`. The `chipFormatter.ts` and `gitFormatter.ts` files will be deprecated and can be removed after their logic is fully migrated to the new parser.
