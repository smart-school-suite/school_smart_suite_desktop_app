import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
function Createexam(){
    const navigate = useNavigate();
    return(
        <>
        <Navbar 
              path_one="/create-exam"
              lable_one="Create Exam"
              path_two="/exam-analysis"
              lable_two="Exam Analysis"
              path_three="/grades-configuration"
              lable_three="Grades Configuration"
             />
            <div className="d-flex flex-row justify-content-between w-100  align-items-center my-2">
        <div className="d-flex flex-row align-items-center gap-2">
          <div className="badge-input d-flex flex-row align-items-center justify-content-center">
            <Icon
              icon="clarity:administrator-line"
              className="fs-3 color-primary"
            />
          </div>
          <p className="my-0 fs-6 fw-semibold">Create New Exam</p>
        </div>
        <div>
          <button
            className="border-none rounded-2 font-size-sm p-2 d-flex flex-row gap-4 primary-background text-white"
            onClick={() => {
              navigate("/exams");
            }}
          >
            <span>
              <Icon icon="ion:arrow-back" className="fs-5" />
            </span>
            <span>Back</span>
          </button>
        </div>
      </div>
      <div className="w-100 d-flex flex-column align-items-center justify-content-center height-70 pt-1 pb-2">
        <div className="card w-100 rounded-4 py-2 px-3">
          <div className="heading my-2">
            <h4 className="text-center">Create New Exam</h4>
          </div>
          <div className="my-2">
            <label>Exam Name</label>
            <input
              type="name"
              className="form-control"
              placeholder="Enter Course Title"
            />
          </div>
          <div className="d-flex flex-row gap-2">
            <div className="my-2 w-50">
              <label>Start Date</label>
              <input
                type="date"
                className="form-control"
                placeholder="Select Department"
              />
            </div>
            <div className="my-2 w-50">
              <label>End date</label>
              <input
                type="date"
                className="form-control"
                placeholder="Select Specialty"
              />
            </div>
          </div>
          <div className="d-flex flex-row gap-2">
            <div className="my-2 w-50">
              <label>Specialty</label>
              <input
                type="text"
                className="form-control"
                placeholder="Select Semester"
              />
            </div>
            <div className="my-2 w-50">
              <label>Select Level</label>
              <input
                type=""
                className="form-control"
                placeholder="Select Level"
              />
            </div>
          </div>
          <div className="d-flex flex-row gap-2">
            <div className="my-2 w-50">
              <label>Weighted Mark</label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter Weighted Mark"
              />
            </div>
            <div className="my-2 w-50">
              <label>Semester</label>
              <input
                type="text"
                className="form-control"
                placeholder="Select semester"
              />
            </div>
          </div>
          <div className="my-3">
            <button className="border-none rounded-3 w-100 fs-6 text-white p-2 primary-background">
              Create Course
            </button>
          </div>
        </div>
      </div>
        </>
    )
}
export default Createexam;