import { Icon } from "@iconify/react";
import RectangleSkeleton from "../../../../../../components/SkeletonPageLoader/RectangularSkeleton";
import { useGetSemesterTimetablePeriods } from "../../../../../../hooks/semesterTimetable/useSemesterTimetablePeriodDuration";
import { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setDefaultPeriodDuration } from "../../../../../../Slices/Asynslices/semesterTimetableSlice";
import VerticalDashedLine from "../../../../../../components/DashedLine/VerticalDashedLine";
import { pdSampleLesson } from "../../../../../../data/data";
function DefaultDurationStep({
  handleClose,
  nextStep,
  previousStep,
  fullStep,
  currentStep,
}) {
  const { data: periods, isLoading, error } = useGetSemesterTimetablePeriods();
  const pD = useSelector(
    (state) =>
      state.semesterTimetable.hard_constraints.schedule_period_duration_minutes
        .duration_minutes,
  );
  const dispatch = useDispatch();
  return (
    <>
      <div className="px-2 d-flex flex-column gap-3">
        <div className="d-flex flex-row align-items-center justify-content-between">
          <span className="fw-semibold">Default Period Duration</span>
          <span
            onClick={() => {
              handleClose();
            }}
          >
            <Icon icon="charm:cross" width="22" height="22" />
          </span>
        </div>
        <div className="modal-content-container px-1">
          <div className="d-flex flex-column gap-3">
            <div className="font-size-sm d-flex flex-row align-items-center justify-content-between">
              <p style={{ width: "450px" }}>
                Choose the standard duration that will be used for teaching
                periods.
              </p>
              <p className="text-capitalize">
                step {currentStep} of {fullStep} completed
              </p>
            </div>
            <div className="card p-2 rounded-4 d-flex flex-column gap-2">
              <div>
                <span className="font-size-sm fw-semibold">
                  Teaching Period Policy
                </span>
              </div>
              <div className="d-flex flex-column font-size-sm">
                <ul>
                  <li>
                    This duration will be applied to all teaching periods unless
                    a specific day is configured differently.
                  </li>
                </ul>
              </div>
            </div>
            <div className="d-flex flex-column gap-2">
              <span className="font-size-sm">Select Period Duration</span>
              <div className="d-flex flex-row flex-wrap gap-2">
                {isLoading ? (
                  [...Array(4)].map((_, index) => (
                    <Fragment key={index}>
                      <RectangleSkeleton width={"24%"} height={"20dvh"} />
                    </Fragment>
                  ))
                ) : error ? (
                  <div className="d-flex flex-grow-1 align-items-center justify-content-center">
                    <div className="d-flex flex-column align-items-center gap-2 text-center">
                      <img
                        src="./sss-maskot/timetable.png"
                        alt="sss-timetable-maskot"
                        style={{
                          height: "200px",
                          width: "200px",
                          objectFit: "contain",
                        }}
                      />
                      <span className="fw-semibold font-size-sm">
                        {error.response.data.errors.title}
                      </span>
                      <p className="text-muted font-size-sm mb-0">
                        {error.response.data.errors.description}
                      </p>
                    </div>
                  </div>
                ) : (
                  periods.data.map((period) => (
                    <Fragment key={period.id}>
                      <button
                        className="border-none rounded-4  d-flex flex-column text-start p-3 justify-content-between bg-white border shadow-sm"
                        style={{ height: "20dvh", width: "24%" }}
                        onClick={() => {
                          dispatch(
                            setDefaultPeriodDuration({
                              duration: period.minutes,
                            }),
                          );
                        }}
                      >
                        <div className="d-flex flex-row justify-content-between font-size-sm align-items-center">
                          <span style={{ maxWidth: "75%" }}>
                            {period?.name}
                          </span>
                          {pD === period.minutes && (
                            <span style={{ lineHeight: 0 }}>
                              <Icon
                                icon="material-symbols:check-circle-rounded"
                                width={20}
                                height={20}
                                className="green-color"
                              />
                            </span>
                          )}
                        </div>
                        <div>
                          <span className="text-capitalize fw-medium font-size-sm">
                            {period?.minutes} Minutes
                          </span>
                        </div>
                      </button>
                    </Fragment>
                  ))
                )}
              </div>
            </div>
            <div className="card p-2 rounded-4 d-flex flex-column gap-2 font-size-sm">
              <span className="font-size-sm fw-semibold">Daily Impact</span>
              <div className="d-flex flex-row justify-content-between">
                <span>Estimated Number of sessions</span>
                <span className="fw-semibold">6</span>
              </div>
              <div className="d-flex flex-row justify-content-between">
                <span>Operational Period</span>
                <span className="fw-semibold">6</span>
              </div>
            </div>
            {pD && (
              <div className="card p-2 rounded-4 d-flex flex-column gap-2">
                <div>
                  <span className="font-size-sm fw-semibold">
                    Sample Lesson
                  </span>
                </div>
                <div className="d-flex flex-row align-items-end justify-content-between font-size-sm">
                  <div className="d-flex flex-column gap-2 justify-content-center">
                    <span className="fw-semibold">
                      {
                        pdSampleLesson.find((s) => s.minutes === pD)?.sample
                          ?.start_time
                      }
                    </span>
                    <div
                      style={{ height: "4rem" }}
                      className="d-flex flex-row align-items-center gap-2 justify-content-center"
                    >
                      <VerticalDashedLine thickness={1} />
                      <span className="fw-medium ">{pD} Min</span>
                    </div>
                    <span className="fw-semibold">
                      {
                        pdSampleLesson.find((s) => s.minutes === pD)?.sample
                          ?.end_time
                      }
                    </span>
                  </div>
                </div>
              </div>
            )}
            {pD && (
              <div className=" p-2 rounded-4 d-flex flex-column gap-2">
                <div>
                  <span className="font-size-sm fw-semibold">Summary</span>
                </div>
                <div className="d-flex flex-column font-size-sm">
                  <ul className="d-flex flex-column gap-2">
                    <li>
                      <div className="d-flex flex-row align-items-center gap-2">
                        <span>Duration</span>
                        <span className="fw-medium">{pD} Min</span>
                      </div>
                    </li>
                    <li>
                      <div className="d-flex flex-row align-items-center gap-2">
                        <span>Applied To</span>
                        <span className="fw-medium">All Teaching Periods</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            )}
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
              Review Weekly Schedule
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default DefaultDurationStep;
