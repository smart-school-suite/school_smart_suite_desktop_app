import { useGetStudentRegistration } from "../../hooks/operationalAnalytics/useGetStudentRegistration";
import { formatNumber } from "../../utils/functions";
import RectangleSkeleton from "../SkeletonPageLoader/RectangularSkeleton";
function StudentRegistrationCard() {
  const {
    data: studentRegistration,
    isLoading,
    error,
  } = useGetStudentRegistration(2025);
  return (
    <>
      {isLoading ? (
        <div className="w-50 d-flex flex-row gap-3" style={{ height: "40dvh" }}>
          <div className="w-50 h-100">
            <RectangleSkeleton width="100%" height="100%" speed={1} />
          </div>
          <div className="w-50 h-100 gap-3 d-flex flex-column">
            <div className="w-100 h-50">
              <RectangleSkeleton width="100%" height="100%" speed={1} />
            </div>
            <div className="w-100 h-50">
              <RectangleSkeleton width="100%" height="100%" speed={1} />
            </div>
          </div>
        </div>
      ) : error ? (
        <h1>Registration Error</h1>
      ) : (
        <div className="w-50 d-flex flex-row gap-3" style={{ height: "40dvh" }}>
          <div className="bg-white rounded-4 w-50 h-100 p-3 d-flex flex-column">
            <span>Academic Enrollment</span>
            <div className="d-flex flex-row align-items-center justify-content-between mt-auto">
              <div className="d-flex flex-column">
                <span className="font-size-sm">Total Students</span>
                <span style={{ fontSize: "3.5rem", margin: 0 }}>{formatNumber(studentRegistration.data.total_registered_students)}</span>
              </div>
              <div>
                <span>+30%</span>
              </div>
            </div>
          </div>
          <div className="d-flex flex-column w-50 gap-3 h-100">
            <div className="bg-white rounded-4 h-50 p-3 d-flex flex-column justify-content-center">
              <div className="d-flex flex-row align-items-center justify-content-between">
                <div className="d-flex flex-column">
                  <span>Females</span>
                  <span style={{ fontSize: "2.5rem", margin: 0 }}>1000</span>
                </div>
                <div>
                  <span>+30%</span>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-4 h-50 p-3 d-flex flex-column justify-content-center">
              <div className="d-flex flex-row align-items-center justify-content-between">
                <div className="d-flex flex-column">
                  <span>Males</span>
                  <span style={{ fontSize: "2.5rem", margin: 0 }}>1000</span>
                </div>
                <div>
                  <span>+30%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default StudentRegistrationCard;
