import { useState } from "react";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
function RegisterSchoolAdmin() {
         const school_branch_id = localStorage.getItem("SCHOOL_BRANCH_KEY");
          const [adminCredentials, setAdminCredentails] = useState({
            school_branch_id: school_branch_id,
            name: "",
            email: "",
            password: "",
            role: "",
            employment_status: "",
            hire_date: "",
            work_location: "",
            position: "",
            salary:""
          });
        
          const navigate = useNavigate();
          const { handleCreateSuperAdmin, loading, createError } = useAuth(); 
        
          const handleCreateSchoolAdmin = async (e) => {
            e.preventDefault();
            await handleCreateSuperAdmin(navigate, adminCredentials); 
          };
        
          const handleChange = (e) => {
            const { name, value } = e.target;
            setAdminCredentails((prevState) => ({
              ...prevState,
              [name]: value,
            }));
          };
  return (
    <>
      <div className="container w-100 height-100 d-flex flex-column justify-content-center">
        <div className="d-flex flex-row align-items-center justify-content-around w-100 mt-5">
          <div className="w-50 bg-white rounded-4 px-2 border shadow-sm py-4">
            <form onSubmit={handleCreateSchoolAdmin}>
              <h4 className="text-center">Create School Admin</h4>
              {createError.admin && (
                <div className="alert alert-danger">{createError.admin}</div>
              )}
              <div className="d-flex flex-row align-items-center w-100 gap-2">
              <div className="my-1 w-50">
                <span>Full Names</span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Full Name"
                  name="name"
                  value={adminCredentials.name}
                  onChange={handleChange}
                />
              </div>
              <div className="my-1 w-50">
                <span>email</span>
                <input
                  type="email"
                  className="form-control"
                  placeholder="@example.com"
                  name="email"
                  value={adminCredentials.email}
                  onChange={handleChange}
                />
              </div>
              </div>
              <div className="my-1 w-100">
                <span>Password</span>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter password"
                  name="password"
                  value={adminCredentials.password}
                  onChange={handleChange}
                />
              </div>
              <div className="my-1 w-100">
                <span>role</span>
                <input
                  type="text"
                  className="form-control"
                  name="role"
                  placeholder="School Admin"
                  value={adminCredentials.role}
                  onChange={handleChange}
                />
              </div>
              <div className="my-1 w-100">
                <span>Hire Date</span>
                <input
                  type="date"
                  className="form-control"
                  name="hire_date"
                  value={adminCredentials.hire_date}
                  onChange={handleChange}
                />
              </div>
                <div className="my-1 w-100">
                  <span>Salary</span>
                  <input
                    type="number"
                    className="form-control"
                    name="salary"
                    value={adminCredentials.salary}
                    onChange={handleChange}
                    placeholder="20,000, 40,0000"
                  />
                </div>
                <div className="my-1 w-100">
                  <span>Work Location</span>
                  <input type="text" 
                   className="form-control"
                   name="work_location"
                   value={adminCredentials.work_location}
                   onChange={handleChange}
                   placeholder="Home, Main Office, Branch Location"
                  />
                </div>
                <div className="my-1 w-100">
                  <span>Position</span>
                  <input type="text" 
                    className="form-control"
                    name="position"
                    onChange={handleChange}
                    value={adminCredentials.position}
                    placeholder="Manager, Developer, Coordinator"
                  />
                </div>
                <div className="my-1 w-100">
                  <span>Employment Status</span>
                  <input type="text" 
                   className="form-control" 
                   name="employment_status"
                   onChange={handleChange}
                   value={adminCredentials.employment_status}
                   placeholder="Full-time, Part-time, Contractor"
                  />
                </div>
              <div className="mt-2">
                <button
                  className="primary-background text-white border-none p-2 rounded-3 w-100"
                  type="submit"
                  disabled={loading.admin}
                >
                  {loading.admin ? "Submitting ....." : "Create School"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
export default RegisterSchoolAdmin;
