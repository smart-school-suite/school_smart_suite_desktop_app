import { useSelector, useDispatch } from "react-redux";
import { Icon } from "@iconify/react";
import { timeRangeSchema } from "../../../../../../ComponentConfig/YupValidationSchema";
import { daysOfWeek } from "../../../../../../data/data";
import { Fragment } from "react";
import VerticalDashedLine from "../../../../../../components/DashedLine/VerticalDashedLine";
import { parse, format, differenceInMinutes } from "date-fns";
import { TimeRangeInput } from "../../../../../../components/FormComponents/InputComponents";
import {
  addCustomBreakDays,
  removeCustomBreakDays,
  setCustomBreakPeriodValidation,
  setCustomBreakPeriod,
  addNoBreakPeriodDays,
  removeNoBreakPeriodDays,
} from "../../../../../../Slices/Asynslices/semesterTimetableSlice";
import NumberFlow from "@number-flow/react";
import toast from "react-hot-toast";
import ToastSuccess from "../../../../../../components/Toast/ToastSuccess";
function ReviewStep({
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
          <span className="fw-semibold">Review Break Policy</span>
          <span
            onClick={() => {
              handleClose();
            }}
            style={{ cursor: "pointer" }}
          >
            <Icon icon="charm:cross" width="22" height="22" />
          </span>
        </div>
        <div className="d-flex flex-column gap-3">
          <div className="font-size-sm d-flex flex-row align-items-center justify-content-between">
            <p style={{ width: "500px" }}>
              Review your break period configuration before applying it to
              timetable generation.
            </p>
            <p className="text-capitalize">
              step {currentStep} of {fullStep} completed
            </p>
          </div>
        </div>
        <div className="modal-content-container d-flex flex-column gap-2">
          <div
            className="scroll-bar-sm pe-1 height-auto overflow-x-hidden overflow-y-scroll overflow-y-auto d-flex flex-column gap-3"
            style={{ maxHeight: "35dvh" }}
          >
            {opDays.length >= 1
              ? opDays.map((opDay, index) => {
                  const isCustomBreak = cBps.some((cBp) => cBp.day === opDay);
                  const isNoBreak = noBpDays.includes(opDay);
                  return isCustomBreak ? (
                    <Fragment key={index}>
                      <div className="card rounded-4 p-2 font-size-sm d-flex flex-column gap-3">
                        <div className="d-flex flex-row justify-content-between align-items-center">
                          <span className="fw-semibold text-capitalize">
                            {opDay}
                          </span>
                          <div className="d-flex flex-row align-items-center gap-2">
                            {isCustomBreak && (
                              <button
                                className="py-1 rounded-pill px-2 border-none"
                                style={{
                                  background: "#ffebd3",
                                  color: "#ff690c",
                                  fontSize: "0.7rem",
                                }}
                              >
                                custom break
                              </button>
                            )}
                            <button
                              className="d-flex flex-row align-items-center gap-2 px-3 py-2 border-none rounded-3 transparent-bg"
                              onClick={() => {
                                isCustomBreak
                                  ? dispatch(
                                      removeCustomBreakDays({
                                        day: opDay,
                                      }),
                                    )
                                  : dispatch(
                                      addNoBreakPeriodDays({
                                        day: opDay,
                                      }),
                                    );
                              }}
                            >
                              <span>
                                <Icon
                                  icon="material-symbols:cancel-outline-rounded"
                                  width={20}
                                  height={20}
                                />
                              </span>
                            </button>
                          </div>
                        </div>
                        <TimeRangeInput
                          startValue={
                            isCustomBreak
                              ? cBps.find((cBps) => cBps.day === opDay).start_time
                                  ?.value
                              : (breakPeriodState.start_time.value ?? "")
                          }
                          endValue={
                            isCustomBreak
                              ? cBps.find((cBps) => cBps.day === opDay).end_time
                                  ?.value
                              : (breakPeriodState.end_time.value ?? "")
                          }
                          onStartTimeChange={(value) => {
                            isCustomBreak
                              ? dispatch(
                                  setCustomBreakPeriod({
                                    field: "start_time",
                                    value,
                                    day: opDay,
                                  }),
                                )
                              : dispatch(
                                  addCustomBreakDays({
                                    day: opDay,
                                  }),
                                );
                            dispatch(
                              setCustomBreakPeriod({
                                field: "start_time",
                                value,
                                day: opDay,
                              }),
                            );
                          }}
                          onEndTimeChange={(value) => {
                            isCustomBreak
                              ? dispatch(
                                  setCustomBreakPeriod({
                                    field: "end_time",
                                    value,
                                    day: opDay,
                                  }),
                                )
                              : dispatch(
                                  addCustomBreakDays({
                                    day: opDay,
                                  }),
                                );
                            dispatch(
                              setCustomBreakPeriod({
                                field: "end_time",
                                value,
                                day: opDay,
                              }),
                            );
                          }}
                          validationSchema={timeRangeSchema({
                            optional: false,
                          })}
                          onStartTimeValidationChange={(value) => {
                            isCustomBreak
                              ? dispatch(
                                  setCustomBreakPeriodValidation({
                                    field: "start_time",
                                    value,
                                    day: opDay,
                                  }),
                                )
                              : dispatch(
                                  addCustomBreakDays({
                                    day: opDay,
                                  }),
                                );
                            dispatch(
                              setCustomBreakPeriodValidation({
                                field: "start_time",
                                value,
                                day: opDay,
                              }),
                            );
                          }}
                          onEndTimeValidationChange={(value) => {
                            isCustomBreak
                              ? dispatch(
                                  setCustomBreakPeriodValidation({
                                    field: "end_time",
                                    value,
                                    day: opDay,
                                  }),
                                )
                              : dispatch(
                                  addCustomBreakDays({
                                    day: opDay,
                                  }),
                                );
                            dispatch(
                              setCustomBreakPeriodValidation({
                                field: "end_time",
                                value,
                                day: opDay,
                              }),
                            );
                          }}
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
                              {formatTimeToAmPm(
                                isCustomBreak
                                  ? cBps.find((cBps) => cBps.day === opDay)
                                      .start_time?.value
                                  : (breakPeriodState.start_time.value ?? ""),
                              )}
                            </span>
                          </div>
                          <div className="d-flex align-items-center justify-content-center text-muted">
                            <Icon
                              icon="octicon:dash-16"
                              width={14}
                              height={14}
                            />
                          </div>
                          <div className="d-flex flex-row font-size-sm gap-1">
                            <span className="text-muted">Break End:</span>
                            <span className="fw-semibold">
                              {formatTimeToAmPm(
                                isCustomBreak
                                  ? cBps.find((cBps) => cBps.day === opDay)
                                      .end_time?.value
                                  : (breakPeriodState?.end_time?.value ?? ""),
                              )}
                            </span>
                          </div>
                          ,
                          <span className="fw-semibold">
                            {calculateBreakDurationText(
                              isCustomBreak
                                ? cBps.find((cBps) => cBps.day === opDay)
                                    .start_time?.value
                                : (breakPeriodState.start_time.value ?? ""),
                              isCustomBreak
                                ? cBps.find((cBps) => cBps.day === opDay).end_time
                                    ?.value
                                : (breakPeriodState.end_time.value ?? ""),
                            )}
                          </span>
                        </div>
                      </div>
                    </Fragment>
                  ) : isNoBreak ? (
                    <Fragment key={index}>
                      <div className="card rounded-4 p-2 font-size-sm d-flex flex-column align-items-center gap-4 font-size-sm">
                        <span className="fw-semibold">{opDay}</span>
                        <div className="d-flex flex-column gap-1 align-items-center">
                          <div className="d-flex flex-column align-items-center">
                            <span className="fw-medium">No Break Period</span>
                            <p className="text-muted">
                              {opDay} is selected as a day without breaks
                            </p>
                          </div>
                          <button
                            className="font-size-sm border-none rounded-pill p-2 primary-background text-white"
                            style={{ width: "5rem" }}
                            onClick={() => {
                              dispatch(
                                removeNoBreakPeriodDays({
                                  day: opDay,
                                }),
                              );
                            }}
                          >
                            Add Day
                          </button>
                        </div>
                      </div>
                    </Fragment>
                  ) : (
                    <Fragment key={index}>
                      <div className="card rounded-4 p-2 font-size-sm d-flex flex-column gap-3">
                        <div className="d-flex flex-row justify-content-between align-items-center">
                          <span className="fw-semibold text-capitalize">
                            {opDay}
                          </span>
                          <div className="d-flex flex-row align-items-center gap-2">
                            {isCustomBreak && (
                              <button
                                className="rounded-pill px-2 border-none"
                                style={{
                                  background: "#ffebd3",
                                  color: "#ff690c",
                                  fontSize: "0.6rem",
                                }}
                              >
                                custom break
                              </button>
                            )}
                            <button
                              className="d-flex flex-row align-items-center gap-2 px-3 py-2 border-none rounded-3 transparent-bg"
                              onClick={() => {
                                isCustomBreak
                                  ? dispatch(
                                      removeCustomBreakDays({
                                        day: opDay,
                                      }),
                                    )
                                  : dispatch(
                                      addNoBreakPeriodDays({
                                        day: opDay,
                                      }),
                                    );
                              }}
                            >
                              <span>
                                <Icon
                                  icon="material-symbols:cancel-outline-rounded"
                                  width={20}
                                  height={20}
                                />
                              </span>
                            </button>
                          </div>
                        </div>
                        <TimeRangeInput
                          startValue={
                            isCustomBreak
                              ? cBps.find((cBps) => cBps.day === opDay).start_time
                                  ?.value
                              : (breakPeriodState.start_time.value ?? "")
                          }
                          endValue={
                            isCustomBreak
                              ? cBps.find((cBps) => cBps.day === opDay).end_time
                                  ?.value
                              : (breakPeriodState.end_time.value ?? "")
                          }
                          onStartTimeChange={(value) => {
                            isCustomBreak
                              ? dispatch(
                                  setCustomBreakPeriod({
                                    field: "start_time",
                                    value,
                                    day: opDay,
                                  }),
                                )
                              : dispatch(
                                  addCustomBreakDays({
                                    day: opDay,
                                  }),
                                );
                            dispatch(
                              setCustomBreakPeriod({
                                field: "start_time",
                                value,
                                day: opDay,
                              }),
                            );
                          }}
                          onEndTimeChange={(value) => {
                            isCustomBreak
                              ? dispatch(
                                  setCustomBreakPeriod({
                                    field: "end_time",
                                    value,
                                    day: opDay,
                                  }),
                                )
                              : dispatch(
                                  addCustomBreakDays({
                                    day: opDay,
                                  }),
                                );
                            dispatch(
                              setCustomBreakPeriod({
                                field: "end_time",
                                value,
                                day: opDay,
                              }),
                            );
                          }}
                          validationSchema={timeRangeSchema({
                            optional: false,
                          })}
                          onStartTimeValidationChange={(value) => {
                            isCustomBreak
                              ? dispatch(
                                  setCustomBreakPeriodValidation({
                                    field: "start_time",
                                    value,
                                    day: opDay,
                                  }),
                                )
                              : dispatch(
                                  addCustomBreakDays({
                                    day: opDay,
                                  }),
                                );
                            dispatch(
                              setCustomBreakPeriodValidation({
                                field: "start_time",
                                value,
                                day: opDay,
                              }),
                            );
                          }}
                          onEndTimeValidationChange={(value) => {
                            isCustomBreak
                              ? dispatch(
                                  setCustomBreakPeriodValidation({
                                    field: "end_time",
                                    value,
                                    day: opDay,
                                  }),
                                )
                              : dispatch(
                                  addCustomBreakDays({
                                    day: opDay,
                                  }),
                                );
                            dispatch(
                              setCustomBreakPeriodValidation({
                                field: "end_time",
                                value,
                                day: opDay,
                              }),
                            );
                          }}
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
                              {formatTimeToAmPm(
                                isCustomBreak
                                  ? cBps.find((cBps) => cBps.day === opDay)
                                      .start_time?.value
                                  : (breakPeriodState.start_time.value ?? ""),
                              )}
                            </span>
                          </div>
                          <div className="d-flex align-items-center justify-content-center text-muted">
                            <Icon
                              icon="octicon:dash-16"
                              width={14}
                              height={14}
                            />
                          </div>
                          <div className="d-flex flex-row font-size-sm gap-1">
                            <span className="text-muted">Break End:</span>
                            <span className="fw-semibold">
                              {formatTimeToAmPm(
                                isCustomBreak
                                  ? cBps.find((cBps) => cBps.day === opDay)
                                      .end_time?.value
                                  : (breakPeriodState?.end_time?.value ?? ""),
                              )}
                            </span>
                          </div>
                          ,
                          <span className="fw-semibold">
                            {calculateBreakDurationText(
                              isCustomBreak
                                ? cBps.find((cBps) => cBps.day === opDay)
                                    .start_time?.value
                                : (breakPeriodState.start_time.value ?? ""),
                              isCustomBreak
                                ? cBps.find((cBps) => cBps.day === opDay).end_time
                                    ?.value
                                : (breakPeriodState.end_time.value ?? ""),
                            )}
                          </span>
                        </div>
                      </div>
                    </Fragment>
                  );
                })
              : daysOfWeek.map((day, index) => {
                  const isCustomBreak = cBps.some(
                    (cBp) => cBp.day === day.value,
                  );
                  const isNoBreak = noBpDays.includes(day.value);
                  return isCustomBreak ? (
                    <Fragment key={index}>
                      <div className="card rounded-4 p-2 font-size-sm d-flex flex-column gap-3">
                        <div className="d-flex flex-row justify-content-between align-items-center">
                          <span className="fw-semibold text-capitalize">
                            {day.label}
                          </span>
                          <div className="d-flex flex-row align-items-center gap-2">
                            {isCustomBreak && (
                              <button
                                className="py-1 rounded-pill px-2 border-none"
                                style={{
                                  background: "#ffebd3",
                                  color: "#ff690c",
                                  fontSize: "0.7rem",
                                }}
                              >
                                custom break
                              </button>
                            )}
                            <button
                              className="d-flex flex-row align-items-center gap-2 px-3 py-2 border-none rounded-3 transparent-bg"
                              onClick={() => {
                                isCustomBreak
                                  ? dispatch(
                                      removeCustomBreakDays({
                                        day: day.value,
                                      }),
                                    )
                                  : dispatch(
                                      addNoBreakPeriodDays({
                                        day: day.value,
                                      }),
                                    );
                              }}
                            >
                              <span>
                                <Icon
                                  icon="material-symbols:cancel-outline-rounded"
                                  width={20}
                                  height={20}
                                />
                              </span>
                            </button>
                          </div>
                        </div>
                        <TimeRangeInput
                          startValue={
                            isCustomBreak
                              ? cBps.find((cBps) => cBps.day === day.value)
                                  .start_time?.value
                              : (breakPeriodState.start_time.value ?? "")
                          }
                          endValue={
                            isCustomBreak
                              ? cBps.find((cBps) => cBps.day === day.value)
                                  .end_time?.value
                              : (breakPeriodState.end_time.value ?? "")
                          }
                          onStartTimeChange={(value) => {
                            isCustomBreak
                              ? dispatch(
                                  setCustomBreakPeriod({
                                    field: "start_time",
                                    value,
                                    day: day.value,
                                  }),
                                )
                              : dispatch(
                                  addCustomBreakDays({
                                    day: day.value,
                                  }),
                                );
                            dispatch(
                              setCustomBreakPeriod({
                                field: "start_time",
                                value,
                                day: day.value,
                              }),
                            );
                          }}
                          onEndTimeChange={(value) => {
                            isCustomBreak
                              ? dispatch(
                                  setCustomBreakPeriod({
                                    field: "end_time",
                                    value,
                                    day: day.value,
                                  }),
                                )
                              : dispatch(
                                  addCustomBreakDays({
                                    day: day.value,
                                  }),
                                );
                            dispatch(
                              setCustomBreakPeriod({
                                field: "end_time",
                                value,
                                day: day.value,
                              }),
                            );
                          }}
                          validationSchema={timeRangeSchema({
                            optional: false,
                          })}
                          onStartTimeValidationChange={(value) => {
                            isCustomBreak
                              ? dispatch(
                                  setCustomBreakPeriodValidation({
                                    field: "start_time",
                                    value,
                                    day: day.value,
                                  }),
                                )
                              : dispatch(
                                  addCustomBreakDays({
                                    day: day.value,
                                  }),
                                );
                            dispatch(
                              setCustomBreakPeriodValidation({
                                field: "start_time",
                                value,
                                day: day.value,
                              }),
                            );
                          }}
                          onEndTimeValidationChange={(value) => {
                            isCustomBreak
                              ? dispatch(
                                  setCustomBreakPeriodValidation({
                                    field: "end_time",
                                    value,
                                    day: day.value,
                                  }),
                                )
                              : dispatch(
                                  addCustomBreakDays({
                                    day: day.value,
                                  }),
                                );
                            dispatch(
                              setCustomBreakPeriodValidation({
                                field: "end_time",
                                value,
                                day: day.value,
                              }),
                            );
                          }}
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
                              {formatTimeToAmPm(
                                isCustomBreak
                                  ? cBps.find((cBps) => cBps.day === day.value)
                                      .start_time?.value
                                  : (breakPeriodState.start_time.value ?? ""),
                              )}
                            </span>
                          </div>
                          <div className="d-flex align-items-center justify-content-center text-muted">
                            <Icon
                              icon="octicon:dash-16"
                              width={14}
                              height={14}
                            />
                          </div>
                          <div className="d-flex flex-row font-size-sm gap-1">
                            <span className="text-muted">Break End:</span>
                            <span className="fw-semibold">
                              {formatTimeToAmPm(
                                isCustomBreak
                                  ? cBps.find((cBps) => cBps.day === day.value)
                                      .end_time?.value
                                  : (breakPeriodState?.end_time?.value ?? ""),
                              )}
                            </span>
                          </div>
                          ,
                          <span className="fw-semibold">
                            {calculateBreakDurationText(
                              isCustomBreak
                                ? cBps.find((cBps) => cBps.day === day.value)
                                    .start_time?.value
                                : (breakPeriodState.start_time.value ?? ""),
                              isCustomBreak
                                ? cBps.find((cBps) => cBps.day === day.value)
                                    .end_time?.value
                                : (breakPeriodState.end_time.value ?? ""),
                            )}
                          </span>
                        </div>
                      </div>
                    </Fragment>
                  ) : isNoBreak ? (
                    <Fragment key={index}>
                      <div className="card rounded-4 p-2 font-size-sm gap-4 font-size-sm">
                        <span className="fw-semibold">{day.label}</span>
                        <div className="d-flex flex-column gap-1 align-items-center">
                          <div className="d-flex flex-column align-items-center">
                            <span className="fw-medium">No Break Period</span>
                            <p className="text-muted">
                              {day.label} is selected as a day without breaks
                            </p>
                          </div>
                          <button
                            className="font-size-sm border-none rounded-pill p-2 d-flex flex-row align-items-center justify-content-center fw-medium gap-2"
                            style={{ width: "10rem" }}
                            onClick={() => {
                              dispatch(
                                removeNoBreakPeriodDays({
                                  day: day.value,
                                }),
                              );
                            }}
                          >
                            <span>Add Day</span>
                            <span style={{ lineHeight: 0 }}>
                              <Icon
                                icon="ic:round-plus"
                                width={16}
                                height={16}
                              />
                            </span>
                          </button>
                        </div>
                      </div>
                    </Fragment>
                  ) : (
                    <Fragment key={index}>
                      <div className="card rounded-4 p-2 font-size-sm d-flex flex-column gap-3">
                        <div className="d-flex flex-row justify-content-between align-items-center">
                          <span className="fw-semibold text-capitalize">
                            {day.label}
                          </span>
                          <div className="d-flex flex-row align-items-center gap-2">
                            {isCustomBreak && (
                              <button
                                className="py-1 rounded-pill px-2 border-none"
                                style={{
                                  background: "#ffebd3",
                                  color: "#ff690c",
                                  fontSize: "0.7rem",
                                }}
                              >
                                custom break
                              </button>
                            )}
                            <button
                              className="d-flex flex-row align-items-center gap-2 px-3 py-2 border-none rounded-3 transparent-bg"
                              onClick={() => {
                                isCustomBreak
                                  ? dispatch(
                                      removeCustomBreakDays({
                                        day: day.value,
                                      }),
                                    )
                                  : dispatch(
                                      addNoBreakPeriodDays({
                                        day: day.value,
                                      }),
                                    );
                              }}
                            >
                              <span>
                                <Icon
                                  icon="material-symbols:cancel-outline-rounded"
                                  width={20}
                                  height={20}
                                />
                              </span>
                            </button>
                          </div>
                        </div>
                        <TimeRangeInput
                          startValue={
                            isCustomBreak
                              ? cBps.find((cBps) => cBps.day === day.value)
                                  .start_time?.value
                              : (breakPeriodState.start_time.value ?? "")
                          }
                          endValue={
                            isCustomBreak
                              ? cBps.find((cBps) => cBps.day === day.value)
                                  .end_time?.value
                              : (breakPeriodState.end_time.value ?? "")
                          }
                          onStartTimeChange={(value) => {
                            isCustomBreak
                              ? dispatch(
                                  setCustomBreakPeriod({
                                    field: "start_time",
                                    value,
                                    day: day.value,
                                  }),
                                )
                              : dispatch(
                                  addCustomBreakDays({
                                    day: day.value,
                                  }),
                                );
                            dispatch(
                              setCustomBreakPeriod({
                                field: "start_time",
                                value,
                                day: day.value,
                              }),
                            );
                          }}
                          onEndTimeChange={(value) => {
                            isCustomBreak
                              ? dispatch(
                                  setCustomBreakPeriod({
                                    field: "end_time",
                                    value,
                                    day: day.value,
                                  }),
                                )
                              : dispatch(
                                  addCustomBreakDays({
                                    day: day.value,
                                  }),
                                );
                            dispatch(
                              setCustomBreakPeriod({
                                field: "end_time",
                                value,
                                day: day.value,
                              }),
                            );
                          }}
                          validationSchema={timeRangeSchema({
                            optional: false,
                          })}
                          onStartTimeValidationChange={(value) => {
                            isCustomBreak
                              ? dispatch(
                                  setCustomBreakPeriodValidation({
                                    field: "start_time",
                                    value,
                                    day: day.value,
                                  }),
                                )
                              : dispatch(
                                  addCustomBreakDays({
                                    day: day.value,
                                  }),
                                );
                            dispatch(
                              setCustomBreakPeriodValidation({
                                field: "start_time",
                                value,
                                day: day.value,
                              }),
                            );
                          }}
                          onEndTimeValidationChange={(value) => {
                            isCustomBreak
                              ? dispatch(
                                  setCustomBreakPeriodValidation({
                                    field: "end_time",
                                    value,
                                    day: day.value,
                                  }),
                                )
                              : dispatch(
                                  addCustomBreakDays({
                                    day: day.value,
                                  }),
                                );
                            dispatch(
                              setCustomBreakPeriodValidation({
                                field: "end_time",
                                value,
                                day: day.value,
                              }),
                            );
                          }}
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
                              {formatTimeToAmPm(
                                isCustomBreak
                                  ? cBps.find((cBps) => cBps.day === day.value)
                                      .start_time?.value
                                  : (breakPeriodState.start_time.value ?? ""),
                              )}
                            </span>
                          </div>
                          <div className="d-flex align-items-center justify-content-center text-muted">
                            <Icon
                              icon="octicon:dash-16"
                              width={14}
                              height={14}
                            />
                          </div>
                          <div className="d-flex flex-row font-size-sm gap-1">
                            <span className="text-muted">Break End:</span>
                            <span className="fw-semibold">
                              {formatTimeToAmPm(
                                isCustomBreak
                                  ? cBps.find((cBps) => cBps.day === day.value)
                                      .end_time?.value
                                  : (breakPeriodState?.end_time?.value ?? ""),
                              )}
                            </span>
                          </div>
                          ,
                          <span className="fw-semibold">
                            {calculateBreakDurationText(
                              isCustomBreak
                                ? cBps.find((cBps) => cBps.day === day.value)
                                    .start_time?.value
                                : (breakPeriodState.start_time.value ?? ""),
                              isCustomBreak
                                ? cBps.find((cBps) => cBps.day === day.value)
                                    .end_time?.value
                                : (breakPeriodState.end_time.value ?? ""),
                            )}
                          </span>
                        </div>
                      </div>
                    </Fragment>
                  );
                })}
          </div>
          <div className="card p-2 rounded-4 d-flex flex-column gap-2 font-size-sm">
            <span className="fw-medium">Break Policy Summary</span>
            <div className="d-flex flex-row align-items-center justify-content-between">
              <span>Default Break Days</span>
              <span className="fw-semibold">
                <NumberFlow
                  value={daysOfWeek.length - (cBps.length + noBpDays.length)}
                />
              </span>
            </div>
            <div className="d-flex flex-row align-items-center justify-content-between">
              <span>No Break Days</span>
              <span className="fw-semibold">
                <NumberFlow value={noBpDays.length} />
              </span>
            </div>
            <div className="d-flex flex-row align-items-center justify-content-between">
              <span>Custom Break Days</span>
              <span className="fw-semibold">
                <NumberFlow value={cBps.length} />
              </span>
            </div>
            <div className="d-flex flex-row align-items-center justify-content-between">
              <span>Weekly Break Coverage</span>
              <span className="fw-semibold">
                <NumberFlow value={daysOfWeek.length - noBpDays.length} />
              </span>
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
              onClick={() => {
                handleClose();
                toast.custom(
                  <ToastSuccess
                    title={"Configuration Successful"}
                    description={
                      "Configuration has been successfully completed."
                    }
                  />,
                );
              }}
            >
              Save Break Policy
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default ReviewStep;
