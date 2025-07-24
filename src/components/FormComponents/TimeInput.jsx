import React, { useState, useCallback, useEffect } from "react";
import { Icon } from "@iconify/react";

function TimeInput({ value = "", onChange }) {
const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");

  useEffect(() => {
    if (value) {
      const [h, m] = value.split(":");
      setHours(h ?? "");
      setMinutes(m ?? "");
    }
  }, [value]);

  const updateParent = useCallback((h, m) => {
    if (h !== "" && m !== "") {
      onChange?.(`${h}:${m}`);
    } else {
      onChange?.("");
    }
  }, [onChange]);

  const handleHoursChange = useCallback((e) => {
    let value = e.target.value;
    if (value.length > 1 && value.startsWith("0") && value !== "0") {
      value = value.substring(1);
    }
    const numValue = parseInt(value, 10);
    if (isNaN(numValue) || value === "") {
      setHours("");
      updateParent("", minutes);
    } else if (numValue >= 0 && numValue <= 23) {
      const formatted = numValue < 10 ? `0${numValue}` : numValue.toString();
      setHours(formatted);
      updateParent(formatted, minutes);
    }
  }, [minutes, updateParent]);

  const handleMinutesChange = useCallback((e) => {
    let value = e.target.value;
    if (value.length > 1 && value.startsWith("0") && value !== "0") {
      value = value.substring(1);
    }
    const numValue = parseInt(value, 10);
    if (isNaN(numValue) || value === "") {
      setMinutes("");
      updateParent(hours, "");
    } else if (numValue >= 0 && numValue <= 59) {
      const formatted = numValue < 10 ? `0${numValue}` : numValue.toString();
      setMinutes(formatted);
      updateParent(hours, formatted);
    }
  }, [hours, updateParent]);

  const getPeriod = useCallback(() => {
    const hourNum = parseInt(hours, 10);
    return isNaN(hourNum) ? "AM" : hourNum >= 12 ? "PM" : "AM";
  }, [hours]);

  return (
    <div className="d-flex flex-row align-items-center gap-1">
      <input
        type="number"
        className="form-control form-control-sm"
        placeholder="00"
        value={hours}
        onChange={handleHoursChange}
        min="0"
        max="23"
        aria-label="Hours"
      />

      <Icon icon="picon:colon" className="fs-1" />

      <input
        type="number"
        className="form-control form-control-sm"
        placeholder="00"
        value={minutes}
        onChange={handleMinutesChange}
        min="0"
        max="59"
        aria-label="Minutes"
      />

      <span style={{ transition:"all 0.3s" }}>
        {getPeriod()}
      </span>
    </div>
  );
}

export default React.memo(TimeInput);
