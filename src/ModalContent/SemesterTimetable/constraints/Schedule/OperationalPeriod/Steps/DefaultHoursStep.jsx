import { Icon } from "@iconify/react";
import { TimeRangeInput } from "../../../../../../components/FormComponents/InputComponents";
import { useSelector, useDispatch } from "react-redux";
import {
  setOperationalPeriodField,
  setOperationalPeriodValidation,
} from "../../../../../../Slices/Asynslices/semesterTimetableSlice";
import { timeRangeSchema } from "../../../../../../ComponentConfig/YupValidationSchema";
function DefaultHoursStep({ handleClose, nextStep, previousStep, fullStep, currentStep }) {
  const operationalPeriodState = useSelector(
    (state) => state.semesterTimetable.hard_constraints.operational_period,
  );
  const dispatch = useDispatch();
  return (
    <>
      <div className="px-2 d-flex flex-column gap-3">
        <div className="d-flex flex-row align-items-center justify-content-between">
          <span className="fw-semibold">Normal Operating Hours</span>
          <span
            onClick={() => {
              handleClose();
            }}
          >
            <Icon icon="charm:cross" width="22" height="22" />
          </span>
        </div>
        <div className="modal-content-container">
          <div className="d-flex flex-column gap-3">
            <div className="font-size-sm d-flex flex-row align-items-center justify-content-between">
              <p style={{ width: "500px" }}>
                Define the hours during which your institution is generally
                available for scheduling classes
              </p>
              <p className="text-capitalize">
                step {currentStep} of {fullStep} completed
              </p>
            </div>
            <div className="card p-2 rounded-4 d-flex flex-column gap-2">
              <div>
                <span className="font-size-sm fw-semibold">
                  Why is this important
                </span>
              </div>
              <div className="d-flex flex-column font-size-sm">
                <ul>
                  <li>
                    These hours establish the scheduling window used by the
                    timetable generator.
                  </li>
                  <li>Classes cannot be placed outside these hours.</li>
                </ul>
              </div>
            </div>
            <div>
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
                    dispatch(
                      setOperationalPeriodField({ field: "end_time", value }),
                    )
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
              <div className="d-flex flex-row align-items-center gap-2">
                <div className="d-flex flex-row font-size-sm gap-1">
                  <span>Opens At</span>
                  <span>{operationalPeriodState.start_time.value}</span>
                </div>
                <div>
                  <span>
                    <Icon icon="octicon:dash-16" />
                  </span>
                </div>
                <div className="d-flex flex-row font-size-sm gap-1">
                  <span>Closes At</span>
                  <span>{operationalPeriodState.end_time.value}</span>
                </div>
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
                {" "}
                <Icon icon="material-symbols:arrow-back-rounded" />{" "}
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
export default DefaultHoursStep;
