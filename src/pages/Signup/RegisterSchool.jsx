import { Icon } from "@iconify/react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, Check } from "lucide-react";
import { Fragment, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { nameSchema } from "../../ComponentConfig/YupValidationSchema";
import {
  setSignUpFieldError,
  setSignUpFieldValidity,
  updateSignUpFormField,
} from "../../Slices/Asynslices/AuthSlice";
import CustomDropdown from "../../components/Dropdowns/Dropdowns";
import { TextInput } from "../../components/FormComponents/InputComponents";
import AuthHero from "../../components/Hero/AuthHero";
import { schoolTypes } from "../../data/data";
import { useGetCountries } from "../../hooks/country/useGetCountry";
import { allFieldsValid } from "../../utils/functions";

function RegisterSchool() {
  const { data: country, isPending: isLoading } = useGetCountries();
  const [clientError, setClientError] = useState(null);
  const countryRef = useRef();
  const schoolNameRef = useRef();

  const signUpForm = useSelector((state) => state?.auth?.signUpForm || {});
  const signUpErrors = useSelector((state) => state?.auth?.signUpErrors || {});
  const signUpFieldValidity = useSelector(
    (state) => state?.auth?.signUpFieldValidity || {}
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handlePrevalidation = async () => {
    const country = await countryRef.current?.triggerValidation();
    const schoolName = await schoolNameRef.current?.triggerValidation();
    return {
      country,
      schoolName,
    };
  };

  const handleNext = async () => {
    setClientError(null);
    const prevalidation = await handlePrevalidation();
    if (!allFieldsValid(prevalidation)) {
      setClientError(
        "Some fields seem to be invalid. Please check the form and try again."
      );
      return;
    }
    if (!allFieldsValid({ school_name: signUpFieldValidity.schoolName })) {
      setClientError(
        "Some fields seem to be invalid. Please check the form and try again."
      );
      return;
    }
    if (!signUpForm.type) {
      setClientError("Please select a school type to proceed.");
      return;
    }
    navigate("/create-schoolbranch");
  };

  const handleSetFormField = (field, value) => {
    dispatch(updateSignUpFormField({ field, value }));
    if (clientError !== null) {
      setClientError(null);
    }
  };

  const handleSetError = (field, value) => {
    dispatch(setSignUpFieldError({ field, value }));
  };

  const handleSetValidity = (field, value) => {
    dispatch(setSignUpFieldValidity({ field, value }));
  };

  const totalSteps = 3;
  const fieldsFilled = [
    signUpForm.schoolName,
    signUpForm.countryId,
    signUpForm.type,
  ].filter(Boolean).length;

  const progressPercentage = (fieldsFilled / totalSteps) * 100;
  const isStepComplete = fieldsFilled === totalSteps;

  return (
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
                Register Your School
              </span>
              <span className="fw-light text-iron-400">
                Enter your institution details to begin setting up your workspace
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
                  htmlFor="schoolName"
                  className="font-size-sm fw-semibold"
                >
                  School Name
                </label>
                <TextInput
                  placeholder="Enter School Name"
                  validationSchema={nameSchema({
                    required: true,
                    min: 5,
                    max: 150,
                    messages: {
                      required: "School Name Is Required",
                      min: "School Name Must Be At Least 5 Characters Long",
                    },
                  })}
                  onChange={(value) =>
                    handleSetFormField("schoolName", value)
                  }
                  onValidationChange={(value) => {
                    handleSetValidity("schoolName", value)
                  }
                  }
                  value={signUpForm.schoolName}
                  ref={schoolNameRef}
                />
              </div>

              <div className="d-flex flex-column gap-1 w-100">
                <label
                  htmlFor="country"
                  className="font-size-sm fw-semibold"
                >
                  Country
                </label>
                <CustomDropdown
                  data={country?.data || []}
                  isLoading={isLoading}
                  displayKey={["country"]}
                  valueKey={["id"]}
                  placeholder={"Select Country"}
                  onSelect={(value) =>
                    handleSetFormField("countryId", value)
                  }
                  onError={(value) => handleSetError("countryId", value)}
                  error={signUpErrors.countryId}
                  errorMessage={"Country Required"}
                  ref={countryRef}
                  value={signUpForm.countryId}
                />
              </div>

              <div className="d-flex flex-column gap-1">
                <label htmlFor="type" className="font-size-sm fw-semibold">
                  School Type
                </label>
                <div className="d-flex flex-row gap-2">
                  {schoolTypes.map((s) => {
                    const isSelected = signUpForm.type === s.key;
                    return (
                      <Fragment key={s.key}>
                        <motion.div
                          className={`card d-flex flex-column gap-3 pointer-cursor w-50 p-2 ${
                            isSelected
                              ? "border-1 border-primary-500 bg-primary-50 text-primary-500"
                              : "border-none border bg-white"
                          }`}
                          style={{
                            borderRadius: "0.75rem",
                            minHeight: "120px",
                          }}
                          onClick={() => handleSetFormField("type", s.key)}
                        >
                          <div className="d-flex flex-row justify-content-between align-items-center">
                            <span className="fw-medium">{s.name}</span>
                            <motion.div
                              style={{
                                width: 24,
                                height: 24,
                                flexShrink: 0,
                              }}
                              animate={{
                                scale: isSelected ? [1, 1.2, 1] : 1,
                              }}
                              transition={{ duration: 0.2 }}
                              className={`d-flex justify-content-center align-items-center rounded-circle ${
                                isSelected
                                  ? "bg-primary-500 text-white"
                                  : "bg-none border-2 border"
                              }`}
                            >
                              <AnimatePresence mode="wait">
                                {isSelected && (
                                  <motion.div
                                    key="check"
                                    initial={{
                                      scale: 0,
                                      opacity: 0,
                                      rotate: -45,
                                    }}
                                    animate={{
                                      scale: 1,
                                      opacity: 1,
                                      rotate: 0,
                                    }}
                                    exit={{
                                      scale: 0,
                                      opacity: 0,
                                      rotate: 45,
                                    }}
                                    transition={{
                                      type: "spring",
                                      stiffness: 500,
                                      damping: 30,
                                    }}
                                  >
                                    <Check size={12} />
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </motion.div>
                          </div>
                          <span
                            className={`fw-light ${
                              isSelected
                                ? "text-primary-500"
                                : "text-iron-500"
                            } mt-auto`}
                          >
                            {s.description}
                          </span>
                        </motion.div>
                      </Fragment>
                    );
                  })}
                </div>
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
                      className="font-size-sm fw-semibold"
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      Step 1 of 4 Completed
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
                    className="font-size-sm fw-semibold"
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
            <button
              type="button"
              className="d-flex flex-row align-items-center border-none bg-none gap-2 text-iron-600 p-0"
              style={{ background: "transparent", cursor: "pointer" }}
              onClick={() => navigate("/login-school-admin")}
            >
              <ArrowLeft size={16} />
              <span>Back</span>
            </button>
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
  );
}

export default RegisterSchool;