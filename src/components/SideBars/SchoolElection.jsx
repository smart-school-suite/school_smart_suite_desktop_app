import { useNavigate } from "react-router-dom";
function SchoolElectionSideBar() {
  return (
    <>
<div
        className="card border-none width-20 p-2 rounded-3 d-flex flex-column gap-3">
        {
            sideBarData.map((item) => (
                 <SideBarComponent 
                   title={item.title}
                   path={item.path}
                 />
            ))
        }
      </div>
    </>
  );
}
export default SchoolElectionSideBar;

function SideBarComponent({ title,  path }) {
  const navigate = useNavigate();
  return (
    <>
      <div
            className={
              location.pathname === path
                ? " border-none  font-size-sm rounded-3 schoolexpenses-active  transition-four-sec pointer-cursor  d-flex align-items-center gap-3"
                : "gainsboro-color border-none font-size-sm transparent-bg d-flex align-items-center gap-3 transition-four-sec pointer-cursor schoolexpenses-inactive"
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
    path: "/schoolElections",
  },
  {
    title: "Elections",
    path: "/viewElections",
  },
  {
    title: "Election Roles",
    path: "/electionRoles",
  },
  {
    title: "Election Candidates",
    path: "/electionCandidates",
  },
  {
    title: "Election Applications",
    path: "/electionApplication",
  },
  {
    title: "Election Results",
    path: "/electionResults",
  },
  {
    title: "Past Winners",
    path: "/passWinners",
  },
  {
    title: "Past Elections",
    path: "/passElection",
  },
];
