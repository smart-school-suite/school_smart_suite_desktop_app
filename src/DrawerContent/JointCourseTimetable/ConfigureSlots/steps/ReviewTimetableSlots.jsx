import { Icon } from "@iconify/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  EmptyState,
  Section,
  Stats,
  WizardFooter,
  WizardStep,
} from "../../../../components/SemesterTimetable/ConstraintWizard/WizardPrimitives";
import { useJointCourseDraft } from "../../../../hooks/jointCourseTimetable/useJointCourseDraft";
import { useSaveJointCourseSlots } from "../../../../hooks/jointCourseTimetable/useSaveJointCourseSlots";
import { useSlotChecks } from "../../../../hooks/jointCourseTimetable/useSlotChecks";
import { useTimetablePeriodDuration } from "../../../../hooks/jointCourseTimetable/useTimetablePeriodDuration";
import {
  clearSlotDraft,
  setFocusSlot,
} from "../../../../Slices/jointCourse/jointCourseTimetableSlice";
import { describeError } from "../../../../utils/jointCourseTimetable/recommendSlot";
import {
  slotDuration,
  slotsForDay,
  toSavePayload,
} from "../../../../utils/jointCourseTimetable/slotDraft";
import {
  SLOT_STATUS,
  blocksSave,
} from "../../../../utils/jointCourseTimetable/slotValidation";
import { JOINT_COURSE_SLOT_STEPS } from "../../../../utils/steps/jointCourseTimetable/jointCourseSlotSteps";
import { dayLabel, formatDuration, sortDays } from "../../../../utils/semesterTimetable/timeUtils";
import SlotSummary from "../components/SlotSummary";

function ReviewTimetableSlots({ previousStep, goToStep, handleClose, drawerData }) {
  const dispatch = useDispatch();
  const { courseId, days, slots, teacher } = useJointCourseDraft(drawerData.course);
  const period = useTimetablePeriodDuration();
  const { bySlot: checks, isChecking } = useSlotChecks({
    courseId,
    teacherId: teacher?.id,
    slots,
    periodMinutes: period.minutes,
  });
  const save = useSaveJointCourseSlots();
  // Conflicts the server found on the last save, keyed by slot id.
  const [serverConflicts, setServerConflicts] = useState({});
  const [saveError, setSaveError] = useState(null);

  const ordered = sortDays(days);
  const statuses = slots.map((slot) => checks[slot.id]?.status);
  const blocking = statuses.filter(blocksSave).length;
  const ready = statuses.filter((status) => status === SLOT_STATUS.READY).length;
  const weeklyMinutes = slots.reduce((sum, slot) => sum + (slotDuration(slot) ?? 0), 0);
  const hasServerConflicts = Object.keys(serverConflicts).length > 0;

  const edit = (slotId) => {
    dispatch(setFocusSlot({ courseId, slotId }));
    goToStep(JOINT_COURSE_SLOT_STEPS.CONFIGURE_TIMETABLE_SLOTS);
  };

  const handleSave = () => {
    setServerConflicts({});
    setSaveError(null);
    save.mutate(
      { semesterJointCourseId: courseId, slots: toSavePayload(slots, teacher?.id) },
      {
        onSuccess: () => {
          dispatch(clearSlotDraft(courseId));
          handleClose();
        },
        onError: (error) => {
          const conflicts = error?.response?.data?.errors?.conflicts ?? [];
          if (conflicts.length) {
            const byId = {};
            conflicts.forEach((conflict) => {
              const slot = slots[conflict.slot_index];
              if (slot) (byId[slot.id] ??= []).push(conflict.message);
            });
            setServerConflicts(byId);
          }
          setSaveError({
            title: error?.response?.data?.errors?.title ?? "Couldn't save the times",
            description: describeError(error, "Something went wrong. Try again."),
          });
        },
      },
    );
  };

  const nextDisabled = slots.length === 0 || blocking > 0 || isChecking || save.isPending;

  return (
    <WizardStep
      title="Review and save"
      description="Check every slot before saving. When you save, all slots are checked together against the lecturer's classes, hall bookings and other timetables, and saved together or not at all."
      footer={
        <WizardFooter
          onBack={previousStep}
          onNext={handleSave}
          nextLabel={save.isPending ? "Saving…" : "Save timetable"}
          nextIcon={save.isPending ? null : "lucide:check"}
          nextDisabled={nextDisabled}
          hint={
            slots.length === 0
              ? "There are no slots to save"
              : isChecking
                ? "Checking availability…"
                : `${blocking} slot${blocking === 1 ? " needs" : "s need"} attention`
          }
        />
      }
    >
      {slots.length === 0 ? (
        <EmptyState
          title="Nothing to review"
          text="Go back and add the teaching days and slots for this course."
        />
      ) : (
        <>
          <div className="mb-4">
          <Stats
            items={[
              { label: "Days", value: ordered.length },
              { label: "Slots", value: slots.length },
              { label: "Per week", value: formatDuration(weeklyMinutes) },
              { label: "Ready", value: `${ready}/${slots.length}` },
            ]}
          />
          </div>

          {saveError && (
            <div className="jcs-alert jcs-alert--danger mb-4" role="alert">
              <Icon icon="lucide:circle-x" width={18} height={18} className="jcs-alert__icon" />
              <div className="d-flex flex-column gap-1">
                <span className="fw-semibold">{saveError.title}</span>
                <span>
                  {hasServerConflicts
                    ? "Nothing was saved. The slots marked below clash with other classes; edit them and save again."
                    : saveError.description}
                </span>
              </div>
            </div>
          )}

          {!saveError && blocking > 0 && !isChecking && (
            <div className="jcs-alert jcs-alert--warn mb-4" role="status">
              <Icon icon="lucide:triangle-alert" width={18} height={18} className="jcs-alert__icon" />
              <div className="d-flex flex-column gap-1">
                <span className="fw-semibold">
                  {blocking} slot{blocking === 1 ? " needs" : "s need"} attention
                </span>
                <span>Missing times or halls, overlaps and conflicts are listed under each slot.</span>
              </div>
            </div>
          )}

          {ordered.map((day) => {
            const daySlots = slotsForDay(slots, day);
            return (
              <Section
                key={day}
                label={dayLabel(day)}
                hint={`${daySlots.length} slot${daySlots.length === 1 ? "" : "s"}`}
              >
                <ul className="jcs-summaries">
                  {daySlots.map((slot, index) => (
                    <SlotSummary
                      key={slot.id}
                      slot={slot}
                      number={index + 1}
                      check={checks[slot.id]}
                      serverConflicts={serverConflicts[slot.id]}
                      onEdit={() => edit(slot.id)}
                    />
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

export default ReviewTimetableSlots;
