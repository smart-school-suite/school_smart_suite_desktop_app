import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
function SchoolExpensesSideBar() {
  const darkMode = useSelector((state) => state.theme.darkMode);
  return (
    <>
      <div
        className={`${darkMode ? 'dark-bg' : "white-bg"} card border-none width-20 p-2 rounded-3 d-flex flex-column gap-3`}>
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
export default SchoolExpensesSideBar;
function SideBarComponent({ title,  path }) {
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
    title: "School Expenses",
    icon: "mage:dashboard-4-fill",
    path: "/school-expenses",
  },
  {
    title: "School Expenses Category",
    icon: "f7:speaker-2-fill",
    path: "/school-expense-category",
  },
];
