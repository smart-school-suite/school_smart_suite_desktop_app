import { useSelector, useDispatch } from "react-redux";
import { Icon } from "@iconify/react";
import { daysOfWeek } from "../../../../../../data/data";
import { Fragment } from "react";
import {
  removeNoBreakPeriodDays,
  addNoBreakPeriodDays,
} from "../../../../../../Slices/Asynslices/semesterTimetableSlice";
import VerticalDashedLine from "../../../../../../components/DashedLine/VerticalDashedLine";
import { parse, format, differenceInMinutes } from "date-fns";

function NoBreakDayStep({
  handleClose,
  nextStep,
  previousStep,
  fullStep,
  currentStep,
}) {
  const breakPeriodState = useSelector(
    (state) => state.semesterTimetable.hard_constraints.break_period,
  );
  const noBpDays = breakPeriodState.no_break_exceptions;
  const operationalPeriod = useSelector(
    (state) => state.semesterTimetable.hard_constraints.operational_period,
  );
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
          <span className="fw-semibold">Days Without Breaks</span>
          <span
            onClick={() => {
              handleClose();
            }}
            style={{ cursor: "pointer" }}
          >
            <Icon icon="charm:cross" width="22" height="22" />
          </span>
        </div>
        <div className="modal-content-container pb-4">
          <div className="d-flex flex-column gap-3">
            <div className="font-size-sm d-flex flex-row align-items-center justify-content-between">
              <p style={{ width: "500px" }}>
                Select any days that should not include the default break
                period.
              </p>
              <p className="text-capitalize">
                step {currentStep} of {fullStep} completed
              </p>
            </div>
            <div className="card font-size-sm rounded-4 p-2 d-flex flex-column gap-2 text-capitalize">
              <div className="d-flex flex-row align-items-center justify-content-between">
                <span className="fw-semibold">Break Policy</span>
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
            <div className="d-flex flex-column gap-1">
              <span className="font-size-sm">
                Selected days will ignore this break schedule.
              </span>
              <div
                className="border w-100 p-2 rounded-3 d-flex flex-row align-items-center justify-content-start gap-2 flex-wrap"
                style={{ minHeight: "3rem", height: "auto" }}
              >
                {noBpDays.map((day, index) => (
                  <Fragment key={index}>
                    <button
                      className="font-size-sm border px-2 py-1 rounded-pill bg-transparent d-flex flex-row align-items-center gap-2"
                      onClick={() => {
                        dispatch(
                          removeNoBreakPeriodDays({
                            day: day,
                          }),
                        );
                      }}
                    >
                      <span className="text-capitalize">{day}</span>
                      <Icon icon="iconoir:cancel" width={18} height={18} />
                    </button>
                  </Fragment>
                ))}
              </div>
              <div className="d-flex flex-row align-items-center gap-1 font-size-sm text-muted mt-1">
                <span>
                  <Icon icon="material-symbols:info-outline-rounded" />
                </span>
                <span>
                  Only select days where students should continue classes
                  without a scheduled break period.
                </span>
              </div>
            </div>
            <div className="d-flex flex-row flex-wrap gap-4 justify-content-center">
              {opDays.length >= 1
                ? opDays
                    .filter((items) => !noBpDays.includes(items))
                    .map((items, index) => {
                      return (
                        <Fragment key={index}>
                          <button
                            className="font-size-sm border px-4 py-2 rounded-pill bg-transparent text-capitalize"
                            onClick={() => {
                              dispatch(
                                addNoBreakPeriodDays({
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
                    .filter((items) => !noBpDays.includes(items.value))
                    .map((items, index) => {
                      return (
                        <Fragment key={index}>
                          <button
                            className="font-size-sm border px-4 py-2 rounded-pill bg-transparent text-capitalize"
                            onClick={() => {
                              dispatch(
                                addNoBreakPeriodDays({
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
              Next Step
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default NoBreakDayStep;