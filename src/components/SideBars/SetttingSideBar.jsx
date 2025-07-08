import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
function SettingSideBar() {
  const navigate = useNavigate();
  return (
    <>
      <div className="d-flex flex-column justify-content-start gap-2" style={{ height:"97.5dvh" }}>
        <div className="d-flex flex-row align-items-center gap-2">
          <div
            style={{
              width: "2.5rem",
              height: "2.5rem",
              borderRadius: "0.5rem",
            }}
            className="primary-background-100 d-flex flex-row align-items-center justify-content-center"
          >
            <Icon
              icon="lsicon:setting-outline"
              width="24"
              height="24"
              className="color-primary"
            />
          </div>
          <span className="fw-semibold">Settings</span>
        </div>
        <div className="card border-none rounded-4 d-flex  w-100 p-2 gap-4 flex-column" style={{ height:"95%" }}>
          <div
            className={
              location.pathname === "/settings/general-settings"
 ? "setting-active border-none  font-size-sm rounded-3 setting-active  transition-four-sec pointer-cursor color-primary d-flex align-items-center gap-3"
                : "gainsboro-color border-none font-size-sm transparent-bg d-flex align-items-center gap-3 transition-four-sec pointer-cursor setting-inactive"
            }
            onClick={() => {
              navigate("/settings/general-settings");
            }}
          >
            General Settings
          </div>
          <div
            className={
              location.pathname === "/settings/display"
                 ? "setting-active border-none  font-size-sm rounded-3 setting-active  transition-four-sec pointer-cursor color-primary d-flex align-items-center gap-3"
                : "gainsboro-color border-none font-size-sm transparent-bg d-flex align-items-center gap-3 transition-four-sec pointer-cursor setting-inactive"
            }
            onClick={() => {
              navigate("/settings/display");
            }}
          >
            Display
          </div>
          <div
            className={
              location.pathname === "/settings/profile"
                ? "setting-active border-none  font-size-sm rounded-3 setting-active  transition-four-sec pointer-cursor color-primary d-flex align-items-center gap-3"
                : "gainsboro-color border-none font-size-sm transparent-bg d-flex align-items-center gap-3 transition-four-sec pointer-cursor setting-inactive"
            }
            onClick={() => {
              navigate("/settings/profile");
            }}
          >
            Profile
          </div>
          <div
            className={
              location.pathname === "/settings/security"
                 ? "setting-active border-none  font-size-sm rounded-3 setting-active  transition-four-sec pointer-cursor color-primary d-flex align-items-center gap-3"
                : "gainsboro-color border-none font-size-sm transparent-bg d-flex align-items-center gap-3 transition-four-sec pointer-cursor setting-inactive"
            }
            onClick={() => {
              navigate("/settings/security");
            }}
          >
            Security
          </div>
          <div
            className={
              location.pathname === "/settings/school"
                 ? "setting-active border-none  font-size-sm rounded-3 setting-active  transition-four-sec pointer-cursor color-primary d-flex align-items-center gap-3"
                : "gainsboro-color border-none font-size-sm transparent-bg d-flex align-items-center gap-3 transition-four-sec pointer-cursor setting-inactive"
            }
            onClick={() => {
              navigate("/settings/school");
            }}
          >
            School
          </div>
          <div
            className={
              location.pathname === "/settings/subscription"
                 ? "setting-active border-none  font-size-sm rounded-3 setting-active  transition-four-sec pointer-cursor color-primary d-flex align-items-center gap-3"
                : "gainsboro-color border-none font-size-sm transparent-bg d-flex align-items-center gap-3 transition-four-sec pointer-cursor setting-inactive"
            }
            onClick={() => {
              navigate("/settings/subscription");
            }}
          >
            Subscriptions
          </div>
          <div
            className={
              location.pathname === "/settings/school-branch"
                ? "setting-active border-none  font-size-sm rounded-3 setting-active  transition-four-sec pointer-cursor color-primary d-flex align-items-center gap-3"
                : "gainsboro-color border-none font-size-sm transparent-bg d-flex align-items-center gap-3 transition-four-sec pointer-cursor setting-inactive"
            }
            onClick={() => {
              navigate("/settings/school-branch");
            }}
          >
            <span>School Branch</span>
          </div>
          <div
            className={
              location.pathname === "/settings/app-settings"
                ? "setting-active border-none  font-size-sm rounded-3 setting-active  transition-four-sec pointer-cursor color-primary d-flex align-items-center gap-3"
                : "gainsboro-color  border-none font-size-sm transparent-bg d-flex align-items-center gap-3 transition-four-sec pointer-cursor setting-inactive"
            }
            onClick={() => {
              navigate("/settings/app-settings");
            }}
          >
            <span>App Configurations</span>
          </div>
        </div>
      </div>
    </>
  );
}
export default SettingSideBar;
