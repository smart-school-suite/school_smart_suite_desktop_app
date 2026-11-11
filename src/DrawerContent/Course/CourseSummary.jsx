import { Dot } from "lucide-react";
import ChipRow from "../../components/Card/ChipRow";
import CourseStatusPill from "../../components/Card/CourseStatusPill";
import { CourseIcon } from "../../icons/Icons";

// Compact course header shared by the course assignment drawers.
export default function CourseSummary({ course }) {
  const types = (course?.types ?? []).map((type) => ({
    key: type?.id ?? type?.name,
    label: type?.name,
    style: { background: type?.background_color, color: type?.text_color },
  }));
  return (
    <div className="d-flex flex-column gap-2 font-size-sm">
      <div className="d-flex flex-row align-items-center gap-2">
        <div
          style={{ width: "2.5rem", height: "2.5rem", display: "grid", placeItems: "center" }}
          className="bg-primary-50 rounded-2 text-primary-500 flex-shrink-0"
        >
          <CourseIcon />
        </div>
        <div className="d-flex flex-column flex-grow-1" style={{ minWidth: 0 }}>
          <div className="d-flex flex-row align-items-center gap-2">
            <span className="fw-semibold text-truncate">{course?.course_title ?? "Course"}</span>
            <CourseStatusPill course={course} />
          </div>
          <div className="d-flex flex-row align-items-center text-iron-400 fw-light">
            <span>{course?.course_credit ?? "-"} Credit</span>
            <Dot size={16} />
            <span className="text-truncate">{course?.course_code ?? "-"}</span>
          </div>
        </div>
      </div>
      {course?.description && (
        <p className="font-size-xs text-iron-600 m-0 line-clamp-2" title={course.description}>
          {course.description}
        </p>
      )}
      {types.length > 0 && <ChipRow items={types} label="Course types" />}
    </div>
  );
}
