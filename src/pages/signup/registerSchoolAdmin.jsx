import { useState } from "react";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { resetSchoolAuthData } from "../../Slices/Asynslices/AuthSlice";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";
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
  const dispatch = useDispatch();
  const { handleCreateSuperAdmin, loading } = useAuth();

  const handleCreateSchoolAdmin = async () => {
     try{
       await handleCreateSuperAdmin(navigate, adminCredentials, apiKey);
       dispatch(resetSchoolAuthData());
     }
     catch(e){
        console.log("an error occured");
     }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdminCredentails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

    const name = adminCredentials.name
    ? adminCredentials.name.trim()
    : "";
  const firstName = adminCredentials.first_name
    ? adminCredentials.first_name.trim()
    : "";
    const lastName = adminCredentials.last_name
    ? adminCredentials.last_name.trim()
    : "";
    const email = adminCredentials.email
    ? adminCredentials.email.trim()
    : "";
    const password = adminCredentials.password
    ? adminCredentials.password.trim()
    : "";
  const totalSteps = 5;
  const fieldsFilled = [name, firstName, lastName, email, password].filter(Boolean).length;

  const progressPercentage = (fieldsFilled / totalSteps) * 100;
  const isStepComplete = fieldsFilled === totalSteps;
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
        <div className="mt-auto w-100 px-3">
                <div className="mb-2">
                  <div className="d-flex flex-row align-items-center gap-2">
                    <AnimatePresence mode="wait">
                      {isStepComplete ? (
                        <div className="d-flex flex-row align-items-center gap-2">
                          <motion.span
                          key="completed"
                          className="font-size-sm"
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 5 }}
                          transition={{ duration: 0.3 }}
                        >
                          Step 4 of 4 Completed
                        </motion.span>
                        <Icon
                      icon="icon-park-solid:check-one"
                      className={`font-size-md ${isStepComplete ? "green-color" : ""}`}
                    />
                        </div>
                      ) : (
                        <motion.span
                          key="incomplete"
                          className="font-size-sm"
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 5 }}
                          transition={{ duration: 0.3 }}
                        >
                          Step 4 of 4 Incomplete
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
        
                <div className="d-flex flex-row justify-content-center w-100">
                  <div className="w-100 d-flex flex-row align-items-center gap-2">
                    <div className="auth-progress-bar">
                      <motion.div
                        className="primary-background h-100"
                        initial={{ width: 0 }}
                        animate={{ width: `100%` }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                      />
                    </div>
                    <div className="auth-progress-bar">
                      <motion.div
                        className="primary-background h-100"
                        initial={{ width: 0 }}
                        animate={{ width: `100%` }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                      />
                    </div>
                    <div className="auth-progress-bar">
                      <motion.div
                        className="primary-background h-100"
                        initial={{ width: 0 }}
                        animate={{ width: `100%` }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                      />
                    </div>
                    <div className="auth-progress-bar">
                      <motion.div
                        className="primary-background h-100"
                        initial={{ width: 0 }}
                        animate={{ width: `${progressPercentage}%` }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                      />
                    </div>
                  </div>
                </div>
        
                <div className="d-flex flex-row align-items-center w-100 justify-content-end mt-3 font-size-sm">
                  <div>
                    <button
                      className="border-none p-2 rounded-2 font-size-sm px-4 primary-background text-white"
                      onClick={() => {
                         handleCreateSchoolAdmin();
                      }}
                      disabled={!isStepComplete || loading.admin}
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
