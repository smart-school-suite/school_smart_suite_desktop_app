import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Fragment } from "react";
function TeacherSideBar() {
  const darkMode = useSelector((state) => state.theme.darkMode);
  return (
    <>
      <div
        className={`${
          darkMode ? "dark-bg" : "white-bg"
        } card border-none  p-2 rounded-4 d-flex flex-column gap-2 h-100`}
        style={{ width:"15%" }}
      >
        {sideBarData.map((item, index) => (
          <Fragment key={index}>
            <SideBarComponent title={item.title} path={item.path} />
          </Fragment>
        ))}
      </div>
    </>
  );
}
export default TeacherSideBar;

function SideBarComponent({ title, path }) {
  const navigate = useNavigate();
  const darkMode = useSelector((state) => state.theme.darkMode);
  return (
    <>
      <div
        className={
          location.pathname === path
            ? `border-none  font-size-sm rounded-3 ${
                darkMode
                  ? "schoolexpenses-active-dark"
                  : "schoolexpenses-active"
              }  transition-four-sec pointer-cursor  d-flex align-items-center gap-3`
            : "border-none font-size-sm transparent-bg d-flex align-items-center gap-3 transition-four-sec pointer-cursor schoolexpenses-inactive"
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
    title: "Teacher",
    path: "/teacher",
  },
  {
    title: "Teacher Course",
    path: "/teacher-course",
  },
  {
    title: "Teacher Specialty",
    path: "/teacher-specialty",
  },
  {
    title: "Teacher Availability",
    path: "/teacher-availability",
  },
];
