import { Icon } from "@iconify/react";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setOperationalPeriodField,
  setOperationalPeriodValidation,
} from "../../../../../../Slices/Asynslices/semesterTimetableSlice";
import { TimeRangeInput } from "../../../../../../components/FormComponents/InputComponents";
import VerticalDashedLine from "../../../../../../components/DashedLine/VerticalDashedLine";
import { parse, differenceInMinutes } from "date-fns";
import { timeRangeSchema } from "../../../../../../ComponentConfig/YupValidationSchema";
function ConfigureExceptionStep({
  handleClose,
  nextStep,
  previousStep,
  fullStep,
  currentStep,
}) {
  const dispatch = useDispatch();
  const operationalPeriod = useSelector(
    (state) => state.semesterTimetable.hard_constraints.operational_period,
  );
  const opDaysException = operationalPeriod.day_exceptions;
  const opDays = operationalPeriod.operational_days;

  const calculateDuration = (startTime, endTime) => {
    if (!startTime || !endTime) return "0.0";

    const startDate = parse(startTime, "HH:mm", new Date());
    const endDate = parse(endTime, "HH:mm", new Date());

    let minutesDiff = differenceInMinutes(endDate, startDate);

    if (minutesDiff < 0) {
      minutesDiff = minutesDiff + 1440;
    }

    const hoursDiff = minutesDiff / 60;
    return hoursDiff.toFixed(1);
  };
  return (
    <>
      <div className="px-2 d-flex flex-column gap-4">
        <div className="d-flex flex-row align-items-center justify-content-between">
          <span className="fw-semibold">Configure Custom Operating Days</span>
          <span
            onClick={() => {
              handleClose();
            }}
          >
            <Icon icon="charm:cross" width="22" height="22" />
          </span>
        </div>
        <div className="font-size-sm d-flex flex-row align-items-center justify-content-between">
          <p style={{ width: "500px" }}>
            Adjust the operating hours for the days you selected.
          </p>
          <p className="text-capitalize">
            step {currentStep} of {fullStep} completed
          </p>
        </div>
        <div className="modal-content-container px-1">
          <div className="d-flex flex-column gap-3">
            <div className="d-flex flex-column gap-2">
              {opDaysException.map((items, index) => {
                const duration = calculateDuration(
                  items.start_time?.value,
                  items.end_time?.value,
                );

                return (
                  <Fragment key={index}>
                    <div className="card font-size-sm rounded-4 p-2 d-flex flex-column gap-2 text-capitalize">
                      <div className="d-flex flex-row align-items-center justify-content-between">
                        <span className="fw-semibold">{items.day}</span>
                      </div>
                      <div className="d-flex flex-row align-items-end justify-content-between">
                        <div className="d-flex flex-column gap-2 justify-content-center">
                          <span>{items.start_time?.value || "--:--"}</span>
                          <div
                            style={{ height: "3rem" }}
                            className="d-flex flex-row align-items-center gap-2 justify-content-center"
                          >
                            <VerticalDashedLine thickness={1} />
                            <span className="fw-semibold">{duration} h</span>
                          </div>
                          <span>{items.end_time?.value || "--:--"}</span>
                        </div>
                      </div>
                    </div>
                    <TimeRangeInput
                      startValue={items.start_time?.value ?? ""}
                      endValue={items.end_time?.value ?? ""}
                      onStartTimeChange={(value) =>
                        dispatch(
                          setOperationalPeriodField({
                            field: "day_exceptions",
                            value: {
                              day: items.day.toLowerCase(),
                              start_time: value,
                            },
                          }),
                        )
                      }
                      onEndTimeChange={(value) =>
                        dispatch(
                          setOperationalPeriodField({
                            field: "day_exceptions",
                            value: {
                              day: items.day.toLowerCase(),
                              end_time: value,
                            },
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
                            value,
                          }),
                        )
                      }
                      onEndTimeValidationChange={(value) =>
                        dispatch(
                          setOperationalPeriodValidation({
                            field: "day_exceptions",
                            value,
                          }),
                        )
                      }
                    />
                  </Fragment>
                );
              })}
            </div>
          </div>
        </div>
        <div className="w-100 d-flex flex-row align-items-center justify-content-between">
          <div className="d-flex flex-column gap-1">
            <button
              className="font-size-sm d-flex flex-row border-none gap-2 bg-transparent px-0"
              onClick={previousStep}
            >
              <span>
                <Icon icon="material-symbols:arrow-back-rounded" />
              </span>
              <span>Back</span>
            </button>
          </div>
          <div>
            <button
              className="font-size-sm p-2 rounded-2 border-none primary-background text-white px-3"
              onClick={nextStep}
            >
              Next Step
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ConfigureExceptionStep;
