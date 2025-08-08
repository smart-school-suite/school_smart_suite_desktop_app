import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Icon } from "@iconify/react";
import { setSchoolAuthData } from "../../Slices/Asynslices/AuthSlice";
import { useGetCountries } from "../../hooks/country/useGetCountry";
import { motion, AnimatePresence } from "framer-motion";
function RegisterSchool() {
  const { data: country, isPending: isLoading } = useGetCountries();
  const schoolCredentials = useSelector((state) => state.auth.schoolAuthData);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (field, event) => {
    const value = event.target.value;
    dispatch(setSchoolAuthData({ field, value }));
  };

  const totalSteps = 3;
  const fieldsFilled = [
    schoolCredentials.school_name,
    schoolCredentials.country_id,
    schoolCredentials.type,
  ].filter(Boolean).length;

  const progressPercentage = (fieldsFilled / totalSteps) * 100;
  const isStepComplete = fieldsFilled === totalSteps;

  return (
    <div className="container w-100 height-100 pt-3 d-flex flex-column pb-5">
      <div className="w-100">
        <div className="d-flex flex-row align-items-center w-100 justify-content-between px-3">
          <div className="signup-app-logo">
            <img src="/logo/blue_logo.png" alt="" className="signup-app-logo" />
          </div>
          <div className="d-flex flex-row gap-4">
            <button className="border-none rounded-pill px-3 py-2 border bg-white font-size-sm">
              Save And Exit
            </button>
            <button className="border-none rounded-pill px-3 py-2 border bg-white font-size-sm">
              Questions?
            </button>
          </div>
        </div>

        <div className="w-100 d-flex flex-row align-items-center justify-content-center mt-3">
          <div className="form-box">
            <div className="text-center mb-5">
              <h1 className="fw-bold">Launch A New School Adventure</h1>
            </div>

            <div className="mt-5">
              <label htmlFor="school_name">School Name</label>
              <div className="w-100 align-items-center d-flex gap-2">
                <div className="w-100">
                  <input
                  type="text"
                  placeholder="Enter School Name"
                  className="form-control p-2 w-100"
                  name="school_name"
                  value={schoolCredentials.school_name}
                  onChange={(value) => handleChange("school_name", value)}
                />
                </div>
              </div>
            </div>

            <div className="d-flex flex-row gap-2 w-100">
              {isLoading ? (
                <div className="my-1 w-100">
                  <span>Country</span>
                  <select name="country_id" className="form-select w-100" disabled>
                    <option value="">Loading...</option>
                  </select>
                </div>
              ) : (
                <div className="my-1 w-100">
                  <span>Country</span>
                  <div className="d-flex flex-row align-items-center gap-2">
                    <select
                      name="country_id"
                      className="form-select w-100"
                      value={schoolCredentials.country_id}
                      onChange={(value) => handleChange("country_id", value)}
                    >
                      <option value="">Select Country</option>
                      {country?.data?.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.country}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}
            </div>

            <div className="my-1">
              <label htmlFor="type">School Type</label>
              <div className="d-flex flex-row align-items-center gap-2">
                <select
                  name="type"
                  className="form-select p-2"
                  value={schoolCredentials.type}
                  onChange={(value) => handleChange("type", value)}
                >
                  <option value="">Select School Type</option>
                  <option value="private">Private School</option>
                  <option value="government">Government School</option>
                </select>
              </div>
            </div>
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
                  Step 1 of 4 Completed
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
                  Step 1 of 4 Incomplete
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
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              />
            </div>
            <div className="auth-progress-bar" />
            <div className="auth-progress-bar" />
            <div className="auth-progress-bar" />
          </div>
        </div>

        <div className="d-flex flex-row align-items-center w-100 justify-content-between mt-3 font-size-sm">
          <div className="d-flex flex-row align-items-center gap-2">
            <span>
              <Icon icon="material-symbols:arrow-back-rounded" className="color-primary" />
            </span>
            <Link className="p-0 m-0 color-primary" to="/">
              Back
            </Link>
          </div>
          <div>
            <button
              className="border-none p-2 rounded-2 font-size-sm px-4 primary-background text-white"
              onClick={() => {
                navigate("/create-schoolbranch");
              }}
              disabled={!isStepComplete}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterSchool;
