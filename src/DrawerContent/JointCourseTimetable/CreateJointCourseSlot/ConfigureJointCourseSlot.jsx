import { useMemo } from "react";
import RectangleSkeleton from "../../../components/SkeletonPageLoader/RectangularSkeleton";
import {
  Badge,
  Note,
  Section,
  TextButton,
  WizardFooter,
  WizardStep,
} from "../../../components/SemesterTimetable/ConstraintWizard/WizardPrimitives";
import { useGetJointCourseRecommendedWeek } from "../../../hooks/jointCourseTimetable/useGetJointCourseRecommendedWeek";
import { errorDescription, useJointCourseSlotDraft } from "./jointCourseSlotDraft";

// Spreads sessions over the free days: every other free day first, then the rest.
const pickForMe = (days, sessions, teacherId) => {
  const free = days.filter((day) => day.recommended.length > 0);
  const order = [...free.filter((_, index) => index % 2 === 0), ...free.filter((_, index) => index % 2 === 1)];
  return order.slice(0, sessions).map((day) => toPick(day, day.recommended[0], teacherId));
};

const toPick = (day, slot, teacherId) => ({
  day: day.day,
  day_label: day.day_label,
  start_time: slot.start_time,
  end_time: slot.end_time,
  time: slot.time,
  teacher: slot.teachers.find((teacher) => teacher.id === teacherId) ?? slot.teachers[0],
});

function ConfigureJointCourseSlot({ nextStep, previousStep }) {
  const { course, draft, update } = useJointCourseSlotDraft();
  const payload = useMemo(
    () => ({ hall_id: draft.hall?.id, duration_minutes: draft.duration, days: draft.days, teacher_id: draft.teacherId }),
    [draft.hall, draft.duration, draft.days, draft.teacherId],
  );
  const { data, isLoading, error } = useGetJointCourseRecommendedWeek(course.id, payload);
  const result = data?.data;
  const chosen = draft.picks.length;

  const choose = (day, slot) => {
    const current = draft.picks.find((pick) => pick.day === day.day);
    const same = current && current.start_time === slot.start_time;
    const others = draft.picks.filter((pick) => pick.day !== day.day);
    if (same) return update({ picks: others });
    if (!current && chosen >= draft.sessions) return;
    update({ picks: [...others, toPick(day, slot, draft.teacherId)] });
  };

  return (
    <WizardStep
      title="Pick the times"
      description={`Choose ${draft.sessions} time(s), one per day. Every time shown has ${draft.hall?.name}, a teacher and all linked specialties free.`}
      footer={
        <WizardFooter
          onBack={previousStep}
          onNext={nextStep}
          nextLabel="Review"
          nextDisabled={chosen !== draft.sessions}
          hint={`${chosen} of ${draft.sessions} chosen`}
        />
      }
    >
      {isLoading ? (
        <div className="d-flex flex-column gap-2">
          {[...Array(3)].map((_, index) => (
            <RectangleSkeleton key={index} width="100%" height="5rem" />
          ))}
        </div>
      ) : error ? (
        <Note icon="lucide:triangle-alert">{errorDescription(error, "Could not load free times.")}</Note>
      ) : (
        <>
          <Section
            label={`${chosen} of ${draft.sessions} chosen`}
            hint={result.summary.message}
            action={
              result.summary.free_day_count >= draft.sessions && (
                <TextButton icon="lucide:sparkles" onClick={() => update({ picks: pickForMe(result.days, draft.sessions, draft.teacherId) })}>
                  Pick for me
                </TextButton>
              )
            }
          />
          {result.days.map((day) => {
            const pick = draft.picks.find((item) => item.day === day.day);
            return (
              <Section key={day.day} label={day.day_label} hint={day.message} action={pick && <Badge tone="accent">{pick.time}</Badge>}>
                {day.recommended.length > 0 && (
                  <div className="cw-options cw-options--compact">
                    {day.recommended.map((slot) => {
                      const isSelected = pick?.start_time === slot.start_time;
                      const blocked = !pick && chosen >= draft.sessions;
                      return (
                        <button
                          key={slot.start_time}
                          type="button"
                          className={`cw-option ${isSelected ? "is-selected" : ""}`}
                          aria-pressed={isSelected}
                          disabled={blocked}
                          style={blocked ? { opacity: 0.5 } : undefined}
                          onClick={() => choose(day, slot)}
                          title={slot.teachers.map((teacher) => teacher.name).join(", ")}
                        >
                          <span className="cw-option__title">{slot.start_time}</span>
                          <span className="cw-option__meta">to {slot.end_time}</span>
                          <span className="cw-option__radio" aria-hidden="true" />
                        </button>
                      );
                    })}
                  </div>
                )}
              </Section>
            );
          })}
        </>
      )}
    </WizardStep>
  );
}

export default ConfigureJointCourseSlot;
