import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ConstraintWizard from "../../../components/SemesterTimetable/ConstraintWizard/ConstraintWizard";
import { openSlotDraft } from "../../../Slices/jointCourse/jointCourseTimetableSlice";
import { JOINT_COURSE_SLOT_STEP_FLOW } from "../../../utils/steps/jointCourseTimetable/createJointCourseTimetableStep";
import "../../../styles/jointCourseSlots.css";

/** Right-side drawer that configures the weekly slots of one joint course. */
function JointCourseTimetableDrawer({ handleClose, drawerData }) {
  const dispatch = useDispatch();
  const course = drawerData?.course;
  const hasDraft = useSelector((state) =>
    Boolean(state.jointCourseTimetable.drafts?.[course?.id]),
  );

  useEffect(() => {
    if (course) dispatch(openSlotDraft({ course }));
    // Only when another course is opened; a refetch must not reset the draft.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [course?.id, dispatch]);

  if (!course || !hasDraft) return null;

  return (
    <ConstraintWizard
      flow={JOINT_COURSE_SLOT_STEP_FLOW}
      title={course.course?.title}
      category={["Joint course", course.course?.code].filter(Boolean).join(" · ")}
      meta={<CourseMeta course={course} />}
      handleClose={handleClose}
      drawerData={drawerData}
    />
  );
}

function CourseMeta({ course }) {
  const teachers = course.teachers ?? [];
  const specialties = course.specialties ?? [];
  return (
    <ul className="jcs-meta font-size-xs">
      <li className={teachers.length ? "" : "jcs-meta__warn"}>
        {teachers.length
          ? `Lecturer: ${teachers[0].name}${teachers.length > 1 ? ` +${teachers.length - 1}` : ""}`
          : "No lecturer assigned"}
      </li>
      {course.course?.credit ? <li>{course.course.credit} credits</li> : null}
      {specialties.length > 0 && (
        <li title={specialties.map((specialty) => specialty.label).join("\n")}>
          Shared by {specialties.length} specialt{specialties.length === 1 ? "y" : "ies"}
        </li>
      )}
    </ul>
  );
}

export default JointCourseTimetableDrawer;
