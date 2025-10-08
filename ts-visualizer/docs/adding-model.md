# `ts-visualizer` Architecture & Model Extension Guide

## Repository Layout Overview

- `src/App.tsx`
  High-level shell for the visualizer app. Owns the selected model state, renders global header, and delegates the main experience to `ModelVisualizer`.

- `src/App.css`
  Central styles for the shell (header, overview card) and shared layout patterns used by the visualizer.

- `src/index.css`
  Global tokens (typography, color palette) and page-level styles.

- `src/main.tsx`
  Vite entry point mounting `<App />`.

- `src/components/ModelVisualizer.tsx`
  Generic container that:
  - Builds slider state from each model’s control descriptors
  - Renders the controls via `SliderControl`
  - Displays optional metrics cards
  - Hosts the model-specific visualization component

- `src/components/SliderControl.tsx`
  Presentational control component consuming a `ControlDescriptor` and emitting changes back to `ModelVisualizer`.

- `src/models/`
  - `types.ts`: Type definitions used by model definitions (`ControlDescriptor`, `FinancialModelDefinition`, etc.)
  - `registry.ts`: Collects all model definitions, exposes `modelList`, `modelMap`, and type-safe `ModelId`
  - `BlackScholes.tsx`: Example model definition implementing metadata, controls, metrics, and visualization component
  - `BlackScholesModel.ts`: Domain logic backing the Black–Scholes calculations

- `public/`
  Static assets (SVGs, favicon). Served relative to `import.meta.env.BASE_URL`.

- `vite.config.ts`
  Builds configuration with a custom `base` path (`/Financial-Modeling/`) and output directory.

## Data Flow Summary

1. `registry.ts` exports `modelList` and `modelMap` built from an array of `FinancialModelDefinition` objects.
2. `App.tsx` uses `modelList` for the dropdown picker, and `modelMap` to fetch the full definition when a model is selected.
3. `ModelVisualizer` receives the `FinancialModelDefinition`, manages input state, renders controls/metrics, and mounts the model’s `Visualization` React component.
4. Individual model files provide their own math, formatting helpers, and charts but do not need to worry about global layout.

## Adding a New Model

### 1. Create the Model Definition

- Path: `src/models/NewModelName.tsx`
- Export a constant that satisfies `FinancialModelDefinition`.
- Required fields:
  ```ts
  export const newModelDefinition: FinancialModelDefinition = {
    id: "new-model-id",
    name: "Readable Name",
    description: "Short description for dropdown / docs.",
    controls: [...ControlDescriptor definitions...],
    metrics: (params) => [...optional MetricDescriptor array...],
    Visualization: NewModelVisualization,
  };
  ```
- Define any helper functions or domain logic within the same file or colocated modules (`./NewModelMath.ts`).
- `Visualization` must be a React component taking `{ params: ModelParams }` and returning JSX (charts, tables, etc.).

### 2. Define Control Descriptors

Each entry in `controls` should include:

```ts
const controls: ControlDescriptor[] = [
  {
    key: "uniqueParamKey",
    label: "Friendly label",
    min: 0,
    max: 100,
    step: 1,
    defaultValue: 50,
    hint: "Short helper text displayed below the slider.",
    formatValue: (value) => `${value}%`, // optional; controls badge display
    transform: {
      toSlider: (value) => value * 100,
      fromSlider: (sliderValue) => sliderValue / 100,
    },
    slider: {
      min: 0,
      max: 100,
      step: 5,
    },
  },
  // additional controls …
];
```

### 3. Implement the Visualization Component

- Export or define a component that expects `params` typed as `ModelParams`.
- Use memoization (`useMemo`) or other hooks as needed for performance.
- Return any JSX layout; charts commonly use `react-plotly.js`.
- Reuse shared CSS utilities by wrapping charts in `div.plot-card` or similar classes.

### 4. Register the Model

- Open `src/models/registry.ts`.
- Import the new definition and append it to the `definitions` array:
  ```ts
  import { newModelDefinition } from "./NewModelName";

  const definitions = [blackScholesDefinition, newModelDefinition] satisfies FinancialModelDefinition[];
  ```
- No further changes necessary; `modelList` and `modelMap` derive automatically.

### 5. Verify Dropdown & Selection

- Because `modelList` is derived, the dropdown in `App.tsx` will include the new model automatically.
- When selected, `ModelVisualizer` will receive the definition and render your `controls`, `metrics`, and `Visualization`.

### 6. Optional Enhancements

- Metrics: Return `[]` or omit the function if you do not have summary cards.
- Custom Styling: Add model-specific CSS classes in `App.css` or module CSS files if the default layout needs tweaks.
- Async Data: If computations require async data, wrap `Visualization` logic in appropriate hooks and show loading states.

## Testing Checklist

- `npm run dev` → confirm slider defaults populate correctly.
- Change slider values and ensure metrics/visualization update.
- Inspect dropdown to verify ordering / naming.
- Run `npm run build` to ensure TypeScript types are satisfied and the model is bundled without errors.

## Reference Types

Located in `src/models/types.ts`:

- `ControlDescriptor`
- `MetricDescriptor`
- `FinancialModelDefinition`
- `ModelParams`

These types provide the contract required by `ModelVisualizer`.
```},
