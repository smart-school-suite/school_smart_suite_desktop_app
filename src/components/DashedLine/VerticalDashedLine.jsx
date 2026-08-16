import React from "react";

const VerticalDashedLine = ({
  color = "#000",
  thickness = 2,
  dashArray = "10, 5",
  rounded = true,
  className = "",
  dashed = true,
  height = "100%", // New prop for height control
  minHeight = "auto", // Optional min-height
  maxHeight = "none", // Optional max-height
  width = "auto", // Optional width control
}) => {
  const finalDashArray = dashed ? dashArray : "none";
  
  return (
    <div
      className={className}
      style={{
        height: height,
        minHeight: minHeight,
        maxHeight: maxHeight,
        width: width,
        display: "inline-block",
        // You can also add flex properties if needed
        // flexShrink: 0,
      }}
    >
      <svg
        width={thickness}
        height="100%"
        style={{ 
          display: "block", 
          overflow: "visible",
          // Ensure SVG takes full height of container
          height: "100%",
        }}
      >
        <line
          x1={thickness / 2}
          y1="0"
          x2={thickness / 2}
          y2="100%"
          stroke={color}
          strokeWidth={thickness}
          strokeLinecap={rounded ? "round" : "butt"}
          strokeDasharray={finalDashArray}
        />
      </svg>
    </div>
  );
};

export default VerticalDashedLine;