import { useSelector, useDispatch } from "react-redux";
import { Icon } from "@iconify/react";
import { daysOfWeek } from "../../../../../../data/data";
import toast from "react-hot-toast";
import ToastSuccess from "../../../../../../components/Toast/ToastSuccess";
import VerticalDashedLine from "../../../../../../components/DashedLine/VerticalDashedLine";
import { parse, format, differenceInMinutes } from "date-fns";

function ReviewDefaultStep({
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
  const opDays = operationalPeriod.operational_days;
  const dispatch = useDispatch();

  // Helper: Safely format standard "HH:mm" strings to readable "h:mm a"
  const formatTimeToAmPm = (timeString) => {
    if (!timeString) return "N/A";
    try {
      const parsedDate = parse(timeString, "HH:mm", new Date());
      return format(parsedDate, "h:mm a");
    } catch (error) {
      return timeString;
    }
  };

  // Helper: Computes the precise minute delta for the break slot summary text
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
          <span className="fw-semibold">Review Default Schedule</span>
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
          className="scroll-bar-sm pe-1 height-auto overflow-x-hidden overflow-y-scroll overflow-y-auto d-flex flex-column gap-2"
          style={{ maxHeight: "55dvh" }}
        >
          <div className="d-flex flex-column gap-3">
            <div className="font-size-sm d-flex flex-row align-items-center justify-content-between">
              <p style={{ width: "500px" }}>
                Here's how the break period will be applied across your
                operating days.
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
            <div className="card p-2 rounded-4 d-flex flex-column gap-2">
              <div>
                <span className="font-size-sm fw-semibold">Current Policy</span>
              </div>
              <div className="d-flex flex-column font-size-sm">
                <ul>
                  <li>All operating days use the same break period</li>
                  <li>Students receive a consistent lunch schedule</li>
                  <li>
                    The timetable generator will reserve this time automatically
                  </li>
                </ul>
              </div>
            </div>
            <div className="card p-2 rounded-4 d-flex flex-column gap-2">
              <div className="d-flex flex-column gap-1 font-size-sm">
                <span>
                  Some schools use different break policies for specific days.
                </span>
                <span>For example:</span>
              </div>
              <div className="d-flex flex-column font-size-sm">
                <ul>
                  <li>No break on certain days</li>
                  <li>Different break times on Fridays</li>
                  <li>Special schedules for selected days</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex flex-column">
          <p className="font-size-sm fw-medium">Do Any Days Need Exceptions?</p>
          <div className="d-flex flex-row align-items-center w-100 gap-4">
            <button
              className="d-flex flex-row align-items-center justify-content-between w-100 border-none bg-transparent"
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
              <div className="d-flex flex-column font-size-sm text-start">
                <span className="fw-semibold">
                  All Days Follow This Schedule
                </span>
                <span>
                  Use the same break period across all operating days.
                </span>
              </div>
              <div>
                <Icon
                  icon="tabler:circle-check-filled"
                  width={24}
                  height={24}
                  className="green-color"
                />
              </div>
            </button>
            <button
              className="d-flex flex-row align-items-center justify-content-between w-100 border-none bg-transparent"
              onClick={nextStep}
            >
              <div className="d-flex flex-column font-size-sm text-start">
                <span className="fw-semibold">Some Days Are Different</span>
                <span>
                  Configure days without breaks or days with custom break
                  periods.
                </span>
              </div>
              <div>
                <div
                  style={{ height: "2rem", width: "2rem" }}
                  className="border-none rounded-circle d-flex align-items-center justify-content-center bg-light"
                >
                  <Icon icon="tabler:arrow-right" />
                </div>
              </div>
            </button>
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
        </div>
      </div>
    </>
  );
}

export default ReviewDefaultStep;