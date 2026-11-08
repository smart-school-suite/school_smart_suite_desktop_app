import { Icon } from "@iconify/react";
import { Note, Section, Stats, WizardFooter, WizardStep } from "../../components/SemesterTimetable/ConstraintWizard/WizardPrimitives";
import { formatExamDate } from "../../examTimetable/constraints/fields";
import { useConfirmExamJointCourseTime } from "../../hooks/examJointCourseTimetable";

function ReviewTimeStep({ previousStep, handleClose, drawerData }) {
  const { course, proposal, pick } = drawerData;
  const confirm = useConfirmExamJointCourseTime();
  const error = confirm.error?.response?.data?.errors;
  const conflicts = error?.conflicts ?? [];

  const save = () =>
    confirm.mutate(
      { examJointCourseId: course.id, proposalId: proposal.proposal_id, optionId: pick.option_id },
      { onSuccess: () => handleClose() },
    );

  if (!pick) {
    return <WizardStep footer={<WizardFooter onBack={previousStep} />}>Pick a time first.</WizardStep>;
  }

  return (
    <WizardStep
      title="Review and save"
      description="Every linked exam timetable then places this course at this time."
      footer={
        <WizardFooter
          onBack={previousStep}
          onNext={save}
          nextLabel={confirm.isPending ? "Saving…" : course.slot ? "Replace the time" : "Save the time"}
          nextDisabled={confirm.isPending}
          nextIcon="lucide:check"
        />
      }
    >
      <Section label={course.course?.title}>
        <Stats
          items={[
            { label: "Date", value: formatExamDate(pick.date, "EEE d MMM yyyy") },
            { label: "Time", value: pick.time },
            { label: "Candidates", value: pick.seats_needed },
          ]}
        />
      </Section>
      <Section label="Specialties">
        <ul className="cw-daylist">
          {(proposal.candidates?.by_exam ?? []).map((item) => (
            <li key={item.exam_id} className="cw-dayrow">
              <span className="cw-dayrow__day">{item.specialty}</span>
              <span className="cw-dayrow__value">{item.candidate_count} candidates</span>
            </li>
          ))}
        </ul>
      </Section>
      {course.slot && (
        <Section>
          <Note>
            This replaces {formatExamDate(course.slot.date)} {course.slot.start_time} – {course.slot.end_time}. Generate the linked exam timetables again afterwards.
          </Note>
        </Section>
      )}
      {error && (
        <Section>
          <div className="jcs-alert jcs-alert--warn" role="alert">
            <Icon icon="lucide:triangle-alert" width={18} height={18} className="jcs-alert__icon" />
            <div className="d-flex flex-column gap-1">
              <span className="fw-semibold">{error.title}</span>
              <span>{error.description}</span>
              {conflicts.map((conflict, index) => (
                <span key={index}>· {conflict.message}</span>
              ))}
            </div>
          </div>
        </Section>
      )}
    </WizardStep>
  );
}

export default ReviewTimeStep;
