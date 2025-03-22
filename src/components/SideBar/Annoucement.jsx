import { ModalButton } from "../DataTableComponents/ActionComponent";
import { Icon } from "@iconify/react";
import CreateAnnoucement from "../../ModalContent/Annoucement/CreateAnnoucement";
import { useNavigate } from "react-router-dom";
function AnnoucementSideBar() {
  return (
    <>
      <div className="col-lg-3">
        <ModalButton
          classname="mt-2 px-3 border-none createAnnoucementbtn font-size-md rounded-3 w-100 d-flex justify-content-around  primary-background-300"
          action={{ modalContent: CreateAnnoucement }}
        >
          <span>create Annoucement</span>
          <span>
            <Icon icon="mynaui:plus-solid" />
          </span>
        </ModalButton>
        <div className="card mt-2 py-1 px-3 mt-2 rounded-4 annoucementSideBar">
           { 
             AnnoucementSideBarData.map((items) => {
                 return(
                    <AnnoucementSideBarComponent title={items.title} icon={items.icon} path={items.path}/>
                 )
             })
           }
        </div>
      </div>
    </>
  );
}
export default AnnoucementSideBar;

function AnnoucementSideBarComponent({ title, icon, path }) {
  const navigate = useNavigate();
  return (
    <>
      <div
        className={`
             d-flex flex-row align-items-center my-4 justify-content-between font-size-md pointer-cursor ${
               location.pathname === path ? "color-primary fw-medium" : null
             }
            `}
        onClick={() => navigate(path)}
      >
        <span className="annoucementTitle">{title}</span>
        <span>
          <Icon icon={icon} />
        </span>
      </div>
    </>
  );
}
export const AnnoucementSideBarData = [
  {
    title: "Overview",
    icon: "mage:dashboard-4-fill",
    path: "/annoucements",
  },
  {
    title: "View Annoucements",
    icon: "f7:speaker-2-fill",
    path: "/viewAnnoucement",
  },
  {
    title: "Schedule Annoucements",
    icon: "material-symbols:schedule-send-rounded",
    path: "/scheduledAnnoucement",
  },
  {
    title: "Archieved Annoucements",
    icon: "ion:archive",
    path: "/archieveAnnoucement",
  },
  {
    title: "Expired Annoucements",
    icon: "pajamas:expire",
    path: "/expiredAnnoucement",
  },
  {
    title: "Engament Analytics",
    icon: "stash:engagement",
    path: "/engagementAnalytics",
  },
  {
    title: "Settings",
    icon: "material-symbols:settings-rounded",
    path: "/annoucementSettings",
  },
];
