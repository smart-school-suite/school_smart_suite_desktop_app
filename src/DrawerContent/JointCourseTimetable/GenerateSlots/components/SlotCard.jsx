import { motion } from "framer-motion";
import { ArrowRight, Check, MapPin, TriangleAlert } from "lucide-react";
import { formatTime } from "../../../../utils/semesterTimetable/timeUtils";
import { durationLabel, hallSummary } from "./slotLabels";

const PILL = {
  available: "bg-fern-50 text-fern-700",
  selected: "bg-primary-50 text-primary-700",
  assigned: "bg-fern-50 text-fern-700",
  blocked: "bg-iron-100 text-iron-600",
};

function StatusPill({ tone, children }) {
  return (
    <span className={`d-inline-flex align-items-center gap-1 rounded-pill px-2 font-size-xs fw-medium text-nowrap ${PILL[tone]}`}>
      {children}
    </span>
  );
}

/**
 * One free teaching period. Click the card to select it; a selected period
 * needs a hall (chosen in the hall picker) before it can be reviewed.
 */
function SlotCard({ course, teacher, day, time, pick, blocked, disabled, studentCount, onToggle, onSelectHall }) {
  const selected = Boolean(pick);
  const hall = pick?.hall ?? null;
  const inactive = disabled || (Boolean(blocked) && !selected);
  const state = hall ? "assigned" : selected ? "selected" : inactive ? "blocked" : "available";

  const toggle = () => {
    if (!inactive) onToggle();
  };

  const borderColor = {
    assigned: "var(--fern-400)",
    selected: "var(--primary-color-400)",
    blocked: "var(--iron-200)",
    available: "var(--iron-200)",
  }[state];

  return (
    <motion.div
      layout="position"
      role="checkbox"
      aria-checked={selected}
      aria-disabled={inactive}
      tabIndex={inactive ? -1 : 0}
      title={blocked && !selected ? blocked : selected ? "Click to unselect this period" : undefined}
      onClick={toggle}
      onKeyDown={(event) => {
        if (event.target !== event.currentTarget) return;
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          toggle();
        }
      }}
      className={`rounded-3 bg-white p-3 d-flex flex-column gap-2 font-size-sm transition-all duration-200 ${
        inactive ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
      } ${state === "available" ? "hover-bg-iron-50" : ""}`}
      style={{
        border: `1px solid ${borderColor}`,
        boxShadow:
          state === "selected"
            ? "0 0 0 3px var(--primary-color-50)"
            : state === "assigned"
              ? "0 0 0 3px var(--fern-50)"
              : "0 1px 2px rgba(16, 24, 40, 0.04)",
      }}
    >
      <div className="d-flex flex-row align-items-start justify-content-between gap-2">
        <span className="fw-semibold font-size-md tabular-nums">
          {formatTime(time.start_time)} – {formatTime(time.end_time)}
        </span>
        {state === "assigned" ? (
          <StatusPill tone="assigned">
            <Check size={11} strokeWidth={3} /> Hall assigned
          </StatusPill>
        ) : state === "selected" ? (
          <StatusPill tone="selected">Selected</StatusPill>
        ) : state === "blocked" ? (
          <StatusPill tone="blocked">Unavailable</StatusPill>
        ) : (
          <StatusPill tone="available">Available</StatusPill>
        )}
      </div>

      <span className="font-size-xs text-iron-500">
        {durationLabel(day.duration_minutes)}
        {day.period_duration?.name ? ` · ${day.period_duration.name} period` : ""}
      </span>

      <div className="d-flex flex-column">
        <span className="fw-semibold">{course.course?.title}</span>
        <span className="font-size-xs text-iron-500">
          {[course.course?.code, teacher?.name].filter(Boolean).join(" · ")}
        </span>
      </div>

      {state === "blocked" && blocked && (
        <span className="font-size-xs text-iron-600">{blocked}</span>
      )}

      {selected && (
        <div
          className="d-flex flex-column gap-2 border-top pt-2 mt-1"
          onClick={(event) => event.stopPropagation()}
        >
          {hall ? (
            <div className="d-flex flex-column gap-2 rounded-3 bg-iron-50 p-2">
              <div className="d-flex flex-row align-items-center justify-content-between gap-2">
                <span className="d-inline-flex align-items-center gap-2 fw-semibold text-truncate">
                  <MapPin size={15} className="text-fern-600 flex-shrink-0" /> {hall.name}
                </span>
                <StatusPill tone="assigned">Assigned</StatusPill>
              </div>
              <span className={`font-size-xs ${hall.fits === false ? "text-old-lace-700" : "text-iron-600"}`}>
                {hall.fits === false && <TriangleAlert size={12} className="me-1" />}
                {hallSummary(hall, studentCount)}
              </span>
              <button
                type="button"
                className="w-100 rounded-pill bg-white font-size-sm py-1 hover-bg-iron-100 transition-all duration-200"
                style={{ border: "1px solid var(--iron-300)" }}
                disabled={disabled}
                onClick={onSelectHall}
              >
                Change hall
              </button>
            </div>
          ) : (
            <div className="d-flex flex-column gap-2 rounded-3 bg-primary-50 p-2">
              <span className="d-inline-flex align-items-center gap-2 fw-semibold">
                <MapPin size={15} className="color-primary flex-shrink-0" /> Hall assignment required
              </span>
              <span className="font-size-xs text-iron-600">
                Choose a hall for this teaching period before continuing.
              </span>
              <button
                type="button"
                className="w-100 d-inline-flex align-items-center justify-content-center gap-1 rounded-pill border-0 primary-background text-white font-size-sm py-1"
                disabled={disabled}
                onClick={onSelectHall}
              >
                Select a hall <ArrowRight size={14} />
              </button>
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
}

export default SlotCard;
