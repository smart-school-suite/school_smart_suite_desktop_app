import { Icon } from "@iconify/react";
import RectangleSkeleton from "../../../../../../components/SkeletonPageLoader/RectangularSkeleton";
import { useGetSemesterTimetablePeriods } from "../../../../../../hooks/semesterTimetable/useSemesterTimetablePeriodDuration";
import { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import VerticalDashedLine from "../../../../../../components/DashedLine/VerticalDashedLine";
import { daysOfWeek } from "../../../../../../data/data";
import toast from "react-hot-toast";
import ToastSuccess from "../../../../../../components/Toast/ToastSuccess";
function ReviewStep({
  handleClose,
  nextStep,
  previousStep,
  fullStep,
  currentStep,
}) {
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
  const resolveDuration = (day) => {
    const eCpd = cPds.find((cPd) => cPd.day === day);
    if (eCpd) {
      return eCpd.duration_minutes;
    }
    return pD;
  };
  return (
    <>
      <div className="px-2 d-flex flex-column gap-3">
        <div className="d-flex flex-row align-items-center justify-content-between">
          <span className="fw-semibold">Review Period Duration Policy</span>
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
                Review your period duration configuration before applying it to
                timetable generation.
              </p>
              <p className="text-capitalize">
                step {currentStep} of {fullStep} completed
              </p>
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
                            {resolveDuration(opDay)} Minutes
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
                            {resolveDuration(dWeek?.label)} Minutes
                          </button>
                        </div>
                      </Fragment>
                    ))}
              </div>
            </div>
            <div className="d-flex flex-column gap-1">
              <span className="font-size-sm fw-semibold">
                Custom Duration Summary
              </span>
              <div className="d-flex flex-column gap-2">
                {cPds.length >= 1 &&
                  cPds.map((cPd, index) => (
                    <Fragment key={index}>
                      <div className="card p-2 rounded-4 d-flex flex-column gap-4 font-size-sm">
                        <div className="d-flex flex-row justify-content-between align-items-center">
                          <span className="fw-semibold text-capitalize">
                            {cPd.day}
                          </span>
                          <button
                            className="border-none  rounded-pill px-2 py-1"
                            style={{
                              fontSize: "0.7rem",
                              background: "#ffebd3",
                              color: "#ff690c",
                            }}
                          >
                            Custom
                          </button>
                        </div>
                        <div className="d-flex flex-row gap-2 align-items-center font-size-sm mt-auto">
                          <span className="fw-semibold">
                            {cPd?.duration_minutes} Minutes
                          </span>
                          {cPd.duration_minutes < pD ? (
                            <button
                              className="border-none d-flex flex-row align-items-center gap-1 rounded-pill px-2 py-1"
                              style={{
                                fontSize: "0.7rem",
                                background: "#ffdddd",
                                color: "#ff2323",
                              }}
                            >
                              <span style={{ lineHeight: 0 }}>
                                <Icon
                                  icon="ic:round-keyboard-double-arrow-down"
                                  width={16}
                                  height={16}
                                />
                              </span>
                              <span>{cPd?.duration_minutes - pD} Minutes</span>
                            </button>
                          ) : (
                            <button
                              className="border-none d-flex flex-row align-items-center gap-1 rounded-pill px-2 py-1"
                              style={{
                                fontSize: "0.7rem",
                                background: "#e3f5e3",
                                color: "#5cb85c",
                              }}
                            >
                              <span style={{ lineHeight: 0 }}>
                                <Icon
                                  icon="ic:round-keyboard-double-arrow-up"
                                  width={16}
                                  height={16}
                                />
                              </span>
                              <span>+{cPd?.duration_minutes - pD} Minutes</span>
                            </button>
                          )}
                        </div>
                      </div>
                    </Fragment>
                  ))}
              </div>
            </div>
            <div className="card p-2 rounded-4 d-flex flex-column gap-2">
              <div>
                <span className="font-size-sm fw-semibold">
                  Scheduling Impact
                </span>
              </div>
              <div>
                <div className="font-size-sm">
                  <ul className="d-flex flex-column gap-2">
                    <li>Most days will use 90-minute periods</li>
                    <li>Tuesday will contain fewer, longer lessons</li>
                    <li>Friday will contain more, shorter lessons</li>
                    <li>
                      The timetable grid will automatically adapt to each
                      configured duration
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="card p-2 rounded-4 d-flex flex-column gap-2">
              <div>
                <span className="font-size-sm fw-semibold">
                  Duration Policy Summary
                </span>
              </div>
              <div className="d-flex flex-column gap-2 font-size-sm">
                <div className="d-flex flex-row align-items-center justify-content-between">
                  <span>Default Duration</span>
                  <span className="fw-semibold">90 Minutes</span>
                </div>
                <div className="d-flex flex-row align-items-center justify-content-between">
                  <span>Custom Duration Days</span>
                  <span className="fw-semibold">2</span>
                </div>
                <div className="d-flex flex-row align-items-center justify-content-between">
                  <span>Longest Duration</span>
                  <span className="fw-semibold">120 Minutes</span>
                </div>
                <div className="d-flex flex-row align-items-center justify-content-between">
                  <span>Shortest Duration</span>
                  <span className="fw-semibold">60 Minutes</span>
                </div>
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
              Save Period Policy
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default ReviewStep;
