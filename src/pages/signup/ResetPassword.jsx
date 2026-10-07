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
import AuthHero from "../../components/Hero/AuthHero";
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
        />,
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
        />,
      );
      return;
    }

    await handlePasswordReset(navigate, formData.email);
  };
  return (
    <>
      <div className="d-flex flex-row align-items-center">
        <AuthHero />
        <div
          style={{ height: "100dvh", width: "40%" }}
          className="p-3 font-size-sm d-flex flex-column justify-content-between bg-white"
        >
          <div>
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
            <div>
              <div
                className="d-flex flex-column gap-1"
                style={{ marginBottom: "2rem", marginTop:"8rem" }}
              >
                <span className="fw-semibold font-size-md">Reset Password</span>
                <span className="fw-light text-iron-400">
                  Sign in to your smart school suite workspace
                </span>
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="font-size-sm">
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
                className="w-100 mt-2 border-none fw-light text-white  rounded-3 p-2 primary-background font-size-sm"
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
          <div className=" mt-auto">
            <button
              onClick={() => {
                navigate("/hero");
              }}
              className="d-flex flex-row gap-2 align-items-center pointer-cursor border-none bg-none border-bottom text-iron-500 fw-normal"
            >
              <span>
                <Icon
                  icon="material-symbols:arrow-back-rounded"
                  width="18"
                  height="18"
                />
              </span>
              <span>Back To Login</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default ResetPassword;
