import React, { useEffect, useRef } from "react";

function NumberRangeFilterInput({ minValues, setMinValues, maxValues, setMaxValues, placeholderMin, placeholderMax }) {
  const minInputRef = useRef(null);

  useEffect(() => {
    minInputRef.current?.focus();
  }, []);

  return (
    <div className="row g-2 align-items-center w-100">
      <div className="col">
        <input
          ref={minInputRef}
          type="number"
          className="form-control font-size-sm"
          placeholder={placeholderMin || "Min"}
          value={minValues}
          onChange={(e) => setMinValues(e.target.value)}
        />
      </div>

      <div className="col-auto">
        <span className="text-muted font-size-sm">to</span>
      </div>

      <div className="col">
        <input
          type="number"
          className="form-control font-size-sm"
          placeholder={placeholderMax || "Max"}
          value={maxValues}
          onChange={(e) => setMaxValues(e.target.value)}
        />
      </div>
    </div>
  );
}

export default NumberRangeFilterInput;