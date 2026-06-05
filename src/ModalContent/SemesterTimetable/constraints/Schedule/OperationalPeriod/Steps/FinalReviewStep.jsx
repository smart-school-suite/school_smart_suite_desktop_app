import { Icon } from "@iconify/react";
import VerticalDashedLine from "../../../../../../components/DashedLine/VerticalDashedLine";
import { Fragment } from "react";
import { daysOfWeek } from "../../../../../../data/data";
import { useDispatch, useSelector } from "react-redux";
import { parse, format, differenceInMinutes } from "date-fns";
import { setOperationalPeriodField } from "../../../../../../Slices/Asynslices/semesterTimetableSlice";
import NumberFlow from "@number-flow/react";
import toast from "react-hot-toast";
import ToastSuccess from "../../../../../../components/Toast/ToastSuccess";

function FinalReviewStep({
  handleClose,
  nextStep,
  previousStep,
  fullStep,
  currentStep,
}) {
  const baseDate = new Date();
  const operationalPeriod = useSelector(
    (state) => state.semesterTimetable.hard_constraints.operational_period,
  );
  const opDays = operationalPeriod.operational_days;
  const dispatch = useDispatch();

  const resolveTime = (day) => {
    const existingException = operationalPeriod.day_exceptions.find(
      (exception) => exception.day === day,
    );
    if (existingException) {
      return {
        startTime: existingException.start_time.value,
        endTime: existingException.end_time.value,
      };
    }
    return {
      startTime: operationalPeriod.start_time.value,
      endTime: operationalPeriod.end_time.value,
    };
  };

  const formatTime = (timeString) => {
    if (!timeString) return "";
    const parsedDate = parse(timeString, "HH:mm", baseDate);
    return format(parsedDate, "h:mm a").toLowerCase();
  };

  const calculateHoursForDay = (day) => {
    const { startTime, endTime } = resolveTime(day);
    if (!startTime || !endTime) return 0;

    const startParsed = parse(startTime, "HH:mm", baseDate);
    const endParsed = parse(endTime, "HH:mm", baseDate);

    const minutesDiff = differenceInMinutes(endParsed, startParsed);
    return Math.max(0, minutesDiff / 60);
  };

  const totalHours = opDays.reduce(
    (acc, day) => acc + calculateHoursForDay(day),
    0,
  );

  return (
    <>
      <div className="px-2 d-flex flex-column gap-4 h-100">
        <div className="d-flex flex-row align-items-center justify-content-between">
          <span className="fw-semibold">Review Your Operating Schedule</span>
          <span
            className="cursor-pointer"
            onClick={() => {
              handleClose();
            }}
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
        <div className="timeslotcard-container scroll-bar-sm px-1 d-flex flex-column gap-2">
          {opDays.map((items, index) => {
            const times = resolveTime(items);
            const durationHours = calculateHoursForDay(items);

            return (
              <Fragment key={index}>
                <div className="card font-size-sm rounded-4 p-2 d-flex flex-column gap-2 text-capitalize">
                  <div className="d-flex flex-row align-items-center justify-content-between">
                    <span className="fw-semibold">{items}</span>
                    <button
                      className="d-flex flex-row align-items-center gap-2 px-3 py-2 border-none rounded-3 transparent-bg"
                      onClick={() => {
                        dispatch(
                          setOperationalPeriodField({
                            field: "operational_days",
                            value: items,
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
                    <div className="d-flex flex-column gap-2 justify-content-center ">
                      <span>{formatTime(times.startTime)}</span>
                      <div
                        style={{ height: "4rem" }}
                        className="d-flex flex-row align-items-center gap-2 justify-content-center"
                      >
                        <VerticalDashedLine thickness={1} />
                        <span className="fw-semibold">{durationHours} h</span>
                      </div>
                      <span>{formatTime(times.endTime)}</span>
                    </div>
                    <div>
                      <button className="d-flex flex-row align-items-center gap-2 px-3 py-2 border-none rounded-3">
                        <span>
                          <Icon
                            icon="basil:edit-outline"
                            width={16}
                            height={16}
                          />
                        </span>
                        <span>Edit</span>
                      </button>
                    </div>
                  </div>
                </div>
              </Fragment>
            );
          })}
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
              <NumberFlow value={totalHours} /> Hours
            </span>
          </div>
          <div className="d-flex flex-row align-items-center justify-content-between">
            <div className="d-flex flex-row align-items-center gap-2">
              <Icon icon="lucide:calendar-days" width={16} height={16} />
              <span className="fw-semibold">Total Operational Days</span>
            </div>
            <span className="fw-semibold">
              <NumberFlow value={opDays.length} /> Days
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

export default FinalReviewStep;
