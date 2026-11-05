import { useSelector } from "react-redux";

/**
 * The unsaved slot draft of a joint course plus its assigned lecturer.
 * The save endpoint defaults to the course's first teacher, so the same
 * teacher is used for availability checks and recommendations.
 */
export const useJointCourseDraft = (course) => {
  const draft = useSelector(
    (state) => state.jointCourseTimetable.drafts?.[course?.id] ?? null,
  );
  const teachers = course?.teachers ?? [];
  return {
    courseId: course?.id,
    draft,
    days: draft?.days ?? [],
    counts: draft?.counts ?? {},
    slots: draft?.slots ?? [],
    teacher: teachers[0] ?? null,
    teachers,
  };
};
