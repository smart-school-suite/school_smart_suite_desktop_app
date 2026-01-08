import GaugeChartLib from "react-gauge-chart";

function GuageChart({
  value = 0,              // current value
  max = 100,              // max value
  levels = 14,
  colors = ["#E5E7EB", "#3B82F6"],
  arcWidth = 0.25,
  arcPadding = 0.02,
  showText = true,
  formatText,
  animate = true,
  textColor = "#111827",
  className = "",
  id,
}) {
  const percent = Math.min(Math.max(value / max, 0), 1);

  return (
    <GaugeChartLib
      id={id ?? `gauge-${Math.random()}`}
      className={className}
      nrOfLevels={levels}
      percent={percent}
      arcWidth={arcWidth}
      arcPadding={arcPadding}
      colors={colors}
      animate={animate}
      hideText={!showText}
      formatTextValue={
        formatText ?? ((v) => `${Math.round(v)}%`)
      }
      textColor={textColor}
    />
  );
}

export default GuageChart;
