# Financial Modeling Visualizer

Interactive playground for exploring quantitative finance models through parameter sliders, instant metrics, and Plotly charts. The interface is built with React, TypeScript, and Vite, styled for a professional dashboard experience.

## Features

- Responsive dashboard with header, overview card, and model picker
- Scenario controls generated from reusable control descriptors
- Metrics panel for quick insight into each model run
- Plotly based visualization cards with consistent styling
- Support for multiple financial models registered through a central registry

## Getting Started

1. Install dependencies with `npm install`
2. Start the development server using `npm run dev`
3. Open the printed local URL to interact with the visualizer
4. Run `npm run build` for a production bundle or `npm run preview` to inspect the compiled output

## Project Scripts

- `npm run dev` launches Vite with hot module replacement
- `npm run build` performs a type check and emits the production bundle under `dist`
- `npm run preview` serves the production build locally
- `npm run lint` executes ESLint across the project

## Directory Overview

- `src/App.tsx` orchestrates the layout shell, model selection state, and renders `ModelVisualizer`
- `src/components/ModelVisualizer.tsx` manages control state, metrics, and visualizations common to all models
- `src/components/SliderControl.tsx` renders an accessible slider with helper text and value badge
- `src/models/` contains domain logic, model definitions, and the shared registry
- `src/index.css` and `src/App.css` hold global tokens and component styling
- `docs/` stores architecture notes and extension guides including `docs/adding-model.md`
- `public/` carries static assets such as SVG icons and the favicon

## Model Architecture

Each model exports a `FinancialModelDefinition` describing metadata, slider controls, optional metrics, and a `Visualization` component. Definitions are registered in `src/models/registry.ts`, which powers the dropdown in `src/App.tsx`. The shared `ModelVisualizer` consumes this definition to render controls and charts without needing per-model layout code.

Refer to `docs/adding-model.md` for a step-by-step checklist on authoring new models and extending the registry.

## Python Prototypes

The `python-model/` directory contains quick prototypes used to validate formulas before porting them to TypeScript. Each model can begin life here for experimentation with numeric libraries before translating the logic into the shared TypeScript structures.

## Deployment Notes

The Vite config in `vite.config.ts` sets `base: '/Financial-Modeling/'` so that static assets resolve correctly on GitHub Pages. When referencing files in `public/`, use `import.meta.env.BASE_URL` or relative paths that account for this base. The build emits to the repository level `dist` folder and can be published directly.

## Additional Documentation

- `docs/adding-model.md` details the model extension workflow
- `docs/modular-visualizer.md` explains the architectural refactor that introduced the modular registry-driven approach
