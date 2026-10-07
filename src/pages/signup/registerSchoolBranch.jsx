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
import AuthHero from "../../components/Hero/AuthHero";
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
        />,
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
        />,
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
      <div className="d-flex flex-row align-items-center">
        <AuthHero />
        <div
          style={{ height: "100dvh", width: "40%" }}
          className="p-3 font-size-sm d-flex flex-column justify-content-between bg-white"
        >
          <div className="d-flex flex-row align-items-center justify-content-between">
            <div className="app-logo">
              <img
                src="/logo/logo-transparent.png"
                alt="Logo"
                style={{
                  width: "2rem",
                  height: "2rem",
                  objectFit: "contain",
                  borderRadius: "0.4rem",
                }}
              />
            </div>
            <span style={{ cursor: "pointer" }}>Need help ?</span>
          </div>
          <div className="w-100 d-flex flex-row align-items-center justify-content-center mt-5">
            <div className="w-100">
            
              <div className="d-flex flex-column gap-3">
                <div className="d-flex flex-column gap-1">
                  <label htmlFor="school branch name" className="font-size-sm">
                    School Branch Name
                  </label>
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
                    onChange={(value) =>
                      handleChange("school_branch_name", value)
                    }
                    onValidationChange={(value) =>
                      handleSchoolAuthError("school_branch_name", value, null)
                    }
                    value={schoolCredentials.school_branch_name}
                    ref={schoolBranchNameRef}
                  />
                </div>
                <div className="d-flex flex-column gap-1">
                  <label
                    htmlFor="school branch Abbreviation"
                    className="font-size-sm"
                  >
                    Abbreviation
                  </label>
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
          </div>
          <div className="mt-auto w-100">
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
      </div>
    </>
  );
}
export default RegisterSchoolBranch;
