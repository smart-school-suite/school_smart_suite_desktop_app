import {
  DayPicker,
  Note,
  OptionTile,
  Panel,
  Section,
  Segmented,
  WizardFooter,
  WizardStep,
} from "../../../components/SemesterTimetable/ConstraintWizard/WizardPrimitives";
import { formatDuration } from "../../../utils/semesterTimetable/timeUtils";
import { SESSION_LENGTHS, useJointCourseSlotDraft } from "./jointCourseSlotDraft";

function SchedulingRequirement({ nextStep }) {
  const { course, draft, update } = useJointCourseSlotDraft();
  const reset = { hall: null, picks: [] };
  const noTeacher = course.teachers.length === 0;
  const tooFewDays = draft.days.length < draft.sessions;

  const toggleDay = (day, selected) =>
    update({
      ...reset,
      days: selected ? draft.days.filter((item) => item !== day) : [...draft.days, day],
    });

  return (
    <WizardStep
      title="How should this course be scheduled?"
      description="The course already knows who teaches it and which specialties take it. Tell us how often it meets and for how long; the next steps find a free hall and free times."
      footer={
        <WizardFooter
          onNext={nextStep}
          nextDisabled={noTeacher || tooFewDays}
          hint={noTeacher ? "Assign a teacher to this course first" : "Pick at least one day per session"}
        />
      }
    >
      <Section label="Course">
        <Panel>
          <div className="d-flex flex-column gap-1 font-size-sm">
            <span className="fw-semibold">
              {course.course.title} {course.course.code ? `· ${course.course.code}` : ""}
            </span>
            <span className="text-iron-600">
              Taken by {course.specialties.map((specialty) => specialty.label).join(", ") || "no specialty yet"}
            </span>
          </div>
        </Panel>
      </Section>

      <Section label="Teacher" hint={course.teachers.length > 1 ? "Choose one, or let us use whoever is free" : undefined}>
        {noTeacher ? (
          <Note icon="lucide:triangle-alert">No teacher is assigned to this course yet. Assign one on the courses page first.</Note>
        ) : course.teachers.length === 1 ? (
          <Note icon="lucide:user-round">Taught by <strong>{course.teachers[0].name}</strong>.</Note>
        ) : (
          <div className="cw-options">
            <OptionTile
              selected={draft.teacherId === null}
              onClick={() => update({ ...reset, teacherId: null })}
              title="Any teacher"
              meta="Whoever of them is free"
            />
            {course.teachers.map((teacher) => (
              <OptionTile
                key={teacher.id}
                selected={draft.teacherId === teacher.id}
                onClick={() => update({ ...reset, teacherId: teacher.id })}
                title={teacher.name}
              />
            ))}
          </div>
        )}
      </Section>

      <Section label="Sessions per week" hint="Each session is placed on a different day">
        <Segmented
          label="Sessions per week"
          value={draft.sessions}
          options={[1, 2, 3, 4, 5].map((value) => ({ value, label: String(value) }))}
          onChange={(sessions) => update({ ...reset, sessions })}
        />
      </Section>

      <Section label="Length of each session">
        <div className="cw-options cw-options--compact">
          {SESSION_LENGTHS.map((minutes) => (
            <OptionTile
              key={minutes}
              selected={draft.duration === minutes}
              onClick={() => update({ ...reset, duration: minutes })}
              title={formatDuration(minutes)}
            />
          ))}
        </div>
      </Section>

      <Section label="Days it can be taught" hint={tooFewDays ? `Pick at least ${draft.sessions} day(s)` : `${draft.days.length} day(s) selected`}>
        <DayPicker selected={draft.days} onToggle={toggleDay} />
      </Section>

      {course.slot_count > 0 && (
        <Section>
          <Note icon="lucide:info">
            This course already has {course.slot_count} time(s). Saving at the end replaces them.
          </Note>
        </Section>
      )}
    </WizardStep>
  );
}

export default SchedulingRequirement;
