import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  Badge,
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
  minutesBetween,
  sortDays,
  toHours,
} from "../../../../../utils/semesterTimetable/timeUtils";

function FinalReviewStep({ handleClose, previousStep, goToStep }) {
  const dispatch = useDispatch();
  const operationalPeriod = useSelector(
    (state) => state.semesterTimetable.hard_constraints.operational_period,
  );
  const opDays = sortDays(operationalPeriod.operational_days);

  const resolveTime = (day) => {
    const exception = operationalPeriod.day_exceptions.find(
      (item) => item.day === day,
    );
    if (exception) {
      return {
        startTime: exception.start_time.value,
        endTime: exception.end_time.value,
        isException: true,
      };
    }
    return {
      startTime: operationalPeriod.start_time.value,
      endTime: operationalPeriod.end_time.value,
      isException: false,
    };
  };

  const totalMinutes = opDays.reduce((total, day) => {
    const { startTime, endTime } = resolveTime(day);
    return total + (minutesBetween(startTime, endTime) ?? 0);
  }, 0);
  const exceptionCount = opDays.filter((day) => resolveTime(day).isException)
    .length;

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
      title="Review your operating schedule"
      description="This is the schedule the timetable generator will use. Check it before saving."
      footer={
        <WizardFooter
          onBack={previousStep}
          onNext={finish}
          nextLabel="Save schedule"
          nextIcon="lucide:check"
          nextDisabled={opDays.length === 0}
          hint="Add at least one operating day"
        />
      }
    >
      <Section label="Summary">
        <Stats
          items={[
            { label: "Operating days", value: opDays.length },
            { label: "With custom hours", value: exceptionCount },
            { label: "Hours per week", value: toHours(totalMinutes), unit: "h" },
          ]}
        />
      </Section>

      <Section
        label="Week at a glance"
        action={
          <>
            <TextButton
              icon="lucide:clock"
              tone="muted"
              onClick={() => goToStep("DEFAULT_OPERATIONAL_PERIOD")}
            >
              Normal hours
            </TextButton>
            <TextButton
              icon="lucide:pencil"
              onClick={() => goToStep("OPERATIONAL_PERIOD_CONFIGURE_EXCEPTION")}
            >
              Exceptions
            </TextButton>
          </>
        }
      >
        {opDays.length ? (
          <DayList>
            {opDays.map((day) => {
              const { startTime, endTime, isException } = resolveTime(day);
              return (
                <DayRow
                  key={day}
                  day={day}
                  badge={
                    isException ? (
                      <Badge tone="warn">Custom hours</Badge>
                    ) : (
                      <Badge>Normal</Badge>
                    )
                  }
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
                  <TimeSpan start={startTime} end={endTime} />
                </DayRow>
              );
            })}
          </DayList>
        ) : (
          <EmptyState
            title="No operating days"
            text="Without operating days the generator has nowhere to place classes."
          />
        )}
      </Section>
    </WizardStep>
  );
}

export default FinalReviewStep;
