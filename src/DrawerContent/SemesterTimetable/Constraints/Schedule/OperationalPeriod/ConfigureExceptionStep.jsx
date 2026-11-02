import { useDispatch, useSelector } from "react-redux";
import { timeRangeSchema } from "../../../../../ComponentConfig/YupValidationSchema";
import { TimeRangeInput } from "../../../../../components/FormComponents/InputComponents";
import {
  EmptyState,
  IconButton,
  Section,
  TimeField,
  TimeSpan,
  WizardFooter,
  WizardStep,
} from "../../../../../components/SemesterTimetable/ConstraintWizard/WizardPrimitives";
import {
  setOperationalPeriodField,
  setOperationalPeriodValidation,
} from "../../../../../Slices/SemesterTimetable/semesterTimetableSlice";
import {
  dayLabel,
  isValidRange,
  sortDays,
} from "../../../../../utils/semesterTimetable/timeUtils";

function ConfigureExceptionStep({ nextStep, previousStep }) {
  const dispatch = useDispatch();
  const operationalPeriod = useSelector(
    (state) => state.semesterTimetable.hard_constraints.operational_period,
  );
  const exceptionsByDay = Object.fromEntries(
    operationalPeriod.day_exceptions.map((item) => [item.day, item]),
  );
  const exceptionDays = sortDays(Object.keys(exceptionsByDay));
  const allValid = operationalPeriod.day_exceptions.every((item) =>
    isValidRange(item.start_time?.value, item.end_time?.value),
  );

  const updateTime = (day, field, value) =>
    dispatch(
      setOperationalPeriodField({
        field: "day_exceptions",
        value: { day: day.toLowerCase(), [field]: value },
      }),
    );

  const updateValidation = (value) =>
    dispatch(setOperationalPeriodValidation({ field: "day_exceptions", value }));

  return (
    <WizardStep
      title="Set hours for exception days"
      description="Enter the opening and closing time for each day that differs from the normal schedule."
      footer={
        <WizardFooter
          onBack={previousStep}
          onNext={nextStep}
          nextDisabled={exceptionDays.length === 0 || !allValid}
          hint="Every day needs a valid opening and closing time"
        />
      }
    >
      <Section label="Normal operating hours">
        <div className="cw-panel cw-panel--subtle">
          <TimeSpan
            start={operationalPeriod.start_time.value}
            end={operationalPeriod.end_time.value}
          />
        </div>
      </Section>

      <Section label="Exception days" hint={`${exceptionDays.length} to configure`}>
        {exceptionDays.length === 0 ? (
          <EmptyState
            title="No exception days selected"
            text="Go back and pick the days that follow different hours."
          />
        ) : (
          exceptionDays.map((day) => {
            const exception = exceptionsByDay[day];
            return (
              <div className="cw-slot" key={day}>
                <div className="cw-slot__head">
                  <span className="cw-slot__title">
                    {dayLabel(day)}
                    <TimeSpan
                      start={exception.start_time?.value}
                      end={exception.end_time?.value}
                      emptyLabel="Hours not set"
                    />
                  </span>
                  <IconButton
                    icon="lucide:x"
                    label={`Remove ${dayLabel(day)}`}
                    tone="danger"
                    onClick={() =>
                      dispatch(
                        setOperationalPeriodField({
                          field: "day_exceptions",
                          value: { day },
                        }),
                      )
                    }
                  />
                </div>
                <TimeField>
                  <TimeRangeInput
                    startValue={exception.start_time?.value ?? ""}
                    endValue={exception.end_time?.value ?? ""}
                    onStartTimeChange={(value) =>
                      updateTime(day, "start_time", value)
                    }
                    onEndTimeChange={(value) => updateTime(day, "end_time", value)}
                    validationSchema={timeRangeSchema({ optional: false })}
                    onStartTimeValidationChange={updateValidation}
                    onEndTimeValidationChange={updateValidation}
                  />
                </TimeField>
              </div>
            );
          })
        )}
      </Section>
    </WizardStep>
  );
}

export default ConfigureExceptionStep;
