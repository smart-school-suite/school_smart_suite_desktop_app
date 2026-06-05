import { Icon } from "@iconify/react";
import { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import {
  addRequestedFreePeriodSlot,
  removeRequestedFreePeriodSlot,
  setRequestedFreePeriodSlot,
  setRequestedFreePeriodValidation,
  removeAllRequestedFreePeriodSlotsByDay
} from "../../../../../../Slices/Asynslices/semesterTimetableSlice";
import VerticalDashedLine from "../../../../../../components/DashedLine/VerticalDashedLine";
import NumberFlow from "@number-flow/react";
import { TimeRangeInput } from "../../../../../../components/FormComponents/InputComponents";
import { timeRangeSchema } from "../../../../../../ComponentConfig/YupValidationSchema";
import { parse, format, differenceInMinutes } from "date-fns";

function ConfigureFreePeriodsStep({
  handleClose,
  nextStep,
  previousStep,
  fullStep,
  currentStep,
}) {
  const dispatch = useDispatch();
  const rF = useSelector(
    (state) => state.semesterTimetable.soft_constraints.requested_free_periods,
  );
  const rFDays = rF.days;
  const rFSlots = rF.slots;
  const [day, setDay] = useState(rFDays[0] || "");

  const currentDayData = rFSlots.find((slot) => slot.day === day);
  const hasSlots =
    currentDayData && currentDayData.slots && currentDayData.slots.length >= 1;

  const formatTimeToAmPm = (timeString) => {
    if (!timeString) return "N/A";
    try {
      const parsedDate = parse(timeString, "HH:mm", new Date());
      return format(parsedDate, "h:mm a");
    } catch (error) {
      return timeString; 
    }
  };

  const calculateSlotDurationText = (start, end) => {
    if (!start || !end) return "0 h";
    try {
      const referenceDate = new Date();
      const startTime = parse(start, "HH:mm", referenceDate);
      const endTime = parse(end, "HH:mm", referenceDate);
      
      const totalMinutes = differenceInMinutes(endTime, startTime);
      if (totalMinutes <= 0 || isNaN(totalMinutes)) return "0 h";

      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;

      if (hours > 0 && minutes > 0) return `${hours}h ${minutes}m`;
      if (hours > 0) return `${hours}h`;
      return `${minutes}m`;
    } catch (error) {
      return "0 h";
    }
  };

  const calculateTotalHours = () => {
    if (!hasSlots) return 0;
    
    const totalMinutes = currentDayData.slots.reduce((accumulator, slot) => {
      const start = slot?.start_time?.value;
      const end = slot?.end_time?.value;
      if (!start || !end) return accumulator;

      try {
        const referenceDate = new Date();
        const startTime = parse(start, "HH:mm", referenceDate);
        const endTime = parse(end, "HH:mm", referenceDate);
        const diff = differenceInMinutes(endTime, startTime);
        
        return diff > 0 ? accumulator + diff : accumulator;
      } catch (e) {
        return accumulator;
      }
    }, 0);

    return parseFloat((totalMinutes / 60).toFixed(2));
  };

  return (
    <>
      <div className="px-2 d-flex flex-column gap-3">
        <div className="d-flex flex-row align-items-center justify-content-between">
          <span className="fw-semibold">Configure Requested Free Periods</span>
          <span
            onClick={() => {
              handleClose();
            }}
            style={{ cursor: "pointer" }}
          >
            <Icon icon="charm:cross" width="22" height="22" />
          </span>
        </div>
        <div className="d-flex flex-row justify-content-end">
          <div>
              <p className="font-size-sm text-capitalize">
                {currentStep} of {fullStep} completed
              </p>
            </div>
        </div>
        <div className="d-flex flex-row justify-content-between align-items-center">
          {rFDays.map((dayofWeek, index) => (
            <Fragment key={index}>
              <div className="d-flex flex-column gap-1">
                <button
                  className={`rounded-pill border-none text-capitalize font-size-sm px-2 bg-transparent transition-all  ${day === dayofWeek ? "color-primary fw-medium" : ""}`}
                  onClick={() => {
                    setDay(dayofWeek);
                  }}
                >
                  {dayofWeek}
                </button>
                <div
                  className={
                    day === dayofWeek ? "primary-background" : "bg-transparent"
                  }
                  style={{
                    width: "6vw",
                    height: "0.2rem",
                    borderRadius: "2rem",
                  }}
                ></div>
              </div>
            </Fragment>
          ))}
        </div>
        <div>
          <div className="d-flex flex-column gap-2">
            {hasSlots ? (
              <>
                <div className="d-flex flex-row justify-content-end gap-2">
                  <button
                    className="d-flex flex-row font-size-sm gap-1 align-items-center border-none px-3 py-2 rounded-pill"
                    onClick={() => {
                      dispatch(
                        addRequestedFreePeriodSlot({
                          day: day,
                        }),
                      );
                    }}
                  >
                    <Icon icon="material-symbols:add" width="16" height="16" />
                    <span>Add Free Period</span>
                  </button>
                  <button
                    className="d-flex flex-row font-size-sm gap-1 align-items-center border-none px-3 py-2 rounded-pill"
                    onClick={() => {
                      dispatch(removeAllRequestedFreePeriodSlotsByDay({
                         day:day
                      }))
                    }}
                  >
                    <Icon icon="mynaui:trash" width="16" height="16" />
                    <span>Remove All</span>
                  </button>
                </div>
                <div
                  className="scroll-bar-sm px-1 height-auto overflow-x-hidden overflow-y-scroll overflow-y-auto d-flex flex-column gap-2"
                  style={{ maxHeight: "32dvh" }}
                >
                  {currentDayData.slots.map((slot, index) => (
                    <Fragment key={slot.id}>
                      <div className="card font-size-sm rounded-4 p-2 d-flex flex-column gap-2 text-capitalize">
                        <div className="d-flex flex-row align-items-center justify-content-between">
                          <span>{`Requested Free Period #${index + 1}`}</span>
                          <button
                            className="d-flex flex-row align-items-center gap-2 border-none rounded-3 transparent-bg"
                            onClick={() => {
                              dispatch(
                                removeRequestedFreePeriodSlot({
                                  day: day,
                                  slotId: slot.id,
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
                        <div className="d-flex flex-row align-items-end justify-content-between">
                          <div className="d-flex flex-column gap-2 justify-content-center">
                            <span className="fw-semibold">
                              {formatTimeToAmPm(slot?.start_time?.value)}
                            </span>
                            <div
                              style={{ height: "4rem" }}
                              className="d-flex flex-row align-items-center gap-2 justify-content-center"
                            >
                              <VerticalDashedLine thickness={1} />
                              <span className="fw-semibold text-muted font-size-xs">
                                {calculateSlotDurationText(
                                  slot?.start_time?.value,
                                  slot?.end_time?.value
                                )}
                              </span>
                            </div>
                            <span className="fw-semibold">
                              {formatTimeToAmPm(slot?.end_time?.value)}
                            </span>
                          </div>
                        </div>
                        <TimeRangeInput
                          startValue={slot?.start_time?.value ?? ""}
                          endValue={slot?.end_time?.value ?? ""}
                          onStartTimeChange={(value) =>
                            dispatch(
                              setRequestedFreePeriodSlot({
                                field: "start_time",
                                value,
                                slotId: slot.id,
                                day: day,
                              }),
                            )
                          }
                          onEndTimeChange={(value) =>
                            dispatch(
                              setRequestedFreePeriodSlot({
                                field: "end_time",
                                value,
                                slotId: slot.id,
                                day: day,
                              }),
                            )
                          }
                          validationSchema={timeRangeSchema({
                            optional: false,
                          })}
                          onStartTimeValidationChange={(value) =>
                            dispatch(
                              setRequestedFreePeriodValidation({
                                field: "start_time",
                                value,
                                slotId: slot.id,
                                day: day,
                              }),
                            )
                          }
                          onEndTimeValidationChange={(value) =>
                            dispatch(
                              setRequestedFreePeriodValidation({
                                field: "end_time",
                                value,
                                slotId: slot.id,
                                day: day,
                              }),
                            )
                          }
                        />
                      </div>
                    </Fragment>
                  ))}
                </div>
              </>
            ) : (
              <>
                <div className="d-flex font-size-sm text-capitalize flex-column">
                  <span className="fw-semibold">Configure {day}</span>
                  <p className="text-muted">
                    Define the times that should remain unassigned on {day}.
                  </p>
                </div>
                <div>
                  <div className="font-size-sm d-flex flex-column  align-items-center">
                    <span>No free periods configured.</span>
                    <p className="text-muted">
                      Add free periods for {day} by clicking the time slots
                      below.
                    </p>
                    <button
                      className="d-flex flex-row gap-1 align-items-center border-none primary-background text-white px-3 py-2 rounded-pill"
                      onClick={() => {
                        dispatch(
                          addRequestedFreePeriodSlot({
                            day: day,
                          }),
                        );
                      }}
                    >
                      <Icon
                        icon="material-symbols:add"
                        width="16"
                        height="16"
                      />
                      <span>Add Free Period</span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
        <div
          className="card rounded-4 d-flex flex-column gap-2 font-size-sm bg-white"
          style={{ padding: "0.7rem" }}
        >
          <span>Summary</span>
          <div className="d-flex flex-row align-items-center justify-content-between">
            <div className="d-flex flex-row align-items-center gap-2">
              <Icon icon="mingcute:time-line" width={16} height={16} />
              <span className="fw-semibold">Total Hours</span>
            </div>
            <span className="fw-semibold">
              <NumberFlow value={calculateTotalHours()} /> Hours
            </span>
          </div>
          <div className="d-flex flex-row align-items-center justify-content-between">
            <div className="d-flex flex-row align-items-center gap-2">
              <Icon icon="lucide:calendar-days" width={16} height={16} />
              <span className="fw-semibold">Total Free Periods</span>
            </div>
            <span className="fw-semibold">
              <NumberFlow value={currentDayData?.slots?.length || 0} /> Slots
            </span>
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

export default ConfigureFreePeriodsStep;