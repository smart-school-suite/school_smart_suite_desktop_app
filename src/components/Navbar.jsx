import { Icon } from "@iconify/react";
import { useLocation, useNavigate } from "react-router-dom";
function Navbar(){
    return(
        <>
        <div className="container-fliud">
                <nav className="w-100 d-flex flex-row mt-2 gap-3">
                  <div className="section-one d-flex flex-row justify-content-start">
                    <div className="school-desc-group d-flex flex-row align-items-center gap-3">
                      <div className="nav-badge primary-background-100 fs-5 fw-bold color-primary rounded-circle d-flex flex-row align-items-center justify-content-center">
                        SY
                      </div>
                      <div className="d-block font-size-sm text-secondary fw-medium">
                        <p className="my-0">SIANTO</p>
                        <p className="my-0">Yaounde</p>
                      </div>
                    </div>
                    </div>
                    <div className="section-two white-background d-flex flex-row align-items-center justify-content-center gap-2 px-2 py-1 rounded-pill">
                      <button className="active">
                        <span>
                        <Icon icon="mdi:finance" className="fs-4"/>
                        </span>
                        <span>Financial Analysis</span>
                      </button>
                      <button className="inactive">
                        <span>
                        <Icon icon="ic:round-school" className="fs-4"/>
                        </span>
                        <span>Academic Analysis</span>
                      </button>
                      <button className="inactive">
                        <span>
                        <Icon icon="ep:operation" className="fs-4"/>
                        </span>
                        <span>Operational Analysis</span>
                      </button>
                    </div>
                    <div className="last-section d-flex flex-row justify-content-end">
                      <div className="last-section-items gap-2 d-flex flex-row">
                        <div className="nav-badge white-bg rounded-circle d-flex fs-4  flex-row justify-content-center align-items-center">
                         <Icon icon="material-symbols:search" style={{ color:"#D5D5D5" }}/>
                        </div>
                        <div className="nav-badge white-bg rounded-circle d-flex fs-4 flex-row justify-content-center align-items-center">
                         <Icon icon="solar:bell-linear" style={{ color:"#D5D5D5" }}/>
                        </div>
                        <div className="nav-badge white-bg rounded-circle ">
                          <img src="./protrait.jpg" alt="" className="nav-top-img"/>
                        </div>
                      </div>
                  </div>
                </nav>
              </div>
        </>
    )
}
export default Navbar;

export function Navbarsettings(){
  const navigate = useNavigate();
  const location = useLocation();
   return(
    <> 
    <div>
    <div className="mt-2 d-flex gap-3  flex-row align-items-center">
                  <div className="badge-settings">
                    <Icon
                      icon="iconamoon:settings-light"
                      className="color-primary fs-4"
                    />
                  </div>
                  <div>
                    <p className="my-0 fs-6 fw-bold">Settings</p>
                  </div>
                </div>
                <div className="setting-nav-top d-flex gap-4 w-100 my-3 bg-white py-1 px-1 rounded-3">
                  <button
                    className={
                      location.pathname === "/settings/account"
                        ? "border-none py-2 px-4 font-size-sm rounded-3 primary-background text-white transition-four-sec"
                        : "gainsboro-color border-none font-size-sm transparent-bg transition-four-sec"
                    }
                    onClick={() => {
                      navigate("/settings/account");
                    }}
                  >
                    Account
                  </button>
                  <button
                    className={
                      location.pathname === "/settings/general-settings"
                        ? "border-none py-2 px-4 font-size-sm rounded-3 primary-background text-white transition-four-sec"
                        : "gainsboro-color border-none font-size-sm transparent-bg transition-four-sec"
                    }
                    onClick={() => {
                      navigate("/settings/general-settings");
                    }}
                  >
                    General Settings
                  </button>
                  <button
                    className={
                      location.pathname === "/settings/display"
                        ? "border-none py-2 px-4 font-size-sm rounded-3 primary-background text-white transition-four-sec"
                        : "gainsboro-color border-none font-size-sm transparent-bg transition-four-sec"
                    }
                    onClick={() => {
                      navigate("/settings/display");
                    }}
                  >
                    Display
                  </button>
                  <button
                    className={
                      location.pathname === "/settings/profile"
                        ? "border-none py-2 px-4 font-size-sm rounded-3 primary-background text-white transition-four-sec"
                        : "gainsboro-color border-none font-size-sm transparent-bg transition-four-sec"
                    }
                    onClick={() => {
                      navigate("/settings/profile");
                    }}
                  >
                    Profile
                  </button>
                  <button
                    className={
                      location.pathname === "/settings/security"
                        ? "border-none py-2 px-4 font-size-sm rounded-3 primary-background text-white transition-four-sec"
                        : "gainsboro-color border-none font-size-sm transparent-bg transition-four-sec"
                    }
                    onClick={() => {
                      navigate("/settings/security");
                    }}
                  >
                    Security
                  </button>
                  <button
                    className={
                      location.pathname === "/settings/help"
                        ? "border-none py-2 px-4 font-size-sm rounded-3 primary-background text-white transition-four-sec"
                        : "gainsboro-color border-none font-size-sm transparent-bg transition-four-sec"
                    }
                    onClick={() => {
                      navigate("/settings/help");
                    }}
                  >
                    Help and Support
                  </button>
                  <button
                    className={
                      location.pathname === "/settings/updates"
                        ? "border-none py-2 px-4 font-size-sm rounded-3 primary-background text-white transition-four-sec d-flex align-items-center gap-3"
                        : "gainsboro-color border-none font-size-sm transparent-bg d-flex align-items-center gap-3 transition-four-sec"
                    }
                    onClick={() => {
                      navigate("/settings/updates");
                    }}
                  >
                    <div className="green-bg  settings-green-pill"></div>
                    <span>Whats New</span>
                  </button>
                </div>
    </div>
    </>
   )
}