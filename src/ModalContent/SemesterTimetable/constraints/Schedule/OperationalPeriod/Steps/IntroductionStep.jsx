import { Icon } from "@iconify/react";
import HorizontalDashedLine from "../../../../../../components/DashedLine/HorizonetalDashedLine";
function IntroductionStep({ handleClose, nextStep, previousStep, fullStep, currentStep }) {
  return (
    <>
      <div className="px-2 d-flex flex-column gap-3">
        <div className="d-flex flex-row align-items-center justify-content-between">
          <span className="fw-semibold">Operational Period</span>
          <span
            onClick={() => {
              handleClose();
            }}
          >
            <Icon icon="charm:cross" width="22" height="22" />
          </span>
        </div>
        <div className="modal-content-container">
          <div className="d-flex flex-column gap-3">
            <div className="font-size-sm d-flex flex-row align-items-center justify-content-between">
              <p style={{ width:"450px" }}>
                Define When your institution is available for teaching and
                learning activities
              </p>
              <p className="text-capitalize">
                step {currentStep} of {fullStep} completed
              </p>
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
              <div className="d-flex flex-row align-items-center gap-2">
                <span>
                  <Icon
                    icon="material-symbols:check-rounded"
                    width="20"
                    height="20"
                  />
                </span>
                <div className="d-flex flex-column">
                  <span className="font-size-sm fw-medium">
                    Operational Hours
                  </span>
                  <p className="font-size-sm text-muted">
                    Select the days classes can be scheduled
                  </p>
                </div>
              </div>
              <div className="d-flex flex-row align-items-center gap-2">
                <span style={{ lineHeight: 0 }}>
                  <Icon
                    icon="material-symbols:check-rounded"
                    width="20"
                    height="20"
                  />
                </span>
                <div className="d-flex flex-column">
                  <span className="font-size-sm fw-medium">
                    Special Exceptions
                  </span>
                  <p className="font-size-sm text-muted">
                    Customize Days that do not follow the default days set
                  </p>
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
