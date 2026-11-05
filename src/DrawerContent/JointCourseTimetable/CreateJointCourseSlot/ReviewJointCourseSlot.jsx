import { useState } from "react";
import {
  DayList,
  DayRow,
  Note,
  Panel,
  Section,
  Stats,
  TimeSpan,
  WizardFooter,
  WizardStep,
} from "../../../components/SemesterTimetable/ConstraintWizard/WizardPrimitives";
import { useSaveJointCourseSlots } from "../../../hooks/jointCourseTimetable/useSaveJointCourseSlots";
import { formatDuration, sortDays } from "../../../utils/semesterTimetable/timeUtils";
import { errorDescription, useJointCourseSlotDraft } from "./jointCourseSlotDraft";

function ReviewJointCourseSlot({ previousStep, handleClose }) {
  const { course, draft } = useJointCourseSlotDraft();
  const { mutate: save, isPending } = useSaveJointCourseSlots();
  const [conflicts, setConflicts] = useState([]);
  const [formError, setFormError] = useState(null);
  const order = sortDays(draft.picks.map((pick) => pick.day));
  const picks = [...draft.picks].sort((a, b) => order.indexOf(a.day) - order.indexOf(b.day));

  const handleSave = () => {
    setConflicts([]);
    setFormError(null);
    save(
      {
        semesterJointCourseId: course.id,
        slots: picks.map((pick) => ({
          day: pick.day,
          start_time: pick.start_time,
          end_time: pick.end_time,
          hall_id: draft.hall.id,
          teacher_id: pick.teacher?.id ?? null,
        })),
      },
      {
        onSuccess: () => handleClose(),
        onError: (error) => {
          const errors = error?.response?.data?.errors;
          if (errors?.conflicts?.length) setConflicts(errors.conflicts);
          else setFormError(errorDescription(error, "The times could not be saved."));
        },
      },
    );
  };

  return (
    <WizardStep
      title="Review and save"
      description={`These times are used for ${course.course.title} in the timetable of every specialty that takes it.`}
      footer={
        <WizardFooter
          onBack={previousStep}
          onNext={handleSave}
          nextLabel={isPending ? "Saving..." : "Save times"}
          nextIcon="lucide:check"
          nextDisabled={isPending || picks.length === 0}
        />
      }
    >
      <Section>
        <Stats
          items={[
            { label: "Sessions", value: picks.length, unit: "/ week" },
            { label: "Each", value: formatDuration(draft.duration) },
            { label: "Weekly", value: formatDuration(draft.duration * picks.length) },
          ]}
        />
      </Section>

      <Section label="Times" hint={`In ${draft.hall.name}`}>
        <DayList>
          {picks.map((pick) => (
            <DayRow key={pick.day} day={pick.day} badge={<span className="cw-section__hint">{pick.teacher?.name}</span>}>
              <TimeSpan start={pick.start_time} end={pick.end_time} />
            </DayRow>
          ))}
        </DayList>
      </Section>

      <Section label="Specialties">
        <Panel>
          <span className="font-size-sm">{course.specialties.map((specialty) => specialty.label).join(", ")}</span>
        </Panel>
      </Section>

      {course.slot_count > 0 && (
        <Section>
          <Note icon="lucide:replace">This replaces the {course.slot_count} time(s) the course has now.</Note>
        </Section>
      )}
      {course.affected_timetables.length > 0 && (
        <Section>
          <Note icon="lucide:refresh-cw">
            After saving, generate these timetables again so they use the new times:{" "}
            {course.affected_timetables.map((item) => item.label).join(", ")}.
          </Note>
        </Section>
      )}
      {conflicts.length > 0 && (
        <Section label="These times clash with other lessons">
          <Note icon="lucide:triangle-alert">
            <div className="d-flex flex-column gap-1">
              {conflicts.map((conflict, index) => (
                <span key={index}>{conflict.message}</span>
              ))}
              <span>Go back and pick other times.</span>
            </div>
          </Note>
        </Section>
      )}
      {formError && (
        <Section>
          <Note icon="lucide:triangle-alert">{formError}</Note>
        </Section>
      )}
    </WizardStep>
  );
}

export default ReviewJointCourseSlot;
