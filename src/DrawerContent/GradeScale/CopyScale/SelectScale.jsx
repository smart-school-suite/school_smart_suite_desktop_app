import { Dot } from "lucide-react";
import SearchInput from "../../../components/input/search";
import HorizontalDashedLine from "../../../components/DashedLine/HorizonetalDashedLine";
function SelectScale({
  handleClose,
  nextStep,
  previousStep,
  fullStep,
  currentStep,
  drawerData,
}) {
  return (
    <>
      <div className="drawer-content px-2 font-size-sm pt-2">
        <div className="d-flex flex-column gap-3">
          <div className="d-flex flex-row align-items-center justify-content-between">
            <p className="w-50">
              Start Category B with an existing configuration. You can customize
              it before saving.
            </p>
            <span className="text-end fw-medium text-capitalize">{`step ${currentStep} of ${fullStep} completed`}</span>
          </div>
          <div className="d-flex flex-column gap-1">
            <span className="fw-medium">Select Scale</span>
            <SearchInput placeholder={"Search Scale"} />
          </div>
          <div className="d-flex flex-column gap-2">
            <span className="fw-medium">Available Scales</span>
            <div
              className="card border-none border shadow-sm font-size-sm p-2"
              style={{ borderRadius: "0.8rem" }}
            >
              <div className="d-flex flex-row justify-content-between align-items-center pe-2">
                <div className="d-flex flex-column gap-3">
                  <div className="d-flex flex-column gap-1">
                    <span className="font-size-md fw-semibold">
                      Level Two Exam
                    </span>
                    <div className="d-flex flex-row align-items-center gap-2">
                      <span>Max Score 100</span>
                      <Dot />
                      <span>8 Grades</span>
                      <Dot />
                      <span>7 Passing</span>
                    </div>
                  </div>
                  <div className="d-flex flex-row align-items-center gap-2">
                    <button className="border-none rounded-3 bg-none p-2 border">
                      A+
                    </button>
                  </div>
                </div>
                <div>
                  <input type="radio" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="drawer-footer font-size-sm">
        <div className="d-flex flex-column w-100">
          <HorizontalDashedLine dashed={false} color="#ccc" thickness={0.5} />
          <div className="d-flex flex-row align-items-center justify-content-between p-2">
            <button
              className="border-none bg-none p-2"
              onClick={() => handleClose()}
            >
              cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default SelectScale;
