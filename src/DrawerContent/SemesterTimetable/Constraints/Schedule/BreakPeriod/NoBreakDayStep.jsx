import { useDispatch, useSelector } from "react-redux";
import {
  DayPicker,
  Note,
  Section,
  TimeSpan,
  WizardFooter,
  WizardStep,
} from "../../../../../components/SemesterTimetable/ConstraintWizard/WizardPrimitives";
import {
  addNoBreakPeriodDays,
  removeNoBreakPeriodDays,
} from "../../../../../Slices/SemesterTimetable/semesterTimetableSlice";
import {
  dayLabel,
  resolveScheduleDays,
  sortDays,
} from "../../../../../utils/semesterTimetable/timeUtils";

function NoBreakDayStep({ nextStep, previousStep }) {
  const dispatch = useDispatch();
  const breakPeriod = useSelector(
    (state) => state.semesterTimetable.hard_constraints.break_period,
  );
  const operationalPeriod = useSelector(
    (state) => state.semesterTimetable.hard_constraints.operational_period,
  );
  const noBreakDays = breakPeriod.no_break_exceptions;
  const scheduleDays = resolveScheduleDays(operationalPeriod.operational_days);

  // A day with a custom break cannot also be a no-break day.
  const lockedDays = Object.fromEntries(
    breakPeriod.day_exceptions.map((item) => [
      item.day,
      "Has a custom break. Remove it in the next step first.",
    ]),
  );

  const toggleDay = (day, isSelected) =>
    dispatch(
      isSelected
        ? removeNoBreakPeriodDays({ day })
        : addNoBreakPeriodDays({ day }),
    );

  return (
    <WizardStep
      title="Days without a break"
      description="Select the days where classes continue without the default break. Leave everything unselected if every day has a break."
      footer={<WizardFooter onBack={previousStep} onNext={nextStep} />}
    >
      <Section label="Default break">
        <div className="cw-panel cw-panel--subtle">
          <TimeSpan
            start={breakPeriod.start_time.value}
            end={breakPeriod.end_time.value}
          />
        </div>
      </Section>

      <Section
        label="Skip the break on"
        hint={
          noBreakDays.length
            ? `${noBreakDays.length} selected · ${sortDays(noBreakDays).map(dayLabel).join(", ")}`
            : "No days selected — every day keeps its break"
        }
      >
        <DayPicker
          selected={noBreakDays}
          available={scheduleDays}
          lockedDays={lockedDays}
          onToggle={toggleDay}
        />
      </Section>

      <Section>
        <Note>
          Only choose days where students should study straight through. Days
          that need a break at a different time are set in the next step.
        </Note>
      </Section>
    </WizardStep>
  );
}

export default NoBreakDayStep;
