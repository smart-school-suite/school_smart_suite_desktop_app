import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Icon } from "@iconify/react";
import { setSchoolAuthData } from "../../Slices/Asynslices/AuthSlice";
import { useGetCountries } from "../../hooks/country/useGetCountry";
import { motion, AnimatePresence } from "framer-motion";
import CustomDropdown from "../../components/Dropdowns/Dropdowns";
import { schoolTypes } from "../../data/data";
import { TextInput } from "../../components/FormComponents/InputComponents";
import { nameSchema } from "../../ComponentConfig/YupValidationSchema";
function RegisterSchool() {
  const { data: country, isPending: isLoading } = useGetCountries();
  const schoolCredentials = useSelector((state) => state.auth.schoolAuthData);
  const darkMode = useSelector((state) => state.theme.darkMode);
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
    <div className={`${darkMode ? 'dark-bg dark-mode-text' : 'white-bg'} container w-100 height-100 pt-3 d-flex flex-column pb-5`}>
      <div className="w-100">
        <div className="d-flex flex-row align-items-center w-100 justify-content-between px-3">
          <div className="signup-app-logo">
            <img src="/logo/blue_logo.png" alt="" className="signup-app-logo" />
          </div>
          <div className="d-flex flex-row gap-4">
            <button className={`${darkMode ? 'dark-bg-light dark-mode-text border-none' : 'bg-white border'}  rounded-pill px-3 py-2  font-size-sm`}>
              Save And Exit
            </button>
            <button className={`${darkMode ? 'dark-bg-light dark-mode-text border-none' : 'bg-white border'}  rounded-pill px-3 py-2  font-size-sm`}>
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
              <label htmlFor="schoolName" className="font-size-sm">School Name</label>
                <TextInput 
                  placeholder="Enter School Name"
                  validationSchema={nameSchema({
                     required:true,
                     min:5,
                     max:150,
                     messages:{
                       required:"School Name Is Required",
                       min:"School Name Must Be At Least 5 Characters Long"
                     }
                  })}
                />
            </div>

            <div className="d-flex flex-column gap-1 w-100 my-1">
              <label htmlFor="country" className="font-size-sm">Country</label>
              <CustomDropdown 
                data={country?.data || []}
                isLoading={isLoading}
                displayKey={['country']}
                valueKey={['id']}
                placeholder={"Select Country"}
              />
            </div>

            <div className="my-1">
              <label htmlFor="type" className="font-size-sm">School Type</label>
              <div className="d-flex flex-row align-items-center gap-2">
                <CustomDropdown 
                  data={schoolTypes}
                  displayKey={['name']}
                  valueKey={['name']}
                  placeholder={"Select School Type"}
                />
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
