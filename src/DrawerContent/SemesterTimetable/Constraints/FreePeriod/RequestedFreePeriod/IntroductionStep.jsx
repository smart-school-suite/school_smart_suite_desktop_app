import { Icon } from "@iconify/react";
function IntroductionStep({
  handleClose,
  nextStep,
  previousStep,
  fullStep,
  currentStep,
}) {
  return (
    <>
      <div className="px-2 d-flex flex-column gap-3">
        <div className="d-flex flex-row align-items-center justify-content-between">
          <span className="fw-semibold">Requested Free Periods</span>
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
                Create intentional gaps in student timetables to reduce
                scheduling load.
              </p>
              <p className="text-capitalize">
                step {currentStep} of {fullStep} completed
              </p>
            </div>
            <div className="card p-2 rounded-4 d-flex flex-column gap-2">
              <div>
                <span className="font-size-sm fw-semibold">
                  What Are Requested Free Periods?
                </span>
              </div>
              <div>
                <div className="d-flex flex-column font-size-sm">
                  <ul>
                    <li>
                      Requested free periods are specific times where students
                      should not be assigned classes.
                    </li>
                    <li>
                      The institution remains operational, but the timetable
                      generator leaves the selected periods empty.
                    </li>
                  </ul>
                </div>
              </div>
              <div className="d-flex flex-row align-items-center gap-2 w-100">
                <div className="d-flex flex-column gap-1 w-50">
                  <span className="font-size-sm">Without Requested Free</span>
                  <div className="card p-2 rounded-4">
                    <div className="d-flex flex-column font-size-sm align-items-start gap-2 ">
                      <span>08:00 Mathematics</span>
                      <span>09:00 English</span>
                      <span>10:00 Chemistry</span>
                      <span>11:00 Biology</span>
                      <span>12:00 Physics</span>
                    </div>
                  </div>
                </div>
                <div className="d-flex flex-column gap-1 w-50">
                  <span className="font-size-sm">
                    With Requested Free Periods
                  </span>
                  <div className="card p-2 rounded-4">
                    <div className="d-flex flex-column font-size-sm align-items-start gap-2 ">
                      <span>08:00 Mathematics</span>
                      <span>09:00 English</span>
                      <span className="text-primary fw-semibold">
                        10:00 Free Period
                      </span>
                      <span>11:00 Biology</span>
                      <span className="text-primary fw-semibold">
                        12:00 Free Period
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="card p-2 rounded-4 d-flex flex-column gap-2">
              <div>
                <span className="font-size-sm fw-semibold">
                  Why is this important
                </span>
              </div>
              <div>
                <div className="d-flex flex-column font-size-sm">
                  <ul>
                    <li>
                      The Timetable generator will only place classes during the
                      operational periods you defined
                    </li>
                    <li>
                      Anytime outside these hours will be considered unavailable
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="card p-2 rounded-4 d-flex flex-column gap-2">
              <div>
                <span className="font-size-sm fw-semibold">
                  How This Affects Scheduling
                </span>
              </div>
              <div>
                <div className="d-flex flex-column font-size-sm">
                  <ul>
                    <li>
                      Students will not be assigned classes during requested
                      free periods
                    </li>
                    <li>The institution remains operational</li>
                    <li>Teachers and rooms may still be scheduled elsewhere</li>
                    <li>
                      Requested free periods help control timetable density
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="card p-2 rounded-4 d-flex flex-column gap-2">
              <div>
                <span className="font-size-sm fw-semibold">
                  Why Configure Free Periods?
                </span>
              </div>
              <div>
                <div className="d-flex flex-column font-size-sm">
                  <ul>
                    <li>Reduce student workload</li>
                    <li>Avoid back-to-back classes</li>
                    <li>Improve timetable flexibility</li>
                    <li>Create breathing room in schedules</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="d-flex flex-column gap-2">
              <span className="font-size-sm fw-medium">
                What you will configure
              </span>
              <ul>
                <li>
                  <div className="d-flex flex-column">
                    <span className="font-size-sm fw-medium">
                      Operational Hours
                    </span>
                    <p className="font-size-sm text-muted">
                      Select the days that contain free periods
                    </p>
                  </div>
                </li>
                <li>
                  <div className="d-flex flex-column">
                    <span className="font-size-sm fw-medium">
                      Special Exceptions
                    </span>
                    <p className="font-size-sm text-muted">
                      Define the time ranges that should remain free
                    </p>
                  </div>
                </li>
                <li>
                  <div className="d-flex flex-column">
                    <span className="font-size-sm fw-medium">
                      Special Exceptions
                    </span>
                    <p className="font-size-sm text-muted">
                      Review your schedule before saving
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="w-100 d-flex flex-row align-items-center justify-content-end">
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
export default IntroductionStep;
