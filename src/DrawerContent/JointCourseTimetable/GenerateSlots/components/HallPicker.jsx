import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, CircleCheck, Search, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { formatTime } from "../../../../utils/semesterTimetable/timeUtils";
import { durationLabel, hallSummary } from "./slotLabels";

/**
 * "Select a hall" dialog for one selected teaching period. It is drawn inside
 * the drawer (the drawer traps focus, so a separate modal would fight it) and
 * covers the step. Escape closes the dialog before it can close the drawer.
 */
function HallPicker({ target, course, studentCount, onClose, onConfirm }) {
  return (
    <AnimatePresence>
      {target && (
        <HallPickerDialog
          key={target.pick.key}
          target={target}
          course={course}
          studentCount={studentCount}
          onClose={onClose}
          onConfirm={onConfirm}
        />
      )}
    </AnimatePresence>
  );
}

function HallPickerDialog({ target, course, studentCount, onClose, onConfirm }) {
  const { day, time, pick } = target;
  const [query, setQuery] = useState("");
  const [chosen, setChosen] = useState(pick.hall?.option_id ?? null);
  const searchRef = useRef(null);
  const halls = time.halls ?? [];

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? halls.filter((hall) => hall.name?.toLowerCase().includes(q)) : halls;
  }, [halls, query]);

  const chosenHall = halls.find((hall) => hall.option_id === chosen) ?? null;

  // Capture on window runs before the drawer's document-level Escape handler.
  useEffect(() => {
    const onKey = (event) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        onClose();
      }
    };
    window.addEventListener("keydown", onKey, true);
    searchRef.current?.focus();
    return () => window.removeEventListener("keydown", onKey, true);
  }, [onClose]);

  const confirm = () => chosenHall && onConfirm(chosenHall);

  return (
    <motion.div
      className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center p-3"
      style={{ zIndex: 20, background: "rgba(16, 24, 40, 0.28)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      onClick={onClose}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label="Select a hall"
        className="bg-white rounded-4 shadow d-flex flex-column w-100 font-size-sm"
        style={{ maxWidth: 560, maxHeight: "100%", border: "1px solid var(--iron-200)" }}
        initial={{ opacity: 0, y: 12, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 8, scale: 0.98 }}
        transition={{ duration: 0.18, ease: [0.32, 0.72, 0, 1] }}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="d-flex flex-column gap-3 px-3 pt-3 pb-2">
          <div className="d-flex flex-row align-items-start justify-content-between gap-2">
            <div className="d-flex flex-column">
              <span className="fw-semibold font-size-md">Select a hall</span>
              <span className="text-iron-600">Choose a suitable hall for your selected teaching period.</span>
            </div>
            <button
              type="button"
              className="d-inline-grid border-0 bg-transparent rounded-circle hover-bg-iron-100 flex-shrink-0"
              style={{ width: "2rem", height: "2rem", placeItems: "center" }}
              aria-label="Close"
              onClick={onClose}
            >
              <X size={16} />
            </button>
          </div>

          <div className="d-flex flex-column rounded-3 bg-iron-50 px-3 py-2">
            <span className="fw-semibold font-size-md tabular-nums">
              {formatTime(time.start_time)} – {formatTime(time.end_time)}
            </span>
            <span>{course.course?.title}</span>
            <span className="font-size-xs text-iron-500">
              {[day.day_label, durationLabel(day.duration_minutes), studentCount ? `${studentCount} students` : null]
                .filter(Boolean)
                .join(" · ")}
            </span>
          </div>

          <div className="d-flex flex-row align-items-baseline justify-content-between">
            <span className="fw-semibold">Available halls</span>
            <span className="font-size-xs text-iron-500">
              {halls.length} hall{halls.length === 1 ? "" : "s"} available
            </span>
          </div>

          <label className="d-flex flex-row align-items-center gap-2 rounded-3 px-3 py-2 bg-white" style={{ border: "1px solid var(--iron-200)" }}>
            <Search size={15} className="text-iron-400 flex-shrink-0" />
            <input
              ref={searchRef}
              type="search"
              className="border-0 outline-none bg-transparent w-100 font-size-sm"
              placeholder="Search halls by name"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              aria-label="Search halls"
            />
          </label>
        </div>

        <div className="d-flex flex-column gap-2 px-3 pb-3 scroll-bar-sm" style={{ overflowY: "auto", minHeight: 0 }} role="radiogroup" aria-label="Halls">
          {filtered.length === 0 ? (
            <span className="text-iron-500 text-center py-4">
              {query ? `No hall matches "${query}".` : "No hall is free at this time."}
            </span>
          ) : (
            filtered.map((hall) => {
              const isChosen = hall.option_id === chosen;
              return (
                <button
                  type="button"
                  key={hall.option_id}
                  role="radio"
                  aria-checked={isChosen}
                  className={`d-flex flex-column gap-1 rounded-3 p-2 px-3 text-start transition-all duration-200 ${isChosen ? "bg-primary-50" : "bg-white hover-bg-iron-50"}`}
                  style={{
                    border: `1px solid ${isChosen ? "var(--primary-color-400)" : "var(--iron-200)"}`,
                    boxShadow: isChosen ? "0 0 0 3px var(--primary-color-50)" : "none",
                  }}
                  onClick={() => setChosen(hall.option_id)}
                  onDoubleClick={() => onConfirm(hall)}
                >
                  <div className="d-flex flex-row align-items-center justify-content-between gap-2 w-100">
                    <span className="fw-semibold">{hall.name}</span>
                    {hall.recommended ? (
                      <span className="rounded-pill px-2 font-size-xs fw-medium bg-primary-50 text-primary-700" style={{ border: "1px solid var(--primary-color-200)" }}>
                        Recommended
                      </span>
                    ) : (
                      <span
                        className="rounded-circle flex-shrink-0"
                        style={{ width: 16, height: 16, border: "1.5px solid var(--iron-300)", background: isChosen ? "var(--primary-color)" : "transparent" }}
                        aria-hidden="true"
                      />
                    )}
                  </div>
                  <span className={`font-size-xs ${hall.fits === false ? "text-old-lace-700" : "text-iron-500"}`}>
                    {hallSummary(hall, studentCount)}
                  </span>
                  {isChosen && (
                    <span className="d-inline-flex align-items-center gap-1 font-size-xs fw-medium text-primary-700">
                      <CircleCheck size={13} /> Selected
                    </span>
                  )}
                </button>
              );
            })
          )}
        </div>

        <div className="d-flex flex-row align-items-center justify-content-between gap-2 border-top px-3 py-2">
          <button type="button" className="rounded-pill bg-white px-3 py-1 font-size-sm hover-bg-iron-50" style={{ border: "1px solid var(--iron-300)" }} onClick={onClose}>
            Cancel
          </button>
          <button
            type="button"
            className={`d-inline-flex align-items-center gap-1 rounded-pill border-0 primary-background text-white px-3 py-1 font-size-sm ${chosenHall ? "" : "opacity-50"}`}
            disabled={!chosenHall}
            onClick={confirm}
          >
            Confirm hall <ArrowRight size={14} />
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default HallPicker;
