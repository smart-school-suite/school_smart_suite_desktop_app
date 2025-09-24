import { Outlet } from "react-router-dom";
import SchoolExpensesSideBar from "../components/SideBars/SchoolExpensesSideBar";
import { MoneyIcon } from "../icons/Icons";
import { useSelector } from "react-redux";
function SchoolExpensesLayout() {
  const darkMode = useSelector((state) => state.theme.darkMode);
  return (
    <>
    <main className="main-container gap-2">
         <div style={{ height:"5%" }}>
        <div className="d-flex align-items-center gap-2">
          <div
            className={`${darkMode ? 'dark-mode-active' : 'light-mode-active'} d-flex justify-content-center align-items-center`}
            style={{
              width: "2.5rem",
              height: "2.5rem",
              borderRadius: "0.5rem",
            }}
          >
            <MoneyIcon />
          </div>
          <span className="my-0 fw-semibold">Manage School Expenses</span>
        </div>
      </div>
      <div style={{ height:"95%" }}>
         <div className="d-flex flex-row align-items-start gap-2 w-100 h-100">
        <SchoolExpensesSideBar />
        <div className="width-80 h-100">
          <Outlet />
        </div>
      </div>
      </div>
    </main>
    </>
  );
}
export default SchoolExpensesLayout;
