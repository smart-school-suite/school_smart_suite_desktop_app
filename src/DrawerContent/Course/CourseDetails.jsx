import { Fragment } from "react";
import HorizontalDashedLine from "../../components/DashedLine/HorizonetalDashedLine";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import TextDisplay from "../../components/TextComponents/TextDisplay";
import { NotFoundError } from "../../components/errors/Error";
import { useGetCourseDetails } from "../../hooks/course/useGetCourseDetails";
import { formatDate } from "../../utils/functions";
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
          <div className="d-flex flex-column gap-2 px-2">
            <div className="d-flex flex-column gap-4">
              {[...Array(8)].map((_, index) => (
                <div className="d-flex gap-1 flex-column" key={index}>
                  <RectangleSkeleton height="1dvh" width="15%" />
                  <RectangleSkeleton height="1dvh" width="100%" />
                  <HorizontalDashedLine
                    dashed={false}
                    thickness={0.2}
                    color={"#ccc"}
                  />
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
            <div className="drawer-content px-2 font-size-sm">
              <div className="d-flex flex-column gap-2">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex flex-column">
                    <span className="text-iron-500">Course Title</span>
                    <span className="fw-medium">
                      {courseDetails?.data?.course_title}
                    </span>
                  </div>
                </div>
                <HorizontalDashedLine
                  dashed={false}
                  thickness={0.2}
                  color={"#ccc"}
                />
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex flex-column">
                    <span className="text-iron-500">Course Credit</span>
                    <span className="fw-medium">
                      {courseDetails?.data?.credit} Credit
                    </span>
                  </div>
                </div>
                <HorizontalDashedLine
                  dashed={false}
                  thickness={0.2}
                  color={"#ccc"}
                />
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex flex-column">
                    <span className="text-iron-500">Course Code</span>
                    <span className="fw-medium">
                      {courseDetails?.data?.course_code}
                    </span>
                  </div>
                </div>
                <HorizontalDashedLine
                  dashed={false}
                  thickness={0.2}
                  color={"#ccc"}
                />
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex flex-column">
                    <span className="text-iron-500">Level Title</span>
                    <span className="fw-medium">
                      {courseDetails?.data?.course_specialty?.specialty?.level?.name}
                    </span>
                  </div>
                </div>
                <HorizontalDashedLine
                  dashed={false}
                  thickness={0.2}
                  color={"#ccc"}
                />
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex flex-column">
                    <span className="text-iron-500">Level Code</span>
                    <span className="fw-medium">
                      {courseDetails?.data?.course_specialty?.specialty?.level?.level}
                    </span>
                  </div>
                </div>
                <HorizontalDashedLine
                  dashed={false}
                  thickness={0.2}
                  color={"#ccc"}
                />
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex flex-column">
                    <span className="text-iron-500">Semester</span>
                    <span className="fw-medium">
                      {courseDetails?.data?.semester?.name}
                    </span>
                  </div>
                </div>
                <HorizontalDashedLine
                  dashed={false}
                  thickness={0.2}
                  color={"#ccc"}
                />
                <div className="d-flex flex-column gap-1">
                  <span className="text-iron-500">Course Type</span>
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
                <HorizontalDashedLine
                  dashed={false}
                  thickness={0.2}
                  color={"#ccc"}
                />
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex flex-column">
                    <span className="text-iron-500">Specailty Name</span>
                    <span className="fw-medium">
                      {courseDetails?.data?.course_specialty?.specialty?.specialty_name}
                    </span>
                  </div>
                </div>
                <HorizontalDashedLine
                  dashed={false}
                  thickness={0.2}
                  color={"#ccc"}
                />
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex flex-column">
                    <span className="text-iron-500">Description</span>
                    <TextDisplay
                      content={courseDetails?.data?.description}
                      maxLength={200}
                      textStyle={"font-size-sm fw-medium"}
                    />
                  </div>
                </div>
                <HorizontalDashedLine
                  dashed={false}
                  color="#ccc"
                  thickness={0.2}
                />
                <div className="d-flex flex-column gap-1">
                  <span className="text-iron-500">Created At</span>
                  <span className="fw-medium">
                    {formatDate(courseDetails?.data?.created_at) || "N/A"}
                  </span>
                </div>
                <HorizontalDashedLine
                  dashed={false}
                  color="#ccc"
                  thickness={0.2}
                />
                <div className="d-flex flex-column gap-1">
                  <span className="text-iron-500">Updated At</span>
                  <span className="fw-medium">
                    {formatDate(courseDetails?.data?.updated_at) || "N/A"}
                  </span>
                </div>
              </div>
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
