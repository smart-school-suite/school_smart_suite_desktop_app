import { useDispatch, useSelector } from "react-redux";
import {
  Note,
  Section,
  Stats,
  WizardFooter,
  WizardStep,
} from "../../../../../components/SemesterTimetable/ConstraintWizard/WizardPrimitives";
import { setDefaultPeriodDuration } from "../../../../../Slices/SemesterTimetable/semesterTimetableSlice";
import {
  estimatePeriodsForDay,
  resolveOperatingWindow,
} from "../../../../../utils/semesterTimetable/periodEstimates";
import {
  formatDuration,
  formatTime,
  fromMinutes,
  isCompleteTime,
  resolveScheduleDays,
  toMinutes,
} from "../../../../../utils/semesterTimetable/timeUtils";
import PeriodOptions from "./PeriodOptions";

function DefaultDurationStep({ nextStep, previousStep }) {
  const dispatch = useDispatch();
  const { hard_constraints: hardConstraints } = useSelector(
    (state) => state.semesterTimetable,
  );
  const pD = hardConstraints.schedule_period_duration_minutes.duration_minutes;
  const operationalPeriod = hardConstraints.operational_period;
  const breakPeriod = hardConstraints.break_period;
  const firstDay = resolveScheduleDays(operationalPeriod.operational_days)[0];
  const dailyWindow = resolveOperatingWindow(operationalPeriod, firstDay);
  const periodsPerDay = estimatePeriodsForDay({
    operationalPeriod,
    breakPeriod,
    day: firstDay,
    durationMinutes: pD,
  });

  // The first lesson of the day, starting when the institution opens.
  const sampleStart = isCompleteTime(operationalPeriod.start_time.value)
    ? operationalPeriod.start_time.value
    : "08:00";
  const sampleEnd = fromMinutes(toMinutes(sampleStart) + (pD ?? 0));

  return (
    <WizardStep
      title="Default period duration"
      description="Choose the length used for every teaching period unless a day is configured differently."
      footer={
        <WizardFooter
          onBack={previousStep}
          onNext={nextStep}
          nextDisabled={!pD}
          hint="Choose a period length"
        />
      }
    >
      <Section label="Period length">
        <PeriodOptions
          value={pD}
          onSelect={(minutes) =>
            dispatch(setDefaultPeriodDuration({ duration: minutes }))
          }
        />
      </Section>

      {pD && (
        <Section
          label="Daily impact"
          hint="Estimated from your operating hours and default break."
        >
          <Stats
            items={[
              {
                label: "First period",
                value: `${formatTime(sampleStart)} – ${formatTime(sampleEnd)}`,
              },
              {
                label: "Operating window",
                value: formatDuration(dailyWindow),
              },
              {
                label: "Periods per day",
                value: periodsPerDay ?? "—",
              },
            ]}
          />
        </Section>
      )}

      {pD && dailyWindow === null && (
        <Section>
          <Note>
            Set up the operational period to see how many periods fit in a day.
          </Note>
        </Section>
      )}
    </WizardStep>
  );
}

export default DefaultDurationStep;
