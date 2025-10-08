import { useState } from "react";
import { ModelVisualizer } from "./components/ModelVisualizer";
import { modelList, modelMap } from "./models/registry.ts";
import type { ModelId, ModelListEntry } from "./models/registry.ts";
import "./App.css";

export default function App() {
  const [modelId, setModelId] = useState<ModelId>(modelList[0].id);
  const model = modelMap[modelId];
  const githubIconSrc = `${import.meta.env.BASE_URL}github-mark.svg`;

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="header-intro">
          <h1>Financial Modeling Visualizer</h1>
          <p>Explore scenarios and understand outcomes with polished, data-rich visuals.</p>
        </div>
        <nav className="header-actions" aria-label="Helpful resources">
          {/* <a href="https://github.com/seungkilee-cs/Financial-Modeling/tree/master/python-model/Black-Scholes-Model" className="header-link">
            View Docs
          </a> */}
          <a href="https://github.com/seungkilee-cs/financial-modeling" className="header-link">
            <img src={githubIconSrc} alt="" aria-hidden="true" className="header-icon" />
            Github
          </a>
        </nav>
      </header>

      <main className="app-main">
        <section className="overview">
          <div className="overview-card">
            <div className="overview-top">
              <div className="overview-meta">
                <p className="overview-label">Active model</p>
                <h2>{model.name}</h2>
                <p className="overview-description">{model.description}</p>
              </div>
              <div className="model-picker">
                <label className="picker-label" htmlFor="model-select">
                  Select model
                </label>
                <select
                  id="model-select"
                  value={modelId}
                  onChange={(event) => setModelId(event.target.value as ModelId)}
                >
                  {modelList.map((entry: ModelListEntry) => (
                    <option key={entry.id} value={entry.id}>
                      {entry.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </section>

        <section className="visualizer">
          <ModelVisualizer model={model} />
        </section>
      </main>
    </div>
  );
}
