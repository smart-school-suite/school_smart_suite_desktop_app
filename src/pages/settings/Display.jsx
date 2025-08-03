import { Icon } from "@iconify/react";
import SettingSideBar from "../../components/SideBars/SetttingSideBar";
function Display() {
  return (
    <>
     <div className="d-flex flex-column gap-2">
            <div>
              <span style={{ fontSize: "0.87rem" }} className="fw-semibold">
                Theme Selection
              </span>
              <div
                className="card border-none p-2 w-100 d-flex flex-column rounded-4 gap-2"
                style={{ fontSize: "0.87rem" }}
              >
                <div className="d-flex flex-row align-items-center justify-content-between">
                  <div className="d-flex flex-column">
                    <span className="fw-semibold">Dark Mode</span>
                    <span className="gainsboro-color fw-light">Off</span>
                  </div>
                  <div>
                    <div className="form-check form-switch">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        role="switch"
                        id="switchCheckDefault"
                      />
                    </div>
                  </div>
                </div>
                <hr />
                <div className="d-flex flex-row align-items-center justify-content-between">
                  <div className="d-flex flex-column">
                    <span className="fw-semibold">Light Mode</span>
                    <span className="gainsboro-color fw-light">On</span>
                  </div>
                  <div>
                    <div className="form-check form-switch">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        role="switch"
                        id="switchCheckDefault"
                      />
                    </div>
                  </div>
                </div>
                <hr />
                <div className="d-flex flex-row align-items-center justify-content-between">
                  <div className="d-flex flex-column">
                    <span className="fw-semibold">Custom Themes</span>
                    <span className="gainsboro-color fw-light">
                      Select Custom Theme
                    </span>
                  </div>
                  <div>
                    <Icon
                      icon="weui:arrow-filled"
                      className="fs-4 gainsboro-color me-3"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div>
             {/* <span style={{ fontSize: "0.87rem" }} className="fw-semibold">
                Font Settings
              </span>
              <div
                className="card border-none p-2 w-100 d-flex flex-column rounded-4 gap-2"
                style={{ fontSize: "0.87rem" }}
              >
                <div className="d-flex flex-row align-items-center justify-content-between">
                  <div className="d-flex align-items-center flex-row gap-2">
                    <div className="d-flex flex-column">
                      <span className="fw-semibold my-0">Ajust Font Size</span>
                      <span className="gainsboro-color font-size-sm my-0">
                        Lorem ipsum, dolor sit amet consectetur adipisicing
                        elit. Nihil explicabo soluta harum vitae incidunt, eum
                        repudiandae
                      </span>
                    </div>
                  </div>
                  <div>
                    <Icon
                      icon="weui:arrow-filled"
                      className="fs-4 gainsboro-color"
                    />
                  </div>
                </div>
                <hr />
                <div className="d-flex flex-row align-items-center justify-content-between">
                  <div className="d-flex align-items-center flex-row gap-2">
                    <div className="d-flex flex-column">
                      <span className="fw-semibold my-0">Font Type</span>
                      <span className="gainsboro-color font-size-sm my-0">
                        Lorem ipsum, dolor sit amet consectetur adipisicing
                        elit. Nihil explicabo soluta harum vitae incidunt, eum
                        repudiandae
                      </span>
                    </div>
                  </div>
                  <div>
                    <Icon
                      icon="weui:arrow-filled"
                      className="fs-4 gainsboro-color"
                    />
                  </div>
                </div>
              </div> */}
            </div>
          </div>
    </>
  );
}
export default Display;
