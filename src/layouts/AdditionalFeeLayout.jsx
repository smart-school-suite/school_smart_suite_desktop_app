import { Outlet } from "react-router-dom";
import { Icon } from "@iconify/react";
import AdditionalFeeSideBar from "../components/SideBars/AdditionalFeeSideBar";
import { MoneyIcon } from "../icons/Icons";
import { useSelector } from "react-redux";
function AdditionalFeeLayout() {
  const darkMode = useSelector((state) => state.theme.darkMode);
  return (
    <>
      <div className="my-2">
        <div className="d-flex align-items-center gap-2">
          <div
             className={`${darkMode ? 'dark-mode-active' : 'light-mode-active'} d-flex justify-content-center align-items-center`}
            style={{
              width: "2.5rem",
              height: "2.5rem",
              borderRadius: "0.5rem",
            }}
          >
           <MoneyIcon />
          </div>
          <span className="my-0 fw-semibold">Manage Student Additional Fee</span>
        </div>
      </div>
      <div className="d-flex flex-row align-items-start gap-2 w-100">
        <AdditionalFeeSideBar />
        <div className="width-80">
          <Outlet />
        </div>
      </div>
    </>
  );
}
export default AdditionalFeeLayout;
