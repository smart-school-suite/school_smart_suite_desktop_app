import { Icon } from "@iconify/react";
import { useDispatch } from "react-redux";
import { TimeRangeInput } from "../../../../components/FormComponents/InputComponents";
import {
  IconButton,
  TimeField,
  TimeSpan,
} from "../../../../components/SemesterTimetable/ConstraintWizard/WizardPrimitives";
import {
  removeSlot,
  resetSlot,
  updateSlot,
} from "../../../../Slices/jointCourse/jointCourseTimetableSlice";
import { SLOT_ORIGIN } from "../../../../utils/jointCourseTimetable/slotDraft";
import { STATUS_META } from "../../../../utils/jointCourseTimetable/slotValidation";
import { dayLabel } from "../../../../utils/semesterTimetable/timeUtils";
import HallSelect from "./HallSelect";
import SlotRecommendation from "./SlotRecommendation";

export const ORIGIN_LABELS = {
  [SLOT_ORIGIN.MANUAL]: "Set manually",
  [SLOT_ORIGIN.RECOMMENDED]: "From suggestion",
  [SLOT_ORIGIN.ADJUSTED]: "Suggestion, adjusted",
  [SLOT_ORIGIN.SAVED]: "Saved",
};

/** Editor for one slot: time, hall, checks and an optional suggestion. */
function TimetableSlotCard({
  courseId,
  teacherId,
  slot,
  number,
  periodMinutes,
  check,
  recommendation,
  recommendations,
  canRemove,
}) {
  const dispatch = useDispatch();
  const update = (changes) => dispatch(updateSlot({ courseId, slotId: slot.id, changes }));
  const status = STATUS_META[check.status];
  const messages = [
    ...check.local.errors
      .filter((error) => !error.type.startsWith("missing"))
      .map((error) => ({ tone: "danger", text: error.message })),
    ...(check.check?.status === "conflict" || check.check?.status === "error"
      ? (check.check.reasons ?? []).map((text) => ({
          tone: check.check.status === "error" ? "warn" : "danger",
          text,
        }))
      : []),
    ...check.local.warnings.map((warning) => ({ tone: "warn", text: warning.message })),
  ];
  const isBusy = recommendation?.status === "loading";

  return (
    <article id={`jcs-slot-${slot.id}`} className={`jcs-slot is-${check.status}`}>
      <header className="jcs-slot__head">
        <div className="d-flex flex-row align-items-center gap-2 min-w-0">
          <span className="jcs-slot__index">{number}</span>
          <div className="d-flex flex-column min-w-0">
            <span className="fw-medium">
              {dayLabel(slot.day)} · Slot {number}
            </span>
            <span className="jcs-field-hint d-flex flex-row align-items-center gap-1">
              {slot.start_time || slot.end_time ? (
                <TimeSpan start={slot.start_time} end={slot.end_time} />
              ) : (
                "No time yet"
              )}
              {ORIGIN_LABELS[slot.origin] && (
                <>
                  <span className="jcs-dot" aria-hidden="true" />
                  <span>{ORIGIN_LABELS[slot.origin]}</span>
                </>
              )}
            </span>
          </div>
        </div>
        <div className="d-flex flex-row align-items-center gap-1 flex-shrink-0">
          <span className={`cw-badge cw-badge--${status.tone}`}>{status.label}</span>
          <button
            type="button"
            className="cw-text-btn"
            disabled={isBusy}
            onClick={() => recommendations.find(slot)}
            title="Suggest a time and hall when the lecturer and a hall are both free"
          >
            <Icon icon="lucide:sparkles" width={14} height={14} />
            <span>{recommendation ? "Recalculate" : "Find best slot"}</span>
          </button>
          <IconButton
            icon="lucide:rotate-ccw"
            label="Clear this slot's time and hall"
            onClick={() => {
              recommendations.dismiss(slot.id);
              dispatch(resetSlot({ courseId, slotId: slot.id }));
            }}
          />
          {canRemove && (
            <IconButton
              icon="lucide:trash-2"
              label={`Remove this slot (${dayLabel(slot.day)} will have one slot fewer)`}
              tone="danger"
              onClick={() => {
                recommendations.dismiss(slot.id);
                dispatch(removeSlot({ courseId, slotId: slot.id }));
              }}
            />
          )}
        </div>
      </header>

      <div className="jcs-slot__fields">
        <TimeField>
          <TimeRangeInput
            key={`${slot.id}-${slot.revision}`}
            startValue={slot.start_time}
            endValue={slot.end_time}
            onStartTimeChange={(value) => update({ start_time: value })}
            onEndTimeChange={(value) => update({ end_time: value })}
          />
        </TimeField>
        <HallSelect
          courseId={courseId}
          teacherId={teacherId}
          slot={slot}
          periodMinutes={periodMinutes}
          onSelect={(hallId, hallName) => update({ hall_id: hallId, hall_name: hallName })}
        />
      </div>

      {messages.length > 0 && (
        <ul className="jcs-messages">
          {messages.map((message, index) => (
            <li key={index} className={`jcs-message jcs-message--${message.tone}`}>
              <Icon
                icon={message.tone === "danger" ? "lucide:circle-alert" : "lucide:triangle-alert"}
                width={14}
                height={14}
              />
              <span>{message.text}</span>
            </li>
          ))}
        </ul>
      )}

      <SlotRecommendation
        entry={recommendation}
        onAccept={() => recommendations.accept(slot.id)}
        onRecalculate={() => recommendations.find(slot)}
        onDismiss={() => recommendations.dismiss(slot.id)}
        onSelect={(index) => recommendations.select(slot.id, index)}
        onToggleAlternatives={() => recommendations.toggleAlternatives(slot.id)}
      />
    </article>
  );
}

export default TimetableSlotCard;
