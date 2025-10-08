# Modeling Template

Kickstart interactive modeling projects covering economics, finance, statistics, or any quantitative domain. This template pairs Python prototyping with a TypeScript/React visualizer so you can validate models quickly and present them with polished dashboards.

## Features

- **Dual-track workflow**
  Python prototypes for rapid validation and a reusable TypeScript visualizer for interactive dashboards.

- **Modular domains**
  Separate domain packages (e.g., `finance`, `economics`) plug into the shared UI shell and Python tooling.

- **Extensible model registry**
  Add sliders, metrics, and charts by implementing a single `ModelDefinition` contract.

- **Deployment-ready pipeline**
  GitHub Actions workflow (guarded by repository slug) configured for Pages hosting once you enable it.

## Quick Start

- **Clone template**
  Use "Use this template" on GitHub or run `npx degit your-user/modeling-template my-project`.

- **Install visualizer dependencies**

  ```
  cd my-project/template-core/ts-visualizer
  npm install
  npm run dev
  ```

- **Run Python examples**
  ```
  cd my-project/template-core/python-core
  python -m venv .venv
  source .venv/bin/activate
  pip install -r requirements.txt
  python src/models/linear_regression.py
  ```

## Repository Layout

- **`template-core/`**

  - **`ts-visualizer/`**: React/Vite app, shared components, base model registry, docs.
  - **`python-core/`**: Virtualenv setup, lightweight model utilities, sample scripts.

- **`domains/`**
  Domain-specific packages. `finance/` contains example models; add your own under `economics/`, `statistics/`, etc.

- **`examples/`**
  Optional bundles combining `template-core/` with one or more domains for demos.

- **`.github/workflows/deploy.yml`**
  GitHub Pages workflow disabled by default via `TARGET_REPO` guard.

## Customization Checklist

- **Update metadata**

  - Rename project in `package.json`, `tsconfig.json`, and docs.
  - Adjust `VITE_BASE_PATH` in `ts-visualizer/vite.config.ts` or via env var.

- **Configure deployment**

  - Edit `.github/workflows/deploy.yml` `TARGET_REPO`.
  - Set `VITE_BASE_PATH` to match your Pages slug before enabling the workflow.

- **Add a new domain**

  - Duplicate `domains/finance/` as a starting point.
  - Register new models in both Python and TypeScript.
  - Document domain specifics in `template-docs/domains/`.

- **Extend UI controls**
  - Implement additional control types in `ts-visualizer/src/components/`.
  - Update `ModelDefinition` to expose new metrics or visualizations.

## Adding Models

1. **Prototype in Python** (`template-core/python-core/src/models/`).

   - Validate formulas, create sample outputs, add documentation in `template-docs/`.

2. **Translate to TypeScript** (`template-core/ts-visualizer/src/models/`).

   - Export a `ModelDefinition`.
   - Register it in `src/models/registry.ts`.

3. **Document** (`template-docs/models/<model>.md`).
   - Explain assumptions, inputs, outputs, and UI behavior.

## Deployment

- **Enable GitHub Pages** after customizing `deploy.yml`.
- Build locally:
  ```
  cd template-core/ts-visualizer
  npm run build
  npm run preview
  ```
- GitHub Actions will publish to Pages once guards are updated and the workflow is enabled.

## Contributing

- Use `scripts/export-template.sh` and `scripts/sync-template.sh` (from the original source repo) to regenerate this template as you evolve your base project.
- Follow conventional commits for clarity.
- Run linting/tests before submitting pull requests.

## License

This template is released under the MIT License. You are free to use, modify, and distribute it in your own projects.
