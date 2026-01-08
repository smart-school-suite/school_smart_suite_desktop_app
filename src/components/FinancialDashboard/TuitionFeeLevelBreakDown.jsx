import { useGetTuitionFeePaidVsUnpaidLevel } from "../../hooks/financialAnalytics/useGetTuitionFeePaidVsUnpaidLevel";
import { formatNumber } from "../../utils/functions";
import RectangleSkeleton from "../SkeletonPageLoader/RectangularSkeleton";
import { useSelector } from "react-redux";
function TuitionFeeLevelBreakDown() {
  const {
    data: tuitionFeeBreakDown,
    isLoading,
    error,
  } = useGetTuitionFeePaidVsUnpaidLevel(2025);
  const schoolData = useSelector((state) => state.auth.user);
  const currency = schoolData.schoolDetails.school.country.currency;
  const darkMode = useSelector((state) => state.theme.darkMode);
  return (
    <>
      {isLoading ? (
        <RectangleSkeleton width="50%" height="40dvh" />
      ) : error ? (
        <h1>Opps An Error Occurred</h1>
      ) : (
        <div
          style={{ width: "50%", height: "50dvh" }}
          className={`${
            darkMode ? "dark-bg" : "bg-white"
          } gainsboro-color  rounded-4 p-2`}
        >
          <div className="text-start mb-1">
            <span className="fw-semibold font-size-sm">
              Tuition Fee BreakDown
            </span>
            <p className="fw-light font-size-sm">
              Shows monthly distribution of school-related costs over the year.
            </p>
          </div>
          <div className="dashboard-table-container scroll-bar-sm">
            <table className="dashboard-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Level</th>
                <th>Level Name</th>
                <th>Amount Paid</th>
                <th>Amount Left</th>
                <th>Payment Rate</th>
              </tr>
            </thead>
            <tbody>
              {tuitionFeeBreakDown.data.map((items) => (
                <tr key={items.level_id}>
                  <td>1</td>
                  <td>{items.level}</td>
                  <td>Level 100</td>
                  <td>{formatNumber(items.tuition_fee_paid)}</td>
                  <td>{formatNumber(items.tuition_fee_unpaid)}</td>
                  <td>{items.payment_rate}%</td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>
      )}
    </>
  );
}
export default TuitionFeeLevelBreakDown;
