import { Icon } from "@iconify/react";
import ToastSuccess from "../../../../../../components/Toast/ToastSuccess";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { Fragment } from "react";
import { parse, format, differenceInMinutes } from "date-fns";
import VerticalDashedLine from "../../../../../../components/DashedLine/VerticalDashedLine";
import NumberFlow from "@number-flow/react";
import { TimeRangeInput } from "../../../../../../components/FormComponents/InputComponents";
import { timeRangeSchema } from "../../../../../../ComponentConfig/YupValidationSchema";
import {
  removeRequestedFreePeriodSlot,
  setRequestedFreePeriodSlot,
  setRequestedFreePeriodValidation,
} from "../../../../../../Slices/Asynslices/semesterTimetableSlice";

function ReviewStep({
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
  const rFSlots = rF.slots;

  // Helper: Convert "HH:mm" directly into friendly "h:mm a" formats
  const formatTimeToAmPm = (timeString) => {
    if (!timeString) return "N/A";
    try {
      const parsedDate = parse(timeString, "HH:mm", new Date());
      return format(parsedDate, "h:mm a");
    } catch (error) {
      return timeString;
    }
  };

  // Helper: Computes visual textual intervals between slots
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

  // Global Summary: Accumulates Total Minutes across ALL days and returns decimal hours
  const calculateTotalHoursAllDays = () => {
    let aggregateMinutes = 0;

    rFSlots.forEach((dayData) => {
      if (dayData && dayData.slots) {
        dayData.slots.forEach((slot) => {
          const start = slot?.start_time?.value;
          const end = slot?.end_time?.value;
          if (!start || !end) return;

          try {
            const referenceDate = new Date();
            const startTime = parse(start, "HH:mm", referenceDate);
            const endTime = parse(end, "HH:mm", referenceDate);
            const diff = differenceInMinutes(endTime, startTime);

            if (diff > 0) aggregateMinutes += diff;
          } catch (e) {
            // Ignore parse failures gracefully
          }
        });
      }
    });

    return parseFloat((aggregateMinutes / 60).toFixed(2));
  };

  // Global Summary: Counts all nested slots arrays regardless of the day
  const calculateTotalSlotsAllDays = () => {
    return rFSlots.reduce((accumulator, dayData) => {
      return accumulator + (dayData?.slots?.length || 0);
    }, 0);
  };

  return (
    <>
      <div className="px-2 d-flex flex-column gap-3">
        <div className="d-flex flex-row align-items-center justify-content-between">
          <span className="fw-semibold">Review Requested Free Period</span>
          <span
            onClick={() => {
              handleClose();
            }}
            style={{ cursor: "pointer" }}
          >
            <Icon icon="charm:cross" width="22" height="22" />
          </span>
        </div>
        <div>
          <div className="d-flex flex-row align-items-center justify-content-between">
            <div className="font-size-sm">
              <p style={{ width: "500px" }}>
                Verify your institution's regular operating schedule before
                continuing.
              </p>
            </div>
            <div>
              <p className="font-size-sm text-capitalize">
                {currentStep} of {fullStep} completed
              </p>
            </div>
          </div>
        </div>

        <div
          className="scroll-bar-sm px-1 height-auto overflow-x-hidden overflow-y-scroll overflow-y-auto d-flex flex-column gap-2"
          style={{ maxHeight: "35dvh" }}
        >
          {rFSlots.map((daySlots) => (
            <Fragment key={daySlots.day}>
              <div className="d-flex flex-column gap-2">
                <span className="font-size-md fw-semibold text-capitalize">
                  {daySlots.day}
                </span>
                {daySlots.slots.map((slot, index) => (
                  <Fragment key={slot.id}>
                    <div className="card font-size-sm rounded-4 p-2 d-flex flex-column gap-2 text-capitalize">
                      <div className="d-flex flex-row align-items-center justify-content-between">
                        <span>{`Requested Free Period #${index + 1}`}</span>
                        <button
                          className="d-flex flex-row align-items-center gap-2 border-none rounded-3 transparent-bg"
                          onClick={() => {
                            dispatch(
                              removeRequestedFreePeriodSlot({
                                day: daySlots.day,
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
                                slot?.end_time?.value,
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
                              day: daySlots.day,
                            }),
                          )
                        }
                        onEndTimeChange={(value) =>
                          dispatch(
                            setRequestedFreePeriodSlot({
                              field: "end_time",
                              value,
                              slotId: slot.id,
                              day: daySlots.day,
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
                              day: daySlots.day,
                            }),
                          )
                        }
                        onEndTimeValidationChange={(value) =>
                          dispatch(
                            setRequestedFreePeriodValidation({
                              field: "end_time",
                              value,
                              slotId: slot.id,
                              day: daySlots.day,
                            }),
                          )
                        }
                      />
                    </div>
                  </Fragment>
                ))}
              </div>
            </Fragment>
          ))}
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
              <NumberFlow value={calculateTotalHoursAllDays()} /> Hours
            </span>
          </div>
          <div className="d-flex flex-row align-items-center justify-content-between">
            <div className="d-flex flex-row align-items-center gap-2">
              <Icon icon="lucide:calendar-days" width={16} height={16} />
              <span className="fw-semibold">Total Free Periods</span>
            </div>
            <span className="fw-semibold">
              <NumberFlow value={calculateTotalSlotsAllDays()} /> Slots
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
                <Icon icon="material-symbols:arrow-back-rounded" />{" "}
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
                    title={"Configuration Successfully Completed"}
                    description={
                      "Configuration has been successfully completed."
                    }
                  />,
                );
              }}
            >
              Finish
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ReviewStep;
