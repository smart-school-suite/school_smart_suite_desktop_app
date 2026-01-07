import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Icon } from "@iconify/react";
import { setSchoolAuthData } from "../../Slices/Asynslices/AuthSlice";
import { motion, AnimatePresence } from "framer-motion";
import { useRef } from "react";
import { TextInput } from "../../components/FormComponents/InputComponents";
import { nameSchema } from "../../ComponentConfig/YupValidationSchema";
import { updateSchoolAuthError } from "../../Slices/Asynslices/AuthSlice";
import { allFieldsValid } from "../../utils/functions";
import toast from "react-hot-toast";
import ToastWarning from "../../components/Toast/ToastWarning";
function RegisterSchoolBranch() {
  const schoolCredentials = useSelector((state) => state.auth.schoolAuthData);
  const schoolAuthError = useSelector((state) => state.auth.schoolAuthError);
  const darkMode = useSelector((state) => state.theme.darkMode);
  const schoolBranchNameRef = useRef();
  const abbreviationRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handlePrevalidation = async () => {
    const schoolBranchName =
      await schoolBranchNameRef.current.triggerValidation();
    const abbreviation = await abbreviationRef.current.triggerValidation();
    return {
      schoolBranchName,
      abbreviation,
    };
  };
  const handleNext = async () => {
    const prevalidation = await handlePrevalidation();
    if (!allFieldsValid(prevalidation)) {
      toast.custom(
        <ToastWarning
          title={"Invalid Fields"}
          description={
            "Some Fields Seem To Be Invalid Please Go Through the form and try again"
          }
        />
      );
      return;
    }
    if (
      !allFieldsValid({
        school_branch_name: schoolAuthError.school_branch_name.isValid,
        abbreviation: schoolAuthError.abbreviation.isValid,
      })
    ) {
      toast.custom(
        <ToastWarning
          title={"Invalid Fields"}
          description={
            "Some Fields Seem To Be Invalid Please Go Through the form and try again"
          }
        />
      );
      return;
    }
    navigate("/subcription/plan");
  };
  const handleChange = (field, value) => {
    dispatch(setSchoolAuthData({ field, value }));
  };
  const handleSchoolAuthError = (field, isValid, error) => {
    dispatch(updateSchoolAuthError({ field, isValid, error }));
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
      <div
        className={`${
          darkMode ? "dark-bg dark-mode-text" : "white-bg"
        } w-100 height-100 pt-3 d-flex flex-column pb-5`}
      >
        <div className="d-flex flex-row align-items-center w-100 justify-content-between px-3">
          <div className="signup-app-logo">
            <img
              src="./logo/blue_logo.png"
              alt=""
              className="signup-app-logo"
            />
          </div>
          <div className="d-flex flex-row gap-4">
            <button
              className={`${
                darkMode
                  ? "dark-bg-light dark-mode-text border-none"
                  : "bg-white border"
              }  rounded-pill px-3 py-2  font-size-sm`}
            >
              Save And Exit
            </button>
            <button
              className={`${
                darkMode
                  ? "dark-bg-light dark-mode-text border-none"
                  : "bg-white border"
              }  rounded-pill px-3 py-2  font-size-sm`}
            >
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
              <label htmlFor="school branch name" className="font-size-sm">School Branch Name</label>
              <TextInput
                placeholder="Enter School Branch Name"
                validationSchema={nameSchema({
                  required: true,
                  min: 5,
                  max: 150,
                  messages: {
                    required: "School Branch Name Required",
                    min: "School Branch Name Must Be At Least 5 Characters Long",
                    max: "School Branch Name Must Not Exceed 150 Characters",
                  },
                })}
                onChange={(value) => handleChange("school_branch_name", value)}
                onValidationChange={(value) =>
                  handleSchoolAuthError("school_branch_name", value, null)
                }
                value={schoolCredentials.school_branch_name}
                ref={schoolBranchNameRef}
              />
            </div>
            <div className="my-3">
              <label htmlFor="school branch Abbreviation" className="font-size-sm">Abbreviation</label>
              <TextInput
                placeholder="Enter School Branch Name"
                validationSchema={nameSchema({
                  required: true,
                  min: 2,
                  max: 10,
                  messages: {
                    required: "School Branch Abbreviation Name Required",
                    min: "School Branch Abbreviation  Name Must Be At Least 2 Characters Long",
                    max: "School Branch Abbreviation Must Not Exceed 10 Characters",
                  },
                })}
                onChange={(value) => handleChange("abbreviation", value)}
                onValidationChange={(value) =>
                  handleSchoolAuthError("abbreviation", value, null)
                }
                value={schoolCredentials.abbreviation}
                ref={abbreviationRef}
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
                onClick={handleNext}
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
