import { Icon } from "@iconify/react";
import { TEACHING_DAYS } from "../../../../utils/jointCourseTimetable/slotDraft";
import { dayLabel } from "../../../../utils/semesterTimetable/timeUtils";

/** Monday–Saturday toggle tiles. Shows each selected day's slot count once set. */
function TeachingDaySelector({ selected, counts, onToggle, disabled = false }) {
  return (
    <div className="jcs-days" role="group" aria-label="Teaching days">
      {TEACHING_DAYS.map((day) => {
        const isSelected = selected.includes(day);
        const count = counts[day];
        return (
          <button
            key={day}
            type="button"
            className={`cw-day jcs-day ${isSelected ? "is-selected" : ""}`}
            aria-pressed={isSelected}
            disabled={disabled}
            onClick={() => onToggle(day)}
          >
            <span className="jcs-day__name">{dayLabel(day)}</span>
            <span className="jcs-day__meta">
              {isSelected
                ? count
                  ? `${count} slot${count === 1 ? "" : "s"}`
                  : "Selected"
                : "Not teaching"}
            </span>
            <span className="cw-day__check" aria-hidden="true">
              <Icon icon="lucide:check" width={12} height={12} />
            </span>
          </button>
        );
      })}
    </div>
  );
}

export default TeachingDaySelector;
