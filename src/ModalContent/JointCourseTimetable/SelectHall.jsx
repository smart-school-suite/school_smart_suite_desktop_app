import { CircleCheck, CircleX, Search } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { durationLabel, hallSummary } from "../../DrawerContent/JointCourseTimetable/GenerateSlots/components/slotLabels";
import { formatTime } from "../../utils/semesterTimetable/timeUtils";

/**
 * "Select a hall" for one selected joint course teaching period. Opened in
 * CustomModal from the generate slots drawer.
 * rowData: { day, time, pick, course, studentCount }; onConfirm(hall).
 */
function SelectHall({ handleClose, rowData, onConfirm }) {
  const { day, time, pick, course, studentCount } = rowData;
  const halls = time.halls ?? [];
  const [query, setQuery] = useState("");
  const [chosen, setChosen] = useState(pick?.hall?.option_id ?? null);
  const searchRef = useRef(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? halls.filter((hall) => hall.name?.toLowerCase().includes(q)) : halls;
  }, [halls, query]);
  const chosenHall = halls.find((hall) => hall.option_id === chosen) ?? null;

  // The drawer behind closes itself on Escape (document capture). A window
  // capture listener runs first, so Escape closes only this modal.
  useEffect(() => {
    const onKey = (event) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        handleClose();
      }
    };
    window.addEventListener("keydown", onKey, true);
    const focusTimer = setTimeout(() => searchRef.current?.focus(), 150);
    return () => {
      window.removeEventListener("keydown", onKey, true);
      clearTimeout(focusTimer);
    };
  }, [handleClose]);

  return (
    <div className="w-100 font-size-sm">
      <div
        className="border-bottom rounded-top-4 p-2 d-flex flex-row align-items-center justify-content-between"
        style={{ background: "#f9f9f9" }}
      >
        <span className="fw-semibold">Select a hall</span>
        <button
          type="button"
          onClick={handleClose}
          className="border-none bg-transparent p-0"
          style={{ width: "2rem", height: "2rem", display: "grid", placeItems: "center", cursor: "pointer" }}
          aria-label="Close"
        >
          <CircleX size={16} />
        </button>
      </div>

      <div className="d-flex flex-column gap-3 p-2 pt-3">
        <div className="d-flex flex-column rounded-3 bg-iron-50 px-3 py-2">
          <span className="fw-semibold font-size-md tabular-nums">
            {formatTime(time.start_time)} – {formatTime(time.end_time)}
          </span>
          <span>{course?.course?.title}</span>
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

        <div className="position-relative">
          <Search size={15} className="position-absolute text-iron-400" style={{ left: 12, top: "50%", transform: "translateY(-50%)" }} />
          <input
            ref={searchRef}
            type="search"
            className="form-control font-size-sm rounded-3 ps-5"
            placeholder="Search halls by name"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            aria-label="Search halls"
          />
        </div>

        <div
          className="d-flex flex-column gap-2 scroll-bar-sm"
          style={{ maxHeight: "40dvh", overflowY: "auto" }}
          role="radiogroup"
          aria-label="Halls"
        >
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
                  style={{ border: `1px solid ${isChosen ? "var(--primary-color-400)" : "var(--iron-200)"}` }}
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
                      <input type="radio" className="form-check-input m-0 pe-none" checked={isChosen} readOnly tabIndex={-1} />
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
      </div>

      <div className="border-top p-2 mt-1">
        <div className="d-flex flex-row align-items-center justify-content-end gap-2 w-100">
          <button
            type="button"
            className="border-none px-3 py-2 border rounded-3 font-size-sm w-50 bg-none"
            onClick={handleClose}
          >
            Cancel
          </button>
          <button
            type="button"
            className={`border-none px-3 py-2 rounded-3 font-size-sm primary-background text-white w-50 ${chosenHall ? "" : "opacity-50"}`}
            disabled={!chosenHall}
            onClick={() => chosenHall && onConfirm(chosenHall)}
          >
            Confirm hall
          </button>
        </div>
      </div>
    </div>
  );
}

export default SelectHall;
