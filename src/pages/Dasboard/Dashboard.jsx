import FinanceDashboardCard from "../../components/FinancialDashboard/Card";
import Revenue from "../../components/FinancialDashboard/Revenue";
import SchoolExpenseCategory from "../../components/FinancialDashboard/SchoolExpenseCategory";
import MonthlyExpense from "../../components/FinancialDashboard/MonthlyExpense";
import TuitionFeeLevelBreakDown from "../../components/FinancialDashboard/TuitionFeeLevelBreakDown";
import TuitionFeePaymentRate from "../../components/FinancialDashboard/TuitionFeePaymentRate";
function Dashboard() {
  return (
    <>
      <div>
        <div className="dashboard-content-box d-flex flex-column gap-3 px-2">
          <section>
            <Revenue />
          </section>
          <section>
            <FinanceDashboardCard />
          </section>
          <section>
            <div className="d-flex flex-row gap-3 w-100 justify-content-between">
              <MonthlyExpense />
              <SchoolExpenseCategory />
            </div>
          </section>
          <section>
            <div className="d-flex flex-row gap-3 w-100 justify-content-between">
              <TuitionFeeLevelBreakDown />
              <TuitionFeePaymentRate />
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
export default Dashboard;
