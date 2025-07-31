import Pageloaderspinner from "../../components/Spinners/Spinners";
import { Icon } from "@iconify/react";
import { useGetCourseDetails } from "../../hooks/course/useGetCourseDetails";
import TextDisplay from "../../components/TextComponents/TextDisplay";
function CourseDetails({ rowData, handleClose }) {
  const { id: courseId } = rowData;
  const { data: courseDetails, isLoading } = useGetCourseDetails(courseId);
  if (isLoading) {
    return <Pageloaderspinner />;
  }
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
                textStyle={'my-0 font-size-sm'}
              />
            </div>
          </div>
        </>
        )}
      </div>
    </>
  );
}
export default CourseDetails;
