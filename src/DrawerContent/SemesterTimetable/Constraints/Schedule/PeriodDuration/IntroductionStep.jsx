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
          <span className="fw-semibold">Period Duration</span>
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
                Define how long each teaching period should last in your
                timetable.
              </p>
              <p className="text-capitalize">
                step {currentStep} of {fullStep} completed
              </p>
            </div>
            <div className="card p-2 rounded-4 d-flex flex-column gap-2">
              <div>
                <span className="font-size-sm fw-semibold">
                  What Is Period Duration?
                </span>
              </div>
              <div>
                <div className="d-flex flex-column font-size-sm">
                  <ul>
                    <li>
                      Period duration determines how much time is allocated to
                      each teaching slot.
                    </li>
                    <li>
                      The scheduling engine uses this value when creating the
                      timetable structure for each school day.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="card p-2 rounded-4 d-flex flex-column gap-2">
              <div>
                <span className="font-size-sm fw-semibold">Why It Matters</span>
              </div>
              <div>
                <div className="d-flex flex-column font-size-sm">
                  <ul className="d-flex flex-column gap-2">
                    <li>
                      <div className="d-flex flex-column">
                        <span className="fw-medium">
                          Controls Lesson Length
                        </span>
                        <span className="text-muted">
                          Determine how much teaching time is allocated to each
                          class session.
                        </span>
                      </div>
                    </li>
                    <li>
                      <div className="d-flex flex-column">
                        <span className="fw-medium">Shapes The Timetable</span>
                        <span className="text-muted">
                          The duration affects how many periods fit into a
                          school day.
                        </span>
                      </div>
                    </li>
                    <li>
                      <div className="d-flex flex-column">
                        <span className="fw-medium">Guides Scheduling</span>
                        <span className="text-muted">
                          The timetable generator uses this value to build the
                          timetable grid.
                        </span>
                      </div>
                    </li>
                    <li>
                      <div className="d-flex flex-column">
                        <span className="fw-medium">
                          Supports Different Policies
                        </span>
                        <span className="text-muted">
                          Different days can use different period durations if
                          required.
                        </span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="card p-2 rounded-4 d-flex flex-column gap-2">
              <div className="d-flex flex-column">
                <span className="font-size-sm fw-semibold">
                  How This Affects Scheduling
                </span>
                <span className="font-size-sm">
                  The selected period duration influences:
                </span>
              </div>
              <div>
                <div className="d-flex flex-column font-size-sm">
                  <ul className="d-flex flex-column gap-2">
                    <li>The number of periods per day</li>
                    <li>The structure of the timetable grid</li>
                    <li>How courses are distributed</li>
                    <li>Overall timetable flexibility</li>
                  </ul>
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
