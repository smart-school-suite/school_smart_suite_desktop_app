import { Icon } from "@iconify/react";
import { TimeRangeInput } from "../../../../components/FormComponents/InputComponents";
import  { MultiSelectDropdown } from "../../../../components/Dropdowns/Dropdowns";
import { daysOfWeek } from "../../../../data/data";
import {  useRef } from "react";
import {
  setBreakPeriodField,
  setBreakPeriodValidation,
} from "../../../../Slices/Asynslices/semesterTimetableSlice";
import { useDispatch, useSelector } from "react-redux";
import { timeRangeSchema } from "../../../../ComponentConfig/YupValidationSchema";
function BreakPeriod({ handleClose }) {
  const daysOfWeekRef = useRef();
  const breakPeriodState = useSelector(
    (state) => state.semesterTimetable.hard_constraints.break_period,
  );
    const dispatch = useDispatch();
  return (
    <>
      <div className="d-flex flex-column gap-3">
        <div className="d-flex flex-row align-items-center justify-content-between w-100">
          <span className="m-0">Break Period</span>
          <span
            className="m-0"
            onClick={() => {
              handleClose();
            }}
          >
            <Icon icon="charm:cross" width="22" height="22" />
          </span>
        </div>
        <div className="d-flex flex-column gap-2 modal-content-container px-2">
          <div>
            <TimeRangeInput
              startValue={breakPeriodState.start_time.value ?? ""}
              endValue={breakPeriodState.end_time.value ?? ""}
              onStartTimeChange={(value) =>
                dispatch(setBreakPeriodField({ field: "start_time", value }))
              }
              onEndTimeChange={(value) =>
                dispatch(setBreakPeriodField({ field: "end_time", value }))
              }
              validationSchema={timeRangeSchema({
                optional: false,
              })}
              onStartTimeValidationChange={(value) =>
                dispatch(
                  setBreakPeriodValidation({
                    field: "start_time",
                    value,
                  }),
                )
              }
              onEndTimeValidationChange={(value) =>
                dispatch(
                  setBreakPeriodValidation({
                    field: "end_time",
                    value,
                  }),
                )
              }
            />
          </div>
          <div>
            <label htmlFor="operationalDays" className="font-size-sm">
              No Break Days
            </label>
            <MultiSelectDropdown
              data={daysOfWeek || []}
              displayKey={["label"]}
              valueKey={["value"]}
              direction="up"
              isLoading={false}
              placeholder={"Select Operational Days"}
              errorMessage={null}
              value={breakPeriodState.no_break_exceptions}
              onError={(error) => {}}
              error={null}
              ref={daysOfWeekRef}
              onSelect={(selected) => {
                const selectedValues = selected.map((item) => item.value);
                dispatch(
                  setBreakPeriodField({
                    field: "no_break_exceptions",
                    value: selectedValues,
                  }),
                );
              }}
            />
          </div>
          <div>
            <label htmlFor="breakPeriodDaysException" className="font-size-sm">
              Break Period Days Exception (optional)
            </label>
            {breakPeriodState.day_exceptions.map((exception) => (
              <div className="d-flex flex-row align-items-center justify-content-between">
                <span className="font-size-sm text-capitalize">{exception.day}</span>
                <div className="w-75">
                  <TimeRangeInput
                    startValue={
                      breakPeriodState?.day_exceptions?.find(
                        (e) => e.day === exception.day,
                      )?.start_time.value ?? ""
                    }
                    endValue={
                      breakPeriodState?.day_exceptions?.find(
                        (e) => e.day === exception.day,
                      )?.end_time.value ?? ""
                    }
                    onStartTimeChange={(value) =>
                      dispatch(
                        setBreakPeriodField({
                          field: "day_exceptions",
                          value: { day: exception.day, start_time: value },
                        }),
                      )
                    }
                    onEndTimeChange={(value) =>
                      dispatch(
                        setBreakPeriodField({
                          field: "day_exceptions",
                          value: { day: exception.day, end_time: value },
                        }),
                      )
                    }
                    validationSchema={timeRangeSchema({
                      optional: false,
                    })}
                    onStartTimeValidationChange={(value) =>
                      dispatch(
                        setBreakPeriodValidation({
                          field: "day_exceptions",
                          value: { day: exception.day, start_time: value },
                        }),
                      )
                    }
                    onEndTimeValidationChange={(value) =>
                      dispatch(
                        setBreakPeriodValidation({
                          field: "day_exceptions",
                          value: { day: exception.day, end_time: value },
                        }),
                      )
                    }
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
export default BreakPeriod;
