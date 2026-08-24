import React, { useState, useMemo, useCallback } from "react";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const DAY_SHORT = { Monday: "Mon", Tuesday: "Tue", Wednesday: "Wed", Thursday: "Thu", Friday: "Fri" };

const DEFAULT_DATA = [
  { day: "Monday", start_time: "07:00", end_time: "12:00" },
  { day: "Monday", start_time: "14:00", end_time: "17:00" },
  { day: "Tuesday", start_time: "08:00", end_time: "15:00" },
  { day: "Wednesday", start_time: "08:00", end_time: "12:00" },
  { day: "Wednesday", start_time: "14:00", end_time: "16:00" },
  { day: "Thursday", start_time: "09:00", end_time: "15:00" },
  { day: "Friday", start_time: "08:00", end_time: "13:00" },
  { day: "Saturday", start_time: "08:00", end_time: "13:00" },
  { day: "Sunday", start_time: "08:00", end_time: "13:00" },
];

const toMinutes = (t) => {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
};

const formatLabel = (t) => t; // already HH:MM, 24h — clean and unambiguous for admin tooling

export default function InstructorAvailabilitySchedule({
  availability = DEFAULT_DATA,
  startHour = 7,
  endHour = 17,
  slotMinutes = 60,
  selectable = true,
}) {
  const [selectedId, setSelectedId] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);

  const rangeStart = startHour * 60;
  const rangeEnd = endHour * 60;
  const totalMinutes = rangeEnd - rangeStart;

  const rowHeight = 44; // px per slot — generous enough to read, compact enough for a drawer
  const rowsCount = Math.round(totalMinutes / slotMinutes);
  const gridHeight = rowsCount * rowHeight;

  const timeLabels = useMemo(() => {
    const labels = [];
    for (let m = rangeStart; m <= rangeEnd; m += slotMinutes) {
      const h = Math.floor(m / 60)
        .toString()
        .padStart(2, "0");
      const mm = (m % 60).toString().padStart(2, "0");
      labels.push(`${h}:${mm}`);
    }
    return labels;
  }, [rangeStart, rangeEnd, slotMinutes]);

  const blocksByDay = useMemo(() => {
    const map = {};
    DAYS.forEach((d) => (map[d] = []));
    availability.forEach((a, i) => {
      if (!map[a.day]) return;
      const s = Math.max(toMinutes(a.start_time), rangeStart);
      const e = Math.min(toMinutes(a.end_time), rangeEnd);
      if (e <= s) return;
      map[a.day].push({
        id: `${a.day}-${a.start_time}-${a.end_time}-${i}`,
        day: a.day,
        start: a.start_time,
        end: a.end_time,
        top: ((s - rangeStart) / totalMinutes) * gridHeight,
        height: ((e - s) / totalMinutes) * gridHeight,
      });
    });
    return map;
  }, [availability, rangeStart, rangeEnd, totalMinutes, gridHeight]);

  const handleSelect = useCallback(
    (id) => {
      if (!selectable) return;
      setSelectedId((prev) => (prev === id ? null : id));
    },
    [selectable]
  );

  return (
    <div
      style={{
        // Local design tokens — scoped to this component
        "--as-ink": "#1C2128",
        "--as-ink-muted": "#6B7280",
        "--as-ink-faint": "#9CA3AF",
        "--as-line": "#E7E9ED",
        "--as-line-soft": "#F1F2F5",
        "--as-surface": "#FFFFFF",
        "--as-canvas": "#FBFBFC",
        "--as-brand": "#38bff8",
        "--as-brand-soft": "#e0f2fe",
        "--as-brand-border": "#bae7fd",
        "--as-brand-border-strong": "#38bff8",
      }}
      className="w-full max-w-full"
    >
      <div
        style={{
          background: "var(--as-surface)",
          border: "1px solid var(--as-line)",
          borderRadius: "10px",
          overflow: "hidden",
        }}
      >
        {/* Scroll wrapper for narrow drawers */}
        <div style={{ overflowX: "auto" }}>
          <div style={{ minWidth: "420px" }}>
            {/* Day header row */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "52px repeat(5, 1fr)",
                background: "var(--as-canvas)",
                borderBottom: "1px solid var(--as-line)",
              }}
            >
              <div />
              {DAYS.map((day, i) => (
                <div
                  key={day}
                  style={{
                    padding: "8px 6px",
                    textAlign: "center",
                    fontSize: "11px",
                    fontWeight: 600,
                    color: "var(--as-ink-muted)",
                    textTransform: "uppercase",
                    letterSpacing: "0.04em",
                    borderLeft: i === 0 ? "none" : "1px solid var(--as-line-soft)",
                  }}
                >
                  {DAY_SHORT[day]}
                </div>
              ))}
            </div>

            {/* Body: time axis + day columns */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "52px repeat(5, 1fr)",
                position: "relative",
              }}
            >
              {/* Time axis */}
              <div style={{ position: "relative", height: gridHeight }}>
                {timeLabels.map((label, i) => (
                  <div
                    key={label}
                    style={{
                      position: "absolute",
                      top: i * rowHeight - 6,
                      right: "8px",
                      fontSize: "10.5px",
                      color: "var(--as-ink-faint)",
                      fontVariantNumeric: "tabular-nums",
                    }}
                  >
                    {i < timeLabels.length ? label : ""}
                  </div>
                ))}
              </div>

              {/* Day columns */}
              {DAYS.map((day, dayIdx) => (
                <div
                  key={day}
                  style={{
                    position: "relative",
                    height: gridHeight,
                    borderLeft: "1px solid var(--as-line-soft)",
                  }}
                >
                  {/* Horizontal grid lines */}
                  {timeLabels.map((label, i) => (
                    <div
                      key={label}
                      style={{
                        position: "absolute",
                        top: i * rowHeight,
                        left: 0,
                        right: 0,
                        borderTop:
                          i === 0
                            ? "none"
                            : "1px solid var(--as-line-soft)",
                      }}
                    />
                  ))}

                  {/* Availability blocks */}
                  {blocksByDay[day].map((block) => {
                    const isSelected = selectedId === block.id;
                    const isHovered = hoveredId === block.id;
                    return (
                      <button
                        key={block.id}
                        type="button"
                        onMouseEnter={() => setHoveredId(block.id)}
                        onMouseLeave={() => setHoveredId(null)}
                        onFocus={() => setHoveredId(block.id)}
                        onBlur={() => setHoveredId(null)}
                        onClick={() => handleSelect(block.id)}
                        aria-pressed={isSelected}
                        aria-label={`${block.day}: available ${block.start} to ${block.end}`}
                        style={{
                          position: "absolute",
                          top: block.top + 3,
                          height: Math.max(block.height - 6, 14),
                          left: 4,
                          right: 4,
                          background: "var(--as-brand-soft)",
                          border: `1.5px solid ${
                            isSelected ? "var(--as-brand-border-strong)" : "var(--as-brand-border)"
                          }`,
                          borderRadius: "7px",
                          cursor: selectable ? "pointer" : "default",
                          padding: 0,
                          display: "flex",
                          alignItems: "flex-start",
                          justifyContent: "flex-start",
                          boxSizing: "border-box",
                          transition: "border-color 120ms ease, box-shadow 120ms ease, background 120ms ease",
                          boxShadow: isSelected
                            ? "0 0 0 3px rgba(76,95,234,0.14)"
                            : isHovered
                            ? "0 1px 3px rgba(28,33,40,0.08)"
                            : "none",
                          outline: "none",
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            handleSelect(block.id);
                          }
                        }}
                      >
                        {block.height > 30 && (
                          <span
                            style={{
                              fontSize: "10px",
                              fontWeight: 600,
                              color: "var(--as-brand)",
                              padding: "4px 6px",
                              lineHeight: 1.2,
                              textAlign: "left",
                              fontVariantNumeric: "tabular-nums",
                            }}
                          >
                            {formatLabel(block.start)}–{formatLabel(block.end)}
                          </span>
                        )}

                        {/* Tooltip */}
                        {isHovered && (
                          <div
                            role="tooltip"
                            style={{
                              position: "absolute",
                              bottom: "calc(100% + 6px)",
                              left: "50%",
                              transform: "translateX(-50%)",
                              background: "var(--as-ink)",
                              color: "#fff",
                              fontSize: "11px",
                              fontWeight: 500,
                              padding: "5px 9px",
                              borderRadius: "6px",
                              whiteSpace: "nowrap",
                              zIndex: 20,
                              pointerEvents: "none",
                              boxShadow: "0 4px 10px rgba(0,0,0,0.16)",
                            }}
                          >
                            {block.day} · {block.start}–{block.end}
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Legend / accessibility note (not color-only) */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            padding: "10px 16px 12px 16px",
            borderTop: "1px solid var(--as-line)",
            fontSize: "11px",
            color: "var(--as-ink-muted)",
          }}
        >
          <span
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "4px",
              background: "var(--as-brand-soft)",
              border: "1.5px solid var(--as-brand-border)",
              display: "inline-block",
            }}
          />
          Available window
        </div>
      </div>
    </div>
  );
}