import React, { useEffect, useRef } from "react";

function DateFilterInput({ value, setValue, placeholder }) {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <>
      <input
        ref={inputRef}
        type="date"
        className="form-control font-size-sm"
        placeholder={placeholder || "Select date..."}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </>
  );
}

export default DateFilterInput;