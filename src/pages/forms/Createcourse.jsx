import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
function Createcourse() {
    const navigate = useNavigate();
  return (
    <>
      <div className="d-flex flex-row justify-content-between w-100  align-items-center my-2">
        <div className="d-flex flex-row align-items-center gap-2">
          <div className="badge-input d-flex flex-row align-items-center justify-content-center">
            <Icon
              icon="clarity:administrator-line"
              className="fs-3 color-primary"
            />
          </div>
          <p className="my-0 fs-6 fw-semibold">Create New course</p>
        </div>
        <div>
          <button
            className="border-none rounded-2 font-size-sm p-2 d-flex flex-row gap-4 primary-background text-white"
            onClick={() => {
              navigate("/courses");
            }}
          >
            <span>
              <Icon icon="ion:arrow-back" className="fs-5" />
            </span>
            <span>Back</span>
          </button>
        </div>
      </div>
      <div className="w-100 d-flex flex-column align-items-center justify-content-center height-90 pt-1 pb-2">
        <div className="card w-75 rounded-4 py-2 px-3">
          <div className="heading my-1">
            <h4 className="text-center">Create New Course</h4>
          </div>
          <div className="my-1">
            <label>Course Title</label>
            <input
              type="name"
              className="form-control"
              placeholder="Enter Course Title"
            />
          </div>
          <div className="my-1">
            <label>Course Code</label>
            <input
              type="name"
              className="form-control"
              placeholder="Enter Course Code"
            />
          </div>
          <div className="my-1">
            <label>Course Credit</label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter Course Credit"
            />
          </div>
          <div className="d-flex flex-row gap-2">
            <div className="my-1 w-50">
              <label>Department</label>
              <input
                type="text"
                className="form-control"
                placeholder="Select Department"
              />
            </div>
            <div className="my-1 w-50">
              <label>Specialty</label>
              <input
                type="tel"
                className="form-control"
                placeholder="Select Specialty"
              />
            </div>
          </div>
          <div className="d-flex flex-row gap-2">
            <div className="my-1 w-50">
              <label>Semester</label>
              <input
                type="text"
                className="form-control"
                placeholder="Select Semester"
              />
            </div>
            <div className="my-1 w-50">
              <label>Level</label>
              <input
                type=""
                className="form-control"
                placeholder="Select Level"
              />
            </div>
          </div>
          <div className="my-2">
            <button className="border-none rounded-3 w-100 fs-6 text-white p-2 primary-background">
              Create Course
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default Createcourse;
