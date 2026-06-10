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
          <span className="fw-semibold">Requested Assignments</span>
          <span
            onClick={() => {
              handleClose();
            }}
          >
            <Icon icon="charm:cross" width="22" height="22" />
          </span>
        </div>
        <div className="modal-content-container pe-1 pb-5">
          <div className="d-flex flex-column gap-2">
            <div className="font-size-sm d-flex flex-row align-items-center justify-content-between">
              <p style={{ width: "450px" }}>
                Reserve important timetable placements before generation.
              </p>
              <p className="text-capitalize">
                step {currentStep} of {fullStep} completed
              </p>
            </div>
            <div className="font-size-sm card p-2 rounded-4 d-flex flex-column gap-2">
              <span className="fw-semibold">Constraint Description</span>
              <div>
                <p>
                  Requested Assignments allow you to tell the scheduling engine
                  exactly where you would like specific lessons to appear in the
                  timetable.
                </p>
                <p>
                  You can request a particular teacher, hall, day and time for
                  individual courses that require special handling.
                </p>
              </div>
            </div>
            <div className="card p-2 rounded-4 d-flex flex-column gap-2 font-size-sm">
              <div className="d-flex flex-column gap-2">
                <div className="d-flex flex-row align-items-center justify-content-between">
                  <span className="font-size-sm fw-semibold">
                    Constraint Type
                  </span>
                  <button
                    className="border-none d-flex flex-row align-items-center gap-1 rounded-pill px-2 py-1 primary-background-100 color-primary"
                    style={{
                      fontSize: "0.7rem",
                    }}
                  >
                    <span>Soft Constraint</span>
                  </button>
                </div>
                <p>
                  Requested Assignments are treated as preferences rather than
                  absolute requirements.The scheduling engine will attempt to
                  honor every requested assignment while generating the
                  timetable.If a requested placement conflicts with higher
                  priority rules or available resources, the engine may be
                  unable to satisfy it.
                </p>
              </div>
              <div>
                <div>
                  <ul className="d-flex flex-column font-size-sm gap-2">
                    <li>Engine will try to honor your request</li>
                    <li>Engine will explain failures</li>
                    <li>Alternative solutions will be suggested</li>
                    <li>Placement is not guaranteed</li>
                  </ul>
                </div>
                <div className="d-flex flex-column gap-2">
                  <span className="font-size-sm fw-semibold">
                    Example Requested Assignment
                  </span>
                  <ul className="d-flex flex-column font-size-sm gap-2">
                    <li>
                      <div className="d-flex flex-column">
                        <span className="fw-semibold">Course</span>
                        <span>Engineering Mathematics</span>
                      </div>
                    </li>
                    <li>
                      <div className="d-flex flex-column">
                        <span className="fw-semibold">Teacher</span>
                        <span>Dr. Smith</span>
                      </div>
                    </li>
                    <li>
                      <div className="d-flex flex-column">
                        <span className="fw-semibold">Hall</span>
                        <span>Computer Lab 1</span>
                      </div>
                    </li>
                    <li>
                      <div className="d-flex flex-column">
                        <span className="fw-semibold">Day</span>
                        <span>Monday</span>
                      </div>
                    </li>
                    <li>
                      <div className="d-flex flex-column">
                        <span className="fw-semibold">Time</span>
                        <span>09:00 AM - 10:30 AM</span>
                      </div>
                    </li>
                  </ul>
                  <div>
                    <span className="fw-semibold">This tells the engine:</span>
                    <p className="font-size-sm ">
                      Attempt to schedule Engineering Mathematics with Dr. Smith
                      in Computer Lab 1 on Monday between 09:00 and 10:30.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="card p-2 rounded-4 d-flex flex-column gap-4 font-size-sm">
              <div className="d-flex flex-column">
                <span className="font-size-sm fw-semibold">What to Expect</span>
                <span>
                  When timetable generation is completed, each requested
                  assignment will produce one of the following outcomes:
                </span>
              </div>
              <div>
                <div className="d-flex flex-column font-size-sm gap-2">
                  <div className="d-flex flex-row align-items-center gap-2">
                    <span style={{ lineHeight: 0 }}>
                      <Icon
                        icon="material-symbols:check-rounded"
                        width={16}
                        height={16}
                      />
                    </span>
                    <span>Successfully honored</span>
                  </div>
                  <div className="d-flex flex-row align-items-center gap-2">
                    <span style={{ lineHeight: 0 }}>
                      <Icon
                        icon="material-symbols:warning-outline-rounded"
                        width={16}
                        height={16}
                      />
                    </span>
                    <span>Unable to be honored</span>
                  </div>
                </div>
              </div>
              <p>
                If a request cannot be satisfied, the generated timetable
                version will include diagnostic feedback explaining the issue
                and possible ways to resolve it.
              </p>
            </div>
            <div className="card p-2 rounded-4 d-flex flex-column gap-2 font-size-sm">
              <div className="d-flex flex-column">
                <span className="font-size-sm fw-semibold">
                  Diagnostic Feedback
                </span>
                <span>
                  When a requested assignment cannot be honored, the system will
                  provide clear feedback to help you understand the issue.
                </span>
              </div>
              <div>
                <span>Example</span>
                <div className="d-flex flex-column">
                  <span>Requested assignment could not be honored.</span>
                  <span>
                    Reason: The requested placement is not currently achievable
                    within the available timetable configuration.
                  </span>
                </div>
              </div>
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
