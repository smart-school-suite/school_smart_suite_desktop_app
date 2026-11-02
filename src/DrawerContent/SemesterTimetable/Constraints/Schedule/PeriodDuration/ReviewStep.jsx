import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import {
  Badge,
  DayList,
  DayRow,
  Section,
  Stats,
  TextButton,
  WizardFooter,
  WizardStep,
} from "../../../../../components/SemesterTimetable/ConstraintWizard/WizardPrimitives";
import ToastSuccess from "../../../../../components/Toast/ToastSuccess";
import { estimatePeriodsForDay } from "../../../../../utils/semesterTimetable/periodEstimates";
import { resolveScheduleDays } from "../../../../../utils/semesterTimetable/timeUtils";

function ReviewStep({ handleClose, previousStep, goToStep }) {
  const { hard_constraints: hardConstraints } = useSelector(
    (state) => state.semesterTimetable,
  );
  const pDState = hardConstraints.schedule_period_duration_minutes;
  const customDays = pDState.day_exceptions;
  const pD = pDState.duration_minutes;
  const days = resolveScheduleDays(hardConstraints.operational_period.operational_days);

  const resolveDuration = (day) =>
    customDays.find((item) => item.day === day)?.duration_minutes ?? pD;

  const rows = days.map((day) => {
    const duration = resolveDuration(day);
    return {
      day,
      duration,
      isCustom: customDays.some((item) => item.day === day),
      periods: estimatePeriodsForDay({
        operationalPeriod: hardConstraints.operational_period,
        breakPeriod: hardConstraints.break_period,
        day,
        durationMinutes: duration,
      }),
    };
  });
  const durations = rows.map((row) => row.duration).filter(Boolean);

  const save = () => {
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
      title="Review period duration policy"
      description="Check the period length for each day before saving."
      footer={
        <WizardFooter
          onBack={previousStep}
          onNext={save}
          nextLabel="Save period policy"
          nextIcon="lucide:check"
        />
      }
    >
      <Section label="Summary">
        <Stats
          items={[
            { label: "Default", value: pD, unit: "min" },
            { label: "Custom days", value: rows.filter((row) => row.isCustom).length },
            {
              label: "Shortest",
              value: durations.length ? Math.min(...durations) : "—",
              unit: durations.length ? "min" : null,
            },
            {
              label: "Longest",
              value: durations.length ? Math.max(...durations) : "—",
              unit: durations.length ? "min" : null,
            },
          ]}
        />
      </Section>

      <Section
        label="Weekly grid"
        action={
          <TextButton
            icon="lucide:pencil"
            onClick={() => goToStep("CUSTOM_DURATION_DAYS")}
          >
            Edit custom days
          </TextButton>
        }
      >
        <DayList>
          {rows.map(({ day, duration, isCustom, periods }) => {
            const delta = isCustom && duration && pD ? duration - pD : 0;
            return (
              <DayRow
                key={day}
                day={day}
                badge={
                  isCustom ? <Badge tone="warn">Custom</Badge> : <Badge>Default</Badge>
                }
              >
                <span className="d-inline-flex align-items-baseline gap-2">
                  <span className="fw-medium">{duration ?? "—"} min</span>
                  {delta !== 0 && (
                    <span
                      className={`cw-delta ${delta > 0 ? "cw-delta--up" : "cw-delta--down"}`}
                    >
                      {delta > 0 ? `+${delta}` : delta} min
                    </span>
                  )}
                  {periods !== null && (
                    <span className="cw-muted">· {periods} periods</span>
                  )}
                </span>
              </DayRow>
            );
          })}
        </DayList>
      </Section>
    </WizardStep>
  );
}

export default ReviewStep;
