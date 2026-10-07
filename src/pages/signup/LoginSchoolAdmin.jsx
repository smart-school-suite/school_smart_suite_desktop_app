import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import { TextInput } from "../../components/FormComponents/InputComponents";
import {
  emailValidationSchema,
  passwordSchema,
} from "../../ComponentConfig/YupValidationSchema";
import { useSelector } from "react-redux";
import { allFieldsValid } from "../../utils/functions";
import toast from "react-hot-toast";
import ToastWarning from "../../components/Toast/ToastWarning";
import Form from "react-bootstrap/Form";
import AuthHero from "../../components/Hero/AuthHero";
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
    const { email, password } = formData;
    await handleLogin(email, password, navigate);
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
          <div className="d-flex flex-column justify-content-center align-items-center flex-grow-1">
            <div className="w-100">
              <div
                className="d-flex flex-column gap-1"
                style={{ marginBottom: "2rem" }}
              >
                <span className="fw-semibold font-size-md">Welcome back</span>
                <span className="fw-light text-iron-400">
                  Sign in to your smart school suite workspace
                </span>
              </div>

              <div className="d-flex flex-column gap-2">
                <div>
                  <label htmlFor="email" className="font-size-sm fw-medium">
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
                  />
                </div>

                <div>
                  <label htmlFor="password" className="font-size-sm fw-medium">
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
                    validationSchema={passwordSchema({
                      required: true,
                    })}
                  />
                </div>

                <div className="d-flex flex-row align-items-center justify-content-between my-2">
                  <Form.Check
                    type="checkbox"
                    id="custom-switch"
                    label="Remember Me"
                    checked={formData.rememberMe || false}
                    onChange={(e) =>
                      handleStateChange(
                        "rememberMe",
                        e.target.checked,
                        setFormData,
                      )
                    }
                  />
                  <span
                    style={{ cursor: "pointer" }}
                    className="text-primary-400 fw-medium"
                    onClick={() => navigate("/reset-password")}
                  >
                    Forgot Password ?
                  </span>
                </div>

                <div className="d-flex flex-column gap-2">
                  <button
                    className="border-none primary-background text-white rounded-3  w-100"
                    style={{ padding: "0.6rem" }}
                    onClick={() => handleSubmit()}
                  >
                    {loading.login ? <SingleSpinner /> : "Login"}
                  </button>
                  <div className="d-flex flex-row align-items-center gap-2 pointer-cursor"
                   onClick={() => navigate("/register-school")}
                  >
                    <span>Already Have An Account? </span>
                    <span className="text-primary-400 fw-medium">Sign up</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginSchoolAdmin;
