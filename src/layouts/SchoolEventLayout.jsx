import SchoolEventSideBar from "../components/SideBars/SchoolEventSideBar";
import { Outlet } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useSelector } from "react-redux";
import { ModalButton } from "../components/DataTableComponents/ActionComponent";
import CreateEvent from "../ModalContent/Events/CreateEvent";
import { EventIcon } from "../icons/Icons";
function SchoolEventLayout() {
   const darkMode = useSelector((state) => state.theme.darkMode);
  return (
    <>
      <div className="main-container gap-2">
        <div style={{ height:"5%" }}>
          <div className="d-flex align-items-center gap-2">
          <div
             className={`${
                darkMode ? "dark-mode-active" : "light-mode-active"
              } d-flex justify-content-center align-items-center`}
              style={{
                width: "2.5rem",
                height: "2.5rem",
                borderRadius: "0.5rem",
                background: darkMode ? "#a572da" : "#f3ecfb",
                color: darkMode ? "#f3ecfb" : "#a572da",
              }}
          >
          <EventIcon />
          </div>
          <span className="my-0 fw-semibold">Manage School Events</span>
        </div>
        </div>
      <div style={{ height:"95%" }}>
         <div className="d-flex flex-row align-items-start gap-2 w-100 h-100">
            <div className="d-flex flex-column width-20 h-100 gap-2">
              <ModalButton
              action={{ modalContent:CreateEvent }}
              fullscreen={true}
            >
              <button className="border-none rounded-3 justify-content-between w-100 font-size-sm d-flex flex-row gap-2 align-items-center" 
            style={{ background:"#a572da", padding:"0.7rem", color:"#eadcf8" }}>
              <span>Create School Event</span>
              <span><Icon icon="icons8:plus" className="font-size-md" /></span>
            </button>
            </ModalButton>
              <SchoolEventSideBar />
            </div>
            <div className="width-80 h-100">
              <Outlet />
            </div>
          </div>
      </div>
      </div>
    </>
  );
}
export default SchoolEventLayout;
