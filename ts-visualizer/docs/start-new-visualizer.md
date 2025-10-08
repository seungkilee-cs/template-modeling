# Starting a New Model Visualizer

This guide outlines how to spin up a fresh repository that reuses the portable toolkit, configure Vite, deploy to GitHub Pages, and add models.

## 1. Bootstrap the Project

1. Create a new repository on GitHub
2. Initialize the project locally using `npm create vite@latest my-visualizer -- --template react-ts`
3. Replace the default `src` directory with your own app shell or copy the layout from this repository if desired
4. Copy the `portable/` directory into your new repo (or install it from a shared package if published)

## 2. Configure Styling and Tokens

1. Copy `src/index.css` and the relevant sections of `src/App.css` to establish typography, color tokens, and layout primitives
2. Update color variables or fonts to match the new domain branding
3. Import `portable/styles/visualizer.css` wherever you mount `ModelVisualizer`

## 3. Wire Up the App Shell

1. In `src/App.tsx`, import `modelList` and `modelMap` from your localized registry file (copied from `portable/models/registry-template.ts`)
2. Maintain a `useState<ModelId>` for the active model
3. Render dropdown options using `modelList`
4. Pass the selected definition to `ModelVisualizer` from the portable directory

## 4. Create Model Definitions

1. For each model, author a file following `FinancialModelDefinition` from `portable/models/types.ts`
2. Place math helpers or data loaders alongside the definition file
3. Export the definition and register it in your project’s registry array
4. Confirm the model appears automatically in the dropdown because `modelList` derives metadata from the registry

## 5. Add Documentation

1. Replicate `docs/adding-model.md` and adapt terminology to the new domain (economics, statistics, etc.)
2. Create per-model references similar to `docs/models/black-scholes.md`
3. Update the new repository’s root `README.md` with an overview and instructions tailored to the domain

## 6. Vite Configuration

1. Update `vite.config.ts` if deploying under a subdirectory (for GitHub Pages use `base: '/RepoName/'`)
2. Set `build.outDir` if you want the compiled files to land outside the default `dist`
3. Verify `import.meta.env.BASE_URL` is used when referencing assets in `public/`

## 7. GitHub Actions Deployment

Below is a minimal workflow for GitHub Pages. Save it as `.github/workflows/deploy.yml`.

```yaml
name: deploy

on:
  push:
    branches:
      - main

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm install
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist
      - uses: actions/deploy-pages@v4
```

Ensure your repository settings enable GitHub Pages via the `GitHub Actions` source. If the build output resides outside `dist`, update the artifact path accordingly.

## 8. Validate End-to-End

1. Run `npm run dev` and confirm sliders, metrics, and charts function as expected
2. Execute any unit tests you add for model math or data loaders
3. Push to `main` to trigger the GitHub Actions workflow and confirm Pages deployment
4. Share the documentation so future contributors know how to add models and iterate on visualizations
