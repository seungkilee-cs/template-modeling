import type { ControlDescriptor } from "../models/types.ts";

interface SliderControlProps {
  descriptor: ControlDescriptor;
  sliderValue: number;
  displayValue: string;
  onChange: (value: number) => void;
}

export function SliderControl({ descriptor, sliderValue, displayValue, onChange }: SliderControlProps) {
  const sliderId = `control-${descriptor.key}`;
  const hintId = `${sliderId}-hint`;

  return (
    <div className="control">
      <div className="control-header">
        <label className="control-label" htmlFor={sliderId}>
          {descriptor.label}
        </label>
        <span className="control-value" aria-live="polite">
          {displayValue}
        </span>
      </div>
      <p id={hintId} className="control-hint">
        {descriptor.hint}
      </p>
      <input
        id={sliderId}
        type="range"
        min={descriptor.slider?.min ?? descriptor.min}
        max={descriptor.slider?.max ?? descriptor.max}
        step={descriptor.slider?.step ?? descriptor.step}
        value={sliderValue}
        aria-describedby={hintId}
        onChange={(event) => onChange(parseFloat(event.target.value))}
      />
    </div>
  );
}
