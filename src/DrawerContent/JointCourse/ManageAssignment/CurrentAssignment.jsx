import { Icon } from "@iconify/react";
import {
  isHighWorkload,
  qualificationLabel,
  workloadLabel,
} from "../../../utils/jointCourse/teacherAssignment";
import TeacherAvatar from "./TeacherAvatar";

/** The teacher(s) currently assigned, or an empty state that invites an assignment. */
function CurrentAssignment({ teachers, onChange, onAssign, justUpdatedId }) {
  if (teachers.length === 0) {
    return (
      <div className="jca-empty">
        <span className="jca-empty__icon">
          <Icon icon="lucide:user-round-plus" width={22} height={22} />
        </span>
        <span className="fw-semibold">No teacher assigned yet</span>
        <p className="jca-muted mb-0">
          Assign the teacher responsible for this joint course. Its weekly times can only be
          set once it has one.
        </p>
        <button type="button" className="jca-btn jca-btn--primary" onClick={onAssign}>
          <Icon icon="lucide:user-round-plus" width={16} height={16} />
          <span>Assign Teacher</span>
        </button>
      </div>
    );
  }

  return (
    <div className="d-flex flex-column gap-2">
      {teachers.length > 1 && (
        <p className="jca-muted mb-0">
          This course has {teachers.length} teachers. Choose which one to replace.
        </p>
      )}
      {teachers.map((teacher) => (
        <article
          key={teacher.id}
          className={`jca-current ${justUpdatedId === teacher.id ? "is-new" : ""}`}
        >
          <TeacherAvatar teacher={teacher} size="lg" />
          <div className="d-flex flex-column gap-1 flex-grow-1 min-w-0">
            <div className="d-flex flex-row align-items-center gap-2">
              <span className="jca-current__name text-truncate">{teacher.name}</span>
              {justUpdatedId === teacher.id && (
                <span className="jca-tag jca-tag--success">
                  <Icon icon="lucide:check" width={12} height={12} />
                  Just assigned
                </span>
              )}
            </div>
            <dl className="jca-current__facts">
              <div>
                <dt>Username</dt>
                <dd>@{teacher.username}</dd>
              </div>
              <div>
                <dt>Qualification</dt>
                <dd>{qualificationLabel(teacher.qualification)}</dd>
              </div>
              <div>
                <dt>Department</dt>
                <dd>{teacher.department?.name ?? "—"}</dd>
              </div>
              <div>
                <dt>Workload</dt>
                <dd className={isHighWorkload(teacher.course_count) ? "jca-warn-text" : ""}>
                  {workloadLabel(teacher.course_count)}
                  {isHighWorkload(teacher.course_count) ? " · heavy" : ""}
                </dd>
              </div>
            </dl>
          </div>
          <button
            type="button"
            className="jca-btn jca-btn--outline flex-shrink-0"
            onClick={() => onChange(teacher.id)}
          >
            <Icon icon="lucide:repeat-2" width={16} height={16} />
            <span>Change Teacher</span>
          </button>
        </article>
      ))}
    </div>
  );
}

export default CurrentAssignment;
