import { Icon } from "@iconify/react";
import VerticalDashedLine from "../../../../../../components/DashedLine/VerticalDashedLine";
import { Fragment } from "react";
import { daysOfWeek } from "../../../../../../data/data";
import { useDispatch, useSelector } from "react-redux";
import { parse, format, differenceInMinutes } from "date-fns";
import { setOperationalPeriodField } from "../../../../../../Slices/Asynslices/semesterTimetableSlice";
import NumberFlow from "@number-flow/react";
function ReviewScheduleStep({
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
  const opStartTime = parse(
    operationalPeriod.start_time.value,
    "HH:mm",
    baseDate,
  );
  const opEndTime = parse(operationalPeriod.end_time.value, "HH:mm", baseDate);
  const totalMinutes = differenceInMinutes(opEndTime, opStartTime);
  const totalHours = totalMinutes / 60;
  const dispatch = useDispatch();
  return (
    <>
      <div className="px-2 d-flex flex-column gap-4 h-100">
        <div className="d-flex flex-row align-items-center justify-content-between">
          <span className="fw-semibold">Review Your Operating Schedule</span>
          <span
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
          {opDays.map((items, index) => (
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
                    <span>{format(opStartTime, "h:mm a")}</span>
                    <div
                      style={{ height: "4rem" }}
                      className="d-flex flex-row align-items-center gap-2 justify-content-center"
                    >
                      <VerticalDashedLine thickness={1} />
                      <span className="fw-semibold">
                        {totalHours.toFixed(1)}h
                      </span>
                    </div>
                    <span>{format(opEndTime, "h:mm a")}</span>
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
              <NumberFlow value={totalHours.toFixed(1) * opDays.length} /> Hours
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
        <div className="d-flex flex-column">
          <p className="font-size-sm fw-medium">
            Do all operating days follow the same schedule?
          </p>
          <div className="d-flex flex-row align-items-center w-100 gap-4">
            <button className="d-flex flex-row align-items-center justify-content-between w-100 border-none bg-transparent"
              onClick={() => {
                  handleClose();
                  toast.custom(
                     <ToastSuccess 
                        title={"Configuration Successfully Completed"}
                        description={"Configuration has been successfully completed."}
                     />
                  )
              }}
            >
              <div className="d-flex flex-column font-size-sm align-items-start">
                <span className="fw-semibold">Same Schedule</span>
                <span>Monday to Friday All Use 07:00 AM - 17:00</span>
              </div>
              <div>
                <Icon
                  icon="tabler:circle-check-filled"
                  width={24}
                  height={24}
                />
              </div>
            </button>
            <button className="d-flex flex-row align-items-center justify-content-between w-100 border-none bg-transparent"
              onClick={nextStep}
            >
              <div className="d-flex flex-column font-size-sm align-items-start">
                <span className="fw-semibold">Custom Schedule</span>
                <span>Some Days Follow Different Schedule St</span>
              </div>
              <div>
                <button
                  style={{ height: "2rem", width: "2rem" }}
                  className="border-none rounded-circle"
                >
                  <Icon icon="tabler:arrow-right" />
                </button>
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
export default ReviewScheduleStep;
