import { Icon } from "@iconify/react";
import { useState } from "react";
import {
  Note,
  OptionTile,
} from "../../../../components/SemesterTimetable/ConstraintWizard/WizardPrimitives";
import { formatTime } from "../../../../utils/semesterTimetable/timeUtils";

const apiMessage = (error) =>
  error?.response?.data?.errors?.description ??
  error?.response?.data?.message ??
  "Suggestions are unavailable right now. You can still enter a time.";

const timeLabel = (slot) =>
  `${formatTime(slot.start_time)} – ${formatTime(slot.end_time)}`;

/**
 * Suggested times for one request. `query` is a react-query result for
 * /recommended-slots or /generate-slots; `mode` says which.
 */
function RequestSuggestions({ mode, query, waitingHint, selected, onPick }) {
  const [showUnavailable, setShowUnavailable] = useState(false);

  if (!query) {
    return <p className="cw-muted font-size-sm mb-0">{waitingHint}</p>;
  }
  if (query.isLoading) {
    return (
      <div
        className="cw-options cw-options--compact placeholder-glow"
        aria-busy="true"
      >
        {[...Array(4)].map((_, index) => (
          <span
            key={index}
            className="placeholder col-12 rounded-3"
            style={{ height: "2.25rem" }}
          />
        ))}
      </div>
    );
  }
  if (query.error) {
    return <Note icon="lucide:circle-alert">{apiMessage(query.error)}</Note>;
  }

  const data = query.data?.data ?? {};
  const slots =
    mode === "periods" ? (data.slots ?? []) : (data.recommended ?? []);
  const unavailable = mode === "periods" ? [] : (data.unavailable ?? []);
  const isSelected = (slot) =>
    slot.start_time === selected?.start_time &&
    slot.end_time === selected?.end_time;

  return (
    <div className="d-flex flex-column gap-2">
      {mode === "recommended" && data.summary?.message && (
        <span className="cw-muted font-size-sm">{data.summary.message}</span>
      )}

      {slots.length > 0 ? (
        <div
          className="cw-options cw-options--compact"
          role="radiogroup"
          style={{
            gridTemplateColumns: "repeat(auto-fill, minmax(11.5rem, 1fr))",
          }}
        >
          {slots.map((slot) => (
            <OptionTile
              key={`${slot.start_time}-${slot.end_time}`}
              selected={isSelected(slot)}
              title={timeLabel(slot)}
              meta={
                slot.teachers?.length
                  ? slot.teachers
                      .slice(0, 2)
                      .map((teacher) => teacher.name)
                      .join(", ") +
                    (slot.teachers.length > 2
                      ? ` +${slot.teachers.length - 2}`
                      : "")
                  : null
              }
              onClick={() => onPick(slot)}
            />
          ))}
        </div>
      ) : (
        <Note icon="lucide:calendar-x-2">
          No free {mode === "periods" ? "periods" : "times"} on this day. Try
          another day, or enter a time below.
        </Note>
      )}

      {unavailable.length > 0 && (
        <div className="d-flex flex-column gap-1">
          <button
            type="button"
            className="cw-text-btn cw-text-btn--muted align-self-start px-0"
            onClick={() => setShowUnavailable((value) => !value)}
            aria-expanded={showUnavailable}
          >
            <Icon
              icon={
                showUnavailable ? "lucide:chevron-down" : "lucide:chevron-right"
              }
              width={14}
              height={14}
            />
            <span>
              {unavailable.length} busy{" "}
              {unavailable.length === 1 ? "time" : "times"}
            </span>
          </button>
          {showUnavailable && (
            <ul className="list-unstyled mb-0 d-flex flex-column gap-1 font-size-sm">
              {unavailable.map((slot) => (
                <li
                  key={`${slot.start_time}-${slot.end_time}`}
                  className="d-flex flex-row gap-2"
                >
                  <span className="fw-medium text-nowrap">
                    {timeLabel(slot)}
                  </span>
                  <span className="cw-muted">
                    {(slot.reasons ?? []).join(" · ")}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export default RequestSuggestions;
