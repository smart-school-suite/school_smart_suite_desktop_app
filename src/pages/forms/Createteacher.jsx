import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
function Createteacher(){
    const navigate = useNavigate();
    return(
        <>
                <div className="d-flex flex-row justify-content-between w-100  align-items-center my-2">
                <div className="d-flex flex-row align-items-center gap-2">
                <div className="badge-input d-flex flex-row align-items-center justify-content-center">
                <Icon icon="clarity:administrator-line" className="fs-3 color-primary"/>
                </div>
                <p className="my-0 fs-6 fw-semibold">Create New Teacher</p>
                </div>
                <div>
                    <button 
                    className="border-none rounded-2 font-size-sm p-2 d-flex flex-row gap-4 primary-background text-white"
                    onClick={() => {
                         navigate("/teachers")
                    }}
                    >
                        <span><Icon icon="ion:arrow-back" className="fs-5"/></span>
                        <span>Back</span>
                    </button>
                </div>
        </div>
              <div className="w-100 d-flex flex-column align-items-center justify-content-center height-90 pt-1 pb-2">
        <div className="card w-75 rounded-4 py-2 px-3">
          <div className="heading my-1">
            <h4 className="text-center">Create New Teachers</h4>
          </div>
          <div className="my-1">
            <label>Teachers FullNames</label>
            <input
              type="name"
              className="form-control"
              placeholder="Enter Teachers Full Names"
            />
          </div>
          <div className="d-flex flex-row gap-2">
          <div className="my-1 w-50">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter Email"
            />
          </div>
          <div className="my-1 w-50">
            <label>Phone Number</label>
            <input
              type="tel"
              className="form-control"
              placeholder="Enter Phone Number"
            />
          </div>
          </div>
          <div className="d-flex flex-row gap-2">
          <div className="my-1 w-50">
            <label>Qualification</label>
            <input
              type="text"
              className="form-control"
              placeholder="Select Qualification"
            />
          </div>
          <div className="my-1 w-50">
            <label>Field of Study</label>
            <input
              type=""
              className="form-control"
              placeholder="Enter Field Of Study"
            />
          </div>
          </div>
          <div className="d-flex flex-row gap-2">
          <div className="my-1 w-50">
            <label>Gender</label>
            <input
              type="text"
              className="form-control"
              placeholder="Select Gender"
            />
          </div>
          <div className="my-1 w-50">
            <label>Date of Birth</label>
            <input
              type="date"
              className="form-control"
              placeholder="Enter Field Of Study"
            />
          </div>
          </div>
          <div className="my-1">
            <label>Salary</label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter Teachers Salary"
            />
          </div>
          <div className="d-flex flex-row gap-2">
          <div className="my-1 w-50">
            <label>Department</label>
            <input
              type="text"
              className="form-control"
              placeholder="Select Gender"
            />
          </div>
          <div className="my-1 w-50">
            <label>Specialty</label>
            <input
              type="text"
              className="form-control"
              placeholder="select specialty"
            />
          </div>
          </div>
          <div className="d-flex flex-row gap-2">
          <div className="my-1 w-50">
            <label>Job Type</label>
            <input
              type="text"
              className="form-control"
              placeholder="Select Job type"
            />
          </div>
          <div className="my-1 w-50">
            <label>Starting Date</label>
            <input
              type="date"
              className="form-control"
            />
          </div>
          </div>
          <div className="my-2">
            <button className="border-none rounded-3 w-100 fs-6 text-white p-2 primary-background">
              Create Department
            </button>
          </div>
        </div>
      </div>
        </>
    )
}
export default Createteacher