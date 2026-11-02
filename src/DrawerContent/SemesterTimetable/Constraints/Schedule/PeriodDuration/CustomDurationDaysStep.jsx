import { useDispatch, useSelector } from "react-redux";
import {
  Badge,
  DayPicker,
  IconButton,
  Section,
  WizardFooter,
  WizardStep,
} from "../../../../../components/SemesterTimetable/ConstraintWizard/WizardPrimitives";
import {
  addCustomPeriodDurationDays,
  removeCustomPeriodDurationDays,
  setCustomPeriodDuration,
} from "../../../../../Slices/SemesterTimetable/semesterTimetableSlice";
import {
  dayLabel,
  resolveScheduleDays,
  sortDays,
} from "../../../../../utils/semesterTimetable/timeUtils";
import PeriodOptions from "./PeriodOptions";

function CustomDurationDaysStep({ nextStep, previousStep }) {
  const dispatch = useDispatch();
  const pDState = useSelector(
    (state) =>
      state.semesterTimetable.hard_constraints.schedule_period_duration_minutes,
  );
  const operationalPeriod = useSelector(
    (state) => state.semesterTimetable.hard_constraints.operational_period,
  );
  const customDays = pDState.day_exceptions;
  const pD = pDState.duration_minutes;
  const scheduleDays = resolveScheduleDays(operationalPeriod.operational_days);
  const selectedDays = customDays.map((item) => item.day);
  const orderedCustomDays = sortDays(selectedDays).map((day) =>
    customDays.find((item) => item.day === day),
  );
  const allChosen = customDays.every((item) => item.duration_minutes);

  const toggleDay = (day, isSelected) =>
    dispatch(
      isSelected
        ? removeCustomPeriodDurationDays({ day })
        : addCustomPeriodDurationDays({ day }),
    );

  return (
    <WizardStep
      title="Custom duration days"
      description="Pick the days that use a different period length, then choose the length for each one."
      footer={
        <WizardFooter
          onBack={previousStep}
          onNext={nextStep}
          nextLabel="Review duration policy"
          nextDisabled={!allChosen}
          hint="Choose a length for every selected day"
        />
      }
    >
      <Section label="Default duration">
        <div className="cw-panel cw-panel--subtle d-flex align-items-center justify-content-between">
          <span className="fw-medium">{pD} minutes</span>
          <span className="cw-muted">Used by every day you leave unselected</span>
        </div>
      </Section>

      <Section
        label="Days with a different length"
        hint={
          selectedDays.length
            ? `${selectedDays.length} selected`
            : "Optional — leave empty to keep the default everywhere"
        }
      >
        <DayPicker
          selected={selectedDays}
          available={scheduleDays}
          onToggle={toggleDay}
        />
      </Section>

      {orderedCustomDays.length > 0 && (
        <Section label="Period length per day">
          {orderedCustomDays.map((customDay) => (
            <div className="cw-slot pb-3" key={customDay.day}>
              <div className="cw-slot__head">
                <span className="cw-slot__title">
                  {dayLabel(customDay.day)}
                  {customDay.duration_minutes ? (
                    <Badge tone="accent">{customDay.duration_minutes} min</Badge>
                  ) : (
                    <Badge tone="muted">Not chosen</Badge>
                  )}
                </span>
                <IconButton
                  icon="lucide:x"
                  label={`Remove ${dayLabel(customDay.day)}`}
                  tone="danger"
                  onClick={() =>
                    dispatch(removeCustomPeriodDurationDays({ day: customDay.day }))
                  }
                />
              </div>
              <PeriodOptions
                compact
                value={customDay.duration_minutes}
                onSelect={(minutes) =>
                  dispatch(
                    setCustomPeriodDuration({
                      value: minutes,
                      day: customDay.day,
                    }),
                  )
                }
              />
            </div>
          ))}
        </Section>
      )}
    </WizardStep>
  );
}

export default CustomDurationDaysStep;
