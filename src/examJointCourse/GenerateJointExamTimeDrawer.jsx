import { eachDayOfInterval, format, parseISO } from "date-fns";
import { useMemo, useState } from "react";
import ConstraintWizard from "../components/SemesterTimetable/ConstraintWizard/ConstraintWizard";
import { useGenerateExamJointCourseTimes } from "../hooks/examJointCourseTimetable";
import "../styles/jointCourseSlots.css";
import ChooseDurationStep from "./steps/ChooseDurationStep";
import PickTimeStep from "./steps/PickTimeStep";
import ReviewTimeStep from "./steps/ReviewTimeStep";

const FLOW = [
  { step: "CHOOSE", label: "Dates, length and hours", component: ChooseDurationStep },
  { step: "PICK", label: "Pick a time", component: PickTimeStep },
  { step: "REVIEW", label: "Review and save", component: ReviewTimeStep },
];

/** The dates inside the exam period of every linked specialty. */
export const sharedExamDates = (specialties = []) => {
  const periods = specialties.map((item) => item.exam_period ?? {});
  if (!periods.length || periods.some((period) => !period.start_date || !period.end_date)) return [];
  const start = periods.map((period) => period.start_date).sort().at(-1);
  const end = periods.map((period) => period.end_date).sort()[0];
  if (start > end) return [];
  return eachDayOfInterval({ start: parseISO(start), end: parseISO(end) }).map((day) => format(day, "yyyy-MM-dd"));
};

/**
 * Finds the times a joint exam can take place for every linked specialty
 * and saves the one the user picks, like the semester joint course drawer.
 */
function GenerateJointExamTimeDrawer({ handleClose, drawerData }) {
  const course = drawerData?.course;
  const dates = useMemo(() => sharedExamDates(course?.specialties), [course?.specialties]);
  // Times are only found from today on (as the API does), so past dates can't be chosen.
  const upcoming = useMemo(() => {
    const today = format(new Date(), "yyyy-MM-dd");
    return dates.filter((date) => date >= today);
  }, [dates]);
  const [form, setForm] = useState(() => ({
    dates: upcoming,
    duration: course?.slot?.duration_minutes ?? 120,
    start_time: "08:00",
    end_time: "17:00",
  }));
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
      {
        examJointCourseId: course.id,
        payload: {
          duration: Number(form.duration),
          start_time: form.start_time,
          end_time: form.end_time,
          // Every shared date is the default, so only narrow when some are left out.
          ...(form.dates.length && form.dates.length < upcoming.length ? { dates: [...form.dates].sort() } : {}),
        },
      },
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
      meta={<CourseMeta course={course} />}
      handleClose={handleClose}
      drawerData={{ course, dates, upcoming, form, updateForm, proposal, pick, setPick, generate, runGenerate }}
    />
  );
}

function CourseMeta({ course }) {
  const specialties = course.specialties ?? [];
  const missing = course.specialties_without_exam ?? [];
  return (
    <ul className="jcs-meta font-size-xs">
      {course.exam_type?.name && <li>{course.exam_type.name}</li>}
      {course.course?.credit ? <li>{course.course.credit} credits</li> : null}
      <li title={specialties.map((specialty) => specialty.label).join("\n")}>
        Sat together by {specialties.length} specialt{specialties.length === 1 ? "y" : "ies"}
      </li>
      {missing.length > 0 && (
        <li className="jcs-meta__warn" title={missing.map((item) => item.label).join("\n")}>
          {missing.length} without an exam yet
        </li>
      )}
    </ul>
  );
}

export default GenerateJointExamTimeDrawer;
