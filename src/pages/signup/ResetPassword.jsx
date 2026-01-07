import { useState } from "react";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import { Icon } from "@iconify/react";
import { useRef } from "react";
import { emailValidationSchema } from "../../ComponentConfig/YupValidationSchema";
import { useSelector } from "react-redux";
import { allFieldsValid } from "../../utils/functions";
import toast from "react-hot-toast";
import ToastWarning from "../../components/Toast/ToastWarning";
import { TextInput } from "../../components/FormComponents/InputComponents";
function ResetPassword() {
  const { handlePasswordReset, loading } = useAuth();
  const navigate = useNavigate();
  const emailRef = useRef();
  const darkMode = useSelector((state) => state.theme.darkMode);
  const [formData, setFormData] = useState({
    email: "",
  });
  const [isValid, setIsValid] = useState({
    email: "",
  });
  const handleStateChange = (field, value, stateFn) => {
    stateFn((prev) => ({ ...prev, [field]: value }));
  };
  const handlePrevalidation = async () => {
    const email = await emailRef.current.triggerValidation();
    return {
      email,
    };
  };
  const handleSubmit = async () => {
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

    await handlePasswordReset(navigate, formData.email);
  };
  return (
    <>
      <div
        className={`${
          darkMode ? "dark-bg dark-mode-text" : "white-bg"
        } w-100 height-100 pt-3 d-flex flex-column pb-5`}
      >
        <div className="login-container px-4">
          <div className=" login-container-logo-box ps-5">
            <img src="./logo/blue_logo.png" className="login-logo" />
          </div>

          <div className="login-container-form" style={{ height: "70%" }}>
            <div className="login-container-form-box-two">
              <img src="./svg/password-forgotten.svg" alt="" />
            </div>
            <div className="login-container-form-box-one">
              <h1 className="fw-bold my-4 text-white">Reset Password</h1>
                <div className="mb-4">
                  <label htmlFor="email" className="font-size-sm text-white">
                    E-mail
                  </label>
                  <TextInput
                    type="email"
                    placeholder={"e.g example@mail.com"}
                    value={formData?.email}
                    onChange={(value) =>
                      handleStateChange("email", value, setFormData)
                    }
                    onValidationChange={(value) =>
                      handleStateChange("email", value, setIsValid)
                    }
                    validationSchema={emailValidationSchema({
                      required: true,
                    })}
                    ref={emailRef}
                  />
                </div>
                <button
                  className="w-100 mt-2 border-none rounded-3 p-2 primary-background text-white font-size-sm"
                  type="submit"
                  disabled={loading.passwordReset}
                  onClick={() => handleSubmit()}
                >
                  {loading.passwordReset ? <SingleSpinner /> : "Send Code"}
                </button>
              <div
                className="pointer-cursor font-size-sm mt-4"
                onClick={() => {
                  navigate("/reset-password");
                }}
              ></div>
            </div>
          </div>
          <div className=" login-container-logo-box mt-auto ps-5">
            <div
              className="d-flex flex-row gap-2 align-items-center pointer-cursor color-primary"
              onClick={() => {
                navigate("/hero");
              }}
            >
              <span>
                <Icon
                  icon="material-symbols:arrow-back-rounded"
                  width="18"
                  height="18"
                />
              </span>
              <span className="font-size-sm fw-semibold">Back To Login</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default ResetPassword;
