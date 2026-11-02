import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import {
  ChoiceCard,
  DayList,
  DayRow,
  Section,
  Stats,
  WizardFooter,
  WizardStep,
} from "../../../../../components/SemesterTimetable/ConstraintWizard/WizardPrimitives";
import ToastSuccess from "../../../../../components/Toast/ToastSuccess";
import { estimatePeriodsForDay } from "../../../../../utils/semesterTimetable/periodEstimates";
import { resolveScheduleDays } from "../../../../../utils/semesterTimetable/timeUtils";

function ReviewWeeklyScheduleStep({ handleClose, nextStep, previousStep }) {
  const { hard_constraints: hardConstraints } = useSelector(
    (state) => state.semesterTimetable,
  );
  const pD = hardConstraints.schedule_period_duration_minutes.duration_minutes;
  const operationalPeriod = hardConstraints.operational_period;
  const breakPeriod = hardConstraints.break_period;
  const days = resolveScheduleDays(operationalPeriod.operational_days);

  const perDay = days.map((day) => ({
    day,
    periods: estimatePeriodsForDay({
      operationalPeriod,
      breakPeriod,
      day,
      durationMinutes: pD,
    }),
  }));
  const knownWeekly = perDay.every((item) => item.periods !== null);
  const weeklyPeriods = perDay.reduce((sum, item) => sum + (item.periods ?? 0), 0);

  const finish = () => {
    handleClose();
    toast.custom(
      <ToastSuccess
        title={"Configuration Successful"}
        description={"Configuration has been successfully completed."}
      />,
    );
  };

  return (
    <WizardStep
      title="Period length across the week"
      description={`Every day currently uses ${pD}-minute periods.`}
      footer={<WizardFooter onBack={previousStep} />}
    >
      <Section label="Summary">
        <Stats
          items={[
            { label: "Default duration", value: pD, unit: "min" },
            { label: "Days", value: days.length },
            {
              label: "Periods per week",
              value: knownWeekly ? weeklyPeriods : "—",
            },
          ]}
        />
      </Section>

      <Section label="Weekly grid">
        <DayList>
          {perDay.map(({ day, periods }) => (
            <DayRow
              key={day}
              day={day}
              badge={
                periods !== null ? (
                  <span className="cw-muted">{periods} periods</span>
                ) : null
              }
            >
              {pD} min
            </DayRow>
          ))}
        </DayList>
      </Section>

      <Section
        label="Do any days use a different length?"
        hint="For example longer practical sessions or shorter activity days."
      >
        <div className="cw-choices">
          <ChoiceCard
            icon="lucide:calendar-check"
            title="No, every day uses the same length"
            text={`Apply ${pD}-minute periods to all days and finish.`}
            onClick={finish}
          />
          <ChoiceCard
            icon="lucide:calendar-cog"
            title="Yes, some days are different"
            text="Set a custom period length for selected days."
            onClick={nextStep}
          />
        </div>
      </Section>
    </WizardStep>
  );
}

export default ReviewWeeklyScheduleStep;
