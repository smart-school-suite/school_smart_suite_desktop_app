import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { timeRangeSchema } from "../../../../../ComponentConfig/YupValidationSchema";
import { TimeRangeInput } from "../../../../../components/FormComponents/InputComponents";
import {
  Section,
  Segmented,
  Stats,
  TimeField,
  TimeSpan,
  WizardFooter,
  WizardStep,
} from "../../../../../components/SemesterTimetable/ConstraintWizard/WizardPrimitives";
import ToastSuccess from "../../../../../components/Toast/ToastSuccess";
import {
  addCustomBreakDays,
  addNoBreakPeriodDays,
  removeCustomBreakDays,
  removeNoBreakPeriodDays,
  setCustomBreakPeriod,
  setCustomBreakPeriodValidation,
} from "../../../../../Slices/SemesterTimetable/semesterTimetableSlice";
import {
  dayLabel,
  isValidRange,
  resolveScheduleDays,
} from "../../../../../utils/semesterTimetable/timeUtils";

const MODES = [
  { value: "default", label: "Default" },
  { value: "custom", label: "Custom" },
  { value: "none", label: "No break" },
];

const dayUnit = (count) => (count === 1 ? "day" : "days");

function ReviewStep({ handleClose, previousStep }) {
  const dispatch = useDispatch();
  const breakPeriod = useSelector(
    (state) => state.semesterTimetable.hard_constraints.break_period,
  );
  const operationalPeriod = useSelector(
    (state) => state.semesterTimetable.hard_constraints.operational_period,
  );
  const noBreakDays = breakPeriod.no_break_exceptions;
  const customBreaks = breakPeriod.day_exceptions;
  const days = resolveScheduleDays(operationalPeriod.operational_days);
  const defaultStart = breakPeriod.start_time.value;
  const defaultEnd = breakPeriod.end_time.value;

  const modeFor = (day) => {
    if (customBreaks.some((item) => item.day === day)) return "custom";
    if (noBreakDays.includes(day)) return "none";
    return "default";
  };

  const changeMode = (day, nextMode) => {
    const currentMode = modeFor(day);
    if (currentMode === "custom") dispatch(removeCustomBreakDays({ day }));
    if (currentMode === "none") dispatch(removeNoBreakPeriodDays({ day }));

    if (nextMode === "none") dispatch(addNoBreakPeriodDays({ day }));
    if (nextMode === "custom") {
      dispatch(addCustomBreakDays({ day }));
      // Start from the default break so only the difference needs typing.
      if (defaultStart) {
        dispatch(
          setCustomBreakPeriod({ field: "start_time", value: defaultStart, day }),
        );
      }
      if (defaultEnd) {
        dispatch(
          setCustomBreakPeriod({ field: "end_time", value: defaultEnd, day }),
        );
      }
    }
  };

  const counts = days.reduce(
    (acc, day) => ({ ...acc, [modeFor(day)]: acc[modeFor(day)] + 1 }),
    { default: 0, custom: 0, none: 0 },
  );
  const allCustomValid = customBreaks.every((item) =>
    isValidRange(item.start_time.value, item.end_time.value),
  );

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
      title="Review break policy"
      description="Confirm the break for each day. You can still switch any day between the default break, a custom time, or no break."
      footer={
        <WizardFooter
          onBack={previousStep}
          onNext={save}
          nextLabel="Save break policy"
          nextIcon="lucide:check"
          nextDisabled={!allCustomValid}
          hint="Fix the custom break times first"
        />
      }
    >
      <Section label="Summary">
        <Stats
          items={[
            { label: "Default break", value: counts.default, unit: dayUnit(counts.default) },
            { label: "Custom break", value: counts.custom, unit: dayUnit(counts.custom) },
            { label: "No break", value: counts.none, unit: dayUnit(counts.none) },
          ]}
        />
      </Section>

      <Section label="Break by day">
        <ul className="cw-daylist">
          {days.map((day) => {
            const mode = modeFor(day);
            const customBreak = customBreaks.find((item) => item.day === day);
            return (
              <li
                key={day}
                className={`cw-dayrow ${mode === "none" ? "is-muted" : ""}`}
              >
                <span className="cw-dayrow__day">{dayLabel(day)}</span>
                <span className="cw-dayrow__value">
                  {mode === "none" ? (
                    <span className="cw-muted">No break</span>
                  ) : mode === "custom" ? (
                    <TimeSpan
                      start={customBreak.start_time.value}
                      end={customBreak.end_time.value}
                      emptyLabel="Time not set"
                    />
                  ) : (
                    <TimeSpan start={defaultStart} end={defaultEnd} />
                  )}
                </span>
                <span className="cw-dayrow__meta">
                  <Segmented
                    label={`Break for ${dayLabel(day)}`}
                    value={mode}
                    options={MODES}
                    onChange={(nextMode) => changeMode(day, nextMode)}
                  />
                </span>
                {mode === "custom" && (
                  <div className="cw-dayrow__extra">
                    <TimeField>
                      <TimeRangeInput
                        key={`${day}-custom`}
                        startValue={customBreak.start_time.value ?? ""}
                        endValue={customBreak.end_time.value ?? ""}
                        onStartTimeChange={(value) =>
                          dispatch(
                            setCustomBreakPeriod({
                              field: "start_time",
                              value,
                              day,
                            }),
                          )
                        }
                        onEndTimeChange={(value) =>
                          dispatch(
                            setCustomBreakPeriod({
                              field: "end_time",
                              value,
                              day,
                            }),
                          )
                        }
                        validationSchema={timeRangeSchema({ optional: false })}
                        onStartTimeValidationChange={(value) =>
                          dispatch(
                            setCustomBreakPeriodValidation({
                              field: "start_time",
                              value,
                              day,
                            }),
                          )
                        }
                        onEndTimeValidationChange={(value) =>
                          dispatch(
                            setCustomBreakPeriodValidation({
                              field: "end_time",
                              value,
                              day,
                            }),
                          )
                        }
                      />
                    </TimeField>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </Section>
    </WizardStep>
  );
}

export default ReviewStep;
