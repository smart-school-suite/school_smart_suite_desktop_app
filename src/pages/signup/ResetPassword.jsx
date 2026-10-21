import { Icon } from "@iconify/react";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { emailValidationSchema } from "../../ComponentConfig/YupValidationSchema";
import { TextInput } from "../../components/FormComponents/InputComponents";
import AuthHero from "../../components/Hero/AuthHero";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import { useAuth } from "../../context/authContext";
import { allFieldsValid } from "../../utils/functions";

function ResetPassword() {
  const { handlePasswordReset, loading = {}, authError = {} } = useAuth() || {};
  const navigate = useNavigate();
  const emailRef = useRef();
  const [clientError, setClientError] = useState(null);
  const [formData, setFormData] = useState({
    email: "",
  });
  const [isValid, setIsValid] = useState({
    email: false,
  });

  const handleStateChange = (field, value, stateFn) => {
    stateFn((prev) => ({ ...prev, [field]: value }));
    if (clientError !== null) {
      setClientError(null);
    }
  };

  const handlePrevalidation = async () => {
    try {
      if (emailRef.current?.triggerValidation) {
        const email = await emailRef.current.triggerValidation();
        return { email };
      }
    } catch (err) {
      return { email: false };
    }
    return { email: false };
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setClientError(null);

    const prevalidation = await handlePrevalidation();

    if (!allFieldsValid(prevalidation) || !allFieldsValid(isValid)) {
      setClientError(
        "Some Fields Seem To Be Invalid Please Go Through the form and try again",
      );
      return;
    }

    if (typeof handlePasswordReset === "function") {
      try {
        await handlePasswordReset(navigate, formData?.email?.trim());
      } catch (err) {
        setClientError(
          "An unexpected error occurred while resetting password.",
        );
      }
    }
  };

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

        <div className="d-flex flex-column justify-content-center flex-grow-1">
          <form onSubmit={handleSubmit} className="w-100">
            <div
              className="d-flex flex-column gap-1"
              style={{ marginBottom: "2rem" }}
            >
              <span className="fw-semibold font-size-md">Reset Password</span>
              <span className="fw-light text-iron-400">
                Enter your email address to receive a verification code
              </span>
            </div>

            {(clientError || authError?.passwordResetError) && (
              <div className="bg-red-100 p-2 rounded-3 text-red-700 mb-4">
                <p className="m-0">
                  {clientError || authError?.passwordResetError}
                </p>
              </div>
            )}

            <div className="mb-4">
              <label htmlFor="email" className="font-size-sm d-block mb-1">
                E-mail
              </label>
              <TextInput
                type="email"
                placeholder="e.g example@mail.com"
                value={formData?.email || ""}
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
              className="w-100 mt-2 border-none fw-light text-white rounded-3 p-2 primary-background font-size-sm"
              type="submit"
              disabled={Boolean(loading?.passwordReset)}
            >
              {loading?.passwordReset ? <SingleSpinner /> : "Send Code"}
            </button>
          </form>
        </div>

        <div className="pt-3 border-top">
          <button
            type="button"
            onClick={() => navigate("/login-school-admin")}
            className="d-flex flex-row gap-2 align-items-center pointer-cursor border-none bg-none text-iron-500 fw-normal p-0"
            style={{ background: "transparent" }}
          >
            <Icon
              icon="material-symbols:arrow-back-rounded"
              width="18"
              height="18"
            />
            <span>Back To Login</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
