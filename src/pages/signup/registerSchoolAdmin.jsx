import { useState } from "react";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
function RegisterSchoolAdmin() {
  const [adminCredentials, setAdminCredentails] = useState({
    name: "",
    email: "",
    password: "",
    first_name:"",
    last_name:""
  });
  const apiKey = useSelector((state) => state.auth.apiKey);
  const navigate = useNavigate();
  const { handleCreateSuperAdmin, loading, createError } = useAuth();

  const handleCreateSchoolAdmin = async () => {
    await handleCreateSuperAdmin(navigate, adminCredentials, apiKey);
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
      <div className="container w-100 height-100 d-flex flex-column pb-4">
        <div className="d-flex flex-row align-items-center w-100 justify-content-between px-3">
          <div className="signup-app-logo">
            <img src="/logo/blue_logo.png" alt="" className="signup-app-logo" />
          </div>
          <div className="d-flex flex-row gap-4">
            <button className="border-none rounded-pill px-3 py-2 border bg-white font-size-sm">
              Save And Exit
            </button>
            <button className="border-none rounded-pill px-3 py-2 border bg-white  font-size-sm">
              Questions?
            </button>
          </div>
        </div>
        <div className="d-flex flex-row align-items-center justify-content-around w-100 mt-2">
          <div className="w-50 rounded-4 px-2  py-4">
            <form>
              <h4 className="text-center">Create School Admin</h4>
              {createError.admin && (
                <div className="alert alert-danger">{createError.admin}</div>
              )}
              <div className="d-flex flex-row align-items-center w-100 gap-2">
                <div className="my-1 w-100">
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
              </div>
              <div className="w-100 d-flex flex-row align-items-center gap-2">
                <div className="w-50">
                  <label htmlFor="firstname">First Name</label>
                  <input 
                   type="text" 
                   className="form-control"
                   name="first_name"
                   value={adminCredentials.first_name}
                   onChange={handleChange}
                   placeholder="Enter First Name "
                   />
                </div>
                <div className="w-50">
                  <label htmlFor="lastname">Last Name</label>
                  <input 
                    type="text"
                    className="form-control"
                    name="last_name"
                    value={adminCredentials.last_name}
                    onChange={handleChange}
                    placeholder="Enter Last Name"  
                  />
                </div>
              </div>
              <div className="my-1 w-100">
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
            </form>
          </div>
        </div>
        <div className="mt-auto px-3 w-100">
          <div className="mb-2">
            <span className="font-size-sm ">Step 4 of 4 Completed</span>
          </div>
          <div className="row w-100 d-flex flex-row align-items-center gap-1 justify-content-between">
            <div className="auth-progress">
              <div className="auth-progress-bar active"></div>
            </div>
            <div className="auth-progress">
              <div className="auth-progress-bar active"></div>
            </div>
            <div className="auth-progress">
              <div className="auth-progress-bar active"></div>
            </div>
            <div className="auth-progress">
              <div className="auth-progress-bar active"></div>
            </div>
          </div>
          <div className="d-flex flex-row align-items-center w-100 justify-content-end pe-2 mt-3">
            <div>
              <button
                className="border-none p-2 rounded-2 font-size-sm px-4 primary-background text-white fw-medium"
                onClick={() => {
                  handleCreateSchoolAdmin()
                }}
              >
                Finish
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default RegisterSchoolAdmin;
