import { Icon } from "@iconify/react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  EmptyState,
  Section,
  WizardFooter,
  WizardStep,
} from "../../../../components/SemesterTimetable/ConstraintWizard/WizardPrimitives";
import { useJointCourseDraft } from "../../../../hooks/jointCourseTimetable/useJointCourseDraft";
import { useSlotChecks } from "../../../../hooks/jointCourseTimetable/useSlotChecks";
import { useSlotRecommendations } from "../../../../hooks/jointCourseTimetable/useSlotRecommendations";
import { useTimetablePeriodDuration } from "../../../../hooks/jointCourseTimetable/useTimetablePeriodDuration";
import { setFocusSlot } from "../../../../Slices/jointCourse/jointCourseTimetableSlice";
import { slotsForDay } from "../../../../utils/jointCourseTimetable/slotDraft";
import {
  MAX_SLOTS_PER_COURSE,
  SLOT_STATUS,
  blocksSave,
} from "../../../../utils/jointCourseTimetable/slotValidation";
import { sortDays } from "../../../../utils/semesterTimetable/timeUtils";
import DaySlotSection from "../components/DaySlotSection";
import TimetablePreview from "../components/TimetablePreview";

const APP_SETTINGS_PATH = "/settings/app-settings";

const scrollToSlot = (slotId) =>
  document
    .getElementById(`jcs-slot-${slotId}`)
    ?.scrollIntoView({ behavior: "smooth", block: "center" });

function ConfigureTimetableSlots({ nextStep, previousStep, drawerData }) {
  const dispatch = useDispatch();
  const { courseId, draft, days, slots, teacher } = useJointCourseDraft(drawerData.course);
  const period = useTimetablePeriodDuration();
  const { bySlot: checks } = useSlotChecks({
    courseId,
    teacherId: teacher?.id,
    slots,
    periodMinutes: period.minutes,
  });
  const recommendations = useSlotRecommendations({
    courseId,
    teacher,
    periodMinutes: period.minutes,
    slots,
  });

  // Coming from "Edit" on the review step.
  useEffect(() => {
    if (!draft?.focusSlotId) return;
    const id = draft.focusSlotId;
    requestAnimationFrame(() => scrollToSlot(id));
    dispatch(setFocusSlot({ courseId, slotId: null }));
  }, [draft?.focusSlotId, courseId, dispatch]);

  const ordered = sortDays(days);
  const statuses = slots.map((slot) => checks[slot.id]?.status);
  const ready = statuses.filter((status) => status === SLOT_STATUS.READY).length;
  const blocking = statuses.filter(blocksSave).length;
  const needsHelp = slots.filter((slot) => checks[slot.id]?.status !== SLOT_STATUS.READY);

  return (
    <WizardStep
      title="Set each slot's time and hall"
      description="Enter times and choose halls yourself, or ask for a suggestion. Suggestions are never applied until you accept them, and you can change any value afterwards."
      footer={
        <WizardFooter
          onBack={previousStep}
          onNext={nextStep}
          nextLabel="Review"
          nextDisabled={slots.length === 0}
          hint="Add at least one slot"
        />
      }
    >
      {slots.length === 0 ? (
        <EmptyState
          title="No slots to configure"
          text="Go back and set how many slots each day needs."
        />
      ) : (
        <>
          <div className="jcs-context">
            <PeriodDuration period={period} />
            <span className="jcs-context__item">
              <Icon icon="lucide:user-round" width={14} height={14} />
              {teacher?.name ?? "No lecturer"}
            </span>
            <span className="jcs-context__item">
              <Icon icon="lucide:circle-check" width={14} height={14} />
              {ready} of {slots.length} ready
            </span>
          </div>

          <div className="jcs-bulk">
            <div className="d-flex flex-column">
              <span className="fw-medium">Need help choosing?</span>
              <span className="jcs-field-hint">
                {needsHelp.length
                  ? `Get a suggestion for the ${needsHelp.length} slot${needsHelp.length === 1 ? "" : "s"} that aren't ready. Each one avoids the others.`
                  : "Every slot is ready. You can still ask for a suggestion on any slot."}
              </span>
            </div>
            <div className="d-flex flex-row align-items-center gap-2 flex-shrink-0">
              {recommendations.readyCount > 1 && (
                <button
                  type="button"
                  className="cw-btn cw-btn--outline jcs-btn-sm"
                  onClick={recommendations.acceptAll}
                >
                  Use all {recommendations.readyCount} suggestions
                </button>
              )}
              <button
                type="button"
                className="cw-btn cw-btn--outline jcs-btn-sm"
                disabled={needsHelp.length === 0 || recommendations.isFindingAll}
                onClick={() => recommendations.findAll(needsHelp)}
              >
                <Icon
                  icon={recommendations.isFindingAll ? "lucide:loader-circle" : "lucide:sparkles"}
                  width={14}
                  height={14}
                  className={recommendations.isFindingAll ? "ctl-spin" : undefined}
                />
                <span>
                  {recommendations.isFindingAll ? "Finding slots…" : "Find all available slots"}
                </span>
              </button>
            </div>
          </div>

          <Section label="Week at a glance" hint="Click a block to jump to its slot">
            <TimetablePreview
              days={ordered}
              slots={slots}
              checks={checks}
              onSelect={scrollToSlot}
            />
          </Section>

          {ordered.map((day) => (
            <DaySlotSection
              key={day}
              courseId={courseId}
              teacherId={teacher?.id}
              day={day}
              slots={slotsForDay(slots, day)}
              checks={checks}
              periodMinutes={period.minutes}
              recommendations={recommendations}
              canAdd={slots.length < MAX_SLOTS_PER_COURSE}
            />
          ))}

          {blocking > 0 && (
            <p className="jcs-field-hint text-center mb-0">
              {blocking} slot{blocking === 1 ? " needs" : "s need"} attention before saving. You can
              still review them.
            </p>
          )}
        </>
      )}
    </WizardStep>
  );
}

/** Period length shown in context, read from App Configuration. */
function PeriodDuration({ period }) {
  if (period.isLoading) {
    return <span className="jcs-context__item">Loading period duration…</span>;
  }
  if (!period.minutes) {
    return (
      <span className="jcs-context__item jcs-context__item--warn">
        <Icon icon="lucide:triangle-alert" width={14} height={14} />
        {period.error ? "Couldn't load the period duration." : "No period duration set."}
        <Link to={APP_SETTINGS_PATH} className="jcs-link">
          App Configuration
        </Link>
      </span>
    );
  }
  return (
    <span className="jcs-context__item" title="Source: App Configuration · Timetable Settings">
      <Icon icon="lucide:timer" width={14} height={14} />
      Period: {period.minutes} min
      <span className="jcs-context__source">App Configuration</span>
    </span>
  );
}

export default ConfigureTimetableSlots;
