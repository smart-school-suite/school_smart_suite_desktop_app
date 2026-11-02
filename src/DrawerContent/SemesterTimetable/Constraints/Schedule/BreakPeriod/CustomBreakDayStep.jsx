import { useDispatch, useSelector } from "react-redux";
import { timeRangeSchema } from "../../../../../ComponentConfig/YupValidationSchema";
import { TimeRangeInput } from "../../../../../components/FormComponents/InputComponents";
import {
  DayPicker,
  IconButton,
  Section,
  TimeField,
  TimeSpan,
  WizardFooter,
  WizardStep,
} from "../../../../../components/SemesterTimetable/ConstraintWizard/WizardPrimitives";
import {
  addCustomBreakDays,
  removeCustomBreakDays,
  setCustomBreakPeriod,
  setCustomBreakPeriodValidation,
} from "../../../../../Slices/SemesterTimetable/semesterTimetableSlice";
import {
  dayLabel,
  isValidRange,
  resolveScheduleDays,
  sortDays,
} from "../../../../../utils/semesterTimetable/timeUtils";

function CustomBreakDayStep({ nextStep, previousStep }) {
  const dispatch = useDispatch();
  const breakPeriod = useSelector(
    (state) => state.semesterTimetable.hard_constraints.break_period,
  );
  const operationalPeriod = useSelector(
    (state) => state.semesterTimetable.hard_constraints.operational_period,
  );
  const noBreakDays = breakPeriod.no_break_exceptions;
  const customBreaks = breakPeriod.day_exceptions;
  const customDays = customBreaks.map((item) => item.day);
  const scheduleDays = resolveScheduleDays(operationalPeriod.operational_days);
  const orderedCustomBreaks = sortDays(customDays).map((day) =>
    customBreaks.find((item) => item.day === day),
  );
  const allValid = customBreaks.every((item) =>
    isValidRange(item.start_time.value, item.end_time.value),
  );

  const lockedDays = Object.fromEntries(
    noBreakDays.map((day) => [day, "Set as a day without a break"]),
  );

  const toggleDay = (day, isSelected) =>
    dispatch(
      isSelected ? removeCustomBreakDays({ day }) : addCustomBreakDays({ day }),
    );

  return (
    <WizardStep
      title="Custom break days"
      description="Pick the days whose break starts or ends at a different time, then set the time for each one."
      footer={
        <WizardFooter
          onBack={previousStep}
          onNext={nextStep}
          nextLabel="Review break policy"
          nextDisabled={!allValid}
          hint="Each custom day needs a valid break time"
        />
      }
    >
      <Section label="Default break">
        <div className="cw-panel cw-panel--subtle d-flex align-items-center justify-content-between gap-3">
          <TimeSpan
            start={breakPeriod.start_time.value}
            end={breakPeriod.end_time.value}
          />
          {noBreakDays.length > 0 && (
            <span className="cw-muted">
              No break on {sortDays(noBreakDays).map(dayLabel).join(", ")}
            </span>
          )}
        </div>
      </Section>

      <Section
        label="Days with a different break"
        hint={
          customDays.length
            ? `${customDays.length} selected`
            : "Optional — leave empty to keep the default everywhere"
        }
      >
        <DayPicker
          selected={customDays}
          available={scheduleDays}
          lockedDays={lockedDays}
          onToggle={toggleDay}
        />
      </Section>

      {orderedCustomBreaks.length > 0 && (
        <Section label="Break times">
          {orderedCustomBreaks.map((customBreak) => (
            <div className="cw-slot" key={customBreak.day}>
              <div className="cw-slot__head">
                <span className="cw-slot__title">
                  {dayLabel(customBreak.day)}
                  <TimeSpan
                    start={customBreak.start_time.value}
                    end={customBreak.end_time.value}
                    emptyLabel="Time not set"
                  />
                </span>
                <IconButton
                  icon="lucide:x"
                  label={`Remove ${dayLabel(customBreak.day)}`}
                  tone="danger"
                  onClick={() =>
                    dispatch(removeCustomBreakDays({ day: customBreak.day }))
                  }
                />
              </div>
              <TimeField>
                <TimeRangeInput
                  startValue={customBreak.start_time.value ?? ""}
                  endValue={customBreak.end_time.value ?? ""}
                  onStartTimeChange={(value) =>
                    dispatch(
                      setCustomBreakPeriod({
                        field: "start_time",
                        value,
                        day: customBreak.day,
                      }),
                    )
                  }
                  onEndTimeChange={(value) =>
                    dispatch(
                      setCustomBreakPeriod({
                        field: "end_time",
                        value,
                        day: customBreak.day,
                      }),
                    )
                  }
                  validationSchema={timeRangeSchema({ optional: false })}
                  onStartTimeValidationChange={(value) =>
                    dispatch(
                      setCustomBreakPeriodValidation({
                        field: "start_time",
                        value,
                        day: customBreak.day,
                      }),
                    )
                  }
                  onEndTimeValidationChange={(value) =>
                    dispatch(
                      setCustomBreakPeriodValidation({
                        field: "end_time",
                        value,
                        day: customBreak.day,
                      }),
                    )
                  }
                />
              </TimeField>
            </div>
          ))}
        </Section>
      )}
    </WizardStep>
  );
}

export default CustomBreakDayStep;
