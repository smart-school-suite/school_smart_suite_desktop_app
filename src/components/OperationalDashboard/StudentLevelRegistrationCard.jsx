import RectangleSkeleton from "../SkeletonPageLoader/RectangularSkeleton";
import BarChart from "../ChartComponents/BarChart";
import { useGetStudentLevelRegistration } from "../../hooks/operationalAnalytics/useGetStudentLevelRegistration";
import { useSelector } from "react-redux";
function StudentRegistrationLevelCard() {
  const {
    data: studentRegistration,
    isLoading,
    error,
  } = useGetStudentLevelRegistration(2025);
  const darkMode = useSelector((state) => state.theme.darkMode);
  return (
    <>
      {isLoading ? (
        <RectangleSkeleton width="50%" height="40dvh" speed={1} />
      ) : error ? (
        <h1>Opps We Encountered An Error</h1>
      ) : (
        <div
          style={{ width: "50%", height: "40dvh" }}
          className={`${
            darkMode ? "dark-bg" : "bg-white"
          } gainsboro-color  rounded-4 p-2`}
        >
          <div className="d-flex font-size-sm flex-row justify-content-between p-1">
            <div className="text-start mb-1">
              <span className="fw-semibold">Student Level Registrations</span>
              <p className="fw-light">
                Shows monthly distribution of school-related costs over the
                year.
              </p>
            </div>
          </div>
          <BarChart
            config={{
              backgroundColor: "#bae7fd",
              borderColor: "#38bff8",
              labels:
                studentRegistration?.data?.map((items) => items.level) || [],
              data: studentRegistration?.data?.map(
                (items) => items.registered_students
              ),
            }}
          />
        </div>
      )}
    </>
  );
}
export default StudentRegistrationLevelCard;
