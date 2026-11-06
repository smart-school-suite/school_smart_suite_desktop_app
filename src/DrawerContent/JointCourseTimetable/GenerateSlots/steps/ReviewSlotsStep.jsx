import { Icon } from "@iconify/react";
import { useState } from "react";
import {
  EmptyState,
  IconButton,
  Section,
  Stats,
  TimeSpan,
  WizardFooter,
  WizardStep,
} from "../../../../components/SemesterTimetable/ConstraintWizard/WizardPrimitives";
import { daysOfWeek } from "../../../../data/data";
import { useConfirmJointCourseSlots } from "../../../../hooks/jointCourseTimetable/useConfirmJointCourseSlots";
import { describeError } from "../../../../utils/jointCourseTimetable/recommendSlot";
import { sortPicks } from "../../../../utils/jointCourseTimetable/slotPicks";
import { dayLabel, formatDuration } from "../../../../utils/semesterTimetable/timeUtils";

const DAY_ORDER = daysOfWeek.map((day) => day.value);
const PICK_STEP_INDEX = 1;

function ReviewSlotsStep({ previousStep, handleNavigate, handleClose, drawerData }) {
  const { course, proposal, picks, setPicks, generate, runGenerate } = drawerData;
  const confirm = useConfirmJointCourseSlots();
  const [saveError, setSaveError] = useState(null);
  const ordered = sortPicks(picks, DAY_ORDER);
  const days = [...new Set(ordered.map((pick) => pick.day))];
  const weeklyMinutes = ordered.reduce((sum, pick) => sum + (pick.duration_minutes ?? 0), 0);
  const replacing = (course.slots ?? []).length > 0;

  const save = () => {
    setSaveError(null);
    confirm.mutate(
      {
        semesterJointCourseId: course.id,
        proposalId: proposal.proposal_id,
        optionIds: ordered.map((pick) => pick.option_id),
      },
      {
        onSuccess: () => handleClose(),
        onError: (error) => {
          const status = error?.response?.status;
          // Conflicts come back in the order the picks were sent.
          const conflicts = (error?.response?.data?.errors?.conflicts ?? []).map((conflict) => ({
            optionId: ordered[conflict.slot_index]?.option_id,
            message: conflict.message,
          }));
          setSaveError({
            expired: status === 404,
            title: error?.response?.data?.errors?.title ?? "Couldn't save the slots",
            description: describeError(error, "Something went wrong. Try again."),
            conflicts,
          });
        },
      },
    );
  };

  const conflictFor = (optionId) =>
    (saveError?.conflicts ?? []).filter((conflict) => conflict.optionId === optionId);

  return (
    <WizardStep
      title="Review and save"
      description="When you save, every slot is checked again against the lecturer's classes, hall bookings and other timetables, and saved together or not at all."
      footer={
        <WizardFooter
          onBack={previousStep}
          onNext={save}
          nextLabel={confirm.isPending ? "Saving…" : "Save slots"}
          nextIcon={confirm.isPending ? null : "lucide:check"}
          nextDisabled={ordered.length === 0 || confirm.isPending}
          hint="Pick at least one slot"
        />
      }
    >
      {ordered.length === 0 ? (
        <EmptyState title="Nothing to save" text="Go back and pick the slots you want." />
      ) : (
        <>
          <div className="mb-4">
            <Stats
              items={[
                { label: "Days", value: days.length },
                { label: "Slots", value: ordered.length },
                { label: "Per week", value: formatDuration(weeklyMinutes) },
              ]}
            />
          </div>

          {replacing && !saveError && (
            <div className="jcs-alert jcs-alert--warn mb-4" role="status">
              <Icon icon="lucide:replace" width={18} height={18} className="jcs-alert__icon" />
              <span>
                This course already has {course.slots.length} saved slot{course.slots.length === 1 ? "" : "s"}.
                Saving replaces them with these.
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
                    ? "Nothing was saved. Some slots were taken after they were found; they're marked below. Go back and pick others."
                    : saveError.description}
                </span>
                {saveError.expired && (
                  <button
                    type="button"
                    className="cw-text-btn jcs-link"
                    onClick={() => runGenerate(() => handleNavigate(PICK_STEP_INDEX))}
                  >
                    <Icon icon="lucide:refresh-cw" width={14} height={14} />
                    <span>{generate.isPending ? "Finding free slots…" : "Find free slots again"}</span>
                  </button>
                )}
              </div>
            </div>
          )}

          {days.map((day) => {
            const dayPicks = ordered.filter((pick) => pick.day === day);
            return (
              <Section key={day} label={dayLabel(day)} hint={`${dayPicks.length} slot${dayPicks.length === 1 ? "" : "s"}`}>
                <ul className="jcs-summaries">
                  {dayPicks.map((pick, index) => (
                    <li key={pick.option_id} className="jcs-summary">
                      <div className="d-flex flex-row align-items-center gap-3">
                        <span className="jcs-slot__index">{index + 1}</span>
                        <span className="flex-grow-1">
                          <TimeSpan start={pick.start_time} end={pick.end_time} />
                        </span>
                        <span className="text-truncate">{pick.hall?.name}</span>
                        <IconButton
                          icon="lucide:x"
                          label="Remove this slot"
                          tone="danger"
                          onClick={() => setPicks(picks.filter((item) => item.option_id !== pick.option_id))}
                        />
                      </div>
                      {conflictFor(pick.option_id).map((conflict, i) => (
                        <span key={i} className="jcs-message jcs-message--danger ms-4">
                          <Icon icon="lucide:circle-alert" width={14} height={14} />
                          <span>{conflict.message}</span>
                        </span>
                      ))}
                    </li>
                  ))}
                </ul>
              </Section>
            );
          })}
        </>
      )}
    </WizardStep>
  );
}

export default ReviewSlotsStep;
