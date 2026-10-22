import { Icon } from "@iconify/react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  emailValidationSchema,
  nameSchema,
  passwordSchema,
} from "../../ComponentConfig/YupValidationSchema";
import { TextInput } from "../../components/FormComponents/InputComponents";
import AuthHero from "../../components/Hero/AuthHero";
import {
  setSignUpFieldValidity,
  updateSignUpFormField,
} from "../../Slices/Asynslices/AuthSlice";
import { allFieldsValid } from "../../utils/functions";
function RegisterSchoolAdmin() {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const dispatch = useDispatch();
  const signUpForm = useSelector((state) => state.auth.signUpForm);
  const signUpFieldValidity = useSelector(
    (state) => state.auth.signUpFieldValidity,
  );

  const handleSetFormField = (field, value) => {
    dispatch(updateSignUpFormField({ field, value }));
    if (clientError !== null) {
      setClientError(null);
    }
  };
  const handleSetValidity = (field, value) => {
    dispatch(setSignUpFieldValidity({ field, value }));
  };
  const [clientError, setClientError] = useState(null);

  const navigate = useNavigate();

  const handlePrevalidation = async () => {
    const name = await nameRef.current?.triggerValidation();
    const email = await emailRef.current?.triggerValidation();
    const password = await passwordRef.current?.triggerValidation();
    const firstName = await firstNameRef.current?.triggerValidation();
    const lastName = await lastNameRef.current?.triggerValidation();
    return {
      name,
      email,
      password,
      firstName,
      lastName,
    };
  };

  const handleNext = async () => {
    setClientError(null);
    const prevalidation = await handlePrevalidation();
    if (!allFieldsValid(prevalidation) || !allFieldsValid({
       fullName: signUpFieldValidity.adminFullName,
       firstname: signUpFieldValidity.adminFirstName,
       lastName: signUpFieldValidity.adminLastName,
       email: signUpFieldValidity.adminEmail,
       password: signUpFieldValidity.adminPassword,

    })) {
      setClientError(
        "Some fields seem to be invalid. Please check the form and try again.",
      );
      return;
    }

    navigate("/subcription/plan");
  };

  const name = signUpForm.adminFullName ? signUpForm.adminFullName.trim() : "";
  const firstName = signUpForm.adminFirstName
    ? signUpForm.adminLastName.trim()
    : "";
  const lastName = signUpForm.adminLastName
    ? signUpForm.adminLastName.trim()
    : "";
  const email = signUpForm.adminEmail ? signUpForm.adminEmail.trim() : "";
  const password = signUpForm.adminPassword
    ? signUpForm.adminPassword.trim()
    : "";

  const totalSteps = 5;
  const fieldsFilled = [name, firstName, lastName, email, password].filter(
    Boolean,
  ).length;

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
                Create School Admin
              </span>
              <span className="fw-light text-iron-400">
                Enter administrator details to assign workspace ownership
              </span>
            </div>

            {clientError && (
              <div className="bg-red-100 p-2 rounded-3 text-red-700 mb-4">
                <p className="m-0">{clientError}</p>
              </div>
            )}

            <div className="d-flex flex-column gap-3">
              <div className="w-100">
                <label
                  htmlFor="fullnames"
                  className="font-size-sm fw-semibold mb-1 d-block"
                >
                  Full Names
                </label>
                <TextInput
                  placeholder="Enter Full Names"
                  value={signUpForm.adminFullName}
                  onChange={(value) =>
                    handleSetFormField("adminFullName", value)
                  }
                  onValidationChange={(value) =>
                    handleSetValidity("adminFullName", value)
                  }
                  validationSchema={nameSchema({
                    min: 3,
                    max: 150,
                    required: true,
                    messages: {
                      min: "Full Names Must Be At least 3 Characters Long",
                      max: "Full Names Must Not Exceed 150 Characters",
                      required: "Full Names Required",
                    },
                  })}
                  ref={nameRef}
                />
              </div>

              <div className="w-100 d-flex flex-row align-items-center gap-2">
                <div className="w-50">
                  <label
                    htmlFor="firstname"
                    className="font-size-sm fw-semibold mb-1 d-block"
                  >
                    First Name
                  </label>
                  <TextInput
                    placeholder="Enter First Name"
                    value={signUpForm.adminFirstName}
                    onChange={(value) =>
                      handleSetFormField("adminFirstName", value)
                    }
                    onValidationChange={(value) =>
                      handleSetValidity("adminFirstName", value)
                    }
                    validationSchema={nameSchema({
                      min: 3,
                      max: 50,
                      required: true,
                      messages: {
                        min: "First Name Must Be At least 3 Characters Long",
                        max: "First Name Must Not Exceed 50 Characters",
                        required: "First Name Required",
                      },
                    })}
                    ref={firstNameRef}
                  />
                </div>
                <div className="w-50">
                  <label
                    htmlFor="lastname"
                    className="font-size-sm fw-semibold mb-1 d-block"
                  >
                    Last Name
                  </label>
                  <TextInput
                    placeholder="Enter Last Name"
                    value={signUpForm.adminLastName}
                    onChange={(value) =>
                      handleSetFormField("adminLastName", value)
                    }
                    onValidationChange={(value) =>
                      handleSetValidity("adminLastName", value)
                    }
                    validationSchema={nameSchema({
                      min: 3,
                      max: 50,
                      required: true,
                      messages: {
                        min: "Last Name Must Be At least 3 Characters Long",
                        max: "Last Name Must Not Exceed 50 Characters",
                        required: "Last Name Required",
                      },
                    })}
                    ref={lastNameRef}
                  />
                </div>
              </div>

              <div className="w-100">
                <label
                  htmlFor="email"
                  className="font-size-sm fw-semibold mb-1 d-block"
                >
                  E-mail
                </label>
                <TextInput
                  type="email"
                  placeholder="e.g example@mail.com"
                  value={signUpForm.adminEmail}
                  onChange={(value) =>
                    handleSetFormField("adminEmail", value)
                  }
                  onValidationChange={(value) =>
                    handleSetValidity("adminEmail", value)
                  }
                  validationSchema={emailValidationSchema({
                    required: true,
                  })}
                  ref={emailRef}
                />
              </div>

              <div className="w-100">
                <label
                  htmlFor="password"
                  className="font-size-sm fw-semibold mb-1 d-block"
                >
                  Password
                </label>
                <TextInput
                  type="password"
                  placeholder="Enter Password"
                  value={signUpForm.adminPassword}
                  onChange={(value) =>
                    handleSetFormField(
                      "adminPassword",
                      value
                    )
                  }
                  onValidationChange={(value) =>
                    handleSetValidity("adminPassword", value)
                  }
                  validationSchema={passwordSchema({
                    min: 8,
                  })}
                  ref={passwordRef}
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
                      Step 3 of 4 Completed
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
                    Step 3 of 4 Incomplete
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
            </div>
          </div>

          <div className="d-flex flex-row align-items-center w-100 justify-content-between mt-3 font-size-sm">
            <button
              type="button"
              className="d-flex flex-row align-items-center border-none bg-none gap-2 text-iron-600 p-0"
              style={{ background: "transparent", cursor: "pointer" }}
              onClick={() => navigate("/create-schoolbranch")}
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

export default RegisterSchoolAdmin;
