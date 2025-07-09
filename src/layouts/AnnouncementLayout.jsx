import { Outlet } from "react-router-dom";
import AnnoucementSideBar from "../components/SideBars/AnnoucementSideBar";
import { Icon } from "@iconify/react";
function AnnouncementLayout(){
    return(
        <>
           <div className="py-3  setting-container">
        <div className="row align-items-center d-flex">
          <div style={{ width: "20%" }}>
            <AnnoucementSideBar />
          </div>
          <div style={{ width: "80%" }} className="d-flex mb-auto flex-column gap-2 setting-outlet" >
            <div className="d-flex flex-row align-items-center justify-content-end">
              <button className="border-none rounded-2 px-3 py-2 d-flex gap-2 font-size-sm" style={{ background:"#ffd9c6" }}>
                <span><Icon icon="ic:round-plus" width="18" height="18" /></span>
                <span>Create Announcement</span>
              </button>
            </div>
            <Outlet />
          </div>
        </div>
      </div>
        </>
    )
}
export default AnnouncementLayout; 