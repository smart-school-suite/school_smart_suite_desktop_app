import { useMemo } from "react";
import RectangleSkeleton from "../../../components/SkeletonPageLoader/RectangularSkeleton";
import {
  Badge,
  EmptyState,
  Note,
  Section,
  WizardFooter,
  WizardStep,
} from "../../../components/SemesterTimetable/ConstraintWizard/WizardPrimitives";
import { useGetJointCourseHallAvailability } from "../../../hooks/jointCourseTimetable/useGetJointCourseHallAvailability";
import { errorDescription, useJointCourseSlotDraft } from "./jointCourseSlotDraft";

function SelectJointCourseHall({ nextStep, previousStep }) {
  const { course, draft, update } = useJointCourseSlotDraft();
  const payload = useMemo(
    () => ({ duration_minutes: draft.duration, days: draft.days, teacher_id: draft.teacherId }),
    [draft.duration, draft.days, draft.teacherId],
  );
  const { data, isLoading, error } = useGetJointCourseHallAvailability(course.id, payload);
  const result = data?.data;
  const selected = result?.halls.find((hall) => hall.id === draft.hall?.id);
  const enoughDays = selected && selected.free_day_count >= draft.sessions;

  return (
    <WizardStep
      title="Which hall should it use?"
      description="Halls are ranked by how many free times they share with the teacher and every specialty that takes the course."
      footer={
        <WizardFooter
          onBack={previousStep}
          onNext={nextStep}
          nextDisabled={!enoughDays}
          hint={selected ? `${selected.name} is free on only ${selected.free_day_count} day(s)` : "Choose a hall"}
        />
      }
    >
      {isLoading ? (
        <div className="d-flex flex-column gap-2">
          {[...Array(4)].map((_, index) => (
            <RectangleSkeleton key={index} width="100%" height="4.5rem" />
          ))}
        </div>
      ) : error ? (
        <Note icon="lucide:triangle-alert">{errorDescription(error, "Could not load the halls.")}</Note>
      ) : result.halls.length === 0 ? (
        <EmptyState icon="lucide:door-closed" title="No halls available" text={result.summary.message} />
      ) : (
        <Section label="Halls" hint={result.summary.message}>
          <div className="d-flex flex-column gap-2">
            {result.halls.map((hall) => {
              const usable = hall.free_count > 0;
              const isSelected = draft.hall?.id === hall.id;
              return (
                <button
                  key={hall.id}
                  type="button"
                  className={`cw-option ${isSelected ? "is-selected" : ""}`}
                  aria-pressed={isSelected}
                  disabled={!usable}
                  style={usable ? undefined : { opacity: 0.55, cursor: "not-allowed" }}
                  onClick={() => update({ hall: { id: hall.id, name: hall.name, capacity: hall.capacity }, picks: [] })}
                >
                  <span className="cw-option__title d-flex align-items-center gap-2">
                    {hall.name}
                    {hall.capacity ? <Badge tone="muted">{hall.capacity} seats</Badge> : null}
                  </span>
                  <span className="cw-option__meta">
                    {hall.message}
                    {hall.location ? ` · ${hall.location}` : ""}
                  </span>
                  {usable && (
                    <span className="d-flex flex-wrap gap-1 mt-1">
                      {hall.days.map((day) => (
                        <Badge key={day.day} tone={day.free_count > 0 ? "accent" : "muted"}>
                          {day.day_label.slice(0, 3)} {day.free_count}
                        </Badge>
                      ))}
                    </span>
                  )}
                  <span className="cw-option__radio" aria-hidden="true" />
                </button>
              );
            })}
          </div>
        </Section>
      )}
    </WizardStep>
  );
}

export default SelectJointCourseHall;
