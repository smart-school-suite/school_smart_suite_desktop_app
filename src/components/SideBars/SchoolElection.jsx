import { ModalButton } from "../DataTableComponents/ActionComponent";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import CreateElections from "../../ModalContent/Elections/CreateElections";
function SchoolElectionSideBar() {
  return (
    <>
      <div className="col-lg-3">
        <ModalButton
          classname="createElectionBtn"
          action={{ modalContent: CreateElections }}
        >
          <span className="annoucementTitle">Create Election</span>
          <span>
            <Icon icon="mynaui:plus-solid" />
          </span>
        </ModalButton>
        <div className="card mt-2 py-1 px-3 mt-2 rounded-4 annoucementSideBar">
          {ElectionSideBarData.map((items) => {
            return (
              <ElectionSideBarComponent
                title={items.title}
                icon={items.icon}
                path={items.path}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}
export default SchoolElectionSideBar;

function ElectionSideBarComponent({ title, icon, path }) {
  const navigate = useNavigate();
  return (
    <>
      <div
        className={`
               d-flex flex-row align-items-center my-3 justify-content-between font-size-md pointer-cursor ${
                 location.pathname === path ? "color-primary fw-medium " : "gainsboro-color"
               }
              `}
        onClick={() => navigate(path)}
      >
        <span className="annoucementTitle ">{title}</span>
        <span>
          <Icon icon={icon} />
        </span>
      </div>
    </>
  );
}
export const ElectionSideBarData = [
  {
    title: "Overview",
    icon: "mage:dashboard-4-fill",
    path: "/schoolElections",
  },
  {
    title: "View Elections",
    icon: "fluent:vote-20-filled",
    path: "/viewElections",
  },
  {
    title: "Election Roles",
    icon: "eos-icons:role-binding",
    path: "/electionRoles",
  },
  {
    title: "Election Candidates",
    icon: "fluent:people-queue-28-filled",
    path: "/electionCandidates",
  },
  {
    title: "Election Applications",
    icon: "fluent:form-24-filled",
    path: "/electionApplication",
  },
  {
    title: "Election Results",
    icon: "game-icons:podium-winner",
    path: "/electionResults",
  },
  {
    title: "Past Winners",
    icon: "material-symbols:chat-paste-go",
    path: "/passWinners",
  },
  {
    title: "Past Elections",
    icon: "fa-solid:vote-yea",
    path: "/passElection",
  },
  {
    title: "Election Settings",
    icon: "material-symbols:settings-rounded",
    path: "/electionSettings",
  },
];
