# Modular Financial Model Visualizer Migration

## Overview

The `ts-visualizer/` application originally embedded all Black–Scholes logic, controls, and charts directly in `src/App.tsx`. This tight coupling makes it difficult to introduce additional financial models (e.g., binomial trees, Monte Carlo) without duplicating boilerplate or expanding `App.tsx` into an unmaintainable monolith. The migration modularizes the visualizer so the dashboard shell and individual model experiences are cleanly separated.

## Goals

- Decouple visual presentation (dashboard frame) from model-specific inputs and outputs.
- Allow new financial models to be added through configuration rather than ad-hoc component rewrites.
- Provide consistent UX (controls, tooltips, cards, plots) while respecting each models unique parameter set.
- Lay groundwork for model switching, persistence, and future features (e.g., saved scenarios).

## Architecture

### Model Definition

Each visualizer is described by a `FinancialModelDefinition` object containing:

- **`id` / `name` / `description`**: metadata for selection menus and documentation.
- **`controls: ControlDescriptor[]`**: typed slider configuration (bounds, step, display format, help text).
- **`metrics?(params)`**: optional summary cards (e.g., call/put prices).
- **`Visualization`**: React component receiving `{ params }` and returning the visualization UI.

Definitions live in `src/models/registry.ts` and are exported via a lookup map.

### Generic Visualizer Component

`ModelVisualizer` handles shared UI patterns:

1. Initializes and stores slider state based on `controls.default` values.
2. Renders the slider grid using the existing synthwave styling and tooltips.
3. Displays metric cards when provided by the model.
4. Renders the model-specific charts returned from `render(params)`.

### Dashboard Shell

`src/App.tsx` becomes a light-weight orchestrator:

1. Presents the neon dashboard header and future model picker UI.
2. Retrieves the selected model definition from the registry.
3. Delegates to `<ModelVisualizer model={definition} />` for the heavy lifting.

### Styling

Existing styles in `src/App.css` now apply to `<ModelVisualizer>` via shared class names. Additional model-specific styling can be colocated with the definition when required.

## Migration Steps

1. **Define types**: add `FinancialModelDefinition` and `ControlDescriptor` types under `src/models/types.ts`.
2. **Create registry**: move the Black–Scholes configuration into `src/models/BlackScholes.tsx`, exporting a definition object. Register it in `src/models/registry.ts`.
3. **New component**: implement `src/components/ModelVisualizer.tsx` using the existing slider component refactored to consume `ControlDescriptor`s dynamically.
4. **Refactor App**: update `src/App.tsx` to load models from the registry, show a model picker (initially just Black–Scholes), and render `<ModelVisualizer>`.
5. **Adjust imports + CSS**: ensure shared styles apply, add any new styles for the picker if needed.
6. **Testing**: run `npm run dev` and manually verify slider tooltips, metrics, and charts work identical to the pre-migration behavior.

## Future Enhancements

- **Model selection UI**: dropdown or sidebar to switch between models at runtime.
- **Persistent state**: store selected model and parameters in URL query or local storage.
- **Async models**: support models that fetch data or call back-end services by allowing async `render`/`metrics` functions.
- **Advanced controls**: extend `ControlDescriptor` to support toggles, selects, or multi-field inputs if future models demand them.

By modularizing the visualizer now, adding the next model becomes a matter of authoring a definition file rather than rewriting the dashboard. This keeps the codebase maintainable and primes the project for rapid experimentation with new financial modeling techniques.

## New 