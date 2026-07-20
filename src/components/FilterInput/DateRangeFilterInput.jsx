import React, { useEffect, useRef } from "react";

function DateRangeFilterInput({ startDate, setStartDate, endDate, setEndDate, placeholderStart, placeholderEnd }) {
  const startInputRef = useRef(null);

  useEffect(() => {
    startInputRef.current?.focus();
  }, []);

  return (
    <div className="row g-2 align-items-center w-100">
      <div className="col">
        <input
          ref={startInputRef}
          type="date"
          className="form-control font-size-sm"
          placeholder={placeholderStart || "Start Date"}
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </div>
      <div className="col-auto">
        <span className="text-muted font-size-sm">to</span>
      </div>
      <div className="col">
        <input
          type="date"
          className="form-control font-size-sm"
          placeholder={placeholderEnd || "End Date"}
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>
    </div>
  );
}

export default DateRangeFilterInput;