import { useGetMonthlySchoolExpense } from "../../hooks/financialAnalytics/useGetMonthlySchoolExpense";
import RectangleSkeleton from "../SkeletonPageLoader/RectangularSkeleton";
import BarChart from "../ChartComponents/BarChart";
import { useSelector } from "react-redux";
function MonthlyExpense() {
  const {
    data: monthySchoolExpense,
    isLoading,
    error,
  } = useGetMonthlySchoolExpense(2025);
  const darkMode = useSelector((state) => state.theme.darkMode);
  return (
    <>
      {isLoading ? (
        <RectangleSkeleton width="75%" height="45dvh" speed={1} />
      ) : error ? (
        <h1>Opps We Encountered An Error</h1>
      ) : (
        <div
          style={{ width: "65%", height: "40dvh" }}
          className={`${
            darkMode ? "dark-bg" : "bg-white"
          } gainsboro-color  rounded-4 p-2`}
        >
          <div className="d-flex font-size-sm flex-row justify-content-between px-2 pt-2">
            <div className="text-start mb-1">
              <span className="fw-semibold">School Expenses Over Months</span>
              <p className="fw-light">
                Shows monthly distribution of school-related costs over the
                year.
              </p>
            </div>
            <div className="d-flex flex-row gap-3 align-items-center">
              <div
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "8px",
                  background: "#ffe4d5",
                }}
              ></div>
              <span className="fw-semibold">School Expenses</span>
            </div>
          </div>
          <BarChart
            config={{
              backgroundColor: "#ffe4d5",
              borderColor: "#fd9d74",
              labels: monthySchoolExpense?.data?.map((items) =>
                items.month_short.toUpperCase()
              ) || [],
              data: monthySchoolExpense?.data?.map((items) => items.expense_total),
            }}
          />
        </div>
      )}
    </>
  );
}
export default MonthlyExpense;
