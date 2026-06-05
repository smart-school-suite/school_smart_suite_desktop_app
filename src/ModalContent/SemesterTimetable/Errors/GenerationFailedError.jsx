import { useGetTimetableErrors } from "../../../hooks/semesterTimetable/useGetTimetableError";
import { Icon } from "@iconify/react";
import { useSelector } from "react-redux";
import RectangleSkeleton from "../../../components/SkeletonPageLoader/RectangularSkeleton";
import { Fragment } from "react";
import { NotFoundError } from "../../../components/errors/Error";

function GenerationFailedError({ handleClose }) {
  const semesterTimetable = useSelector((state) => state.semesterTimetable);
  const versionId = semesterTimetable?.timetableVersion?.id;
  const { data: errors, isLoading, error } = useGetTimetableErrors(versionId);
  return (
    <>
      <div className="d-flex flex-column gap-3">
        <div className="d-flex flex-row align-items-center justify-content-between w-100">
          <span className="m-0">Semester Timetable Errors</span>
          <span
            className="m-0"
            onClick={() => {
              handleClose();
            }}
          >
            <Icon icon="charm:cross" width="22" height="22" />
          </span>
        </div>
        <div className="d-flex flex-column modal-content-container gap-2">
          {isLoading ? (
            <>
              <div className="d-flex flex-column gap-3">
                {[...Array(10)].map((items, index) => (
                  <Fragment key={index}>
                    <div className="d-flex flex-column gap-2">
                      <RectangleSkeleton height="1dvh" width="100%" />
                      <RectangleSkeleton height="1dvh" width="50%" />
                      <RectangleSkeleton height="1dvh" width="25%" />
                    </div>
                  </Fragment>
                ))}
              </div>
            </>
          ) : error ? (
            <>
              <NotFoundError
                title={"Errors Not Found"}
                description={
                  "Erorrs Not Found Ensure that there is good internet connection and try again"
                }
              ></NotFoundError>
            </>
          ) : (
            errors.data.map((items, index) => (
              <>
                <Fragment key={index}>
                  <div className="d-flex flex-column gap-1">
                    <span className="font-size-sm fw-semibold">
                      {items.title}
                    </span>
                    <p className="text-muted font-size-sm mb-0">
                      {items.description}
                    </p>
                  </div>
                </Fragment>
                <hr />
              </>
            ))
          )}
        </div>
      </div>
    </>
  );
}
export default GenerationFailedError;
