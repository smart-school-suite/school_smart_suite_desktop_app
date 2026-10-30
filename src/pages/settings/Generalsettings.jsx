import { useSelector } from "react-redux";
function Generalsettings() {
  const darkMode = useSelector((state) => state.theme.darkMode);
  return (
    <>
      <div
        className="scroll-bar-sm over-flow-x-hidden over-flow-y-auto height-auto d-flex flex-column pe-1 gap-2 font-size-sm"
        style={{ maxHeight: "84dvh" }}
      >
        <div className="setting-container d-flex flex-column gap-2 px-2">
          <div className="d-flex flex-column gap-1">
            <span className="fw-medium">Country Details</span>
            <div
              className={` card border-none border p-2 w-100 d-flex flex-column rounded-4 gap-2 p-3`}
            >
              <div className="d-flex flex-column">
                <span>Country Name</span>
                <span className="gainsboro-color fw-light">Cameroon</span>
              </div>
              <hr />
              <div className="d-flex flex-column">
                <span>Official Language</span>
                <span className="gainsboro-color fw-light">French</span>
              </div>
              <hr />
              <div className="d-flex flex-column">
                <span>Currency</span>
                <span className="gainsboro-color fw-light">XAF</span>
              </div>
            </div>
          </div>
          <div className="d-flex flex-column gap-1">
            <span className="fw-medium">Application Details</span>
            <div
              className={` card border-none p-2 w-100 d-flex flex-column rounded-4 gap-2 p-3 border`}
            >
              <div className="d-flex flex-column">
                <span>App Name</span>
                <span className="gainsboro-color fw-light">
                  School Smart Suite (SSS) Desktop
                </span>
              </div>
              <hr />
              <div className="d-flex flex-column">
                <span>Version</span>
                <span className="gainsboro-color fw-light">1.23.10</span>
              </div>
              <hr />
              <div className="d-flex flex-row align-items-center justify-content-between">
                <div className="d-flex flex-column">
                  <span>Push Notifications</span>
                  <span className="gainsboro-color fw-light">Enabled</span>
                </div>
                <div>
                  <div class="form-check form-switch">
                    <input
                      className="form-check-input py-2 px-3"
                      type="checkbox"
                      role="switch"
                      id="switchCheckDefault"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Generalsettings;
