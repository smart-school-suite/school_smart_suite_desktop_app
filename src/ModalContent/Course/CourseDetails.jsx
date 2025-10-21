import { Icon } from "@iconify/react";
import { useGetCourseDetails } from "../../hooks/course/useGetCourseDetails";
import TextDisplay from "../../components/TextComponents/TextDisplay";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import { NotFoundError } from "../../components/errors/Error";
function CourseDetails({ rowData, handleClose }) {
  const { id: courseId } = rowData;
  const {
    data: courseDetails,
    isLoading,
    error,
  } = useGetCourseDetails(courseId);
  return (
    <>
      <div className="w-100">
        <div className="d-flex flex-row align-items-center justify-content-between mb-3">
          <span className="m-0">Course Details</span>
          <span
            className="m-0"
            onClick={() => {
              handleClose();
            }}
          >
            <Icon icon="charm:cross" width="22" height="22" />
          </span>
        </div>
        {isLoading ? (
          <div className="d-flex flex-column gap-2 modal-content-container">
            <div className="d-flex flex-column gap-4">
              {[...Array(8)].map((_, index) => (
              <div className="d-flex gap-1 flex-column" key={index}>
                <RectangleSkeleton height="1dvh" width="40%" />
                <RectangleSkeleton height="1dvh" width="15%" />
              </div>
            ))}
            </div>
          </div>
        ) : error ? (
          <NotFoundError
            title={error?.response?.data?.errors?.title}
            description={error?.response?.data?.errors?.description}
          ></NotFoundError>
        ) : (
          <div className="modal-content-container">
            <div className="d-flex align-items-center justify-content-between">
              <div className="py-2 d-flex flex-column">
                <span className="my-0 font-size-sm gainsboro-color">
                  Course Title
                </span>
                <span className="my-0 font-size-sm">
                  {courseDetails.data.course_title}
                </span>
              </div>
            </div>
            <hr />
            <div className="d-flex align-items-center justify-content-between">
              <div className="py-2 d-flex flex-column">
                <span className="my-0 font-size-sm gainsboro-color">
                  Course Credit
                </span>
                <span className="my-0 font-size-sm">
                  {courseDetails.data.credit} Credit
                </span>
              </div>
            </div>
            <hr />
            <div className="d-flex align-items-center justify-content-between">
              <div className="py-2 d-flex flex-column">
                <span className="my-0 font-size-sm gainsboro-color">
                  Course Code
                </span>
                <span className="my-0 font-size-sm">
                  {courseDetails.data.course_code}
                </span>
              </div>
            </div>
            <hr />
            <div className="d-flex align-items-center justify-content-between">
              <div className="py-2 d-flex flex-column">
                <span className="my-0 font-size-sm gainsboro-color">
                  Level Title
                </span>
                <span className="my-0 font-size-sm">
                  {courseDetails.data.level.name}
                </span>
              </div>
            </div>
            <hr />
            <div className="d-flex align-items-center justify-content-between">
              <div className="py-2 d-flex flex-column">
                <span className="my-0 font-size-sm gainsboro-color">
                  Level Code
                </span>
                <span className="my-0 font-size-sm">
                  {courseDetails.data.level.level}
                </span>
              </div>
            </div>
            <hr />
            <div className="d-flex align-items-center justify-content-between">
              <div className="py-2 d-flex flex-column">
                <span className="my-0 font-size-sm gainsboro-color">
                  Semester Name
                </span>
                <span className="my-0 font-size-sm">
                  {courseDetails.data.semester.name}
                </span>
              </div>
            </div>
            <hr />
            <div className="d-flex align-items-center justify-content-between">
              <div className="py-2 d-flex flex-column">
                <span className="my-0 font-size-sm gainsboro-color">
                  Specailty Name
                </span>
                <span className="my-0 font-size-sm">
                  {courseDetails.data.specialty.specialty_name}
                </span>
              </div>
            </div>
            {courseDetails.data.description && (
              <>
                <hr />
                <div className="d-flex align-items-center justify-content-between">
                  <div className="py-2 d-flex flex-column">
                    <span className="my-0 font-size-sm gainsboro-color">
                      Description
                    </span>
                    <TextDisplay
                      content={courseDetails.data.description}
                      maxLength={200}
                      textStyle={"my-0 font-size-sm"}
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
}
export default CourseDetails;
