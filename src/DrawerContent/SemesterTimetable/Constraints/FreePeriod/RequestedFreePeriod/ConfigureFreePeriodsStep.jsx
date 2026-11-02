import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { timeRangeSchema } from "../../../../../ComponentConfig/YupValidationSchema";
import { TimeRangeInput } from "../../../../../components/FormComponents/InputComponents";
import {
  EmptyState,
  IconButton,
  Note,
  Section,
  Stats,
  TextButton,
  TimeField,
  TimeSpan,
  WizardFooter,
  WizardStep,
} from "../../../../../components/SemesterTimetable/ConstraintWizard/WizardPrimitives";
import {
  addRequestedFreePeriodSlot,
  removeAllRequestedFreePeriodSlotsByDay,
  removeRequestedFreePeriodSlot,
  setRequestedFreePeriodSlot,
  setRequestedFreePeriodValidation,
} from "../../../../../Slices/SemesterTimetable/semesterTimetableSlice";
import {
  dayLabel,
  formatDuration,
  isValidRange,
  minutesBetween,
  sortDays,
  toMinutes,
} from "../../../../../utils/semesterTimetable/timeUtils";

/** True when two complete slots on the same day overlap. */
const hasOverlap = (slots) => {
  const ranges = slots
    .filter((slot) => isValidRange(slot.start_time?.value, slot.end_time?.value))
    .map((slot) => [toMinutes(slot.start_time.value), toMinutes(slot.end_time.value)])
    .sort((a, b) => a[0] - b[0]);
  return ranges.some((range, index) => index > 0 && range[0] < ranges[index - 1][1]);
};

const totalMinutes = (slots = []) =>
  slots.reduce(
    (sum, slot) =>
      sum + (minutesBetween(slot.start_time?.value, slot.end_time?.value) ?? 0),
    0,
  );

function ConfigureFreePeriodsStep({ nextStep, previousStep }) {
  const dispatch = useDispatch();
  const rF = useSelector(
    (state) => state.semesterTimetable.soft_constraints.requested_free_periods,
  );
  const rFDays = sortDays(rF.days);
  const rFSlots = rF.slots;
  const [activeDay, setActiveDay] = useState(rFDays[0] || "");
  const day = rFDays.includes(activeDay) ? activeDay : rFDays[0] || "";

  const slotsFor = (target) =>
    rFSlots.find((item) => item.day === target)?.slots ?? [];
  const currentSlots = slotsFor(day);

  const allSlots = rFSlots.flatMap((item) => item.slots ?? []);
  const allValid = allSlots.every((slot) =>
    isValidRange(slot.start_time?.value, slot.end_time?.value),
  );
  const overlapping = hasOverlap(currentSlots);

  const updateSlot = (slotId, field, value) =>
    dispatch(setRequestedFreePeriodSlot({ field, value, slotId, day }));
  const updateValidation = (slotId, field, value) =>
    dispatch(setRequestedFreePeriodValidation({ field, value, slotId, day }));

  return (
    <WizardStep
      title="Set the free periods"
      description="For each day, add the time ranges students should keep free."
      footer={
        <WizardFooter
          onBack={previousStep}
          onNext={nextStep}
          nextLabel="Review free periods"
          nextDisabled={allSlots.length === 0 || !allValid}
          hint={
            allSlots.length === 0
              ? "Add at least one free period"
              : "Every free period needs a valid start and end time"
          }
        />
      }
    >
      {rFDays.length === 0 ? (
        <EmptyState
          title="No days selected"
          text="Go back and choose the days that should include free periods."
        />
      ) : (
        <>
          <div className="cw-tabs" role="tablist">
            {rFDays.map((tabDay) => (
              <button
                key={tabDay}
                type="button"
                role="tab"
                aria-selected={tabDay === day}
                className={`cw-tab ${tabDay === day ? "is-active" : ""}`}
                onClick={() => setActiveDay(tabDay)}
              >
                {dayLabel(tabDay)}
                <span className="cw-tab__count">{slotsFor(tabDay).length}</span>
              </button>
            ))}
          </div>

          <Section
            label={`${dayLabel(day)} free periods`}
            hint={
              currentSlots.length
                ? `${currentSlots.length} added · ${formatDuration(totalMinutes(currentSlots))} in total`
                : null
            }
            action={
              currentSlots.length > 0 && (
                <>
                  <TextButton
                    icon="lucide:trash-2"
                    tone="muted"
                    onClick={() =>
                      dispatch(removeAllRequestedFreePeriodSlotsByDay({ day }))
                    }
                  >
                    Clear day
                  </TextButton>
                  <TextButton
                    icon="lucide:plus"
                    onClick={() => dispatch(addRequestedFreePeriodSlot({ day }))}
                  >
                    Add free period
                  </TextButton>
                </>
              )
            }
          >
            {currentSlots.length === 0 ? (
              <EmptyState
                icon="lucide:clock-plus"
                title={`No free periods on ${dayLabel(day)}`}
                text="Add a time range that should stay free of classes."
                action={
                  <button
                    type="button"
                    className="cw-btn cw-btn--outline"
                    onClick={() => dispatch(addRequestedFreePeriodSlot({ day }))}
                  >
                    Add free period
                  </button>
                }
              />
            ) : (
              currentSlots.map((slot, index) => (
                <div className="cw-slot" key={slot.id}>
                  <div className="cw-slot__head">
                    <span className="cw-slot__title">
                      <span className="cw-slot__index">#{index + 1}</span>
                      <TimeSpan
                        start={slot.start_time?.value}
                        end={slot.end_time?.value}
                        emptyLabel="Time not set"
                      />
                    </span>
                    <IconButton
                      icon="lucide:x"
                      label="Remove free period"
                      tone="danger"
                      onClick={() =>
                        dispatch(
                          removeRequestedFreePeriodSlot({ day, slotId: slot.id }),
                        )
                      }
                    />
                  </div>
                  <TimeField>
                    <TimeRangeInput
                      startValue={slot.start_time?.value ?? ""}
                      endValue={slot.end_time?.value ?? ""}
                      onStartTimeChange={(value) =>
                        updateSlot(slot.id, "start_time", value)
                      }
                      onEndTimeChange={(value) =>
                        updateSlot(slot.id, "end_time", value)
                      }
                      validationSchema={timeRangeSchema({ optional: false })}
                      onStartTimeValidationChange={(value) =>
                        updateValidation(slot.id, "start_time", value)
                      }
                      onEndTimeValidationChange={(value) =>
                        updateValidation(slot.id, "end_time", value)
                      }
                    />
                  </TimeField>
                </div>
              ))
            )}
          </Section>

          {overlapping && (
            <Section>
              <Note icon="lucide:triangle-alert">
                Some free periods on {dayLabel(day)} overlap. Overlapping ranges
                are allowed, but merging them keeps the setup easier to read.
              </Note>
            </Section>
          )}

          <Section label="All days">
            <Stats
              items={[
                {
                  label: "Days with free periods",
                  value: rFDays.filter((item) => slotsFor(item).length).length,
                },
                { label: "Free periods", value: allSlots.length },
                { label: "Time kept free", value: formatDuration(totalMinutes(allSlots)) },
              ]}
            />
          </Section>
        </>
      )}
    </WizardStep>
  );
}

export default ConfigureFreePeriodsStep;
