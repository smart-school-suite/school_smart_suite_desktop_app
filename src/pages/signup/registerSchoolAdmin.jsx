import { useRef, useState } from "react";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { resetSchoolAuthData } from "../../Slices/Asynslices/AuthSlice";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";
import { allFieldsValid } from "../../utils/functions";
import toast from "react-hot-toast";
import ToastWarning from "../../components/Toast/ToastWarning";
import { TextInput } from "../../components/FormComponents/InputComponents";
import { emailValidationSchema, nameSchema, passwordSchema } from "../../ComponentConfig/YupValidationSchema";
function RegisterSchoolAdmin() {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const firstNameRef = useRef();
  const lastNameRef = useRef();

  const { handleCreateSuperAdmin, loading } = useAuth();

  const [adminCredentials, setAdminCredentails] = useState({
    name: "",
    email: "",
    password: "",
    first_name: "",
    last_name: "",
  });
  const [isValid, setIsValid] = useState({
    name: null,
    email: null,
    password: null,
    first_name: null,
    last_name: null,
  });

  const apiKey = useSelector((state) => state.auth.apiKey);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleStateChange = (field, value, stateFn) => {
    stateFn((prev) => ({ ...prev, [field]: value }));
  };

  const handlePrevalidation = async () => {
    const name = await nameRef.current.triggerValidation();
    const email = await emailRef.current.triggerValidation();
    const password = await passwordRef.current.triggerValidation();
    const firstName = await firstNameRef.current.triggerValidation();
    const lastName = await lastNameRef.current.triggerValidation();
    return {
      name,
      email,
      password,
      firstName,
      lastName,
    };
  };

  const handleCreateSchoolAdmin = async () => {
    try {
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
      if (!allFieldsValid(isValid)) {
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
      await handleCreateSuperAdmin(navigate, adminCredentials, apiKey);
      dispatch(resetSchoolAuthData());
    } catch (e) {
      console.log("an error occured");
    }
  };

  const name = adminCredentials.name ? adminCredentials.name.trim() : "";
  const firstName = adminCredentials.first_name
    ? adminCredentials.first_name.trim()
    : "";
  const lastName = adminCredentials.last_name
    ? adminCredentials.last_name.trim()
    : "";
  const email = adminCredentials.email ? adminCredentials.email.trim() : "";
  const password = adminCredentials.password
    ? adminCredentials.password.trim()
    : "";
  const totalSteps = 5;
  const fieldsFilled = [name, firstName, lastName, email, password].filter(
    Boolean
  ).length;

  const progressPercentage = (fieldsFilled / totalSteps) * 100;
  const isStepComplete = fieldsFilled === totalSteps;
  return (
    <>
      <div 
      className={`${
          darkMode ? "dark-bg dark-mode-text" : "white-bg"
        } container w-100 height-100 pt-3 d-flex flex-column pb-5`}
      >
        <div className="d-flex flex-row align-items-center w-100 justify-content-between px-3">
          <div className="signup-app-logo">
            <img src="/logo/blue_logo.png" alt="" className="signup-app-logo" />
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
        <div className="d-flex flex-row align-items-center justify-content-around w-100 mt-2">
          <div className="w-50 rounded-4 px-2  py-4">
            <form>
              <h4 className="text-center">Create School Admin</h4>
              <div className="d-flex flex-row align-items-center w-100 gap-2">
                <div className="my-1 w-100">
                  <label htmlFor="fullnames" className="font-size-sm">Full Names</label>
                  <TextInput 
                    placeholder={"Enter Full Names"}
                    value={adminCredentials.name}
                    onChange={(value) => handleStateChange('name', value, setAdminCredentails)}
                    onValidationChange={(value) => handleStateChange('name', value, setIsValid)}
                    validationSchema={nameSchema({
                        min:3,
                        max:150,
                        required:true,
                        messages:{
                           min:"Full Names Must Be Atleast 3 Characters Long",
                           max:"Full Names Must Not Exceed 150 Characters",
                           required:"Full Names Required"
                        }
                    })}
                    ref={nameRef}
                  />
                </div>
              </div>
              <div className="w-100 d-flex flex-row align-items-center gap-2">
                <div className="w-50">
                  <label htmlFor="firstname" className="font-size-sm">First Name</label>
                  <TextInput 
                    placeholder={"Enter First Name"}
                    value={adminCredentials.first_name}
                    onChange={(value) => handleStateChange('first_name', value, setAdminCredentails)}
                    onValidationChange={(value) => handleStateChange('first_name', value, setIsValid)}
                    validationSchema={nameSchema({
                        min:3,
                        max:50,
                        required:true,
                        messages:{
                           min:"First Name Must Be Atleast 3 Characters Long",
                           max:"First Name Must Not Exceed 50 Characters",
                           required:"First Name Required"
                        }
                    })}
                    ref={firstNameRef}
                  />
                </div>
                <div className="w-50">
                  <label htmlFor="lastname" className="font-size-sm">Last Name</label>
                  <TextInput 
                    placeholder={"Enter Last Name"}
                    value={adminCredentials.last_name}
                    onChange={(value) => handleStateChange('last_name', value, setAdminCredentails)}
                    onValidationChange={(value) => handleStateChange('last_name', value, setIsValid)}
                    validationSchema={nameSchema({
                        min:3,
                        max:50,
                        required:true,
                        messages:{
                           min:"Last Name Must Be Atleast 3 Characters Long",
                           max:"Last Name Must Not Exceed 50 Characters",
                           required:"Last Name Required"
                        }
                    })}
                    ref={lastNameRef}
                  />
                </div>
              </div>
              <div className="my-1 w-100">
                <label htmlFor="email" className="font-size-sm">E-mail</label>
                <TextInput 
                  type="email"
                  placeholder={"e.g example@mail.com"}
                  value={adminCredentials.email}
                  onChange={(value) => handleStateChange('email', value, setAdminCredentails)}
                  onValidationChange={(value) => handleStateChange('email', value, setIsValid)}
                  validationSchema={emailValidationSchema({
                      required:true
                  })}
                  ref={emailRef}
                />
              </div>
              <div className="my-1 w-100">
                <label htmlFor="password" className="font-size-sm">Password</label>
                <TextInput 
                  type={"password"}
                  placeholder={"Enter Password"}
                  value={adminCredentials.password}
                  onChange={(value) => handleStateChange('password', value, setAdminCredentails)}
                  onValidationChange={(value) => handleStateChange('password', value, setIsValid)}
                  validationSchema={passwordSchema({
                     min:8
                  })}
                  ref={passwordRef}
                />
              </div>
            </form>
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
                      Step 4 of 4 Completed
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
                    Step 4 of 4 Incomplete
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
                  animate={{ width: `100%` }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                />
              </div>
              <div className="auth-progress-bar">
                <motion.div
                  className="primary-background h-100"
                  initial={{ width: 0 }}
                  animate={{ width: `100%` }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                />
              </div>
              <div className="auth-progress-bar">
                <motion.div
                  className="primary-background h-100"
                  initial={{ width: 0 }}
                  animate={{ width: `100%` }}
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
            </div>
          </div>

          <div className="d-flex flex-row align-items-center w-100 justify-content-end mt-3 font-size-sm">
            <div>
              <button
                className="border-none p-2 rounded-2 font-size-sm px-4 primary-background text-white"
                onClick={() => {
                  handleCreateSchoolAdmin();
                }}
                disabled={!isStepComplete || loading.admin}
              >
                Finish
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default RegisterSchoolAdmin;
