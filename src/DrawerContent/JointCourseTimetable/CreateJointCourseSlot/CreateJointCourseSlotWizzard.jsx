import { useMemo, useState } from "react";
import ConstraintWizard from "../../../components/SemesterTimetable/ConstraintWizard/ConstraintWizard";
import { CREATE_JOINT_COURSE_STEP_FLOW } from "../../../utils/steps/jointCourse/jointCourseStepFlow";
import { initialDraft, JointCourseSlotDraftContext } from "./jointCourseSlotDraft";

// drawerData is a course from GET joint-course-timetable/term/{year}/{semester}.
function CreateJointCourseSlotWizzard({ handleClose, drawerData }) {
  const [draft, setDraft] = useState(() => initialDraft(drawerData));
  const value = useMemo(
    () => ({
      course: drawerData,
      draft,
      update: (patch) => setDraft((current) => ({ ...current, ...patch })),
    }),
    [drawerData, draft],
  );

  return (
    <JointCourseSlotDraftContext.Provider value={value}>
      <ConstraintWizard
        flow={CREATE_JOINT_COURSE_STEP_FLOW}
        title={`Schedule ${drawerData?.course?.title ?? "joint course"}`}
        category="Joint course"
        handleClose={handleClose}
        drawerData={drawerData}
      />
    </JointCourseSlotDraftContext.Provider>
  );
}

export default CreateJointCourseSlotWizzard;
