
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
function AnnoucementSideBar() {
  return (
    <>
      <div
        className="d-flex flex-column justify-content-start gap-2"
        style={{ height: "97.5dvh" }}
      >
        <div className="d-flex flex-row align-items-center gap-2">
          <div
            style={{
              width: "2.5rem",
              height: "2.5rem",
              borderRadius: "0.5rem",
              background: "#fff3ed",
              color: "#fd9d74",
            }}
            className="d-flex flex-row align-items-center justify-content-center"
          >
            <Icon icon="fluent:speaker-0-20-regular" width="24" height="24" />
          </div>
          <span className="fw-semibold">Announcement</span>
        </div>
        <div
          className="card border-none rounded-4 d-flex  w-100 p-2 gap-4 flex-column"
          style={{ height: "95%" }}
          
        >
         {
           sideBarData.map((items) => {
            return  <SideBarComponent  title={items.title} path={items.path}/>
           })
         }
        </div>
      </div>
    </>
  );
}
export default AnnoucementSideBar;

function SideBarComponent({ title,  path }) {
  const navigate = useNavigate();
  return (
    <>
      <div
            className={
              location.pathname === path
                ? " border-none  font-size-sm rounded-3 announcement-active  transition-four-sec pointer-cursor  d-flex align-items-center gap-3"
                : "gainsboro-color border-none font-size-sm transparent-bg d-flex align-items-center gap-3 transition-four-sec pointer-cursor announcement-inactive"
            }
            onClick={() => {
              navigate(path);
            }}
          >
            {title}
          </div>
    </>
  );
}
export const sideBarData = [
  {
    title: "Overview",
    icon: "mage:dashboard-4-fill",
    path: "/annoucements",
  },
  {
    title: "Active Announcement",
    icon: "f7:speaker-2-fill",
    path: "/viewAnnoucement",
  },
  {
    title: "Schedule Annoucements",
    icon: "material-symbols:schedule-send-rounded",
    path: "/scheduledAnnoucement",
  },
  {
    title: "Draft Announcements",
    icon: "ion:archive",
    path: "/archieveAnnoucement",
  },
  {
    title: "Expired Annoucements",
    icon: "pajamas:expire",
    path: "/expiredAnnoucement",
  },
  {
    title: "Announcement Category",
    icon: "stash:engagement",
    path: "/announcement-category",
  },
  {
     title:"Announcement Tags",
     icon:"",
     path:"/announcement-tag"
  },
  {
    title: "Settings",
    icon: "material-symbols:settings-rounded",
    path: "/annoucementSettings",
  },
];
