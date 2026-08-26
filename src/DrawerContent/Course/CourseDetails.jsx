import { Icon } from "@iconify/react";
import { useGetCourseDetails } from "../../hooks/course/useGetCourseDetails";
import TextDisplay from "../../components/TextComponents/TextDisplay";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import { NotFoundError } from "../../components/errors/Error";
import { Fragment } from "react";
import HorizontalDashedLine from "../../components/DashedLine/HorizonetalDashedLine";
function CourseDetails({ drawerData, handleClose }) {
  const { id: courseId } = drawerData;
  const {
    data: courseDetails,
    isLoading,
    error,
  } = useGetCourseDetails(courseId);
  return (
    <>
      <div
        className="font-size-sm d-flex flex-column gap-4 pt-2"
        style={{ flex: 1, minHeight: 0 }}
      >
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
          <>
            <div className="drawer-content px-2">
              <div className="d-flex align-items-center justify-content-between">
                <div className="py-2 d-flex flex-column">
                  <span>
                    Course Title
                  </span>
                  <span className="my-0 font-size-sm">
                    {courseDetails?.data?.course_title}
                  </span>
                </div>
              </div>
              <hr />
              <div className="d-flex align-items-center justify-content-between">
                <div className="py-2 d-flex flex-column">
                  <span>
                    Course Credit
                  </span>
                  <span className="my-0 font-size-sm">
                    {courseDetails?.data?.credit} Credit
                  </span>
                </div>
              </div>
              <hr />
              <div className="d-flex align-items-center justify-content-between">
                <div className="py-2 d-flex flex-column">
                  <span>
                    Course Code
                  </span>
                  <span className="my-0 font-size-sm">
                    {courseDetails?.data?.course_code}
                  </span>
                </div>
              </div>
              <hr />
              <div className="d-flex align-items-center justify-content-between">
                <div className="py-2 d-flex flex-column">
                  <span>
                    Level Title
                  </span>
                  <span className="my-0 font-size-sm">
                    {courseDetails?.data?.level?.name}
                  </span>
                </div>
              </div>
              <hr />
              <div className="d-flex align-items-center justify-content-between">
                <div className="py-2 d-flex flex-column">
                  <span>
                    Level Code
                  </span>
                  <span className="my-0 font-size-sm">
                    {courseDetails?.data?.level?.level}
                  </span>
                </div>
              </div>
              <hr />
              <div className="d-flex align-items-center justify-content-between">
                <div className="py-2 d-flex flex-column">
                  <span>
                    Semester
                  </span>
                  <span className="my-0 font-size-sm">
                    {courseDetails?.data?.semester?.name}
                  </span>
                </div>
              </div>
              <hr />
              <div className="d-flex flex-column gap-1">
                <span>
                  Course Type
                </span>
                <div className="d-flex flex-row align-items-center flex-wrap gap-2">
                  {courseDetails?.data?.types?.map((items) => (
                    <Fragment key={items.id}>
                      <span
                        className="pill-hall-state"
                        style={{
                          background: `${items.background_color}`,
                          color: `${items.text_color}`,
                        }}
                      >
                        {items.name}
                      </span>
                    </Fragment>
                  ))}
                </div>
              </div>
              <hr />
              <div className="d-flex align-items-center justify-content-between">
                <div className="py-2 d-flex flex-column">
                  <span>
                    Specailty Name
                  </span>
                  <span className="my-0 font-size-sm">
                    {courseDetails?.data?.specialty?.specialty_name}
                  </span>
                </div>
              </div>
              {courseDetails?.data?.description && (
                <>
                  <hr />
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="py-2 d-flex flex-column">
                      <span>
                        Description
                      </span>
                      <TextDisplay
                        content={courseDetails?.data?.description}
                        maxLength={200}
                        textStyle={"my-0 font-size-sm"}
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
            <div className="drawer-footer font-size-sm">
              <div className="d-flex flex-column w-100">
                <HorizontalDashedLine
                  dashed={false}
                  color="#ccc"
                  thickness={0.5}
                />
                <div className="d-flex flex-row align-items-center justify-content-between py-3 px-2">
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
        )}
      </div>
    </>
  );
}
export default CourseDetails;
