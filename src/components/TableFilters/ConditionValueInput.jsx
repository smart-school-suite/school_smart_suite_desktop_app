import { Check } from "lucide-react";
import { useMemo, useState } from "react";
import { operatorFor } from "./filterEngine";

/**
 * Value editor for one condition. Picks the right control from the column
 * type and the operator: text, number, date, a range, or a multi-select of
 * known values.
 */
function ConditionValueInput({ column, match, value, onChange, autoFocus }) {
  const type = column?.type ?? "text";
  const op = operatorFor(type, match);
  if (!column || !op || op.noValue) return null;

  if (op.multi) {
    return (
      <MultiValuePicker
        options={column.options ?? []}
        value={Array.isArray(value) ? value : []}
        onChange={onChange}
      />
    );
  }

  const inputType =
    type === "number" ? "number" : type === "date" ? "date" : "text";

  if (op.range) {
    const range = value && typeof value === "object" ? value : {};
    return (
      <div className="tf-range">
        <input
          type={inputType}
          className="form-control form-control-sm"
          value={range.from ?? ""}
          placeholder="From"
          aria-label="From"
          autoFocus={autoFocus}
          onChange={(event) => onChange({ ...range, from: event.target.value })}
        />
        <span className="tf-range__sep">and</span>
        <input
          type={inputType}
          className="form-control form-control-sm"
          value={range.to ?? ""}
          placeholder="To"
          aria-label="To"
          onChange={(event) => onChange({ ...range, to: event.target.value })}
        />
      </div>
    );
  }

  return (
    <input
      type={inputType}
      className="form-control form-control-sm"
      value={typeof value === "object" && value !== null ? "" : (value ?? "")}
      placeholder={type === "text" ? "Value" : undefined}
      aria-label="Value"
      autoFocus={autoFocus}
      onChange={(event) => onChange(event.target.value)}
    />
  );
}

function MultiValuePicker({ options, value, onChange }) {
  const [query, setQuery] = useState("");
  const visible = useMemo(
    () =>
      options.filter((option) =>
        option.toLowerCase().includes(query.trim().toLowerCase()),
      ),
    [options, query],
  );

  if (!options.length) {
    return <p className="tf-muted mb-0">No values to choose from.</p>;
  }

  const toggle = (option) =>
    onChange(
      value.includes(option)
        ? value.filter((item) => item !== option)
        : [...value, option],
    );

  return (
    <div className="tf-multi">
      {options.length > 8 && (
        <input
          type="search"
          className="form-control form-control-sm"
          placeholder="Find a value"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      )}
      <ul className="tf-multi__list" role="listbox" aria-multiselectable="true">
        {visible.map((option) => {
          const selected = value.includes(option);
          return (
            <li key={option}>
              <button
                type="button"
                role="option"
                aria-selected={selected}
                className={`tf-multi__item ${selected ? "is-selected" : ""}`}
                onClick={() => toggle(option)}
              >
                <span className="tf-check" aria-hidden="true">
                  {selected && <Check size={11} strokeWidth={3} />}
                </span>
                <span className="tf-multi__label">{option}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default ConditionValueInput;
