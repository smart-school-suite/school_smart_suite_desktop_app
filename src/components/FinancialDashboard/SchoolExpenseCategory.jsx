import DoughnutChart from "../ChartComponents/DoughnutChart";
import { useGetSchoolExpenseTotalByCategory } from "../../hooks/financialAnalytics/useGetSchoolExpenseCategory";
import { useSelector } from "react-redux";
import RectangleSkeleton from "../SkeletonPageLoader/RectangularSkeleton";
function SchoolExpenseCategory() {
  const {
    data: schoolExpense,
    isLoading,
    error,
  } = useGetSchoolExpenseTotalByCategory(2025);
  const darkMode = useSelector((state) => state.theme.darkMode);
  return (
    <>
      {isLoading ? (
        <RectangleSkeleton width="35%" height="40dvh" speed={1} />
      ) : error ? (
        <h1>School Expense Category</h1>
      ) : (
        <div
          style={{ width: "35%", height: "40dvh" }}
          className={`${darkMode ? "dark-bg" : "bg-white"}   rounded-4 p-2`}
        >
          <div className="mb-3 gainsboro-color">
            <p className="text-start font-size-sm m-0 fw-semibold">
              School Expenses By Category
            </p>
            <p className="text-start fw-light font-size-sm  m-0">
              A visual breakdown of spending across different categories.
            </p>
          </div>
          {console.log(schoolExpense)}
          <DoughnutChart
            compData={schoolExpense?.data?.map((items) => items.total_expense) || []}
            labels={schoolExpense?.data?.map((items) => items.category_name) || []}
            label={"School Expenses By Category"}
          />
        </div>
      )}
    </>
  );
}
export default SchoolExpenseCategory;
