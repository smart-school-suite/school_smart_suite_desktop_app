import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
function AnnoucementSideBar() {
  const darkMode = useSelector((state) => state.theme.darkMode);
  return (
    <>
      <div
        className={`${
          darkMode ? "dark-bg" : "white-bg"
        } card border-none w-100 p-2 rounded-4 d-flex flex-column gap-3 h-100`}
      >
        {sideBarData.map((item) => (
          <SideBarComponent title={item.title} path={item.path} />
        ))}
      </div>
    </>
  );
}
export default AnnoucementSideBar;

function SideBarComponent({ title, path }) {
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
    path: "/announcement-overview",
  },
  {
    title: "Active Announcement",
    icon: "f7:speaker-2-fill",
    path: "/announcement",
  },
  {
    title: "Schedule Annoucements",
    icon: "material-symbols:schedule-send-rounded",
    path: "/scheduled-annoucement",
  },
  {
    title: "Draft Announcements",
    icon: "ion:archive",
    path: "/draft-annoucement",
  },
  {
    title: "Expired Annoucements",
    icon: "pajamas:expire",
    path: "/expired-annoucement",
  },
  {
    title: "Announcement Category",
    icon: "stash:engagement",
    path: "/announcement-category",
  },
];
