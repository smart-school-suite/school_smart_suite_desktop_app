import { useSelector } from "react-redux";
import { useAuth } from "../../context/authContext";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import { TextInput } from "../../components/FormComponents/InputComponents";
import { passwordSchema } from "../../ComponentConfig/YupValidationSchema";
import toast from "react-hot-toast";
import ToastWarning from "../../components/Toast/ToastWarning";
import { allFieldsValid } from "../../utils/functions";
import AuthHero from "../../components/Hero/AuthHero";
function ChangePassword() {
  const { handleChangePassword, loading } = useAuth();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();
  const passwordResetToken = useSelector(
    (state) => state.auth.passwordResetToken,
  );
  const darkMode = useSelector((state) => state.theme.darkMode);
  const [formData, setFormData] = useState({
    new_password: "",
    new_password_confirmation: "",
  });
  const [isValid, setIsValid] = useState({
    new_password: null,
    new_password_confirmation: null,
  });
  const handleStateChange = (field, value, stateFn) => {
    stateFn((prev) => ({ ...prev, [field]: value }));
  };
  const handlePrevalidation = async () => {
    const password = await passwordRef.current.triggerValidation();
    const passwordConfirmation =
      await passwordConfirmationRef.current.triggerValidation();
    return {
      password,
      passwordConfirmation,
    };
  };
  const navigate = useNavigate();

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
    await handleChangePassword(navigate, formData, passwordResetToken);
  };
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
                  Change Password
                </span>
                <span className="fw-light text-iron-400">
                  Sign in to your smart school suite workspace
                </span>
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="font-size-sm">
                  Password
                </label>
                <TextInput
                  type={"password"}
                  placeholder={"Enter Password"}
                  value={formData.password}
                  onChange={(value) =>
                    handleStateChange("new_password", value, setFormData)
                  }
                  onValidationChange={(value) =>
                    handleStateChange("new_password", value, setIsValid)
                  }
                  validationSchema={passwordSchema({
                    min: 8,
                  })}
                  ref={passwordRef}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="font-size-sm">
                  Password Confimation
                </label>
                <TextInput
                  type={"password"}
                  placeholder={"Confirm Password"}
                  value={formData.new_password_confirmation}
                  onChange={(value) =>
                    handleStateChange(
                      "new_password_confirmation",
                      value,
                      setFormData,
                    )
                  }
                  onValidationChange={(value) =>
                    handleStateChange(
                      "new_password_confirmation",
                      value,
                      setIsValid,
                    )
                  }
                  validationSchema={passwordSchema({
                    min: 8,
                  })}
                  ref={passwordConfirmationRef}
                />
              </div>
              <button
                className="w-100 mt-2 border-none rounded-3 p-2 primary-background text-white font-size-sm"
                type="submit"
                disabled={loading.changePassword}
                onClick={() => handleSubmit()}
              >
                {loading.changePassword ? <SingleSpinner /> : "Change Password"}
              </button>
            </div>
          </div>
          <div className=" login-container-logo-box mt-auto ps-5 visually-hidden">
            <div
              className="d-flex flex-row gap-2 align-items-center pointer-cursor"
              onClick={() => {
                navigate("/hero");
              }}
            >
              <span>
                <Icon
                  icon="material-symbols:arrow-back-rounded"
                  width="24"
                  height="24"
                />
              </span>
              <span className="font-size-sm fw-semibold">Back</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default ChangePassword;
