import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Fragment } from "react";
function ActivationCodeSideBar() {
  const darkMode = useSelector((state) => state.theme.darkMode);
  return (
    <>
      <div
        className={`${
          darkMode ? "dark-bg" : "white-bg"
        } card border-none width-20 p-2 rounded-4 d-flex flex-column gap-3 h-100`}
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
export default ActivationCodeSideBar;

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
    title: "Activation Code",
    path: "/activation-code",
  },
  {
    title: "Teachers",
    path: "/activation-code/teacher",
  },
  {
    title: "Students",
    path: "/activation-code/student",
  },
  {
    title: "Usage",
    path: "/activation-code/usage",
  },
  {
    title: "Transactions",
    path: "/activation-code/transactions",
  },
];
