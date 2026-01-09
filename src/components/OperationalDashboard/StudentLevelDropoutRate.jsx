import RectangleSkeleton from "../SkeletonPageLoader/RectangularSkeleton";
import { useGetStudentDropoutRateLevel } from "../../hooks/operationalAnalytics/useGetStudentDropoutRateLevel";
import { useSelector } from "react-redux";
import { formatNumber } from "../../utils/functions";
function StudentLevelDropoutRate() {
  const {
    data: dropoutRate,
    isLoading,
    error,
  } = useGetStudentDropoutRateLevel(2025);
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
              Student Registration By Level
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
                  <th>Enrollment</th>
                  <th>Dropout</th>
                  <th>Rate</th>
                </tr>
              </thead>
              <tbody>
                {dropoutRate.data.map((items, index) => (
                  <tr key={items.level_id}>
                    <td>{index + 1}</td>
                    <td>{items.level_number}</td>
                    <td>{formatNumber(items.total_enrollment)}</td>
                    <td>{formatNumber(items.total_dropout)}</td>
                    <td>{items.dropout_rate}%</td>
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
export default StudentLevelDropoutRate;
