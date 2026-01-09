import { useGetStudentTotal } from "../../hooks/operationalAnalytics/useGetTotalStudent";
import RectangleSkeleton from "../SkeletonPageLoader/RectangularSkeleton";
import NumberFlow from "@number-flow/react";
import { Icon } from "@iconify/react";
function TotalStudents() {
  const { data: totalStudent, isLoading, error } = useGetStudentTotal();
  return (
    <>
      {isLoading ? (
        <div className="w-100 d-flex flex-row align-items-end justify-content-between">
          <div className="d-flex flex-column gap-2 w-50">
            <RectangleSkeleton width="20%" height="2dvh" speed={1} />
            <RectangleSkeleton width="65%" height="4dvh" speed={1} />
          </div>
          <div className="w-50 d-flex flex-row justify-content-end">
            <RectangleSkeleton width="50%" height="4dvh" speed={1} />
          </div>
        </div>
      ) : error ? (
        <h1>Opps Failed To Fetch</h1>
      ) : (
        <div className="d-flex flex-row justify-content-between align-items-center">
          <div className="d-flex flex-row align-items-center gap-2">
            <div className="d-flex flex-column">
              <span className="font-size-sm m-0">Total Student</span>
              <h2 className="primary-color-dark" style={{ fontSize:"2rem", fontWeight:500 }}><NumberFlow value={totalStudent.data.current_students}/></h2>
            </div>
          </div>
          <div className="d-flex flex-row gap-2 align-items-end gainsboro-color">
            <button className="border-none rounded-pill p-2 d-flex flex-row gap-5 align-items-center font-size-sm">
              <div className="d-flex flex-row gap-2 align-items-center font-size-sm">
                <Icon icon="solar:calendar-outline" />
                <span>2026</span>
              </div>
              <Icon icon="majesticons:chevron-down-line" />
            </button>
            <button className="rounded-circle p-1 border-none">
              <Icon icon="mynaui:download" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
export default TotalStudents;
