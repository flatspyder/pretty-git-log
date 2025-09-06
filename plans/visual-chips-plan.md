# Visual Chips Interface Plan

This document tracks the addition of a chip-based interface for building the pretty
format string. Chips represent either formatting elements (e.g. `%h`, `%s`) or
stylistic directives (e.g. `%C(yellow)`). The user assembles chips to create the
format string which is displayed in a read-only textarea.

## Tasks
- [x] Create a `FormatBuilder` component that manages an ordered list of chips
      and exposes the resulting format string via a callback.
- [x] Display selected chips above the format string textarea; chips can be
      removed by clicking on them.
- [x] Render a palette of available chips on the right side of the screen,
      grouped into "Elements" and "Styles"; clicking a palette chip adds it to
      the selected list.
- [x] Update `App.tsx` to use `FormatBuilder` and make the textarea read-only,
      sourcing its value from the builder.
- [x] Provide a small helper function to convert a chip sequence to a format
      string and test it with Node's `test` runner.
- [x] Ensure existing tests continue to pass.
- [x] Replace placeholder labels with human-readable names.
- [x] Expand chip palette to include all supported format elements grouped by type.
- [x] Remove the unused `group` field from `FormatChip` and update tests.
