import { Dot } from "lucide-react";
import { isCourseAssigned } from "../../utils/course/courseFilters";
import ChipRow from "./ChipRow";
import CourseStatusPill from "./CourseStatusPill";
import TeacherAvatar from "./TeacherAvatar";

const typeChips = (course) =>
  (course?.types ?? []).map((type) => ({
    key: type?.id ?? type?.name,
    label: type?.name,
    style: { background: type?.background_color, color: type?.text_color },
  }));

// Who teaches the course, or a placeholder of the same height when nobody does.
export function CourseTeacher({ course }) {
  const teachers = course?.teachers ?? [];
  const [first, ...others] = teachers;
  if (!isCourseAssigned(course) || !first) {
    return (
      <div className="d-flex flex-row align-items-center gap-2">
        <div className="course-card__avatar-empty" aria-hidden="true" />
        <span className="font-size-xs text-iron-400">No teacher assigned</span>
      </div>
    );
  }
  return (
    <div className="d-flex flex-row align-items-center gap-2">
      <TeacherAvatar teacher={first} size="2rem" />
      <div className="d-flex flex-column" style={{ minWidth: 0 }}>
        <span className="fw-medium text-truncate">
          {first.name}
          {others.length > 0 && (
            <span className="text-iron-500 fw-normal"> +{others.length} more</span>
          )}
        </span>
        {first.username && (
          <span className="font-size-xs text-iron-500 text-truncate">@{first.username}</span>
        )}
      </div>
    </div>
  );
}

/**
 * Fixed-size course summary: title, status, credit and code, description,
 * types and the assigned teacher. Put actions in `children`; they sit at the
 * bottom so footers line up across a grid.
 */
export default function CourseCard({ course, children }) {
  return (
    <div className="teacher-card course-card">
      <div className="d-flex flex-column gap-1">
        <div className="d-flex flex-row align-items-start justify-content-between gap-2">
          <span className="fw-semibold line-clamp-2" title={course?.course_title}>
            {course?.course_title ?? "Untitled course"}
          </span>
          <CourseStatusPill course={course} />
        </div>
        <div className="d-flex flex-row align-items-center font-size-xs text-iron-500">
          <span>{course?.course_credit ?? "-"} Credit</span>
          <Dot size={14} />
          <span className="text-truncate">{course?.course_code ?? "-"}</span>
        </div>
      </div>

      <p
        className="font-size-xs text-iron-600 m-0 line-clamp-2 course-card__description"
        title={course?.description || undefined}
      >
        {course?.description || <span className="text-iron-400">No description</span>}
      </p>

      {typeChips(course).length > 0 ? (
        <ChipRow items={typeChips(course)} label="Course types" />
      ) : (
        <div className="teacher-card__chips align-items-center">
          <span className="font-size-xs text-iron-400">No course type</span>
        </div>
      )}

      <div className="teacher-card__divider" />
      <CourseTeacher course={course} />

      {children && <div className="teacher-card__footer">{children}</div>}
    </div>
  );
}
