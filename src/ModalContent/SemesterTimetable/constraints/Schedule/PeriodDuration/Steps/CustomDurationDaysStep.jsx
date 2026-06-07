import { Icon } from "@iconify/react";
import RectangleSkeleton from "../../../../../../components/SkeletonPageLoader/RectangularSkeleton";
import { useGetSemesterTimetablePeriods } from "../../../../../../hooks/semesterTimetable/useSemesterTimetablePeriodDuration";
import { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import VerticalDashedLine from "../../../../../../components/DashedLine/VerticalDashedLine";
import { daysOfWeek } from "../../../../../../data/data";
import {
  addCustomPeriodDurationDays,
  removeCustomPeriodDurationDays,
  setCustomPeriodDuration,
} from "../../../../../../Slices/Asynslices/semesterTimetableSlice";
function CustomDurationDaysStep({
  handleClose,
  nextStep,
  previousStep,
  fullStep,
  currentStep,
}) {
  const { data: periods, isLoading, error } = useGetSemesterTimetablePeriods();
  const pDState = useSelector(
    (state) =>
      state.semesterTimetable.hard_constraints.schedule_period_duration_minutes,
  );
  const cPds = pDState.day_exceptions;
  const pD = pDState.duration_minutes;
  const operationalPeriod = useSelector(
    (state) => state.semesterTimetable.hard_constraints.operational_period,
  );
  const opDays = operationalPeriod.operational_days;
  const dispatch = useDispatch();
  return (
    <>
      <div className="px-2 d-flex flex-column gap-3">
        <div className="d-flex flex-row align-items-center justify-content-between">
          <span className="fw-semibold">Custom Duration Days</span>
          <span
            onClick={() => {
              handleClose();
            }}
          >
            <Icon icon="charm:cross" width="22" height="22" />
          </span>
        </div>
        <div
          className="scroll-bar-sm pe-1 height-auto overflow-x-hidden overflow-y-scroll overflow-y-auto d-flex flex-column gap-2 pb-4"
          style={{ maxHeight: "55dvh" }}
        >
          <div className="d-flex flex-column gap-3">
            <div className="font-size-sm d-flex flex-row align-items-center justify-content-between">
              <p style={{ width: "450px" }}>
                Configure days that use a different period duration than the
                default schedule.
              </p>
              <p className="text-capitalize">
                step {currentStep} of {fullStep} completed
              </p>
            </div>
            <div className="card p-2 rounded-4 d-flex flex-column gap-4 font-size-sm">
              <div>
                <span className="fw-semibold">Default Period Duration</span>
              </div>
              <div className="d-flex flex-column gap-2 mt-auto">
                <span className="fw-semibold">{pD} Minutes</span>
                <div className="d-flex flex-row align-items-center gap-1">
                  <Icon
                    icon="material-symbols:info-outline-rounded"
                    width={16}
                    height={16}
                  />
                  <span>
                    All unconfigured days will continue using this duration.
                  </span>
                </div>
              </div>
            </div>
            <div className="d-flex flex-column gap-4">
              <div className="d-flex flex-column gap-1">
                <div className="d-flex flex-column gap-2">
                  <span className="font-size-sm">
                    Which days use a different duration?
                  </span>
                  <div
                    className="border w-100 p-2 rounded-3 d-flex flex-row align-items-center justify-content-start gap-2 flex-wrap"
                    style={{ minHeight: "3rem", height: "auto" }}
                  >
                    {cPds.map((cPd, index) => (
                      <Fragment key={index}>
                        <button
                          className="font-size-sm border px-2 py-1 rounded-pill bg-transparent d-flex flex-row align-items-center gap-2"
                          onClick={() => {
                            dispatch(
                              removeCustomPeriodDurationDays({
                                day: cPd.day,
                              }),
                            );
                          }}
                        >
                          <span className="text-capitalize">{cPd.day}</span>
                          <Icon icon="iconoir:cancel" width={18} height={18} />
                        </button>
                      </Fragment>
                    ))}
                  </div>
                </div>
                <div className="d-flex flex-row align-items-center gap-1 font-size-sm text-muted mt-1">
                  <span>
                    <Icon icon="material-symbols:info-outline-rounded" />
                  </span>
                  <span>You can select Multiple days</span>
                </div>
              </div>
              <div className="d-flex flex-row flex-wrap gap-4 justify-content-center">
                {opDays.length >= 1
                  ? opDays
                      .filter((items) => !cPds.some((cBp) => cBp.day === items))
                      .map((items, index) => {
                        return (
                          <Fragment key={index}>
                            <button
                              className="font-size-sm border px-4 py-2 rounded-pill bg-transparent text-capitalize"
                              onClick={() => {
                                dispatch(
                                  addCustomPeriodDurationDays({
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
                      .filter(
                        (items) => !cPds.some((cBp) => cBp.day === items.value),
                      )
                      .map((items, index) => {
                        return (
                          <Fragment key={index}>
                            <button
                              className="font-size-sm border px-4 py-2 rounded-pill bg-transparent text-capitalize"
                              onClick={() => {
                                dispatch(
                                  addCustomPeriodDurationDays({
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
            <div className="d-flex flex-column gap-4">
              {cPds.length >= 1 ? (
                <div className="d-flex flex-column gap-3">
                  {cPds.map((cPd, index) => (
                    <Fragment key={index}>
                      <div className="card rounded-4 p-2 font-size-sm d-flex flex-column gap-2">
                        <div className="d-flex flex-row justify-content-between">
                          <span className="fw-semibold text-capitalize">
                            {cPd?.day}
                          </span>
                          <button
                            className="border-none primary-background-100 color-primary rounded-pill px-2 py-1"
                            style={{ fontSize: "0.7rem" }}
                          >
                            {cPd.duration_minutes ? cPd.duration_minutes : pD}{" "}
                            Minutes
                          </button>
                        </div>
                        <div className="d-flex flex-column gap-1">
                          <span className="fw-medium">
                            Select New Period Duration for {cPd?.day}
                          </span>
                          <div className="d-flex flex-row flex-wrap gap-2">
                            {isLoading ? (
                              [...Array(4)].map((_, index) => (
                                <Fragment key={index}>
                                  <RectangleSkeleton
                                    width={"24%"}
                                    height={"18dvh"}
                                  />
                                </Fragment>
                              ))
                            ) : error ? (
                              <div className="d-flex flex-grow-1 align-items-center justify-content-center">
                                <div className="d-flex flex-column align-items-center gap-2 text-center">
                                  <img
                                    src="./sss-maskot/timetable.png"
                                    alt="sss-timetable-maskot"
                                    style={{
                                      height: "200px",
                                      width: "200px",
                                      objectFit: "contain",
                                    }}
                                  />
                                  <span className="fw-semibold font-size-sm">
                                    {error.response.data.errors.title}
                                  </span>
                                  <p className="text-muted font-size-sm mb-0">
                                    {error.response.data.errors.description}
                                  </p>
                                </div>
                              </div>
                            ) : (
                              periods.data.map((period) => (
                                <Fragment key={period.id}>
                                  <button
                                    className="border-none rounded-4  d-flex flex-column text-start p-3 justify-content-between bg-white border shadow-sm"
                                    style={{ height: "18dvh", width: "24%" }}
                                    onClick={() => {
                                      dispatch(
                                        setCustomPeriodDuration({
                                          value: period.minutes,
                                          day: cPd.day,
                                        }),
                                      );
                                    }}
                                  >
                                    <div className="d-flex flex-row justify-content-between font-size-sm align-items-center">
                                      <span style={{ maxWidth: "75%" }}>
                                        {period?.name}
                                      </span>
                                      {cPd.duration_minutes ===
                                        period.minutes && (
                                        <span style={{ lineHeight: 0 }}>
                                          <Icon
                                            icon="material-symbols:check-circle-rounded"
                                            width={20}
                                            height={20}
                                            className="green-color"
                                          />
                                        </span>
                                      )}
                                    </div>
                                    <div>
                                      <span className="text-capitalize fw-medium font-size-sm">
                                        {period?.minutes} Minutes
                                      </span>
                                    </div>
                                  </button>
                                </Fragment>
                              ))
                            )}
                          </div>
                        </div>
                      </div>
                    </Fragment>
                  ))}
                </div>
              ) : (
                <div className="d-flex flex-column gap-1 text-center font-size-sm">
                  <span className="fw-medium">
                    No custom duration days configured.
                  </span>
                  <span>
                    All operating days will continue using the default duration.
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="w-100 d-flex flex-row align-items-center justify-content-between mt-2">
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
              Review Duration Policy
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default CustomDurationDaysStep;
