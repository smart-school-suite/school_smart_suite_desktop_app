import { useState } from "react";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Icon } from "@iconify/react";
import OtpInput from "../../components/FormComponents/StepInput";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import toast from "react-hot-toast";
import ToastWarning from "../../components/Toast/ToastWarning";
import AuthHero from "../../components/Hero/AuthHero";
import { ArrowLeft } from "lucide-react";
function ValidatePasswordResetOtp() {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const resetPasswordOtpToken = useSelector(
    (state) => state.auth.passwordResetOtpToken,
  );
  const darkMode = useSelector((state) => state.theme.darkMode);
  const { handleValidatePasswordResetOtp, loading } = useAuth();

  const handleOtpComplete = (otpValue) => {
    setOtp(otpValue);
    if (otpValue.length === 6 && !loading.otp) {
      handleSubmit(null, otpValue);
    }
  };

  const handleSubmit = async (e, submittedOtp = otp) => {
    e?.preventDefault();

    if (submittedOtp.length !== 6) {
      toast.custom(
        <ToastWarning
          title={"Invalid OTP"}
          description={"OTP must be atlease 6 Numbers"}
        />,
      );
      return;
    }
    await handleValidatePasswordResetOtp(
      navigate,
      submittedOtp,
      resetPasswordOtpToken,
    );
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
                  Two Factor Verification
                </span>
                <span className="fw-light text-iron-400">
                  Sign in to your smart school suite workspace
                </span>
              </div>
              <div className="d-flex flex-column gap-3">
                <span>Enter OTP Code</span>
                <OtpInput length={6} onComplete={handleOtpComplete} />
              </div>
              <button
                className="w-100 mt-4 border-none rounded-3 p-2 primary-background text-white font-size-sm"
                type="submit"
                onClick={handleSubmit}
                disabled={loading.otp || otp.length !== 6}
              >
                {loading.otp ? <SingleSpinner /> : "Submit"}
              </button>
            </div>
          </div>
          <div className="mt-auto">
            <button
              className="d-flex flex-row align-items-center border-none border-bottom bg-none gap-2 text-iron-600"
              onClick={() => navigate("/reset-password")}
            >
              <ArrowLeft size={16} />
              <span> Back to Password Reset</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ValidatePasswordResetOtp;
