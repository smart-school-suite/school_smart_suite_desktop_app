
function CourseDetails({ row_id, handleClose }) {
    const { data: course_details, isLoading, error } = useFetchCourseDetailsQuery({
      course_id: row_id,
    });
    if (isLoading) {
      return <Pageloaderspinner />;
    }
    return (
      <>
        <div className="w-100">
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
                {course_details.course_details[0].course_title}
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
                {course_details.course_details[0].credit} Credit
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
                {course_details.course_details[0].course_code}
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
                {course_details.course_details[0].level.name}
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
                {course_details.course_details[0].level.level}
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
                {course_details.course_details[0].semester.name}
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
              className="border-bottom py-2 d-flex flex-column"
              style={{ width: "87%" }}
            >
              <span className="my-0">
                {course_details.course_details[0].specialty.specialty_name}
              </span>
              <span className="my-0 font-size-sm gainsboro-color">
                Specailty Name
              </span>
            </div>
          </div>
          <div className="my-2 position-relative">
            <div className="postion-absolute d-flex flex-row justify-content-end">
              <button 
              className="px-3 w-25 py-2 font-size-sm text-white border-none rounded-3 primary-background"
               onClick={handleClose}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
  export default CourseDetails;