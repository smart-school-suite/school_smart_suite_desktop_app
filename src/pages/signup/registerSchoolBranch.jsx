import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Icon } from "@iconify/react";
import { setSchoolAuthData } from "../../Slices/Asynslices/AuthSlice";
function RegisterSchoolBranch() {
  const schoolCredentials = useSelector((state) => state.auth.schoolAuthData);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (field, event) => {
  const value = event.target.value;
  dispatch(setSchoolAuthData({ field, value }));
  };
  return (
    <>
      <div className="container w-100 height-100 pt-3 d-flex flex-column pb-5">
        <div className="d-flex flex-row align-items-center w-100 justify-content-between px-3">
          <div className="signup-app-logo">
            <img
              src="./logo/blue_logo.png"
              alt=""
              className="signup-app-logo"
            />
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
        <div className="w-100 d-flex flex-row align-items-center justify-content-center mt-3">
          <div className="form-box">
            <div className="text-center mb-5">
              <h1 className="fw-bold">Create School Branch</h1>
            </div>
            <div className="my-3">
              <label htmlFor="school branch name">School Branch Name</label>
              <input
                type="text"
                name="school_branch_name"
                placeholder="Enter School Branch Name"
                value={schoolCredentials.school_branch_name}
                onChange={(value) => handleChange("school_branch_name", value)} 
                className="form-control p-2 "
              />
            </div>
            <div className="my-3">
              <label htmlFor="school branch Abbreviation">Abbreviation</label>
              <input
                type="text"
                placeholder="Enter School Branch Abbreviation"
                name="abbreviation"
                value={schoolCredentials.abbreviation}
                onChange={(value) => handleChange("abbreviation", value)}
                className="form-control p-2"
              />
            </div>
          </div>
        </div>
        <div className="mt-auto px-3 w-100">
          <div className="mb-2">
            <span className="font-size-sm ">Step 2 of 4 Completed</span>
          </div>
          <div className="row w-100 d-flex flex-row align-items-center gap-1 justify-content-between">
            <div className="auth-progress">
              <div className="auth-progress-bar active"></div>
            </div>
            <div className="auth-progress">
              <div className="auth-progress-bar active"></div>
            </div>
            <div className="auth-progress">
              <div className="auth-progress-bar"></div>
            </div>
            <div className="auth-progress">
              <div className="auth-progress-bar"></div>
            </div>
          </div>
          <div className="d-flex flex-row align-items-center w-100 justify-content-between pe-2 mt-3">
            <div className="d-flex flex-row align-items-center gap-1">
              <span>
                <Icon
                  icon="material-symbols:arrow-back-rounded"
                  className="color-primary"
                />
              </span>
              <Link className="p-0 m-0 color-primary" to="/register-school">
                Back
              </Link>
            </div>
            <div>
              <button
                className="border-none p-2 rounded-2 font-size-sm px-4 primary-background text-white fw-medium"
                onClick={() => {
                  navigate("/subcription/plan");
                  console.table(schoolCredentials)
                }}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default RegisterSchoolBranch;
