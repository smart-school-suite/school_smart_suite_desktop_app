import { slotDuration } from "../../../../utils/jointCourseTimetable/slotDraft";
import { SLOT_STATUS } from "../../../../utils/jointCourseTimetable/slotValidation";
import {
  dayShortLabel,
  formatTime,
  fromMinutes,
  sortDays,
  toMinutes,
} from "../../../../utils/semesterTimetable/timeUtils";

const DEFAULT_START = 8 * 60;
const DEFAULT_END = 17 * 60;

/**
 * Compact week view of the slots that have a time, so overlaps and gaps are
 * easy to spot. Clicking a block scrolls to its editor.
 */
function TimetablePreview({ days, slots, checks, onSelect }) {
  const timed = slots.filter((slot) => slotDuration(slot) !== null);
  const start = Math.min(
    DEFAULT_START,
    ...timed.map((slot) => Math.floor(toMinutes(slot.start_time) / 60) * 60),
  );
  const end = Math.max(
    DEFAULT_END,
    ...timed.map((slot) => Math.ceil(toMinutes(slot.end_time) / 60) * 60),
  );
  const span = end - start;
  const hours = Array.from({ length: span / 60 + 1 }, (_, index) => start + index * 60);
  const position = (minutes) => `${((minutes - start) / span) * 100}%`;

  return (
    <div className="jcs-preview" aria-label="Week preview">
      <div className="jcs-preview__axis" aria-hidden="true">
        {hours.map((minutes) => (
          <span key={minutes} style={{ top: position(minutes) }}>
            {formatTime(fromMinutes(minutes)).replace(":00", "")}
          </span>
        ))}
      </div>
      <div className="jcs-preview__days" style={{ "--jcs-days": days.length }}>
        {sortDays(days).map((day) => (
          <div key={day} className="jcs-preview__day">
            <span className="jcs-preview__dayname">{dayShortLabel(day)}</span>
            <div className="jcs-preview__lane">
              {hours.slice(1, -1).map((minutes) => (
                <span
                  key={minutes}
                  className="jcs-preview__line"
                  style={{ top: position(minutes) }}
                />
              ))}
              {timed
                .filter((slot) => slot.day === day)
                .map((slot) => {
                  const status = checks[slot.id]?.status;
                  const tone =
                    status === SLOT_STATUS.READY
                      ? "ready"
                      : [SLOT_STATUS.CONFLICT, SLOT_STATUS.INVALID].includes(status)
                        ? "conflict"
                        : "pending";
                  const from = toMinutes(slot.start_time);
                  const to = toMinutes(slot.end_time);
                  return (
                    <button
                      key={slot.id}
                      type="button"
                      className={`jcs-preview__block is-${tone}`}
                      style={{ top: position(from), height: position(start + (to - from)) }}
                      title={`${formatTime(slot.start_time)} – ${formatTime(slot.end_time)}${slot.hall_name ? ` · ${slot.hall_name}` : ""}`}
                      onClick={() => onSelect?.(slot.id)}
                    >
                      <span>{formatTime(slot.start_time)}</span>
                    </button>
                  );
                })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TimetablePreview;
