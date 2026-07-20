import React, { useEffect, useRef } from "react";

function NumberFilterInput({ value, setValue, placeholder }) {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <>
      <input
        ref={inputRef}
        type="number"
        className="form-control font-size-sm"
        placeholder={placeholder || "Enter number..."}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </>
  );
}

export default NumberFilterInput;