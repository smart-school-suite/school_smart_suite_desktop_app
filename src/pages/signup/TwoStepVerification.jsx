import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import OtpInput from "../../components/FormComponents/StepInput";
import AuthHero from "../../components/Hero/AuthHero";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import { useAuth } from "../../context/authContext";
import { useOtpTimer } from "../../hooks/auth/useOtpTimer";

function TwoStepVerification() {
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginContext = useSelector((state) => state?.auth?.loginContext || {});
  const { 
    secondsLeft = 0, 
    formattedTime = "00:00", 
    isCoolingDown = false 
  } = useOtpTimer(loginContext) || {};

  const { 
    handleTwoStepVerification, 
    handleResendOtp, 
    loading = {}, 
    authError = {} 
  } = useAuth() || {};

  const displayTime = secondsLeft > 60 ? formattedTime : `${secondsLeft}s`;
  const [clientError, setClientError] = useState(null);

  const handleOtpComplete = (otpValue) => {
    const cleanOtp = (otpValue || "").trim();
    setOtp(cleanOtp);
    if (cleanOtp.length === 6 && !loading?.otp && !loading?.resendLoginOtp) {
      handleSubmit(null, cleanOtp);
    }
  };

  const handleSubmit = async (e, submittedOtp = otp) => {
    e?.preventDefault();
    setClientError(null);
    const codeToSubmit = (submittedOtp || "").trim();

    if (codeToSubmit.length !== 6) {
      setClientError("Some Fields Seem To Be Invalid. Please go through the form and try again.");
      return;
    }

    if (typeof handleTwoStepVerification === "function") {
      try {
        await handleTwoStepVerification(codeToSubmit, navigate);
      } catch (err) {
        setClientError("An unexpected error occurred during verification.");
      }
    }
  };

  const handleRequestOtp = async () => {
    if (loading?.resendLoginOtp || loading?.otp || isCoolingDown) return;
    if (typeof handleResendOtp === "function") {
      try {
        await handleResendOtp(dispatch);
      } catch (err) {
        setClientError("Failed to resend OTP. Please try again.");
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
                Two Factor Verification
              </span>
              <div className="d-flex flex-row gap-2">
                <span className="fw-light text-iron-400">
                  Enter the code we've sent to your email
                </span>
                <span className="fw-medium text-primary-500 text-capitalize">
                  {loginContext?.email || "your email"}
                </span>
              </div>
            </div>

            {(clientError || authError?.otp || authError?.resendLoginOtp) && (
              <div className="bg-red-100 p-2 rounded-3 text-red-700 mb-4">
                <p className="m-0">
                  {clientError || authError?.otp || authError?.resendLoginOtp}
                </p>
              </div>
            )}

            <div className="d-flex flex-column gap-2">
              <span className="fw-semibold">Enter OTP Code</span>
              <OtpInput length={6} onComplete={handleOtpComplete} />
            </div>

            <button
              className="w-100 mt-4 border-none rounded-3 primary-background font-size-sm text-white"
              style={{ padding: "0.75rem" }}
              type="submit"
              disabled={
                Boolean(loading?.otp) ||
                otp.length !== 6 ||
                Boolean(loading?.resendLoginOtp)
              }
            >
              {loading?.otp ? <SingleSpinner /> : "Submit"}
            </button>

            <div className="d-flex flex-row justify-content-center my-4">
              {isCoolingDown ? (
                <div className="d-flex flex-row align-items-center gap-2 cursor-wait">
                  <span>Didn't receive the code? Resend in</span>
                  <span className="fw-medium text-primary-500 text-capitalize tabular-nums">
                    {displayTime}
                  </span>
                </div>
              ) : (
                <div
                  className={`d-flex flex-row align-items-center gap-2 ${
                    loading?.resendLoginOtp || loading?.otp
                      ? "text-iron-200 cursor-wait"
                      : "cursor-pointer"
                  }`}
                  onClick={handleRequestOtp}
                >
                  <span>Didn't receive the code? </span>
                  <span
                    className={`fw-medium text-capitalize ${
                      loading?.resendLoginOtp || loading?.otp
                        ? "text-iron-200"
                        : "text-primary-500"
                    }`}
                  >
                    Resend
                  </span>
                </div>
              )}
            </div>
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

export default TwoStepVerification;