import React from 'react';

const GaugeChart = ({
  value = 75,           // Percentage value (0–100)
  size = 200,           // Size of the SVG (width & height)
  strokeWidth = 20,     // Thickness of the gauge arc
  color = '#00BFFF',    // Color of the filled arc
  bgColor = '#eee',     // Background arc color
  label = true          // Show value label at center
}) => {
  const radius = (size - strokeWidth) / 2;
  const center = size / 2;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (circumference * value) / 100;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {/* Background Circle */}
      <circle
        cx={center}
        cy={center}
        r={radius}
        fill="none"
        stroke={bgColor}
        strokeWidth={strokeWidth}
      />

      {/* Foreground Progress Arc */}
      <circle
        cx={center}
        cy={center}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={dashOffset}
        strokeLinecap="round"
        transform={`rotate(-90 ${center} ${center})`}
        style={{ transition: 'stroke-dashoffset 0.5s ease' }}
      />

      {/* Optional Center Label */}
      {label && (
        <text
          x={center}
          y={center}
          textAnchor="middle"
          dominantBaseline="central"
          fontSize={24}
          fontWeight="bold"
          fill="#333"
        >
          {value}%
        </text>
      )}
    </svg>
  );
};

export default GaugeChart;
