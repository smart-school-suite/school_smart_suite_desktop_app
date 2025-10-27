import { Outlet } from "react-router-dom";
import SettingSideBar from "../components/SideBars/SetttingSideBar";
import { Icon } from "@iconify/react";
import { useSelector } from "react-redux";
function SetttingLayout() {
  const darkMode = useSelector((state) => state.theme.darkMode);
  return (
    <>
      <main className="main-container gap-2">
        <div style={{ height:"5%" }}>
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
        </div>
        <div style={{ height:"95%" }}>
        <div className="d-flex flex-row align-items-start gap-2 w-100 h-100">
         <div style={{ width:"20%", height:"100%" }}>
          <SettingSideBar />
         </div>
        <div className="width-80 h-100">
          <Outlet />
        </div>
      </div>
      </div>
      </main>
    </>
  )
}
export default SetttingLayout;