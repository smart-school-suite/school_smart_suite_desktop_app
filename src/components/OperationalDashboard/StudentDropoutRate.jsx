import { useSelector } from "react-redux";
import GuageChart from "../ChartComponents/GuageChart";
import { useGetStudentDropoutRate } from "../../hooks/operationalAnalytics/useGetStudentDropoutRate";
import RectangleSkeleton from "../SkeletonPageLoader/RectangularSkeleton";
import { formatNumber } from "../../utils/functions";
function StudentDropoutRate() {
  const {
    data: dropoutRate,
    isLoading,
    error,
  } = useGetStudentDropoutRate(2025);
  const darkMode = useSelector((state) => state.theme.darkMode);
  return (
    <>
      {isLoading ? (
        <RectangleSkeleton width="50%" height="45dvh" />
      ) : error ? (
        <h1>Student Dropout Rate Error</h1>
      ) : (
        <div
          style={{ width: "50%", height: "50dvh" }}
          className={`${darkMode ? "dark-bg" : "bg-white"}  rounded-4 p-3`}
        >
          <div className="text-start mb-1">
            <span className="fw-semibold font-size-sm">
              School Dropout Rate
            </span>
          </div>
          <div className="w-100 h-75 d-flex flex-column gap-1">
            <GuageChart
              value={dropoutRate.data.dropout_rate}
              colors={["#58d073", "#ffe60d", "#f57779"]}
            />
            <hr />
            <div className="d-flex flex-row align-items-center w-100 gap-4">
              <div className="w-50 d-flex flex-row justify-content-center">
                <div className="d-flex flex-column gap-3 align-items-center">
                  <span>Dropout</span>
                  <span style={{ fontSize: "2rem", lineHeight: "0%" }}>
                    {formatNumber(dropoutRate.data.student_dropout)}
                  </span>
                </div>
              </div>
              <div
                style={{
                  height: "4.5rem",
                  width: "1px",
                  backgroundColor: "#eee",
                }}
              ></div>
              <div className="w-50 d-flex flex-row justify-content-center">
                <div className="d-flex flex-column gap-3 align-items-center">
                  <span>Enrolled</span>
                  <span style={{ fontSize: "2rem", lineHeight: "0%" }}>
                    {formatNumber(dropoutRate.data.enrolled_students)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default StudentDropoutRate;
