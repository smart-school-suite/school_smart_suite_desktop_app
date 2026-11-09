import { Icon } from "@iconify/react";
import { useState } from "react";
import {
  EmptyState,
  Section,
  Stats,
  TimeSpan,
  WizardFooter,
  WizardStep,
} from "../../components/SemesterTimetable/ConstraintWizard/WizardPrimitives";
import { formatExamDate } from "../../examTimetable/constraints/fields";
import { useConfirmExamJointCourseTime } from "../../hooks/examJointCourseTimetable";
import { describeError } from "../../utils/jointCourseTimetable/recommendSlot";
import { formatDuration } from "../../utils/semesterTimetable/timeUtils";

const PICK_STEP_INDEX = 1;

function ReviewTimeStep({ previousStep, handleNavigate, handleClose, drawerData }) {
  const { course, proposal, pick, generate, runGenerate } = drawerData;
  const confirm = useConfirmExamJointCourseTime();
  const [saveError, setSaveError] = useState(null);

  if (!pick) {
    return (
      <WizardStep footer={<WizardFooter onBack={previousStep} />}>
        <EmptyState title="Nothing to save" text="Go back and pick the time of the joint exam." />
      </WizardStep>
    );
  }

  const save = () => {
    setSaveError(null);
    confirm.mutate(
      { examJointCourseId: course.id, proposalId: proposal.proposal_id, optionId: pick.option_id },
      {
        onSuccess: () => handleClose(),
        onError: (error) =>
          setSaveError({
            expired: error?.response?.status === 404,
            title: error?.response?.data?.errors?.title ?? "Couldn't save the time",
            description: describeError(error, "Something went wrong. Try again."),
            conflicts: error?.response?.data?.errors?.conflicts ?? [],
          }),
      },
    );
  };

  const byExam = proposal.candidates?.by_exam ?? [];

  return (
    <WizardStep
      title="Review and save"
      description="When you save, the time is checked again against the students' other exams, hall bookings and invigilators. Every linked exam timetable then places this course at this time."
      footer={
        <WizardFooter
          onBack={previousStep}
          onNext={save}
          nextLabel={confirm.isPending ? "Saving…" : course.slot ? "Replace the time" : "Save the time"}
          nextIcon={confirm.isPending ? null : "lucide:check"}
          nextDisabled={confirm.isPending}
        />
      }
    >
      <div className="mb-4">
        <Stats
          items={[
            { label: "Date", value: formatExamDate(pick.date, "EEE d MMM") },
            { label: "Length", value: formatDuration(proposal.duration_minutes) },
            { label: "Candidates", value: pick.seats_needed },
          ]}
        />
      </div>

      {course.slot && !saveError && (
        <div className="jcs-alert jcs-alert--warn mb-4" role="status">
          <Icon icon="lucide:replace" width={18} height={18} className="jcs-alert__icon" />
          <span>
            This course is already set for {formatExamDate(course.slot.date)} {course.slot.start_time} – {course.slot.end_time}. Saving
            replaces it; generate the linked exam timetables again afterwards.
          </span>
        </div>
      )}

      {saveError && (
        <div className="jcs-alert jcs-alert--danger mb-4" role="alert">
          <Icon icon="lucide:circle-x" width={18} height={18} className="jcs-alert__icon" />
          <div className="d-flex flex-column gap-1">
            <span className="fw-semibold">{saveError.title}</span>
            <span>
              {saveError.conflicts.length
                ? "Nothing was saved. This time was taken after it was found; see why below, then go back and pick another."
                : saveError.description}
            </span>
            {saveError.expired && (
              <button type="button" className="cw-text-btn jcs-link" onClick={() => runGenerate(() => handleNavigate(PICK_STEP_INDEX))}>
                <Icon icon="lucide:refresh-cw" width={14} height={14} />
                <span>{generate.isPending ? "Finding free times…" : "Find free times again"}</span>
              </button>
            )}
          </div>
        </div>
      )}

      <Section label={formatExamDate(pick.date, "EEEE d MMMM yyyy")} hint="The joint exam">
        <ul className="jcs-summaries">
          <li className="jcs-summary">
            <div className="d-flex flex-row align-items-center gap-3">
              <span className="jcs-slot__index">1</span>
              <span className="flex-grow-1">
                <TimeSpan start={pick.start_time} end={pick.end_time} />
              </span>
              <span className="text-truncate text-iron-500 font-size-sm">
                {pick.seats_needed} seats ·{" "}
                {proposal.checks?.invigilators === false ? "invigilators assigned later" : `${pick.invigilators_needed} invigilators`}
              </span>
            </div>
            {saveError?.conflicts.map((conflict, index) => (
              <span key={index} className="jcs-message jcs-message--danger ms-4">
                <Icon icon="lucide:circle-alert" width={14} height={14} />
                <span>{conflict.message}</span>
              </span>
            ))}
          </li>
        </ul>
      </Section>

      <Section label="Sat together by" hint={`${byExam.length} specialt${byExam.length === 1 ? "y" : "ies"}`}>
        <ul className="jcs-summaries">
          {byExam.map((item, index) => (
            <li key={item.exam_id} className="jcs-summary">
              <div className="d-flex flex-row align-items-center gap-3">
                <span className="jcs-slot__index">{index + 1}</span>
                <span className="flex-grow-1 text-truncate">{item.specialty}</span>
                <span className="text-iron-500 font-size-sm">
                  {item.candidate_count} candidate{item.candidate_count === 1 ? "" : "s"}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </Section>
    </WizardStep>
  );
}

export default ReviewTimeStep;
