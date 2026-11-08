import { useState } from "react";
import ConstraintWizard from "../components/SemesterTimetable/ConstraintWizard/ConstraintWizard";
import { useGenerateExamJointCourseTimes } from "../hooks/examJointCourseTimetable";
import "../styles/jointCourseSlots.css";
import ChooseDurationStep from "./steps/ChooseDurationStep";
import PickTimeStep from "./steps/PickTimeStep";
import ReviewTimeStep from "./steps/ReviewTimeStep";

const FLOW = [
  { step: "CHOOSE", label: "Length and hours", component: ChooseDurationStep },
  { step: "PICK", label: "Pick a time", component: PickTimeStep },
  { step: "REVIEW", label: "Review and save", component: ReviewTimeStep },
];

/**
 * Finds the times a joint exam can take place for every linked specialty
 * and saves the one the user picks, like the semester joint course drawer.
 */
function GenerateJointExamTimeDrawer({ handleClose, drawerData }) {
  const course = drawerData?.course;
  const [form, setForm] = useState({
    duration: course?.slot?.duration_minutes ?? 120,
    start_time: "08:00",
    end_time: "17:00",
  });
  const [proposal, setProposal] = useState(null);
  const [pick, setPick] = useState(null);
  const generate = useGenerateExamJointCourseTimes();

  const updateForm = (changes) => {
    setForm((current) => ({ ...current, ...changes }));
    setProposal(null);
    setPick(null);
  };

  const runGenerate = (onDone) =>
    generate.mutate(
      { examJointCourseId: course.id, payload: { duration: Number(form.duration), start_time: form.start_time, end_time: form.end_time } },
      {
        onSuccess: (response) => {
          const data = response?.data ?? null;
          setProposal(data);
          // Start on the recommended time.
          const recommended = data?.dates?.flatMap((date) => date.times).find((time) => time.option_id === data.recommended_option_id);
          setPick(recommended ?? null);
          onDone?.();
        },
      },
    );

  if (!course) return null;

  return (
    <ConstraintWizard
      flow={FLOW}
      title={course.course?.title}
      category={["Joint exam", course.course?.code].filter(Boolean).join(" · ")}
      meta={
        <ul className="jcs-meta font-size-xs">
          <li>{course.exam_type?.name}</li>
          <li title={(course.specialties ?? []).map((specialty) => specialty.label).join("\n")}>
            Sat together by {course.specialties?.length ?? 0} specialt{course.specialties?.length === 1 ? "y" : "ies"}
          </li>
        </ul>
      }
      handleClose={handleClose}
      drawerData={{ course, form, updateForm, proposal, pick, setPick, generate, runGenerate }}
    />
  );
}

export default GenerateJointExamTimeDrawer;
