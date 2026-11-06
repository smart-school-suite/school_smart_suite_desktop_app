import { useState } from "react";
import ConstraintWizard from "../../../components/SemesterTimetable/ConstraintWizard/ConstraintWizard";
import { useGenerateJointCourseSlots } from "../../../hooks/jointCourseTimetable/useGenerateJointCourseSlots";
import { GENERATE_SLOTS_STEP_FLOW } from "../../../utils/steps/jointCourseTimetable/generateSlotsStepFlow";
import "../../../styles/jointCourseSlots.css";

const EMPTY_FORM = { days: [], durationId: null, overrides: {} };

/**
 * Generate and save a joint course's weekly slots: choose days and a period
 * duration, pick from the free slots the server finds, then save the picks.
 * The form, the proposal and the picks live here so they survive moving
 * between steps.
 */
function GenerateSlotsDrawer({ handleClose, drawerData }) {
  const course = drawerData?.course;
  const [form, setForm] = useState(EMPTY_FORM);
  const [proposal, setProposal] = useState(null);
  const [picks, setPicks] = useState([]);
  const generate = useGenerateJointCourseSlots();

  // Any change to the request makes the current proposal stale.
  const updateForm = (changes) => {
    setForm((current) => ({ ...current, ...changes }));
    setProposal(null);
    setPicks([]);
  };

  const runGenerate = (onDone) =>
    generate.mutate(
      {
        semesterJointCourseId: course.id,
        payload: {
          period_duration_id: form.durationId,
          days: form.days.map((day) => ({
            day,
            ...(form.overrides[day] ? { period_duration_id: form.overrides[day] } : {}),
          })),
        },
      },
      {
        onSuccess: (response) => {
          setProposal(response?.data ?? null);
          setPicks([]);
          onDone?.();
        },
      },
    );

  if (!course) return null;

  return (
    <ConstraintWizard
      flow={GENERATE_SLOTS_STEP_FLOW}
      title={course.course?.title}
      category={["Joint course", course.course?.code].filter(Boolean).join(" · ")}
      meta={<CourseMeta course={course} />}
      handleClose={handleClose}
      drawerData={{
        course,
        form,
        updateForm,
        proposal,
        picks,
        setPicks,
        generate,
        runGenerate,
      }}
    />
  );
}

function CourseMeta({ course }) {
  const teachers = course.teachers ?? [];
  const specialties = course.specialties ?? [];
  return (
    <ul className="jcs-meta font-size-xs">
      <li className={teachers.length ? "" : "jcs-meta__warn"}>
        {teachers.length ? `Lecturer: ${teachers[0].name}` : "No lecturer assigned"}
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

export default GenerateSlotsDrawer;
