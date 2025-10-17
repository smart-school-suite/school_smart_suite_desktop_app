import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function SchoolEventSideBar() {
  const darkMode = useSelector((state) => state.theme.darkMode);

  return (
    <div
      className={`${
        darkMode ? "dark-bg" : "white-bg"
      } card border-none width-100 p-2 rounded-4 d-flex flex-column gap-3 h-100`}
    >
      {sideBarData.map((item) => (
        <SideBarComponent key={item.path} title={item.title} path={item.path} />
      ))}
    </div>
  );
}

export default SchoolEventSideBar;

function SideBarComponent({ title, path }) {
  const navigate = useNavigate();

  return (
    <div
      className={
        location.pathname === path
          ? "border-none font-size-sm rounded-3 school-event-active transition-four-sec pointer-cursor d-flex align-items-center gap-3"
          : "gainsboro-color border-none font-size-sm transparent-bg d-flex align-items-center gap-3 transition-four-sec pointer-cursor school-event-inactive"
      }
      onClick={() => navigate(path)}
    >
      {title}
    </div>
  );
}

export const sideBarData = [
  { title: "Ongoing Events", path: "/events" },
  { title: "Expired Events", path: "/expired-event" },
  { title: "Draft Events", path: "/draft-event" },
  { title: "Scheduled Events", path: "/schedule-event" },
  { title: "Event Category", path: "/event-categories" },
];
