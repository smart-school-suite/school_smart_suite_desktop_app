import { CircleCheck } from "lucide-react";
import { Fragment } from "react";

const initialsOf = (teacher) => {
  const first = teacher?.first_name?.trim()?.charAt(0) ?? "";
  const last = teacher?.last_name?.trim()?.charAt(0) ?? "";
  if (first || last) return `${first}${last}`.toUpperCase();
  return (teacher?.name ?? teacher?.username ?? "?")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0))
    .join("")
    .toUpperCase();
};

const unique = (values) => [...new Set(values.filter(Boolean))];

/**
 * Teacher summary card: avatar, name, qualifications and teaching levels.
 *
 *   <TeacherCard teacher={teacher} />                        // read only
 *   <TeacherCard teacher={teacher} selected onSelect={fn} /> // selectable
 *   <TeacherCard teacher={teacher}>{footer}</TeacherCard>    // extra content
 */
export default function TeacherCard({ teacher, selected = false, onSelect, children }) {
  const selectable = typeof onSelect === "function";
  const qualifications = teacher?.qualifications ?? [];
  const degrees = unique(
    qualifications.map((item) => item?.abbreviation || item?.name),
  );
  const fields = unique(qualifications.map((item) => item?.pivot?.field_of_study));
  const levels = teacher?.levels ?? [];

  const handleKeyDown = (event) => {
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
        <div className="teacher-card__avatar" aria-hidden="true">
          {initialsOf(teacher)}
        </div>
        <div className="d-flex flex-column flex-grow-1" style={{ minWidth: 0 }}>
          <span className="fw-semibold text-truncate">{teacher?.name ?? "Unnamed teacher"}</span>
          {teacher?.username && (
            <span className="text-iron-500 font-size-xs text-truncate">
              @{teacher.username}
            </span>
          )}
        </div>
        {selectable && selected && (
          <CircleCheck size={18} className="text-primary-500 flex-shrink-0" />
        )}
      </div>

      <div className="teacher-card__divider" />

      <div className="d-flex flex-column gap-1">
        <span className="teacher-card__label">Qualifications</span>
        {degrees.length > 0 ? (
          <>
            <div className="d-flex flex-row flex-wrap gap-1">
              {degrees.map((degree) => (
                <span key={degree} className="teacher-card__chip teacher-card__chip--primary">
                  {degree}
                </span>
              ))}
            </div>
            {fields.length > 0 && (
              <span className="font-size-xs text-iron-600">
                {fields.map((field, index) => (
                  <Fragment key={field}>
                    {index > 0 && " · "}
                    {field}
                  </Fragment>
                ))}
              </span>
            )}
          </>
        ) : (
          <span className="font-size-xs text-iron-400">No qualifications recorded</span>
        )}
      </div>

      <div className="d-flex flex-column gap-1">
        <span className="teacher-card__label">Teaching levels</span>
        {levels.length > 0 ? (
          <div className="d-flex flex-row flex-wrap gap-1">
            {levels.map((level) => (
              <span
                key={level?.id ?? level?.name}
                className="teacher-card__chip teacher-card__chip--neutral"
              >
                {level?.name}
              </span>
            ))}
          </div>
        ) : (
          <span className="font-size-xs text-iron-400">No teaching levels set</span>
        )}
      </div>

      {children}
    </div>
  );
}
