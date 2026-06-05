import { useSelector, useDispatch } from "react-redux";
import { Icon } from "@iconify/react";
import { timeRangeSchema } from "../../../../../../ComponentConfig/YupValidationSchema";
import { daysOfWeek } from "../../../../../../data/data";
import { Fragment } from "react";
import VerticalDashedLine from "../../../../../../components/DashedLine/VerticalDashedLine";
import { parse, format, differenceInMinutes } from "date-fns";
import {
  addCustomBreakDays,
  removeCustomBreakDays,
  setCustomBreakPeriodValidation,
  setCustomBreakPeriod,
} from "../../../../../../Slices/Asynslices/semesterTimetableSlice";
import { TimeRangeInput } from "../../../../../../components/FormComponents/InputComponents";
function CustomBreakDayStep({
  handleClose,
  nextStep,
  previousStep,
  fullStep,
  currentStep,
}) {
  const breakPeriodState = useSelector(
    (state) => state.semesterTimetable.hard_constraints.break_period,
  );
  const operationalPeriod = useSelector(
    (state) => state.semesterTimetable.hard_constraints.operational_period,
  );
  const noBpDays = breakPeriodState.no_break_exceptions;
  const cBps = breakPeriodState.day_exceptions;
  const opDays = operationalPeriod.operational_days;
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

  const calculateBreakDurationText = (start, end) => {
    if (!start || !end) return "0 Min";
    try {
      const referenceDate = new Date();
      const startTime = parse(start, "HH:mm", referenceDate);
      const endTime = parse(end, "HH:mm", referenceDate);

      const totalMinutes = differenceInMinutes(endTime, startTime);
      if (totalMinutes <= 0 || isNaN(totalMinutes)) return "0 Min";

      return `${totalMinutes} Min`;
    } catch (error) {
      return "0 Min";
    }
  };
  return (
    <>
      <div className="d-flex flex-column gap-2">
        <div className="d-flex flex-row align-items-center justify-content-between">
          <span className="fw-semibold">Custom Break Days</span>
          <span
            onClick={() => {
              handleClose();
            }}
            style={{ cursor: "pointer" }}
          >
            <Icon icon="charm:cross" width="22" height="22" />
          </span>
        </div>
        <div
          className="scroll-bar-sm px-1 height-auto overflow-x-hidden overflow-y-scroll overflow-y-auto"
          style={{ maxHeight: "65dvh", paddingBottom: "4rem" }}
        >
          <div className="d-flex flex-column gap-3">
            <div className="font-size-sm d-flex flex-row align-items-center justify-content-between">
              <p style={{ width: "500px" }}>
                Configure days that use a different break period than the
                default schedule.
              </p>
              <p className="text-capitalize">
                step {currentStep} of {fullStep} completed
              </p>
            </div>
            <div className="card font-size-sm rounded-4 p-2 d-flex flex-column gap-2 text-capitalize">
              <div className="d-flex flex-row align-items-center justify-content-between">
                <span className="fw-semibold">Break Policy Summary</span>
              </div>
              <div className="d-flex flex-row align-items-end justify-content-between">
                <div className="d-flex flex-column gap-2 justify-content-center ">
                  <span className="fw-semibold">
                    {formatTimeToAmPm(breakPeriodState?.start_time?.value)}
                  </span>
                  <div
                    style={{ height: "4rem" }}
                    className="d-flex flex-row align-items-center gap-2 justify-content-center"
                  >
                    <VerticalDashedLine thickness={1} />
                    <span className="fw-semibold text-muted font-size-xs">
                      {calculateBreakDurationText(
                        breakPeriodState?.start_time?.value,
                        breakPeriodState?.end_time?.value,
                      )}
                    </span>
                  </div>
                  <span className="fw-semibold">
                    {formatTimeToAmPm(breakPeriodState?.end_time?.value)}
                  </span>
                </div>
              </div>
            </div>
            <div className="card font-size-sm rounded-4 p-2 d-flex flex-column gap-2 text-capitalize">
              <div className="d-flex flex-row align-items-center justify-content-between">
                <span className="fw-semibold">Days Without Breaks</span>
              </div>
              <div>
                {noBpDays.map((day, index) => (
                  <Fragment key={index}>
                    <ul>
                      <li>{day}</li>
                    </ul>
                  </Fragment>
                ))}
              </div>
            </div>
            <div className="d-flex flex-column gap-4">
              <div className="d-flex flex-column gap-4">
                <div className="d-flex flex-column gap-1">
                  <div className="d-flex flex-column gap-2">
                    <span className="font-size-sm">
                      Which days have a different break period?
                    </span>
                    <div
                      className="border w-100 p-2 rounded-3 d-flex flex-row align-items-center justify-content-start gap-2 flex-wrap"
                      style={{ minHeight: "3rem", height: "auto" }}
                    >
                      {cBps.map((cBp, index) => (
                        <Fragment key={index}>
                          <button
                            className="font-size-sm border px-2 py-1 rounded-pill bg-transparent d-flex flex-row align-items-center gap-2"
                            onClick={() => {
                              dispatch(
                                removeCustomBreakDays({
                                  day: cBp.day,
                                }),
                              );
                            }}
                          >
                            <span className="text-capitalize">{cBp.day}</span>
                            <Icon
                              icon="iconoir:cancel"
                              width={18}
                              height={18}
                            />
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
                        .filter(
                          (items) =>
                            !cBps.some((cBp) => cBp.day === items) &&
                            !noBpDays.includes(items),
                        )
                        .map((items, index) => {
                          return (
                            <Fragment key={index}>
                              <button
                                className="font-size-sm border px-4 py-2 rounded-pill bg-transparent text-capitalize"
                                onClick={() => {
                                  dispatch(
                                    addCustomBreakDays({
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
                          (items) =>
                            !cBps.some((cBp) => cBp.day === items.value) &&
                            !noBpDays.includes(items.value),
                        )
                        .map((items, index) => {
                          return (
                            <Fragment key={index}>
                              <button
                                className="font-size-sm border px-4 py-2 rounded-pill bg-transparent text-capitalize"
                                onClick={() => {
                                  dispatch(
                                    addCustomBreakDays({
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
              <div className="d-flex flex-column gap-3">
                {cBps.map((cBp, index) => (
                  <Fragment key={index}>
                    <div className="card rounded-4 p-2 font-size-sm d-flex flex-column gap-3">
                      <span className="fw-semibold text-capitalize">
                        {cBp.day}
                      </span>
                      <TimeRangeInput
                        startValue={cBp.start_time.value ?? ""}
                        endValue={cBp.end_time.value ?? ""}
                        onStartTimeChange={(value) =>
                          dispatch(
                            setCustomBreakPeriod({
                              field: "start_time",
                              value,
                              day: cBp.day,
                            }),
                          )
                        }
                        onEndTimeChange={(value) =>
                          dispatch(
                            setCustomBreakPeriod({
                              field: "end_time",
                              value,
                              day: cBp.day,
                            }),
                          )
                        }
                        validationSchema={timeRangeSchema({
                          optional: false,
                        })}
                        onStartTimeValidationChange={(value) =>
                          dispatch(
                            setCustomBreakPeriodValidation({
                              field: "start_time",
                              value,
                              day: cBp.day,
                            }),
                          )
                        }
                        onEndTimeValidationChange={(value) =>
                          dispatch(
                            setCustomBreakPeriodValidation({
                              field: "end_time",
                              value,
                              day: cBp.day,
                            }),
                          )
                        }
                      />
                      <div className="d-flex flex-row align-items-center gap-2 px-1">
                        <span style={{ lineHeight: 0 }}>
                          <Icon
                            icon="mdi:clock-outline"
                            width={14}
                            height={14}
                          />
                        </span>
                        <div className="d-flex flex-row font-size-sm gap-1">
                          <span className="text-muted">Break Start:</span>
                          <span className="fw-semibold">
                            {formatTimeToAmPm(cBp.start_time.value)}
                          </span>
                        </div>
                        <div className="d-flex align-items-center justify-content-center text-muted">
                          <Icon icon="octicon:dash-16" width={14} height={14} />
                        </div>
                        <div className="d-flex flex-row font-size-sm gap-1">
                          <span className="text-muted">Break End:</span>
                          <span className="fw-semibold">
                            {formatTimeToAmPm(cBp.end_time.value)}
                          </span>
                        </div>
                        ,
                        <span className="fw-semibold">
                          {calculateBreakDurationText(
                            cBp.start_time.value,
                            cBp.end_time.value,
                          )}
                        </span>
                      </div>
                    </div>
                  </Fragment>
                ))}
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
              Review Break Policy
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default CustomBreakDayStep;
