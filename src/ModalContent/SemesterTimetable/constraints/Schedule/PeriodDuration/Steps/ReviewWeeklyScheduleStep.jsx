import { Icon } from "@iconify/react";
import RectangleSkeleton from "../../../../../../components/SkeletonPageLoader/RectangularSkeleton";
import { useGetSemesterTimetablePeriods } from "../../../../../../hooks/semesterTimetable/useSemesterTimetablePeriodDuration";
import { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import VerticalDashedLine from "../../../../../../components/DashedLine/VerticalDashedLine";
import { daysOfWeek } from "../../../../../../data/data";
import toast from "react-hot-toast";
import ToastWarning from "../../../../../../components/Toast/ToastWarning";
function ReviewWeeklyScheduleStep({
  handleClose,
  nextStep,
  previousStep,
  fullStep,
  currentStep,
}) {
  const pD = useSelector(
    (state) =>
      state.semesterTimetable.hard_constraints.schedule_period_duration_minutes
        .duration_minutes,
  );
  const operationalPeriod = useSelector(
    (state) => state.semesterTimetable.hard_constraints.operational_period,
  );
  const opDays = operationalPeriod.operational_days;
  return (
    <>
      <div className="px-2 d-flex flex-column gap-3">
        <div className="d-flex flex-row align-items-center justify-content-between">
          <span className="fw-semibold">Review Weekly Schedule</span>
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
                Review how the selected period duration applies across the week.
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
                    This duration currently applies to all operating days.
                  </span>
                </div>
              </div>
            </div>
            <div className="card p-2 rounded-4 d-flex flex-column gap-2 font-size-sm">
              <span className="fw-semibold">Weekly Grid</span>
              <div className="d-flex flex-column gap-3">
                {opDays.length >= 1
                  ? opDays.map((opDay, index) => (
                      <Fragment key={index}>
                        <div className="d-flex flex-row align-items-center justify-content-between">
                          <span>{opDay}</span>
                          <button className="border-none primary-background-100 color-primary rounded-pill px-2">
                            {pD} Minutes
                          </button>
                        </div>
                      </Fragment>
                    ))
                  : daysOfWeek.map((dWeek, index) => (
                      <Fragment key={index}>
                        <div className="d-flex flex-row align-items-center justify-content-between">
                          <span>{dWeek?.label}</span>
                          <button
                            className="border-none primary-background-100 color-primary rounded-pill px-2 py-1"
                            style={{ fontSize: "0.7rem" }}
                          >
                            {pD} Minutes
                          </button>
                        </div>
                      </Fragment>
                    ))}
              </div>
            </div>
            <div className="card p-2 rounded-4 d-flex flex-column gap-2">
              <div>
                <span className="font-size-sm fw-semibold">Current Policy</span>
              </div>
              <div>
                <ul className="d-flex flex-column gap-2 font-size-sm">
                  <li> All days use {pD}-minute periods</li>
                  <li>The timetable structure is identical across the week</li>
                  <li>No custom durations configured</li>
                </ul>
              </div>
            </div>
            <div className="p-2 rounded-4 d-flex flex-column gap-2">
              <div className="d-flex flex-column gap-1 font-size-sm">
                <span className="fw-semibold">
                  Do Any Days Use A Different Duration?
                </span>
                <span>
                  Some institutions use longer or shorter periods on specific
                  days.
                </span>
                <span>For example:</span>
              </div>
              <div>
                <ul className="d-flex flex-column gap-2 font-size-sm">
                  <li>Extended practical sessions</li>
                  <li>Special academic days</li>
                  <li>Weekly activity schedules</li>
                </ul>
              </div>
            </div>
            <div className="card p-2 rounded-4 d-flex flex-column gap-2 font-size-sm">
              <span className="fw-semibold">Weekly Duration Analysis</span>
              <div className="d-flex flex-column gap-3">
                <div className="d-flex flex-row align-items-center justify-content-between">
                  <span>Default Duration</span>
                  <span className="fw-semibold">{pD} Minutes</span>
                </div>
                <div className="d-flex flex-row align-items-center justify-content-between">
                  <span>Operating Days</span>
                  <span className="fw-semibold">5</span>
                </div>
                <div className="d-flex flex-row align-items-center justify-content-between">
                  <span>Estimated Weekly Periods</span>
                  <span className="fw-semibold">30</span>
                </div>
                <div className="d-flex flex-row align-items-center justify-content-between">
                  <span>Custom Duration Days</span>
                  <span className="fw-semibold">0</span>
                </div>
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
                    title={"Configuration Successful"}
                    description={
                      "Configuration has been successfully completed."
                    }
                  />,
                );
              }}
            >
              <div className="d-flex flex-column font-size-sm text-start">
                <span className="fw-semibold">
                  All Days Use The Same Duration
                </span>
                <span style={{ width: "250px" }}>
                  Apply 90-minute periods across all operating days.
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
                <span className="fw-semibold">
                  Some Days Use Different Durations
                </span>
                <span style={{ width: "250px" }}>
                  Configure custom period durations for selected days.
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
export default ReviewWeeklyScheduleStep;
