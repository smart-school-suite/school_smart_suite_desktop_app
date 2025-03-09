function UpdateCourse({ handleClose }) {
  return (
    <>
      <div className="card w-100 border-none">
        <div className="d-flex flex-row">
          <div>
            <h5>Update Course</h5>
            <p className="gainsboro-color font-size-sm">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.{" "}
            </p>
          </div>
        </div>
        <div className="my-1">
          <CourseCodeInput />
        </div>
        <div className="my-1">
          <CourseTitleInput />
        </div>
        <div className="my-1">
          <CourseCreditInput />
        </div>
      </div>
      <div className="w-100 mt-2">
        <button
          className="border-none px-3 py-2 text-primary w-50 rounded-3 font-size-sm"
          onClick={() => {
            handleClose();
          }}
        >
          Cancel
        </button>
        <button className="border-none px-3 py-2 rounded-3 font-size-sm w-50 primary-background text-white">
          Update
        </button>
      </div>
    </>
  );
}
export default UpdateCourse;