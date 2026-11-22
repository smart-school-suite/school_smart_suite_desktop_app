import { Badge, BADGE_CONTEXT } from "@/components/Renderer/badges";
import { Icon } from "@iconify/react";
import { TimeSpan } from "../../../../components/SemesterTimetable/ConstraintWizard/WizardPrimitives";
import { SLOT_STATUS } from "../../../../utils/jointCourseTimetable/slotValidation";
import { ORIGIN_LABELS } from "./TimetableSlotCard";

/** Read-only row for the review step, with the slot's issues underneath. */
function SlotSummary({ slot, number, check, serverConflicts = [], onEdit }) {
  const issues = [
    ...check.local.errors.map((error) => error.message),
    ...(check.check?.status === "conflict" ? check.check.reasons : []),
    ...serverConflicts,
  ];
  const notes = [
    ...check.local.warnings.map((warning) => warning.message),
    ...(check.check?.status === "error" ? check.check.reasons : []),
  ];

  return (
    <li className="jcs-summary">
      <div className="jcs-summary__row">
        <span className="jcs-slot__index">{number}</span>
        <span className="jcs-summary__time">
          <TimeSpan start={slot.start_time} end={slot.end_time} emptyLabel="No time" />
        </span>
        <span className={`jcs-summary__hall ${slot.hall_id ? "" : "is-missing"}`}>
          {slot.hall_id ? (slot.hall_name ?? "Hall selected") : "No hall"}
        </span>
        <span className="jcs-field-hint jcs-summary__origin">{ORIGIN_LABELS[slot.origin] ?? ""}</span>
        <Badge status={serverConflicts.length ? SLOT_STATUS.CONFLICT : check.status} context={BADGE_CONTEXT.SLOT_CHECK} showIcon={false} />
        <button type="button" className="cw-text-btn" onClick={onEdit}>
          <Icon icon="lucide:pencil" width={14} height={14} />
          <span>Edit</span>
        </button>
      </div>
      {(issues.length > 0 || notes.length > 0) && (
        <ul className="jcs-messages ms-4">
          {issues.map((text, index) => (
            <li key={`i-${index}`} className="jcs-message jcs-message--danger">
              <Icon icon="lucide:circle-alert" width={14} height={14} />
              <span>{text}</span>
            </li>
          ))}
          {notes.map((text, index) => (
            <li key={`n-${index}`} className="jcs-message jcs-message--warn">
              <Icon icon="lucide:triangle-alert" width={14} height={14} />
              <span>{text}</span>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

export default SlotSummary;
