import { useDispatch, useSelector } from "react-redux";
import {
  DayPicker,
  Note,
  Section,
  TimeSpan,
  WizardFooter,
  WizardStep,
} from "../../../../../components/SemesterTimetable/ConstraintWizard/WizardPrimitives";
import { setOperationalPeriodField } from "../../../../../Slices/SemesterTimetable/semesterTimetableSlice";
import { dayLabel, sortDays } from "../../../../../utils/semesterTimetable/timeUtils";

function ExceptionDaysStep({ nextStep, previousStep }) {
  const dispatch = useDispatch();
  const operationalPeriod = useSelector(
    (state) => state.semesterTimetable.hard_constraints.operational_period,
  );
  const exceptionDays = operationalPeriod.day_exceptions.map((item) =>
    item.day.toLowerCase(),
  );
  const opDays = operationalPeriod.operational_days;

  // Dispatching a day with no times adds it, or removes it if already present.
  const toggleDay = (day) =>
    dispatch(
      setOperationalPeriodField({
        field: "day_exceptions",
        value: { day: day.toLowerCase() },
      }),
    );

  const selectedSummary = sortDays(exceptionDays).map(dayLabel).join(", ");

  return (
    <WizardStep
      title="Which days are different?"
      description="Select only the days that do not follow the normal operating hours. You will set their hours in the next step."
      footer={
        <WizardFooter
          onBack={previousStep}
          onNext={nextStep}
          nextDisabled={exceptionDays.length === 0}
          hint="Select at least one day"
        />
      }
    >
      <Section label="Normal operating hours">
        <div className="cw-panel cw-panel--subtle d-flex align-items-center justify-content-between">
          <TimeSpan
            start={operationalPeriod.start_time.value}
            end={operationalPeriod.end_time.value}
          />
          <span className="cw-muted">Applies to all other days</span>
        </div>
      </Section>

      <Section
        label="Days with different hours"
        hint={
          exceptionDays.length
            ? `${exceptionDays.length} selected · ${selectedSummary}`
            : "Only operating days can be selected"
        }
      >
        <DayPicker
          selected={exceptionDays}
          available={opDays}
          onToggle={toggleDay}
        />
      </Section>

      {opDays.length === 0 && (
        <Section>
          <Note icon="lucide:triangle-alert">
            No operating days are set. Go back two steps and choose the days
            your institution is open.
          </Note>
        </Section>
      )}
    </WizardStep>
  );
}

export default ExceptionDaysStep;
