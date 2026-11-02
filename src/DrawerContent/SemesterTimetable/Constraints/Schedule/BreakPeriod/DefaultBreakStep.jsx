import { useDispatch, useSelector } from "react-redux";
import { timeRangeSchema } from "../../../../../ComponentConfig/YupValidationSchema";
import { TimeRangeInput } from "../../../../../components/FormComponents/InputComponents";
import {
  Note,
  Section,
  Stats,
  TimeField,
  WizardFooter,
  WizardStep,
} from "../../../../../components/SemesterTimetable/ConstraintWizard/WizardPrimitives";
import {
  setDefaultBreakPeriodField,
  setDefaultBreakPeriodFieldValidation,
} from "../../../../../Slices/SemesterTimetable/semesterTimetableSlice";
import {
  formatDuration,
  formatTime,
  isValidRange,
  minutesBetween,
  toMinutes,
} from "../../../../../utils/semesterTimetable/timeUtils";

function DefaultBreakStep({ nextStep, previousStep }) {
  const dispatch = useDispatch();
  const breakPeriod = useSelector(
    (state) => state.semesterTimetable.hard_constraints.break_period,
  );
  const operationalPeriod = useSelector(
    (state) => state.semesterTimetable.hard_constraints.operational_period,
  );
  const start = breakPeriod.start_time.value;
  const end = breakPeriod.end_time.value;
  const canContinue = isValidRange(start, end);

  const opensAt = toMinutes(operationalPeriod.start_time.value);
  const closesAt = toMinutes(operationalPeriod.end_time.value);
  const outsideHours =
    canContinue &&
    opensAt !== null &&
    closesAt !== null &&
    (toMinutes(start) < opensAt || toMinutes(end) > closesAt);

  return (
    <WizardStep
      title="Default break"
      description="Set the break that applies to every operating day unless a day is configured differently."
      footer={
        <WizardFooter
          onBack={previousStep}
          onNext={nextStep}
          nextDisabled={!canContinue}
          hint="Enter a start and end time"
        />
      }
    >
      <Section label="Break time">
        <TimeField>
          <TimeRangeInput
            startValue={start ?? ""}
            endValue={end ?? ""}
            onStartTimeChange={(value) =>
              dispatch(setDefaultBreakPeriodField({ field: "start_time", value }))
            }
            onEndTimeChange={(value) =>
              dispatch(setDefaultBreakPeriodField({ field: "end_time", value }))
            }
            validationSchema={timeRangeSchema({ optional: false })}
            onStartTimeValidationChange={(value) =>
              dispatch(
                setDefaultBreakPeriodFieldValidation({
                  field: "start_time",
                  value,
                }),
              )
            }
            onEndTimeValidationChange={(value) =>
              dispatch(
                setDefaultBreakPeriodFieldValidation({
                  field: "end_time",
                  value,
                }),
              )
            }
          />
        </TimeField>
      </Section>

      <Section label="Break summary">
        <Stats
          items={[
            { label: "Starts", value: formatTime(start) },
            { label: "Ends", value: formatTime(end) },
            {
              label: "Length",
              value: formatDuration(minutesBetween(start, end)),
            },
          ]}
        />
      </Section>

      <Section>
        {outsideHours ? (
          <Note icon="lucide:triangle-alert">
            This break falls outside your operating hours (
            {formatTime(operationalPeriod.start_time.value)} –{" "}
            {formatTime(operationalPeriod.end_time.value)}), so it will have no
            effect on the timetable.
          </Note>
        ) : (
          <Note>
            Next you will see how this break applies across the week and decide
            whether any day needs to be different.
          </Note>
        )}
      </Section>
    </WizardStep>
  );
}

export default DefaultBreakStep;
