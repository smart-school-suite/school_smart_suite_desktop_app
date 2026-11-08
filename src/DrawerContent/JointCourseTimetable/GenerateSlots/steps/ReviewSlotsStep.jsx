import { Icon } from "@iconify/react";
import { CircleAlert, TriangleAlert, X } from "lucide-react";
import PeriodCard from "../../../../components/Card/PeriodCard";
import { useState } from "react";
import {
  EmptyState,
  Section,
  Stats,
  WizardFooter,
  WizardStep,
} from "../../../../components/SemesterTimetable/ConstraintWizard/WizardPrimitives";
import { daysOfWeek } from "../../../../data/data";
import { useConfirmJointCourseSlots } from "../../../../hooks/jointCourseTimetable/useConfirmJointCourseSlots";
import { describeError } from "../../../../utils/jointCourseTimetable/recommendSlot";
import { sortPicks } from "../../../../utils/jointCourseTimetable/slotPicks";
import { dayLabel, formatDuration } from "../../../../utils/semesterTimetable/timeUtils";

const DAY_ORDER = daysOfWeek.map((day) => day.value);

// A pick in the shape PeriodCard reads, shown as a plain course card.
const toPreviewSlot = (pick, course, proposal) => ({
  course_name: course.course?.title,
  hall_name: pick.hall?.name,
  hall_location: pick.hall?.location ?? null,
  teacher_name: proposal?.teacher?.name,
  start_time: pick.start_time,
  end_time: pick.end_time,
});
const PICK_STEP_INDEX = 1;

function ReviewSlotsStep({ previousStep, handleNavigate, handleClose, drawerData }) {
  const { course, proposal, picks, setPicks, generate, runGenerate } = drawerData;
  const confirm = useConfirmJointCourseSlots();
  const [saveError, setSaveError] = useState(null);
  const ordered = sortPicks(picks, DAY_ORDER);
  const days = [...new Set(ordered.map((pick) => pick.day))];
  const weeklyMinutes = ordered.reduce((sum, pick) => sum + (pick.duration_minutes ?? 0), 0);
  const replacing = (course.slots ?? []).length > 0;
  const studentCount = proposal?.students?.total ?? null;

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
                <div className="d-flex flex-row flex-wrap align-items-start gap-2">
                  {dayPicks.map((pick) => {
                    const conflicts = conflictFor(pick.option_id);
                    return (
                      <PeriodCard
                        key={pick.option_id}
                        slot={toPreviewSlot(pick, course, proposal)}
                        style={conflicts.length ? { border: "1px solid var(--red-300)" } : undefined}
                        action={
                          <button
                            type="button"
                            className="d-inline-grid border-0 bg-transparent rounded-circle text-iron-500 hover-bg-red-50 hover-text-red-700 transition-all duration-200"
                            style={{ width: "1.5rem", height: "1.5rem", placeItems: "center" }}
                            aria-label={`Remove the ${dayLabel(day)} ${pick.start_time} slot`}
                            title="Remove this slot"
                            onClick={() => setPicks(picks.filter((item) => item.option_id !== pick.option_id))}
                          >
                            <X size={14} />
                          </button>
                        }
                      >
                        {pick.hall?.fits === false && (
                          <span className="d-flex align-items-start gap-1 rounded-3 bg-old-lace-50 text-old-lace-700 font-size-xs px-2 py-1">
                            <TriangleAlert size={13} className="flex-shrink-0 mt-1" />
                            <span>
                              {pick.hall.name} seats {pick.hall.capacity ?? "too few"}
                              {studentCount ? `, fewer than the ${studentCount} students` : ""}.
                            </span>
                          </span>
                        )}
                        {conflicts.map((conflict, i) => (
                          <span
                            key={i}
                            className="d-flex align-items-start gap-1 rounded-3 bg-red-50 text-red-700 font-size-xs px-2 py-1"
                          >
                            <CircleAlert size={13} className="flex-shrink-0 mt-1" />
                            <span>{conflict.message}</span>
                          </span>
                        ))}
                      </PeriodCard>
                    );
                  })}
                </div>
              </Section>
            );
          })}
        </>
      )}
    </WizardStep>
  );
}

export default ReviewSlotsStep;
