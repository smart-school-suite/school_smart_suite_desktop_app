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
import { updateSchoolAuthError } from "../../Slices/Asynslices/AuthSlice";
import { useRef } from "react";
import { allFieldsValid } from "../../utils/functions";
import toast from "react-hot-toast";
import ToastWarning from "../../components/Toast/ToastWarning";
import AuthHero from "../../components/Hero/AuthHero";
function RegisterSchool() {
  const { data: country, isPending: isLoading } = useGetCountries();
  const countryRef = useRef();
  const schoolNameRef = useRef();
  const schoolTypeRef = useRef();
  const schoolCredentials = useSelector((state) => state.auth.schoolAuthData);
  const schoolAuthError = useSelector((state) => state.auth.schoolAuthError);
  const darkMode = useSelector((state) => state.theme.darkMode);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handlePrevalidation = async () => {
    const country = await countryRef.current.triggerValidation();
    const schoolName = await schoolNameRef.current.triggerValidation();
    const schoolType = await schoolTypeRef.current.triggerValidation();
    return {
      country,
      schoolName,
      schoolType,
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
    if (!allFieldsValid({ school_name: schoolAuthError.school_name.isValid })) {
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
    navigate("/create-schoolbranch");
  };
  const handleChange = (field, value) => {
    dispatch(setSchoolAuthData({ field, value }));
  };

  const handleSchoolAuthError = (field, isValid, error) => {
    dispatch(updateSchoolAuthError({ field, isValid, error }));
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
    <>
      <div className="d-flex flex-row align-items-center">
        <AuthHero />
        <div
          style={{ height: "100dvh", width: "40%" }}
          className="p-3 font-size-sm d-flex flex-column justify-content-between bg-white"
        >
          <div className="w-100">
            <div className="d-flex flex-row align-items-center justify-content-between">
              <div className="app-logo">
                <img
                  src="./logo/logo-transparent.png"
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
                <div
                  className="d-flex flex-column gap-1"
                  style={{ marginBottom: "2rem" }}
                >
                  <span className="fw-semibold font-size-md">
                    Launch A New School Adventure
                  </span>
                  <span className="fw-light text-iron-400">
                    Sign in to your smart school suite workspace
                  </span>
                </div>

                <div className="d-flex flex-column gap-3">
                  <div className="mt-5 d-flex flex-column gap-1">
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
                      onChange={(value) => handleChange("school_name", value)}
                      onValidationChange={(value) =>
                        handleSchoolAuthError("school_name", value, null)
                      }
                      value={schoolCredentials.school_name}
                      ref={schoolNameRef}
                    />
                  </div>

                  <div className="d-flex flex-column gap-1 w-100 my-1">
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
                      onSelect={(value) => handleChange("country_id", value)}
                      onError={(value) =>
                        handleSchoolAuthError("country_id", null, value)
                      }
                      error={schoolAuthError.country_id.error}
                      errorMessage={"Country Required"}
                      ref={countryRef}
                      value={schoolCredentials.country_id}
                    />
                  </div>

                  <div className="d-flex flex-column gap-1">
                    <label htmlFor="type" className="font-size-sm fw-semibold">
                      School Type
                    </label>
                    <div className="d-flex flex-row align-items-center gap-2">
                      <CustomDropdown
                        data={schoolTypes}
                        displayKey={["name"]}
                        valueKey={["name"]}
                        placeholder={"Select School Type"}
                        onSelect={(value) => handleChange("type", value)}
                        onError={(value) =>
                          handleSchoolAuthError("type", null, value)
                        }
                        error={schoolAuthError.type.error}
                        errorMessage={"School Type Required"}
                        ref={schoolTypeRef}
                        value={schoolCredentials.type}
                      />
                    </div>
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
              <div className="d-flex flex-row align-items-center gap-2">
                <span>
                  <Icon
                    icon="material-symbols:arrow-back-rounded"
                    className="color-primary"
                  />
                </span>
                <Link className="p-0 m-0 color-primary" to="/">
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

export default RegisterSchool;
