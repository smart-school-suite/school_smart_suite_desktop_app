import { Icon } from "@iconify/react";
import { daysOfWeek } from "../../../../../../data/data";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOperationalPeriodField } from "../../../../../../Slices/Asynslices/semesterTimetableSlice";
function ExceptionDaysStep({
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
  return (
    <>
      <div className="px-2 d-flex flex-column gap-4">
        <div className="d-flex flex-row align-items-center justify-content-between">
          <span className="fw-semibold">Customize Specific Days</span>
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
                Adjust the operating hours for the days you selected.
              </p>
              <p className="text-capitalize">
                step {currentStep} of {fullStep} completed
              </p>
            </div>
            <div className="card p-2 rounded-4 d-flex flex-column gap-2">
              <div>
                <span className="font-size-sm fw-semibold">
                  Normal Operating Hours
                </span>
              </div>
              <div className="d-flex flex-column font-size-sm">
                <ul>
                  <li>
                    <div className="d-flex flex-row align-items-center gap-2">
                      <span>
                        {operationalPeriod.start_time.value} -
                        {operationalPeriod.end_time.value}
                      </span>
                    </div>
                  </li>
                  <li>Applied to all operating days.</li>
                </ul>
              </div>
            </div>
            <div className="d-flex flex-column gap-1">
              <span className="font-size-sm">Which days are different?</span>
              <div
                className="border w-100 p-2 rounded-3 d-flex flex-row align-items-center justify-content-start gap-2"
                style={{ height: "3rem" }}
              >
                {opDaysException.map((items, index) => (
                  <Fragment key={index}>
                    <button
                      className="font-size-sm border px-2 py-1 rounded-pill bg-transparent d-flex flex-row gap-2"
                      onClick={() => {
                        dispatch(
                          setOperationalPeriodField({
                            field: "day_exceptions",
                            value: {
                              day: items.day.toLowerCase(),
                            },
                          }),
                        );
                      }}
                    >
                      <span className="text-capitalize">{items.day}</span>
                      <Icon icon="iconoir:cancel" width={20} height={20} />
                    </button>
                  </Fragment>
                ))}
              </div>
              <div className="d-flex flex-row align-items-center gap-1 font-size-sm">
                <span>
                  <Icon icon="material-symbols:info-outline-rounded" />
                </span>
                <span>
                  Only select days that do not follow the normal schedule.
                </span>
              </div>
            </div>
            <div className="d-flex flex-row flex-wrap gap-4 justify-content-center">
              {opDays
                .filter(
                  (items) =>
                    !opDaysException.some(
                      (exception) => exception.day === items,
                    ),
                )
                .map((items, index) => (
                  <Fragment key={index}>
                    <button
                      className="font-size-sm border px-4 py-2 rounded-pill bg-transparent text-capitalize"
                      onClick={() => {
                        dispatch(
                          setOperationalPeriodField({
                            field: "day_exceptions",
                            value: {
                              day: items.toLowerCase(),
                            },
                          }),
                        );
                      }}
                    >
                      {items}
                    </button>
                  </Fragment>
                ))}
            </div>
            {opDaysException.length === 0 ? (
              <div className="d-flex flex-column justify-content-center w-100 align-items-start font-size-sm">
                <ul>
                  <li>No Custom Operating Days Selected</li>
                  <li>
                    All operating days will use:{" "}
                    {operationalPeriod?.start_time?.value} -{" "}
                    {operationalPeriod?.end_time?.value}
                  </li>
                </ul>
              </div>
            ) : opDaysException.length === 1 ? (
              <div className="d-flex flex-column justify-content-center w-100 align-items-start font-size-sm">
                <ul>
                  <li>1 Custom Operating Day Selected</li>
                  <li className="text-capitalize">
                    {opDaysException[0]?.day} will be configured in the next
                    step
                  </li>
                </ul>
              </div>
            ) : (
              <div className="d-flex flex-column text-start w-100 align-items-start font-size-sm">
                <ul>
                  <span className="fw-medium">
                    {opDaysException.length} Custom Operating Days Selected
                  </span>
                  {opDaysException.map((item, index) => (
                    <li className="text-capitalize" key={index}>
                      {item.day}
                    </li>
                  ))}
                  <span>Custom operating hours will be configured next.</span>
                </ul>
              </div>
            )}
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
export default ExceptionDaysStep;
