import { Info } from "lucide-react";
import { useSelector } from "react-redux";
import HorizontalDashedLine from "../../../components/DashedLine/HorizonetalDashedLine";
import RectangleSkeleton from "../../../components/SkeletonPageLoader/RectangularSkeleton";
import { NotFoundError } from "../../../components/errors/Error";
import { useGetSemesterTimetableSolutions } from "../../../hooks/semesterTimetable/useGetSemesterTimetableSolutions";
function SemesterTimetableError({ drawerData, handleClose }) {
  const version = useSelector(
    (state) => state.semesterTimetable.timetableVersion,
  );
  const {
    data: solutions,
    isLoading,
    error,
  } = useGetSemesterTimetableSolutions(version.id);
  return (
    <>
      <div></div>
      <div className="drawer-content ps-2 font-size-sm bg-iron-100">
        {isLoading ? (
          <RectangleSkeleton width="100%" height="20dvh" />
        ) : error ? (
          <NotFoundError
            title={error?.response?.data?.errors?.title}
            description={error?.response?.data?.errors?.description}
          ></NotFoundError>
        ) : (
          <div className="d-flex flex-column">
            <div className="d-flex flex-row align-items-center justify-content-between">
              <span>Monday</span>
              <span>4 issues</span>
            </div>
            <div className="d-flex flex-column">
              <div className="card border-none border rounded-3 p-2">
                <div className="d-flex flex-column">
                  <div className="d-flex flex-row align-items-center">
                    <Info />
                    <span>Connected scheduling problem</span>
                  </div>
                  <span>
                    These two problems share an underlying cause. Resolving them
                    together may require fewer changes.
                  </span>
                </div>
                <div className="d-flex flex-column">
                  <div className="d-flex flex-row align-items-center justify-content-between">
                    <span>Blocking</span>
                    <span>problem 1</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="drawer-footer font-size-sm">
        <div className="d-flex flex-column w-100">
          <HorizontalDashedLine dashed={false} color="#ccc" thickness={0.5} />
          <div className="d-flex flex-row align-items-center justify-content-between p-3">
            <button
              className="border-none bg-none"
              onClick={() => handleClose()}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default SemesterTimetableError;
