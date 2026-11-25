import React from "react";
import { useSelector } from "react-redux";

/**
 * A thin solid divider.
 *
 * Inside a table actions dropdown it separates groups of items. A divider that
 * would sit first, last or next to another divider (because the items around
 * it were not rendered) is hidden by CSS, so callers can place it freely.
 */
function HorizontalLine({
  color,
  thickness = 1,
  spacing = "0.25rem",
  inset = "0.25rem",
  className = "",
  style,
}) {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const lineColor = color ?? (darkMode ? "#333" : "#ececec");

  return (
    <div
      role="separator"
      aria-orientation="horizontal"
      className={`horizontal-line ${className}`}
      style={{
        height: thickness,
        minHeight: thickness,
        backgroundColor: lineColor,
        margin: `${spacing} ${inset}`,
        borderRadius: thickness,
        flexShrink: 0,
        ...style,
      }}
    />
  );
}

export default React.memo(HorizontalLine);
