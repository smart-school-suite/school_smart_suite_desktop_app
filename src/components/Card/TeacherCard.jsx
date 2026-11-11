import { CircleCheck } from "lucide-react";
import TeacherQuickView from "../../ModalContent/Teacher/TeacherQuickView";
import { ModalButton } from "../DataTableComponents/ActionComponent";
import ChipRow from "./ChipRow";
import TeacherAvatar from "./TeacherAvatar";

const unique = (values) => [...new Set(values.filter(Boolean))];

// The details dialog renders inside the card's React tree, so its clicks and
// key presses would otherwise bubble up and toggle the card's selection.
const stop = (event) => event.stopPropagation();

/**
 * Teacher summary card: avatar, name, qualifications and teaching levels.
 * Always the same size; "+N" opens a popover with the full list and
 * "View details" opens the full profile in a dialog.
 *
 *   <TeacherCard teacher={teacher} />                        // read only
 *   <TeacherCard teacher={teacher} selected onSelect={fn} /> // selectable
 *   <TeacherCard teacher={teacher}>{footer}</TeacherCard>    // extra content
 *   <TeacherCard teacher={teacher} showDetails={false} />    // no dialog
 *   <TeacherCard teacher={teacher} badge={<span>…</span>} /> // e.g. "Current"
 */
export default function TeacherCard({
  teacher,
  selected = false,
  onSelect,
  showDetails = true,
  badge,
  children,
}) {
  const selectable = typeof onSelect === "function";
  const qualifications = teacher?.qualifications ?? [];
  const degrees = unique(
    qualifications.map((item) => item?.abbreviation || item?.name),
  );
  const fields = unique(qualifications.map((item) => item?.pivot?.field_of_study));
  const levels = unique((teacher?.levels ?? []).map((level) => level?.name));

  const handleKeyDown = (event) => {
    // only when the card itself has focus, not a button inside it
    if (event.target !== event.currentTarget) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onSelect(teacher);
    }
  };

  return (
    <div
      className={`teacher-card ${selectable ? "teacher-card--selectable" : ""} ${
        selected ? "teacher-card--selected" : ""
      }`}
      {...(selectable && {
        role: "button",
        tabIndex: 0,
        "aria-pressed": selected,
        onClick: () => onSelect(teacher),
        onKeyDown: handleKeyDown,
      })}
    >
      <div className="d-flex flex-row align-items-center gap-2">
        <TeacherAvatar teacher={teacher} />
        <div className="d-flex flex-column flex-grow-1" style={{ minWidth: 0 }}>
          <span className="fw-semibold text-truncate">{teacher?.name ?? "Unnamed teacher"}</span>
          {teacher?.username && (
            <span className="text-iron-500 font-size-xs text-truncate">
              @{teacher.username}
            </span>
          )}
        </div>
        {badge}
        {selectable && selected && (
          <CircleCheck size={18} className="text-primary-500 flex-shrink-0" />
        )}
      </div>

      <div className="teacher-card__divider" />

      <div className="d-flex flex-column gap-1">
        <span className="teacher-card__label">Qualifications</span>
        {degrees.length > 0 ? (
          <>
            <ChipRow items={degrees} variant="primary" label="Qualifications" />
            <span
              className="font-size-xs text-iron-600 text-truncate"
              title={fields.join(" · ")}
            >
              {fields.length > 0 ? fields.join(" · ") : "Field of study not recorded"}
            </span>
          </>
        ) : (
          <span className="font-size-xs text-iron-400">No qualifications recorded</span>
        )}
      </div>

      <div className="d-flex flex-column gap-1">
        <span className="teacher-card__label">Teaching levels</span>
        {levels.length > 0 ? (
          <ChipRow items={levels} variant="neutral" label="Teaching levels" />
        ) : (
          <span className="font-size-xs text-iron-400">No teaching levels set</span>
        )}
      </div>

      {(children || showDetails) && (
        <div className="teacher-card__footer">
          {children}
          {showDetails && (
            <div onClick={stop} onKeyDown={stop}>
              <ModalButton
                action={{ modalContent: TeacherQuickView }}
                rowData={teacher}
                classname="w-100"
              >
                <button type="button" className="teacher-card__details-btn">
                  View details
                </button>
              </ModalButton>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
