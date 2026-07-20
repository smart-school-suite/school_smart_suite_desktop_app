import React, { useEffect, useRef } from "react";

function TextFilterInput({ value, setValue, placeholder }) {
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <>
      <input
        ref={inputRef}
        type="text"
        className="form-control font-size-sm"
        placeholder={placeholder || "Search..."}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </>
  );
}

export default TextFilterInput;