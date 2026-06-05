import { Icon } from "@iconify/react";
import { TimeRangeInput } from "../../../../../../components/FormComponents/InputComponents";
import { useSelector, useDispatch } from "react-redux";
import { timeRangeSchema } from "../../../../../../ComponentConfig/YupValidationSchema";
import {
  setDefaultBreakPeriodField,
  setDefaultBreakPeriodFieldValidation,
} from "../../../../../../Slices/Asynslices/semesterTimetableSlice";
import toast from "react-hot-toast";
import ToastSuccess from "../../../../../../components/Toast/ToastSuccess";
import { parse, format } from "date-fns";

function DefaultBreakStep({
  handleClose,
  nextStep,
  previousStep,
  fullStep,
  currentStep,
}) {
  const breakPeriodState = useSelector(
    (state) => state.semesterTimetable.hard_constraints.break_period,
  );
  const dispatch = useDispatch();

  const formatTimeToAmPm = (timeString) => {
    if (!timeString) return "N/A";
    try {
      const parsedDate = parse(timeString, "HH:mm", new Date());
      return format(parsedDate, "h:mm a");
    } catch (error) {
      return timeString; 
    }
  };

  return (
    <>
      <div className="d-flex flex-column gap-2">
        <div className="d-flex flex-row align-items-center justify-content-between">
          <span className="fw-semibold">Default Break Period</span>
          <span
            onClick={() => {
              handleClose();
            }}
            style={{ cursor: "pointer" }}
          >
            <Icon icon="charm:cross" width="22" height="22" />
          </span>
        </div>
        <div className="modal-content-container">
          <div className="d-flex flex-column gap-3">
            <div className="font-size-sm d-flex flex-row align-items-center justify-content-between">
              <p style={{ width: "500px" }}>
                Define the break schedule that will be applied to all operating
                days by default.
              </p>
              <p className="text-capitalize">
                step {currentStep} of {fullStep} completed
              </p>
            </div>
            <div className="card p-2 rounded-4 d-flex flex-column gap-2">
              <div>
                <span className="font-size-sm fw-semibold">
                  School Break Policy
                </span>
              </div>
              <div className="d-flex flex-column font-size-sm">
                <ul>
                  <li>
                    This break period will be used across all operating days
                    unless a specific day is configured differently.
                  </li>
                </ul>
              </div>
            </div>
            <div className="card p-2 rounded-4 d-flex flex-column gap-3">
              <TimeRangeInput
                startValue={breakPeriodState.start_time.value ?? ""}
                endValue={breakPeriodState.end_time.value ?? ""}
                onStartTimeChange={(value) =>
                  dispatch(
                    setDefaultBreakPeriodField({ field: "start_time", value }),
                  )
                }
                onEndTimeChange={(value) =>
                  dispatch(
                    setDefaultBreakPeriodField({ field: "end_time", value }),
                  )
                }
                validationSchema={timeRangeSchema({
                  optional: false,
                })}
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
              <div className="d-flex flex-row align-items-center gap-2 px-1">
                <div className="d-flex flex-row font-size-sm gap-1">
                  <span className="text-muted">Break Start:</span>
                  <span className="fw-semibold">
                    {formatTimeToAmPm(breakPeriodState?.start_time?.value)}
                  </span>
                </div>
                <div className="d-flex align-items-center justify-content-center text-muted">
                  <Icon icon="octicon:dash-16" width={14} />
                </div>
                <div className="d-flex flex-row font-size-sm gap-1">
                  <span className="text-muted">Break End:</span>
                  <span className="fw-semibold">
                    {formatTimeToAmPm(breakPeriodState?.end_time?.value)}
                  </span>
                </div>
              </div>
            </div>
            <div className="card p-2 rounded-4 d-flex flex-column gap-2">
              <div>
                <span className="font-size-sm fw-semibold">Next Step</span>
              </div>
              <div className="d-flex flex-column font-size-sm">
                <ul>
                  <li>
                    You'll review how this break period applies across the week
                    and decide whether any days should behave differently.
                  </li>
                </ul>
              </div>
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

export default DefaultBreakStep;