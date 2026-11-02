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
  setOperationalPeriodField,
  setOperationalPeriodValidation,
} from "../../../../../Slices/SemesterTimetable/semesterTimetableSlice";
import {
  formatDuration,
  formatTime,
  isValidRange,
  minutesBetween,
} from "../../../../../utils/semesterTimetable/timeUtils";

function DefaultHoursStep({ nextStep, previousStep }) {
  const dispatch = useDispatch();
  const operationalPeriod = useSelector(
    (state) => state.semesterTimetable.hard_constraints.operational_period,
  );
  const start = operationalPeriod.start_time.value;
  const end = operationalPeriod.end_time.value;
  const canContinue = isValidRange(start, end);

  return (
    <WizardStep
      title="Normal operating hours"
      description="Set the hours your institution is usually open. These hours apply to every operating day unless you add an exception later."
      footer={
        <WizardFooter
          onBack={previousStep}
          onNext={nextStep}
          nextDisabled={!canContinue}
          hint="Enter an opening and closing time"
        />
      }
    >
      <Section label="Opening and closing time">
        <TimeField>
          <TimeRangeInput
            startValue={start ?? ""}
            endValue={end ?? ""}
            onStartTimeChange={(value) =>
              dispatch(setOperationalPeriodField({ field: "start_time", value }))
            }
            onEndTimeChange={(value) =>
              dispatch(setOperationalPeriodField({ field: "end_time", value }))
            }
            validationSchema={timeRangeSchema({ optional: false })}
            onStartTimeValidationChange={(value) =>
              dispatch(
                setOperationalPeriodValidation({ field: "start_time", value }),
              )
            }
            onEndTimeValidationChange={(value) =>
              dispatch(
                setOperationalPeriodValidation({ field: "end_time", value }),
              )
            }
          />
        </TimeField>
      </Section>

      <Section label="Daily window">
        <Stats
          items={[
            { label: "Opens", value: formatTime(start) },
            { label: "Closes", value: formatTime(end) },
            {
              label: "Teaching window",
              value: formatDuration(minutesBetween(start, end)),
            },
          ]}
        />
      </Section>

      <Section>
        <Note>
          Use 24-hour time, for example <strong>08:00</strong> and{" "}
          <strong>17:00</strong>. Classes cannot be placed outside this window.
        </Note>
      </Section>
    </WizardStep>
  );
}

export default DefaultHoursStep;
