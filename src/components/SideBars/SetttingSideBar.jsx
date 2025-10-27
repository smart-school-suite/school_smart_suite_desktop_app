import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
function SettingSideBar() {
  const darkMode = useSelector((state) => state.theme.darkMode);
  return (
    <>
     <div
           className={`${
             darkMode ? "dark-bg" : "white-bg"
           } card border-none width-100 p-2 rounded-4 d-flex flex-column gap-3 h-100`}
         >
           {sideBarData.map((item) => (
             <SideBarComponent key={item.path} title={item.title} path={item.path} />
           ))}
         </div>
    </>
  );
}
export default SettingSideBar;

function SideBarComponent({ title, path }) {
  const navigate = useNavigate();
  const darkMode = useSelector((state) => state.theme.darkMode);
  return (
    <>
      <div
        className={
          location.pathname === path
            ? `border-none  font-size-sm rounded-3 ${darkMode ? 'schoolexpenses-active-dark' : 'schoolexpenses-active'}  transition-four-sec pointer-cursor  d-flex align-items-center gap-3`
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
    id: 1,
    title: "General Settings",
    path: "/settings/general-settings",
  },
  {
    id: 2,
    title: "Display",
    path: "/settings/display",
  },
  {
    id: 3,
    title: "Profile",
    path: "/settings/profile",
  },
  {
    id: 4,
    title: "Security",
    path: "/settings/security",
  },
  {
    id: 5,
    title: "School",
    path: "/settings/school",
  },
  {
    id: 6,
    title: "Subscriptions",
    path: "/settings/subscription",
  },
  {
    id: 7,
    title: "School Branch",
    path: "/settings/school-branch",
  },
  {
    id:8,
    title:"App Configurations",
    path:"/settings/app-settings"
  }
];
