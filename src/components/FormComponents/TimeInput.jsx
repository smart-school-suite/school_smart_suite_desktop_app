import React, { useState, useRef, useMemo, useCallback, useEffect } from "react";
import { Icon } from "@iconify/react";
import { CSSTransition } from "react-transition-group";
import { useFloating, offset, flip, shift, autoUpdate } from "@floating-ui/react";
import { debounce } from "lodash";

function TimeInput({ onTimeChange, value }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [time, setTime] = useState({ hour: null, minute: null, period: null });
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (time.hour !== null && time.minute !== null && time.period !== null) {
      setShowDropdown(false);
    }
  }, [time]);

  const debouncedOnTimeChange = useCallback(
    debounce((formattedTime) => onTimeChange(formattedTime), 300),
    [onTimeChange]
  );

  const { refs, floatingStyles } = useFloating({
    placement: "bottom-start",
    middleware: [offset(4), flip(), shift(1)],
    whileElementsMounted: autoUpdate,
  });

  const hours = useMemo(() => Array.from({ length: 12 }, (_, i) => i + 1), []);
  const minutes = useMemo(() => Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, "0")), []);

  const handleTimeSelect = useCallback((type, value) => {
    setTime((prevTime) => {
      const updatedTime = { ...prevTime, [type]: value };
      if (updatedTime.hour !== null && updatedTime.minute !== null && updatedTime.period !== null) {
        const formattedTime = `${updatedTime.hour}:${updatedTime.minute} ${updatedTime.period}`;
        debouncedOnTimeChange(formattedTime);
      }
      return updatedTime;
    });
  }, [debouncedOnTimeChange]);

  const togglePeriod = useCallback(() => {
    handleTimeSelect("period", time.period === "AM" ? "PM" : "AM");
  }, [time.period, handleTimeSelect]);

  return (
    <div className="position-relative w-75" ref={containerRef}>
      <div className="d-flex flex-row align-items-center gap-1 bg-white border rounded-2 px-2" onClick={() => setShowDropdown(!showDropdown)} ref={refs.setReference}>
        <button className="border-none bg-transparent fw-semibold time">
          {time.hour !== null ? time.hour.toString().padStart(2, "0") : "00"}
        </button>
        <Icon icon="entypo:dots-two-vertical" className="font-size-md" />
        <button className="border-none bg-transparent fw-semibold time">
          {time.minute !== null ? time.minute : "00"}
        </button>
        <span className="mx-2" onClick={togglePeriod} style={{ cursor: "pointer" }}>
          {time.period !== null ? time.period : "AM"}
        </span>
      </div>
      <CSSTransition in={showDropdown} timeout={200} classNames="dropdown" unmountOnExit>
        <div className="position-absolute d-flex flex-row gap-2 z-3 p-2 rounded-3" ref={refs.setFloating} style={floatingStyles}>
          <div className="card d-flex flex-column px-1 py-1 timeinput-dropdown">
            {hours.map((hour) => (
              <span
                key={hour}
                className={`w-100 px-3 py-1 rounded-1 ${time.hour === hour ? "primary-background text-white" : ""}`}
                onClick={() => handleTimeSelect("hour", hour)}
              >
                {hour.toString().padStart(2, "0")}
              </span>
            ))}
          </div>
          <div className="card d-flex flex-column px-1 py-1 timeinput-dropdown">
            {minutes.map((minute) => (
              <span
                key={minute}
                className={`w-100 px-3 py-1 rounded-1 ${time.minute === minute ? "primary-background text-white" : ""}`}
                onClick={() => handleTimeSelect("minute", minute)}
              >
                {minute}
              </span>
            ))}
          </div>
          <div className="card d-flex flex-column px-1 py-1 gap-2 am-input">
            <span className={`w-100 px-3 py-1 rounded-1 pointer-cursor${time.period === "AM" ? "primary-background text-white" : ""}`} onClick={() => handleTimeSelect("period", "AM")}>
              AM
            </span>
            <span className={`w-100 px-3 py-1 rounded-1 pointer-cursor${time.period === "PM" ? "primary-background text-white" : ""}`} onClick={() => handleTimeSelect("period", "PM")}>
              PM
            </span>
          </div>
        </div>
      </CSSTransition>
    </div>
  );
}

export default React.memo(TimeInput);
