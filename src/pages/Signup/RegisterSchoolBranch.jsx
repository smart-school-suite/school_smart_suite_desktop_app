import { Icon } from "@iconify/react";
import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { nameSchema } from "../../ComponentConfig/YupValidationSchema";
import { TextInput } from "../../components/FormComponents/InputComponents";
import AuthHero from "../../components/Hero/AuthHero";
import {
  setSignUpFieldValidity,
  updateSignUpFormField,
} from "../../Slices/Asynslices/AuthSlice";
import { allFieldsValid } from "../../utils/functions";
function RegisterSchoolBranch() {  
  const signUpForm = useSelector((state) => state.auth.signUpForm);
  const signUpFieldValidity = useSelector((state) => state.auth.signUpFieldValidity);
  const [clientError, setClientError] = useState(null);
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
      setClientError(
        "Some Fields Seem To Be Invalid Please Go Through the form and try again",
      );
      return;
    }
    if (
      !allFieldsValid({
        schoolBranchName: signUpFieldValidity.schoolBranchName,
        abbreviation: signUpFieldValidity.abbreviation,
      })
    ) {
      setClientError(
        "Some Fields Seem To Be Invalid Please Go Through the form and try again",
      );
      return;
    }
    navigate("/register/school-admin");
  };
  const handleSetFormField = (field, value) => {
    dispatch(updateSignUpFormField({ field, value }));
      if (clientError !== null) {
      setClientError(null);
    }
  };
  const handleSetValidity = (field, value) => {
    dispatch(setSignUpFieldValidity({ field, value }));
  };
  const branchName = signUpForm.schoolBranchName
    ? signUpForm.schoolBranchName.trim()
    : "";
  const abbreviation = signUpForm.abbreviation
    ? signUpForm.abbreviation.trim()
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

          <div className="d-flex flex-column justify-content-center align-items-center flex-grow-1">
            <div className="w-100">
              <div
                className="d-flex flex-column gap-1"
                style={{ marginBottom: "2rem" }}
              >
                <span className="fw-semibold font-size-md">
                  Add School Branch
                </span>
                <span className="fw-light text-iron-400">
                  Enter details to set up your primary campus or main branch
                </span>
              </div>

              {clientError && (
                <div className="bg-red-100 p-2 rounded-3 text-red-700 mb-4">
                  <p className="m-0">{clientError}</p>
                </div>
              )}

              <div className="d-flex flex-column gap-3">
                <div className="d-flex flex-column gap-1">
                  <label
                    htmlFor="schoolBranchName"
                    className="font-size-sm fw-semibold"
                  >
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
                      handleSetFormField("schoolBranchName", value)
                    }
                    onValidationChange={(value) =>
                      handleSetValidity("schoolBranchName", value)
                    }
                    value={signUpForm.schoolBranchName}
                    ref={schoolBranchNameRef}
                  />
                </div>

                <div className="d-flex flex-column gap-1">
                  <label
                    htmlFor="abbreviation"
                    className="font-size-sm fw-semibold"
                  >
                    Abbreviation
                  </label>
                  <TextInput
                    placeholder="e.g. HQ or MAIN"
                    validationSchema={nameSchema({
                      required: true,
                      min: 2,
                      max: 10,
                      messages: {
                        required: "School Branch Abbreviation Name Required",
                        min: "School Branch Abbreviation Name Must Be At Least 2 Characters Long",
                        max: "School Branch Abbreviation Must Not Exceed 10 Characters",
                      },
                    })}
                    onChange={(value) =>
                      handleSetFormField("abbreviation", value)
                    }
                    onValidationChange={(value) =>
                      handleSetValidity("abbreviation", value)
                    }
                    value={signUpForm.abbreviation}
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
              <div
                className="d-flex flex-row align-items-center gap-2 cursor-pointer"
                onClick={() => navigate("/register-school")}
              >
                <Icon
                  icon="material-symbols:arrow-back-rounded"
                  className="color-primary"
                />
                <span>Back</span>
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
