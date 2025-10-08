import { useEffect, useMemo, useState } from "react";
import type { FinancialModelDefinition, ModelParams, MetricDescriptor } from "../models/types.ts";
import { SliderControl } from "./SliderControl.tsx";

interface ModelVisualizerProps {
  model: FinancialModelDefinition;
}

const buildInitialParams = (model: FinancialModelDefinition): ModelParams => {
  const entries = model.controls.map((control) => [control.key, control.defaultValue] as const);
  return Object.fromEntries(entries);
};

export function ModelVisualizer({ model }: ModelVisualizerProps) {
  const [params, setParams] = useState<ModelParams>(() => buildInitialParams(model));

  useEffect(() => {
    setParams(buildInitialParams(model));
  }, [model]);

  const metrics = useMemo<MetricDescriptor[]>(() => model.metrics?.(params) ?? [], [model, params]);

  return (
    <div className="visualizer-grid">
      <section className="metrics-panel" aria-label="Key performance metrics">
        <header className="panel-header">
          <div>
            <p className="panel-label">Key insights</p>
            <h3>Model performance at current inputs</h3>
          </div>
        </header>
        <div className="metrics-grid">
          {metrics.length === 0 && <p className="empty-state">No metrics available for this model.</p>}
          {metrics.map((metric) => (
            <article className="metric-card" key={metric.label}>
              <h4>{metric.label}</h4>
              <p className="metric-value">{metric.value}</p>
              {metric.description && <p className="metric-description">{metric.description}</p>}
            </article>
          ))}
        </div>
      </section>

      <aside className="controls-panel" aria-label="Scenario controls">
        <header className="panel-header">
          <div>
            <p className="panel-label">Scenario controls</p>
            <h3>Tune assumptions to explore outcomes</h3>
          </div>
        </header>
        <div className="controls-list">
          {model.controls.map((control) => {
            const rawValue = params[control.key];
            const sliderValue = control.transform?.toSlider
              ? control.transform.toSlider(rawValue)
              : rawValue;
            const displayValue = control.formatValue
              ? control.formatValue(rawValue)
              : rawValue.toString();

            return (
              <SliderControl
                key={control.key}
                descriptor={control}
                sliderValue={sliderValue}
                displayValue={displayValue}
                onChange={(nextSliderValue: number) => {
                  const nextValue = control.transform?.fromSlider
                    ? control.transform.fromSlider(nextSliderValue)
                    : nextSliderValue;
                  setParams((prev) => ({ ...prev, [control.key]: nextValue }));
                }}
              />
            );
          })}
        </div>
      </aside>

      <section className="charts-panel" aria-label="Visualizations">
        <div className="chart-card">
          <header className="panel-header">
            <div>
              <p className="panel-label">Forecast visualization</p>
              <h3>Performance outlook</h3>
            </div>
            {/* <div className="chart-actions" role="group" aria-label="Chart actions">
              <button type="button" className="ghost-button" aria-label="Reset view">
                Reset
              </button>
              <button type="button" className="ghost-button" aria-label="Export chart">
                Export
              </button>
            </div> */}
          </header>
          <div className="chart-body">
            <model.Visualization params={params} />
          </div>
        </div>
      </section>
    </div>
  );
}
