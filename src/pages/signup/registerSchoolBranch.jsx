import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Icon } from "@iconify/react";
import { setSchoolAuthData } from "../../Slices/Asynslices/AuthSlice";
import { motion, AnimatePresence } from "framer-motion";
function RegisterSchoolBranch() {
  const schoolCredentials = useSelector((state) => state.auth.schoolAuthData);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (field, event) => {
    const value = event.target.value;
    dispatch(setSchoolAuthData({ field, value }));
  };
  const branchName = schoolCredentials.school_branch_name
    ? schoolCredentials.school_branch_name.trim()
    : "";
  const abbreviation = schoolCredentials.abbreviation
    ? schoolCredentials.abbreviation.trim()
    : "";
  const totalSteps = 2;
  const fieldsFilled = [branchName, abbreviation].filter(Boolean).length;

  const progressPercentage = (fieldsFilled / totalSteps) * 100;
  const isStepComplete = fieldsFilled === totalSteps;
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
          <div className="w-50">
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
                      Step 2 of 4 Completed
                    </motion.span>
                    <Icon
                      icon="icon-park-solid:check-one"
                      className={`font-size-md ${
                        isStepComplete ? "green-color" : ""
                      }`}
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
                    Step 2 of 4 Incomplete
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
                  animate={{ width: "100%" }}
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
              <div className="auth-progress-bar" />
              <div className="auth-progress-bar" />
            </div>
          </div>

          <div className="d-flex flex-row align-items-center w-100 justify-content-between mt-3 font-size-sm">
            <div className="d-flex flex-row align-items-center gap-2">
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
                className="border-none p-2 rounded-2 font-size-sm px-4 primary-background text-white"
                onClick={() => {
                  navigate("/subcription/plan");
                }}
                disabled={!isStepComplete}
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
