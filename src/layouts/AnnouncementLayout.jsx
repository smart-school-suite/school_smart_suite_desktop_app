import { Outlet } from "react-router-dom";
import AnnoucementSideBar from "../components/SideBars/AnnoucementSideBar";
import { Icon } from "@iconify/react";
import CreateAnnouncement from "../ModalContent/Announcement/CreateAnnouncement";
import { ModalButton } from "../components/DataTableComponents/ActionComponent";
import { AnnouncementIcon } from "../icons/ActionIcons";
import { useSelector } from "react-redux";
function AnnouncementLayout() {
  const darkMode = useSelector((state) => state.theme.darkMode);
  return (
    <>
      <div className="main-container gap-2">
        <div style={{ height: "5%" }}>
          <div className="d-flex w-100 align-items-center justify-content-between flex-row">
            <div className="d-flex align-items-center gap-2">
          <div
             className={`${darkMode ? 'dark-mode-active' : 'light-mode-active'} d-flex justify-content-center align-items-center`}
            style={{
              width: "2.5rem",
              height: "2.5rem",
              borderRadius: "0.5rem",
              background: "#fff3ed",
              color: "#fd9d74",
            }}
          >
          <AnnouncementIcon />
          </div>
          <span className="my-0 fw-semibold">Manage Announcements</span>
          </div>
          <div>
            <ModalButton
              action={{ modalContent:CreateAnnouncement }}
              size={"xl"}
            >
              <button className="border-none rounded-3 font-size-sm d-flex flex-row gap-2 align-items-center" 
            style={{ background:"#fd9d74", padding:"0.7rem", color:"#ffe4d5" }}>
              <span><Icon icon="icons8:plus" className="font-size-md" /></span>
              <span>Create Announcement</span>
            </button>
            </ModalButton>
          </div>
          </div>
        </div>
        <div style={{ height: "95%" }}>
          <div className="d-flex flex-row align-items-start gap-2 w-100 h-100">
            <AnnoucementSideBar />
            <div className="width-80 h-100">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default AnnouncementLayout;
