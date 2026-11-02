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
      <div className="d-flex flex-column gap-2">
        <div className="d-flex flex-row align-items-center justify-content-between">
          <span className="fw-semibold">Break Period</span>
          <span
            onClick={() => {
              handleClose();
            }}
          >
            <Icon icon="charm:cross" width="22" height="22" />
          </span>
        </div>
        <div className="modal-content-container px-1">
          <div className="d-flex flex-column gap-2">
            <div className="font-size-sm d-flex flex-row align-items-center justify-content-between">
              <p style={{ width: "450px" }}>
                Reserve time during the school day when classes should not be
                scheduled.
              </p>
              <p className="text-capitalize">
                step {currentStep} of {fullStep} completed
              </p>
            </div>
            <div className="card p-2 rounded-4 d-flex flex-column gap-2">
              <div>
                <span className="font-size-sm fw-semibold">
                  What Is A Break Period?
                </span>
              </div>
              <div>
                <div className="d-flex flex-column font-size-sm">
                  <ul>
                    <li>
                      Break periods are protected time blocks where classes
                      cannot be placed.
                    </li>
                    <li>
                      They allow students and staff to pause academic activities
                      before continuing with the rest of the day.
                    </li>
                  </ul>
                </div>
                <div>
                  <span className="font-size-sm fw-semibold">Example</span>
                  <p className="font-size-sm ">
                    if your institution operates from 08:00 AM TO 05:00 PM no
                    classes will ever be scheduled before 08:00 AM or After 5:00
                    AM
                  </p>
                </div>
              </div>
            </div>
            <div className="card p-2 rounded-4 d-flex flex-column gap-2">
              <div>
                <span className="font-size-sm fw-semibold">
                  Scheduling Impact
                </span>
              </div>
              <div className="d-flex flex-row align-items-center gap-2 w-100">
                <div className="d-flex flex-column gap-1 w-50">
                  <span className="font-size-sm">Without Break Period</span>
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
                  <span className="font-size-sm">With Break Period</span>
                  <div className="card p-2 rounded-4">
                    <div className="d-flex flex-column font-size-sm align-items-start gap-2 ">
                      <span>08:00 Mathematics</span>
                      <span>09:00 English</span>
                      <span>10:00 Chemistry</span>
                      <span>11:00 Biology</span>
                      <span className="text-primary fw-semibold">
                        12:00 Break Period
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="d-flex flex-column gap-2">
                <span className="font-size-sm fw-semibold">
                  When a break period exists:
                </span>
                <div className="d-flex flex-column gap-2 font-size-sm">
                  <div className="d-flex flex-row align-items-center gap-1">
                    <span>
                      <Icon
                        icon="material-symbols:check-rounded"
                        width={18}
                        height={18}
                      />
                    </span>
                    <span>Classes cannot be placed inside it</span>
                  </div>
                  <div className="d-flex flex-row align-items-center gap-1">
                    <span>
                      <Icon
                        icon="material-symbols:check-rounded"
                        width={18}
                        height={18}
                      />
                    </span>
                    <span>Students receive uninterrupted break time</span>
                  </div>
                  <div className="d-flex flex-row align-items-center gap-1">
                    <span>
                      <Icon
                        icon="material-symbols:check-rounded"
                        width={18}
                        height={18}
                      />
                    </span>
                    <span>
                      The scheduling engine automatically respects the
                      restriction
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="card p-2 rounded-4 d-flex flex-column gap-2">
              <div>
                <span className="font-size-sm fw-semibold">
                  Flexible Break Policies
                </span>
                <p className="font-size-sm">
                  Not every day needs to follow the same break schedule. you
                  can:
                </p>
              </div>
              <div>
                <div className="d-flex flex-column font-size-sm">
                  <ul>
                    <li>Remove breaks from specific days</li>
                    <li>Use different break times on selected days</li>
                    <li>Keep a standard break schedule for everyone else</li>
                  </ul>
                </div>
                <div>
                  <span className="font-size-sm fw-semibold">Example</span>
                  <p className="font-size-sm ">
                    if your institution operates from 08:00 AM TO 05:00 PM no
                    classes will ever be scheduled before 08:00 AM or After 5:00
                    AM
                  </p>
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
                      Default Break Period
                    </span>
                    <p className="font-size-sm text-muted">
                      Define the school's normal break time.
                    </p>
                  </div>
                </li>
                <li>
                  <div className="d-flex flex-column">
                    <span className="font-size-sm fw-medium">
                      Days Without Breaks
                    </span>
                    <p className="font-size-sm text-muted">
                      Select days that should not have a break period.
                    </p>
                  </div>
                </li>
                <li>
                  <div className="d-flex flex-column">
                    <span className="font-size-sm fw-medium">
                      Custom Break Days
                    </span>
                    <p className="font-size-sm text-muted">
                      Configure different break times for specific days.
                    </p>
                  </div>
                </li>
                <li>
                  <div className="d-flex flex-column">
                    <span className="font-size-sm fw-medium">
                      Review & Save
                    </span>
                    <p className="font-size-sm text-muted">
                      Confirm your break policy before saving it.
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
