import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useSelector } from "react-redux";
function SettingSideBar() {
  const navigate = useNavigate();
  const darkMode = useSelector((state) => state.theme.darkMode);

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
            className={`${darkMode ? 'dark-mode-active' : 'light-mode-active'} d-flex flex-row align-items-center justify-content-center`}
          >
            <Icon
              icon="lsicon:setting-outline"
            />
          </div>
          <span className="fw-semibold">Settings</span>
        </div>
        <div className={`${darkMode ? 'dark-bg' : 'white-bg'} card border-none rounded-4 d-flex  w-100 p-2 gap-4 flex-column`} style={{ height:"95%" }}>
          <div
            className={
              location.pathname === "/settings/general-settings"
                ? `${darkMode ? 'setting-active-dark' : 'setting-active' } border-none  font-size-sm rounded-3  transition-four-sec pointer-cursor color-primary d-flex align-items-center gap-3`
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
                 ? `${darkMode ? 'setting-active-dark' : 'setting-active' } border-none  font-size-sm rounded-3  transition-four-sec pointer-cursor color-primary d-flex align-items-center gap-3`
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
                ? `${darkMode ? 'setting-active-dark' : 'setting-active' } border-none  font-size-sm rounded-3  transition-four-sec pointer-cursor color-primary d-flex align-items-center gap-3`
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
                 ? `${darkMode ? 'setting-active-dark' : 'setting-active' } border-none  font-size-sm rounded-3  transition-four-sec pointer-cursor color-primary d-flex align-items-center gap-3`
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
                 ? `${darkMode ? 'setting-active-dark' : 'setting-active' } border-none  font-size-sm rounded-3  transition-four-sec pointer-cursor color-primary d-flex align-items-center gap-3`
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
                 ? `${darkMode ? 'setting-active-dark' : 'setting-active' } border-none  font-size-sm rounded-3  transition-four-sec pointer-cursor color-primary d-flex align-items-center gap-3`
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
                ? `${darkMode ? 'setting-active-dark' : 'setting-active' } border-none  font-size-sm rounded-3  transition-four-sec pointer-cursor color-primary d-flex align-items-center gap-3`
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
                ? `${darkMode ? 'setting-active-dark' : 'setting-active' } border-none  font-size-sm rounded-3  transition-four-sec pointer-cursor color-primary d-flex align-items-center gap-3`
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
