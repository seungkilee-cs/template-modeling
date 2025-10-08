# Financial Modeling

Hands-on exploration of quantitative finance models through two complementary tracks:

- Python prototypes under `python-model/` for rapid experimentation and mathematical validation
- A TypeScript visualizer in `ts-visualizer/` that turns validated models into interactive dashboards

The goal is to understand theory, document assumptions, and present results with polished visuals that are easy to share.

## Repository Layout

- `python-model/` contains per-model Python implementations and write-ups
- `ts-visualizer/` hosts the React + TypeScript application and related documentation
- `docs/` (if present within directories) provides model-specific notes, derivations, or usage tips

## Getting Started

### Python prototypes

1. Install Python 3.11+ and create a virtual environment
2. Navigate to a model directory under `python-model/`
3. Follow the local README for dependencies (most rely on the standard library, some use NumPy or SciPy)
4. Run the scripts or notebooks to reproduce calculations and sample scenarios

### TypeScript visualizer

1. Navigate to `ts-visualizer/`
2. Install dependencies with `npm install`
3. Start the dev server via `npm run dev`
4. For production builds use `npm run build` and refer to `ts-visualizer/docs/start-new-visualizer.md` for GitHub Pages deployment details

## Documentation

- `ts-visualizer/README.md` describes the app shell, feature set, and scripts
- `ts-visualizer/docs/adding-model.md` outlines how to register additional models
- `ts-visualizer/docs/models/{MODEL_NAME}.md` captures background, validation, and UI behavior for the my model implementation

## Model Roadmap

| ID | Model | Python prototype | Visualizer implementation | Notes |
| -- | ----- | ---------------- | ------------------------- | ----- |
| 00 | [Black-Scholes Model](./python-model/Black-Scholes-Model/README.md) | [Complete](./python-model/Black-Scholes-Model/black_scholes_model.py) | [Complete](./ts-visualizer/src/models/BlackScholes.tsx) | European option pricing with closed-form solution |
| 01 | [Dividend Discount Model (DDM)](./python-model/DDM-Model/README.md) | Planned | Planned | Foundational equity valuation using dividend growth |
| 02 | [Three-Statement Model](./python-model/Three-Statement-Model/README.md) | Planned | Planned | Links Income Statement, Balance Sheet, and Cash Flow dynamically |
| 03 | [Discounted Cash Flow (DCF)](./python-model/DCF-Model/README.md) | Planned | Planned | Intrinsic valuation via projected free cash flow discounting |
| 04 | [Comparable Company Analysis](./python-model/Comps-Model/README.md) | Planned | Planned | Relative valuation using market multiples |
| 05 | [Capital Asset Pricing Model (CAPM)](./python-model/CAPM-Model/README.md) | Planned | Planned | Single-factor model linking beta to expected returns |
| 06 | [Markowitz Portfolio Optimization](./python-model/Markowitz-Model/README.md) | Planned | Planned | Mean-variance allocation to find efficient frontier |
| 07 | [Binomial Option Pricing](./python-model/Binomial-Model/README.md) | Planned | Planned | Discrete tree-based method for American options |
| 08 | [Monte Carlo Option Pricing](./python-model/Monte-Carlo-Model/README.md) | Planned | Planned | Simulation-based pricing for path-dependent derivatives |
| 09 | [Value at Risk (VaR)](./python-model/VaR-Model/README.md) | Planned | Planned | Statistical risk measurement via distribution tails |
| 10 | [GARCH Volatility Forecasting](./python-model/GARCH-Model/README.md) | Planned | Planned | Time-series model for volatility clustering |
| 11 | [Fama-French Three-Factor Model](./python-model/Fama-French-Model/README.md) | Planned | Planned | Extends CAPM with size and value risk factors |
| 12 | [Black-Litterman Asset Allocation](./python-model/Black-Litterman-Model/README.md) | Planned | Planned | Bayesian blend of market equilibrium and investor views |
| 13 | [Leveraged Buyout (LBO) Model](./python-model/LBO-Model/README.md) | Planned | Planned | Private equity model analyzing debt-financed acquisitions |
| 14 | [Merger & Acquisition (M&A) Model](./python-model/MA-Model/README.md) | Planned | Planned | Pro-forma analysis of combined entity financials |
| 15 | [Interest Rate Models (Vasicek/CIR)](./python-model/Interest-Rate-Models/README.md) | Planned | Planned | Stochastic models for interest rate evolution |
| 16 | [Heston Stochastic Volatility Model](./python-model/Heston-Model/README.md) | Planned | Planned | Advanced option pricing with random volatility dynamics |
| 17 | [Credit Default Swap (CDS) Pricing](./python-model/CDS-Model/README.md) | Planned | Planned | Derivative pricing for credit risk protection |


## Workflow Overview

1. Prototype new models in Python to internalize theory and verify calculations
2. Capture findings, assumptions, and validation notes in per-model documentation
3. Port the model into `ts-visualizer/` using the shared `FinancialModelDefinition` contract
4. Register the model so it appears in the UI and document the visualization steps
5. Optionally extract reusable pieces into `portable/` for other analytics dashboards

## Future Extensions

- Expand the model set across asset classes and risk methodologies
- Integrate historical market data pulls for calibration and backtesting
- Add automated tests comparing Python outputs with the visualizer implementation
- Explore deployment of the visualizer toolkit to economics or statistics domains using the `portable/` package

## License

This repository is licensed under MIT. Use, modify, and share freely.
