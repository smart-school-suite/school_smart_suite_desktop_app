import { useFetchCourseDetailsQuery } from "../../Slices/Asynslices/fetchSlice";
import Pageloaderspinner from "../../components/Spinners";
import { Icon } from "@iconify/react";
function CourseDetails({ row_id:courseId, handleClose }) {
    const { data: courseDetails, isLoading } = useFetchCourseDetailsQuery({
      course_id: courseId,
    });
    if (isLoading) {
      return <Pageloaderspinner />;
    }
    return (
      <>
        <div className="w-100">
        <div className="d-flex flex-row align-items-center justify-content-between mb-3">
          <h5 className="m-0">Course Details</h5>
          <span
            className="m-0"
            onClick={() => {
              handleClose();
            }}
          >
            <Icon icon="charm:cross" width="22" height="22" />
          </span>
        </div>
          <div className="my-2">
            <p className="font-size-sm gainsboro-color">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla
              molestias repellendus facere voluptate?
            </p>
          </div>
          <div className="d-flex align-items-center justify-content-between my-3">
            <button
              className="border-none d-flex flex-row align-items-center fs-5 justify-content-center color-primary"
              style={{
                width: "2.5rem",
                height: "2.5rem",
                borderRadius: "2.5rem",
              }}
            >
              <Icon icon="ph:phone" />
            </button>
            <div
              className="border-bottom py-2 d-flex flex-column"
              style={{ width: "87%" }}
            >
              <span className="my-0">
                {courseDetails.data.course_title}
              </span>
              <span className="my-0 font-size-sm gainsboro-color">
                Course Title
              </span>
            </div>
          </div>
  
          <div className="d-flex align-items-center justify-content-between my-3">
            <button
              className="border-none d-flex flex-row align-items-center fs-5 justify-content-center color-primary"
              style={{
                width: "2.5rem",
                height: "2.5rem",
                borderRadius: "2.5rem",
              }}
            >
              <Icon icon="ph:phone" />
            </button>
  
            <div
              className="border-bottom py-2 d-flex flex-column"
              style={{ width: "87%" }}
            >
              <span className="my-0">
                {courseDetails.data.credit} Credit
              </span>
              <span className="my-0 font-size-sm gainsboro-color">
                Course Credit
              </span>
            </div>
          </div>
  
          <div className="d-flex align-items-center justify-content-between my-3">
            <button
              className="border-none d-flex flex-row align-items-center fs-5 justify-content-center color-primary"
              style={{
                width: "2.5rem",
                height: "2.5rem",
                borderRadius: "2.5rem",
              }}
            >
              <Icon icon="ph:phone" />
            </button>
  
            <div
              className="border-bottom py-2 d-flex flex-column"
              style={{ width: "87%" }}
            >
              <span className="my-0">
                {courseDetails.data.course_code}
              </span>
              <span className="my-0 font-size-sm gainsboro-color">
                Course Code
              </span>
            </div>
          </div>
  
          <div className="d-flex align-items-center justify-content-between my-3">
            <button
              className="border-none d-flex flex-row align-items-center fs-5 justify-content-center color-primary"
              style={{
                width: "2.5rem",
                height: "2.5rem",
                borderRadius: "2.5rem",
              }}
            >
              <Icon icon="ph:phone" />
            </button>
  
            <div
              className="border-bottom py-2 d-flex flex-column"
              style={{ width: "87%" }}
            >
              <span className="my-0">
                {courseDetails.data.level.name}
              </span>
              <span className="my-0 font-size-sm gainsboro-color">
                Level Title
              </span>
            </div>
          </div>
  
          <div className="d-flex align-items-center justify-content-between my-3">
            <button
              className="border-none d-flex flex-row align-items-center fs-5 justify-content-center color-primary"
              style={{
                width: "2.5rem",
                height: "2.5rem",
                borderRadius: "2.5rem",
              }}
            >
              <Icon icon="ph:phone" />
            </button>
  
            <div
              className="border-bottom py-2 d-flex flex-column"
              style={{ width: "87%" }}
            >
              <span className="my-0">
                {courseDetails.data.level.level}
              </span>
              <span className="my-0 font-size-sm gainsboro-color">
                Level Code
              </span>
            </div>
          </div>
  
          <div className="d-flex align-items-center justify-content-between my-3">
            <button
              className="border-none d-flex flex-row align-items-center fs-5 justify-content-center color-primary"
              style={{
                width: "2.5rem",
                height: "2.5rem",
                borderRadius: "2.5rem",
              }}
            >
              <Icon icon="ph:phone" />
            </button>
  
            <div
              className="border-bottom py-2 d-flex flex-column"
              style={{ width: "87%" }}
            >
              <span className="my-0">
                {courseDetails.data.semester.name}
              </span>
              <span className="my-0 font-size-sm gainsboro-color">
                Semester Name
              </span>
            </div>
          </div>
  
          <div className="d-flex align-items-center justify-content-between my-3">
            <button
              className="border-none d-flex flex-row align-items-center fs-5 justify-content-center color-primary"
              style={{
                width: "2.5rem",
                height: "2.5rem",
                borderRadius: "2.5rem",
              }}
            >
              <Icon icon="ph:phone" />
            </button>
  
            <div
              className="py-2 d-flex flex-column"
              style={{ width: "87%" }}
            >
              <span className="my-0">
                {courseDetails.data.specialty.specialty_name}
              </span>
              <span className="my-0 font-size-sm gainsboro-color">
                Specailty Name
              </span>
            </div>
          </div>
        </div>
      </>
    );
  }
  export default CourseDetails;