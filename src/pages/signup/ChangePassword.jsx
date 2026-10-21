import { ArrowLeft } from "lucide-react";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { passwordSchema } from "../../ComponentConfig/YupValidationSchema";
import { TextInput } from "../../components/FormComponents/InputComponents";
import AuthHero from "../../components/Hero/AuthHero";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import { useAuth } from "../../context/authContext";
import { allFieldsValid } from "../../utils/functions";

function ChangePassword() {
  const { handleChangePassword, loading = {}, authError = {} } = useAuth() || {};
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();
  const navigate = useNavigate();

  const passwordResetToken = useSelector(
    (state) => state?.auth?.passwordResetToken
  );

  const [clientError, setClientError] = useState(null);
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
    if (clientError !== null) {
      setClientError(null);
    }
  };

  const handlePrevalidation = async () => {
    const password = await passwordRef.current?.triggerValidation();
    const passwordConfirmation =
      await passwordConfirmationRef.current?.triggerValidation();
    return {
      password,
      passwordConfirmation,
    };
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setClientError(null);

    const prevalidation = await handlePrevalidation();
    if (!allFieldsValid(prevalidation) || !allFieldsValid(isValid)) {
      setClientError(
        "Some fields seem to be invalid. Please check the form and try again."
      );
      return;
    }

    if (formData.new_password !== formData.new_password_confirmation) {
      setClientError("Passwords do not match. Please try again.");
      return;
    }

    if (typeof handleChangePassword === "function") {
      try {
        await handleChangePassword(navigate, formData, passwordResetToken);
      } catch (err) {
        setClientError("An unexpected error occurred while resetting your password.");
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

        <div className="d-flex flex-column justify-content-center align-items-center flex-grow-1">
          <form className="w-100" onSubmit={handleSubmit}>
            <div
              className="d-flex flex-column gap-1"
              style={{ marginBottom: "2rem" }}
            >
              <span className="fw-semibold font-size-md">
                Reset Your Password
              </span>
              <span className="fw-light text-iron-400">
                Create a new secure password for your account
              </span>
            </div>

            {(clientError || authError?.changePassword) && (
              <div className="bg-red-100 p-2 rounded-3 text-red-700 mb-4">
                <p className="m-0">
                  {clientError || authError?.changePassword}
                </p>
              </div>
            )}

            <div className="d-flex flex-column gap-3">
              <div>
                <label htmlFor="new_password" className="font-size-sm mb-1 d-block fw-semibold">
                  New Password
                </label>
                <TextInput
                  type="password"
                  placeholder="Enter new password"
                  value={formData.new_password}
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

              <div>
                <label
                  htmlFor="new_password_confirmation"
                  className="font-size-sm mb-1 d-block fw-semibold"
                >
                  Confirm New Password
                </label>
                <TextInput
                  type="password"
                  placeholder="Confirm new password"
                  value={formData.new_password_confirmation}
                  onChange={(value) =>
                    handleStateChange(
                      "new_password_confirmation",
                      value,
                      setFormData
                    )
                  }
                  onValidationChange={(value) =>
                    handleStateChange(
                      "new_password_confirmation",
                      value,
                      setIsValid
                    )
                  }
                  validationSchema={passwordSchema({
                    min: 8,
                  })}
                  ref={passwordConfirmationRef}
                />
              </div>
            </div>

            <button
              className="w-100 mt-4 border-none rounded-3 primary-background font-size-sm text-white"
              style={{ padding: "0.75rem" }}
              type="submit"
              disabled={Boolean(loading?.changePassword)}
            >
              {loading?.changePassword ? <SingleSpinner /> : "Change Password"}
            </button>
          </form>
        </div>

        <div className="d-flex flex-row align-items-center justify-content-start pt-3 border-top">
          <button
            type="button"
            className="d-flex flex-row align-items-center border-none bg-none gap-2 text-iron-600 p-0"
            style={{ background: "transparent", cursor: "pointer" }}
            onClick={() => navigate("/login-school-admin")}
          >
            <ArrowLeft size={16} />
            <span> Back To Login</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChangePassword;