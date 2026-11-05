import { useState } from "react";
import { CREATE_JOINT_COURSE_TIMETABLE_STEP_FLOW } from "../../../utils/steps/jointCourseTimetable/createJointCourseTimetableStep";
function CreateJointCourseWizzard({ handleClose, drawerData }) {
  const [stepIndex, setStepIndex] = useState(0);
  const currentStep = CREATE_JOINT_COURSE_TIMETABLE_STEP_FLOW[stepIndex];

  const CurrentComponent = currentStep.component;
  const nextStep = () => {
    setStepIndex((prev) => prev + 1);
  };

  const previousStep = () => {
    setStepIndex((prev) => prev - 1);
  };

  const handleNavigate = (step) => {
    setStepIndex(step);
  };
  return (
    <>
      <CurrentComponent
        handleClose={handleClose}
        currentStep={stepIndex + 1}
        nextStep={nextStep}
        previousStep={previousStep}
        fullStep={CREATE_JOINT_COURSE_TIMETABLE_STEP_FLOW.length}
        drawerData={drawerData}
        handleNavigate={handleNavigate}
      />
    </>
  );
}
export default CreateJointCourseWizzard;
