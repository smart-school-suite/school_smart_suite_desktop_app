import { Icon } from "@iconify/react";
import { daysOfWeek } from "../../../../../data/data";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addRequestedAssignmentDays,
  removeRequestedAssignmentDays,
} from "../../../../../Slices/Asynslices/semesterTimetableSlice";
function RequestedAssignmentDays({
  handleClose,
  nextStep,
  previousStep,
  fullStep,
  currentStep,
}) {
  const dispatch = useDispatch();
  const opDays = useSelector(
    (state) =>
      state.semesterTimetable.hard_constraints.operational_period
        .operational_days,
  );
  const rADays = useSelector(
    (state) =>
      state.semesterTimetable.soft_constraints.requested_assignments.days,
  );

  return (
    <>
      <div className="px-2 d-flex flex-column gap-4">
        <div className="d-flex flex-row align-items-center justify-content-between">
          <span className="fw-semibold">Assignment Days</span>
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
                Select the days on which you would like to configure requested
                assignments.
              </p>
              <p className="text-capitalize">
                step {currentStep} of {fullStep} completed
              </p>
            </div>
            <div className="card p-2 rounded-4 d-flex flex-column">
              <ul className="d-flex flex-column font-size-sm">
                <li>
                  Requested assignments can be configured for one or more days.
                </li>
                <li>
                  Only selected days will appear during assignment
                  configuration.
                </li>
              </ul>
            </div>
            <div className="d-flex flex-column gap-1">
              <span className="font-size-sm">
                Only select days where you want to configure requested assignment
              </span>
              <div
                className="border w-100 p-2 rounded-3 d-flex flex-row align-items-center justify-content-start gap-2"
                style={{ height: "3rem" }}
              >
                {rADays.map((day, index) => (
                  <Fragment key={index}>
                    <button
                      className="font-size-sm border px-2 py-1 rounded-pill bg-transparent d-flex flex-row gap-2"
                      onClick={() => {
                        dispatch(
                          removeRequestedAssignmentDays({
                            day: day,
                          }),
                        );
                      }}
                    >
                      <span className="text-capitalize">{day}</span>
                      <Icon icon="iconoir:cancel" width={20} height={20} />
                    </button>
                  </Fragment>
                ))}
              </div>
              <div className="d-flex flex-row align-items-center gap-1 font-size-sm">
                <span>
                  <Icon icon="material-symbols:info-outline-rounded" />
                </span>
                <span>You can select multiple</span>
              </div>
            </div>
            <div className="d-flex flex-row flex-wrap gap-4 justify-content-center">
              {opDays.length >= 1
                ? opDays
                    .filter((items) => !rADays.includes(items))
                    .map((items, index) => {
                      return (
                        <Fragment key={index}>
                          <button
                            className="font-size-sm border px-4 py-2 rounded-pill bg-transparent text-capitalize"
                            onClick={() => {
                              dispatch(
                                addRequestedAssignmentDays({
                                  day: items,
                                }),
                              );
                            }}
                          >
                            {items}
                          </button>
                        </Fragment>
                      );
                    })
                : daysOfWeek
                    .filter((items) => !rADays.includes(items.value))
                    .map((items, index) => {
                      return (
                        <Fragment key={index}>
                          <button
                            className="font-size-sm border px-4 py-2 rounded-pill bg-transparent text-capitalize"
                            onClick={() => {
                              dispatch(
                                addRequestedAssignmentDays({
                                  day: items.value,
                                }),
                              );
                            }}
                          >
                            {items.label}
                          </button>
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
export default RequestedAssignmentDays;
