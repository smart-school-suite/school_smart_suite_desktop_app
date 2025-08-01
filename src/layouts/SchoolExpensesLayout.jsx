import { Outlet } from "react-router-dom";
import { Icon } from "@iconify/react";
import SchoolExpensesSideBar from "../components/SideBars/SchoolExpensesSideBar";
import { MoneyIcon } from "../icons/Icons";
function SchoolExpensesLayout() {
  return (
    <>
      <div className="my-2">
        <div className="d-flex align-items-center gap-2">
          <div
            className="d-flex justify-content-center align-items-center primary-background-100 color-primary"
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
      <div className="d-flex flex-row align-items-start gap-2 w-100">
        <SchoolExpensesSideBar />
        <div className="width-80">
          <Outlet />
        </div>
      </div>
    </>
  );
}
export default SchoolExpensesLayout;
