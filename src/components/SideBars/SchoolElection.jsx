import { useNavigate } from "react-router-dom";
function SchoolElectionSideBar() {
  return (
    <>
<div
        className="card border-none width-100 p-2 rounded-4 d-flex flex-column gap-3 h-100">
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
                ? " border-none  font-size-sm rounded-3 election-active  transition-four-sec pointer-cursor  d-flex align-items-center gap-3"
                : "gainsboro-color border-none font-size-sm transparent-bg d-flex align-items-center gap-3 transition-four-sec pointer-cursor election-inactive"
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
    path: "/election-overview",
  },
  {
    title: "Elections",
    path: "/elections",
  },
  {
    title:"Election Type",
    path:"/election-type"
  },
  {
    title: "Election Roles",
    path: "/election-roles",
  },
  {
    title: "Election Candidates",
    path: "/election-candidates",
  },
  {
    title: "Election Applications",
    path: "/election-application",
  },
  {
    title: "Election Results",
    path: "/election-results",
  },
  {
    title: "Past Winners",
    path: "/past-winners",
  },
  {
    title: "Past Elections",
    path: "/past-election",
  },
];
