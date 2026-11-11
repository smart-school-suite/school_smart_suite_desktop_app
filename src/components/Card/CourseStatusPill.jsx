import { isCourseAssigned } from "../../utils/course/courseFilters";

// "assigned" / "unassigned" pill for a course's teacher assignment.
export default function CourseStatusPill({ course }) {
  const assigned = isCourseAssigned(course);
  return (
    <span
      className={`teacher-card__chip teacher-card__chip--full flex-shrink-0 ${
        assigned ? "teacher-card__chip--success" : "teacher-card__chip--warning"
      }`}
    >
      {assigned ? "Assigned" : "Unassigned"}
    </span>
  );
}
