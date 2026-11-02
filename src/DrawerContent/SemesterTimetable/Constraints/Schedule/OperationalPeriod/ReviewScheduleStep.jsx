import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  ChoiceCard,
  DayList,
  DayRow,
  EmptyState,
  IconButton,
  Section,
  Stats,
  TextButton,
  TimeSpan,
  WizardFooter,
  WizardStep,
} from "../../../../../components/SemesterTimetable/ConstraintWizard/WizardPrimitives";
import ToastSuccess from "../../../../../components/Toast/ToastSuccess";
import { setOperationalPeriodField } from "../../../../../Slices/SemesterTimetable/semesterTimetableSlice";
import {
  formatTime,
  minutesBetween,
  sortDays,
  toHours,
} from "../../../../../utils/semesterTimetable/timeUtils";

function ReviewScheduleStep({ handleClose, nextStep, previousStep, goToStep }) {
  const dispatch = useDispatch();
  const operationalPeriod = useSelector(
    (state) => state.semesterTimetable.hard_constraints.operational_period,
  );
  const opDays = sortDays(operationalPeriod.operational_days);
  const start = operationalPeriod.start_time.value;
  const end = operationalPeriod.end_time.value;
  const dailyMinutes = minutesBetween(start, end) ?? 0;

  const finish = () => {
    handleClose();
    toast.custom(
      <ToastSuccess
        title={"Configuration Successfully Completed"}
        description={"Configuration has been successfully completed."}
      />,
    );
  };

  return (
    <WizardStep
      title="Review your weekly schedule"
      description="Check the days and hours below before continuing."
      footer={<WizardFooter onBack={previousStep} />}
    >
      <Section
        label="Operating days"
        action={
          <TextButton
            icon="lucide:pencil"
            onClick={() => goToStep("DEFAULT_OPERATIONAL_PERIOD")}
          >
            Edit hours
          </TextButton>
        }
      >
        {opDays.length ? (
          <DayList>
            {opDays.map((day) => (
              <DayRow
                key={day}
                day={day}
                actions={
                  <IconButton
                    icon="lucide:x"
                    label="Remove day"
                    tone="danger"
                    onClick={() =>
                      dispatch(
                        setOperationalPeriodField({
                          field: "operational_days",
                          value: day,
                        }),
                      )
                    }
                  />
                }
              >
                <TimeSpan start={start} end={end} />
              </DayRow>
            ))}
          </DayList>
        ) : (
          <EmptyState
            title="No operating days"
            text="Go back and select the days your institution holds classes."
          />
        )}
      </Section>

      <Section label="Weekly totals">
        <Stats
          items={[
            { label: "Operating days", value: opDays.length },
            {
              label: "Hours per week",
              value: toHours(dailyMinutes * opDays.length),
              unit: "h",
            },
          ]}
        />
      </Section>

      <Section label="Do all operating days follow the same hours?">
        <div className="cw-choices">
          <ChoiceCard
            icon="lucide:calendar-check"
            title="Yes, use the same hours every day"
            text={`Every operating day runs ${formatTime(start)} – ${formatTime(end)}. Finish setup.`}
            onClick={finish}
          />
          <ChoiceCard
            icon="lucide:calendar-cog"
            title="No, some days are different"
            text="Pick the days that open or close at other times."
            onClick={nextStep}
          />
        </div>
      </Section>
    </WizardStep>
  );
}

export default ReviewScheduleStep;
