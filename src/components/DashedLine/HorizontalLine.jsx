import React from "react";

/**
 * A thin solid divider.
 *
 * Inside a table actions dropdown it separates groups of items. A divider that
 * would sit first, last or next to another divider (because the items around
 * it were not rendered) is hidden by CSS, so callers can place it freely.
 */
function HorizontalLine({
  color = "#ccc",
  thickness = 0.2,
  spacing = "0.25rem",
  inset = "0.25rem",
  className = "",
  style,
}) {
  return (
    <div
      role="separator"
      aria-orientation="horizontal"
      className={`horizontal-line ${className}`}
      style={{
        margin: `${spacing} ${inset}`,
        flexShrink: 0,
        lineHeight: 0,
        ...style,
      }}
    >
      <svg
        width="100%"
        height={Math.max(thickness, 1)}
        style={{ display: "block", overflow: "visible" }}
      >
        <line
          x1="0"
          y1="50%"
          x2="100%"
          y2="50%"
          stroke={color}
          strokeWidth={thickness}
        />
      </svg>
    </div>
  );
}

export default React.memo(HorizontalLine);
