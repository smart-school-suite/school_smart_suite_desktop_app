import { Icon } from "@iconify/react";
import {
  TimeInput,
  TimeRangeInput,
} from "../../../../components/FormComponents/InputComponents";
import CustomDropdown, {
  MultiSelectDropdown,
} from "../../../../components/Dropdowns/Dropdowns";
import { daysOfWeek } from "../../../../data/data";
import { Fragment, useRef } from "react";
import {
  setOperationalPeriodField,
  setOperationalPeriodValidation,
} from "../../../../Slices/Asynslices/semesterTimetableSlice";
import { useDispatch, useSelector } from "react-redux";
import { timeRangeSchema } from "../../../../ComponentConfig/YupValidationSchema";
function OperationalPeriod({ handleClose }) {
  const daysOfWeekRef = useRef();
  const operationalPeriodState = useSelector(
    (state) => state.semesterTimetable.hard_constraints.operational_period,
  );
  const dispatch = useDispatch();
  return (
    <>
      <div className="d-flex flex-column gap-3 ">
        <div className="d-flex flex-row align-items-center justify-content-between w-100 px-2">
          <span className="m-0">Operational Period</span>
          <span
            className="m-0"
            onClick={() => {
              handleClose();
            }}
          >
            <Icon icon="charm:cross" width="22" height="22" />
          </span>
        </div>
        <div className="d-flex flex-column modal-content-container px-2">
          <div>
            <TimeRangeInput
              startValue={operationalPeriodState.start_time.value ?? ""}
              endValue={operationalPeriodState.end_time.value ?? ""}
              onStartTimeChange={(value) =>
                dispatch(
                  setOperationalPeriodField({ field: "start_time", value }),
                )
              }
              onEndTimeChange={(value) =>
                dispatch(setOperationalPeriodField({ field: "end_time", value }))
              }
              validationSchema={timeRangeSchema({
                optional: false,
              })}
              onStartTimeValidationChange={(value) =>
                dispatch(
                  setOperationalPeriodValidation({
                    field: "start_time",
                    value,
                  }),
                )
              }
              onEndTimeValidationChange={(value) =>
                dispatch(
                  setOperationalPeriodValidation({
                    field: "end_time",
                    value,
                  }),
                )
              }
            />
          </div>
          <div>
            <label htmlFor="operationalDays" className="font-size-sm">
              Operational Days
            </label>
            <MultiSelectDropdown
              data={daysOfWeek || []}
              displayKey={["label"]}
              valueKey={["value"]}
              direction="up"
              isLoading={false}
              placeholder={"Select Operational Days"}
              errorMessage={"Operational Days Required"}
              value={operationalPeriodState.operational_days}
              onError={(error) => {}}
              error={null}
              ref={daysOfWeekRef}
              onSelect={(selected) => {
                const selectedValues = selected.map((item) => item.value);
                dispatch(
                  setOperationalPeriodField({
                    field: "operational_days",
                    value: selectedValues,
                  }),
                );
              }}
            />
          </div>
          <div>
            <label htmlFor="operationalDaysException" className="font-size-sm">
              Operational Days Exception (optional)
            </label>
            {operationalPeriodState?.operational_days?.map((day, index) => (
              <Fragment key={index}>
                <div className="d-flex w-100 flex-row align-items-center justify-content-between">
                  <span className="font-size-sm text-capitalize">{day}</span>
                  <div className="w-75">
                    <TimeRangeInput
                      startValue={operationalPeriodState?.day_exceptions?.find((exception) => exception.day === day)?.start_time.value ?? ""}
                      endValue={operationalPeriodState?.day_exceptions?.find((exception) => exception.day === day)?.end_time.value ?? ""}
                      onStartTimeChange={(value) =>
                        dispatch(
                          setOperationalPeriodField({
                            field: "day_exceptions",
                            value: { day, start_time: value },
                          }),
                        )
                      }
                      onEndTimeChange={(value) =>
                        dispatch(
                          setOperationalPeriodField({
                            field: "day_exceptions",
                            value: { day, end_time: value },
                          }),
                        )
                      }
                      validationSchema={timeRangeSchema({
                        optional: false,
                      })}
                      onStartTimeValidationChange={(value) =>
                        dispatch(
                          setOperationalPeriodValidation({
                            field: "day_exceptions",
                            value: { day, start_time: value },
                          }),
                        )
                      }
                      onEndTimeValidationChange={(value) =>
                        dispatch(
                          setOperationalPeriodValidation({
                            field: "day_exceptions",
                            value: { day, end_time: value },
                          }),
                        )
                      }
                    />
                  </div>
                </div>
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
export default OperationalPeriod;
