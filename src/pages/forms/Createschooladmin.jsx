import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
function Createschooladmin() {
    const navigate = useNavigate();
  return (
    <>
      <div className="w-100 d-flex flex-column align-items-center justify-content-center height-100 pt-1 pb-2">
        <div className="d-flex flex-row justify-content-between w-100  align-items-center mb-2">
                <div className="d-flex flex-row align-items-center gap-2">
                <div className="badge-input d-flex flex-row align-items-center justify-content-center">
                <Icon icon="clarity:administrator-line" className="fs-3 color-primary"/>
                </div>
                <p className="my-0 fs-6 fw-semibold">Create New Admin</p>
                </div>
                <div>
                    <button 
                    className="border-none rounded-2 font-size-sm p-2 d-flex flex-row gap-4 primary-background text-white"
                    onClick={() => {
                         navigate("/school-admins")
                    }}
                    >
                        <span><Icon icon="ion:arrow-back" className="fs-5"/></span>
                        <span>Back</span>
                    </button>
                </div>
        </div>
        <div className="card w-75 rounded-4 py-2 px-3">
          <div className="heading my-1">
            <h4 className="text-center">Create School Admin</h4>
          </div>
          <div className="my-1">
            <label>Full Name</label>
            <input
              type="name"
              className="form-control"
              placeholder="Enter Fullnames"
            />
          </div>
          <div className="d-flex flex-row gap-2 w-100">
            <div className="my-1 w-50">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter..."
              />
            </div>
            <div className="my-1 w-50">
              <label>Phone Number</label>
              <input type="tel" 
               className="form-control"
               placeholder="Enter your phone number"
              />
            </div>
          </div>
          <div className="d-flex flex-row gap-2 w-100">
            <div className="my-1 w-100">
              <label>Salary</label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter Salary of Worker"
              />
            </div>
          </div>
          <div className="d-flex flex-row gap-2 w-100">
          <div className="my-1 w-50">
            <label>Qualification</label>
            <input
              type="text"
              className="form-control"
              placeholder="Select Qualification"
            />
          </div>
          <div className="my-1 w-50">
            <label>Specialization (optional)</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter..."
            />
          </div>
          </div>
          <div className="d-flex flex-row">
          <div className="my-1 w-100">
            <label>Role Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Select Role"
            />
          </div>
          </div>
          <div className="d-flex flex-row gap-2">
          <div className="my-1 w-50">
            <label>Date of Birth</label>
            <input
              type="date"
              className="form-control"
              placeholder="Enter..."
            />
          </div>
          <div className="my-1 w-50">
            <label>Sex</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Sex"
            />
          </div>
          </div>
          <div className="d-flex flex-row">
          <div className="my-1 w-100">
            <label>Address</label>
            <input
              type="address"
              className="form-control"
              placeholder="Enter..."
            />
          </div>
          </div>
          <div className="my-0">
          <div className="d-flex flex-row gap-2">
          <div className="my-1 w-50">
            <label>Start Date</label>
            <input
              type="date"
              className="form-control"
            />
          </div>
          <div className="my-1 w-50">
            <label>Job Type</label>
            <input
              type="text"
              className="form-control"
              placeholder="Full Time Etc"
            />
          </div>
          </div>
          </div>
          <div className="my-2">
            <button className="border-none rounded-3 w-100 fs-6 text-white p-2 primary-background">
              Create School Admin
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default Createschooladmin;
