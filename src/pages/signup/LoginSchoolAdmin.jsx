import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import { Icon } from "@iconify/react";
import { TextInput } from "../../components/FormComponents/InputComponents";
import {
  emailValidationSchema,
  passwordSchema,
} from "../../ComponentConfig/YupValidationSchema";
import { useSelector } from "react-redux";
import { allFieldsValid } from "../../utils/functions";
import toast from "react-hot-toast";
import ToastWarning from "../../components/Toast/ToastWarning";
function LoginSchoolAdmin() {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const emailRef = useRef();
  const passwordRef = useRef();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isValid, setIsValid] = useState({
    email: null,
    password: null,
  });
  const handlePrevalidation = async () => {
    const email = await emailRef.current.triggerValidation();
    const password = await passwordRef.current.triggerValidation();
    return {
      email,
      password,
    };
  };
  const handleStateChange = (field, value, stateFn) => {
    stateFn((prev) => ({ ...prev, [field]: value }));
  };
  const { handleLogin, loading } = useAuth();
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
    const { email, password } = formData;
    await handleLogin(email, password, navigate);
  };

  return (
    <>
      <div
        className={`login-container px-4 ${
          darkMode ? "dark-bg gainsboro-color" : "bg-white"
        }`}
      >
        <div className=" login-container-logo-box ps-5">
          <img src="./logo/blue_logo.png" className="login-logo" />
        </div>
        <div className="login-container-form" style={{ height: "70%" }}>
          <div className="login-container-form-box-two">
            <img src="./svg/login.svg" alt="" />
          </div>
          <div className="login-container-form-box-one">
            <h2 className="fw-bold my-4 text-white">Login School Admin</h2>
            <div>
              <div className="mb-4">
                <label htmlFor="email" className="font-size-sm text-white">
                  Email
                </label>
                <TextInput
                  type="email"
                  value={formData.email}
                  onChange={(value) =>
                    handleStateChange("email", value, setFormData)
                  }
                  placeholder="example@gmail.com"
                  onValidationChange={(value) =>
                    handleStateChange("email", value, setIsValid)
                  }
                  ref={emailRef}
                  validationSchema={emailValidationSchema({
                    required: true,
                  })}
                  className={"p-md"}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="font-size-sm text-white">
                  Password
                </label>
                <TextInput
                  type="password"
                  value={formData.password}
                  onChange={(value) =>
                    handleStateChange("password", value, setFormData)
                  }
                  onValidationChange={(value) =>
                    handleStateChange("password", value, setIsValid)
                  }
                  placeholder="Enter your password"
                  ref={passwordRef}
                  className={"p-md"}
                  validationSchema={passwordSchema({
                    required: true,
                  })}
                />
              </div>
              <div className="my-1 d-flex justify-content-end"></div>
              <button
                className="w-100 mt-2 border-none rounded-3 p-md primary-background text-white font-size-sm"
                type="submit"
                disabled={loading.login}
                onClick={handleSubmit}
              >
                {loading.login ? <SingleSpinner /> : "Login"}
              </button>
            </div>
            <div
              className="pointer-cursor font-size-sm mt-4"
              onClick={() => {
                navigate("/reset-password");
              }}
            >
              <span>
                Password Forgotten ?{" "}
                <span className="color-primary">Reset Password</span>
              </span>
            </div>
          </div>
        </div>
        <div className=" login-container-logo-box mt-auto ps-5">
          <div
            className="d-flex flex-row gap-2 align-items-center pointer-cursor font-size-sm color-primary"
            onClick={() => {
              navigate("/hero");
            }}
          >
            <span>
              <Icon icon="material-symbols:arrow-back-rounded" />
            </span>
            <span>Back</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginSchoolAdmin;
