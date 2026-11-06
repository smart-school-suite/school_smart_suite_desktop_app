import { Icon } from "@iconify/react";
import {
  NO_QUALIFICATION,
  isHighWorkload,
  qualificationsTitle,
  workloadLabel,
} from "../../../utils/jointCourse/teacherAssignment";
import TeacherAvatar from "./TeacherAvatar";

/**
 * One selectable teacher. Current and ineligible teachers are shown but can't
 * be picked; the reason is spelled out on the row.
 */
function TeacherOption({ teacher, selected, onSelect }) {
  const disabled = !teacher.eligible || teacher.is_current;
  const heavy = isHighWorkload(teacher.course_count);
  const qualifications = teacher.qualifications ?? [];
  const status = teacher.is_current
    ? { tone: "accent", label: "Current teacher" }
    : !teacher.eligible
      ? { tone: "muted", label: teacher.status === "active" ? "Not eligible" : "Deactivated" }
      : { tone: "success", label: "Available" };

  return (
    <li>
      <button
        type="button"
        role="radio"
        aria-checked={selected}
        disabled={disabled}
        className={`jca-option ${selected ? "is-selected" : ""} ${teacher.is_current ? "is-current" : ""}`}
        onClick={() => onSelect(teacher.id)}
      >
        <span className="jca-option__radio" aria-hidden="true" />
        <TeacherAvatar teacher={teacher} />
        <span className="jca-option__who">
          <span className="jca-option__name">{teacher.name}</span>
          <span className="jca-muted text-truncate">
            @{teacher.username}
            {teacher.department?.name ? ` · ${teacher.department.name}` : ""}
          </span>
        </span>
        <span className="jca-option__qual" title={qualificationsTitle(qualifications)}>
          <span className="jca-option__abbr text-truncate">
            {qualifications.length
              ? qualifications.map((qualification) => qualification.abbreviation).join(" · ")
              : "—"}
          </span>
          <span className="jca-muted text-truncate">
            {qualifications.length
              ? qualifications.map((qualification) => qualification.field_of_study || qualification.name).join(", ")
              : NO_QUALIFICATION}
          </span>
        </span>
        <span className={`jca-option__load ${heavy ? "jca-warn-text" : ""}`}>
          {heavy && <Icon icon="lucide:triangle-alert" width={13} height={13} />}
          {workloadLabel(teacher.course_count)}
        </span>
        <span className={`jca-tag jca-tag--${status.tone}`}>{status.label}</span>
      </button>
      {!teacher.eligible && teacher.ineligible_reason && (
        <span className="jca-option__reason">{teacher.ineligible_reason}</span>
      )}
      {teacher.eligible && heavy && selected && (
        <span className="jca-option__reason jca-warn-text">
          {teacher.name} already teaches {workloadLabel(teacher.course_count)}. You can still
          assign them.
        </span>
      )}
    </li>
  );
}

export default TeacherOption;
