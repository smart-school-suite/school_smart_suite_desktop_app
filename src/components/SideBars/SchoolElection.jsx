import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
function SchoolElectionSideBar() {
    const darkMode = useSelector((state) => state.theme.darkMode);
  return (
    <div className={`${darkMode ? 'dark-bg' : "white-bg"} card border-none width-100 p-2 rounded-4 d-flex flex-column gap-3 h-100`}>
      {sideBarData.map((item, index) => (
        <SideBarComponent
          key={item.id || index}
          id={item.id || index}
          title={item.title}
          path={item.path}
        />
      ))}
    </div>
  );
}
export default SchoolElectionSideBar;

function SideBarComponent({ id, title, path }) {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = location.pathname === path;
  return (
    <div
      key={id}
      className={
        isActive
          ? "border-none font-size-sm rounded-3 election-active transition-four-sec pointer-cursor d-flex align-items-center gap-3"
          : "gainsboro-color border-none font-size-sm transparent-bg d-flex align-items-center gap-3 transition-four-sec pointer-cursor election-inactive"
      }
      onClick={() => navigate(path)}
    >
      {title}
    </div>
  );
}

export const sideBarData = [
  {
    id: 1,
    title: "Overview",
    path: "/election-overview",
  },
  {
    id: 2,
    title: "Upcoming Elections",
    path: "/elections",
  },
  {
    id: 3,
    title: "Election Type",
    path: "/election-type",
  },
  {
    id: 4,
    title: "Election Roles",
    path: "/election-roles",
  },
  {
    id: 5,
    title: "Election Candidates",
    path: "/election-candidates",
  },
  {
    id: 6,
    title: "Election Applications",
    path: "/election-application",
  },
  {
    id: 7,
    title: "Election History",
    path: "/election-history",
  },
];
