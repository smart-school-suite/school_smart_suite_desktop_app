import { useState, useEffect } from "react";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Icon } from "@iconify/react";
import OtpInput from "../../components/FormComponents/StepInput";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import toast from "react-hot-toast";
import ToastWarning from "../../components/Toast/ToastWarning";

function ValidatePasswordResetOtp() {
  const [otp, setOtp] = useState(""); 
  const navigate = useNavigate();
  const resetPasswordOtpToken = useSelector((state) => state.auth.passwordResetOtpToken);
  const { handleValidatePasswordResetOtp, authError, loading } = useAuth();

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
        />
      )
      return;
    }
    await handleValidatePasswordResetOtp(navigate, submittedOtp, resetPasswordOtpToken);
  };

  return (
    <>
      <div className="login-container px-4">
        <div className="login-container-logo-box ps-5">
          <img src="./logo/blue_logo.png" className="login-logo" alt="Logo" />
        </div>
        <div className="login-container-form" style={{ height: "70%" }}>
          <div className="login-container-form-box-two">
            <img src="./svg/two-factor-auth.svg" alt="Two Factor Authentication Illustration" />
          </div>
          <div className="login-container-form-box-one">
            <h1 className="fw-bold my-4">Verify OTP</h1>
            <div>
              <span>Enter OTP Code</span>
              <OtpInput
                length={6}
                onComplete={handleOtpComplete}
              />
            </div>

            <button
              className="w-100 mt-4 border-none rounded-3 p-2 primary-background text-white"
              type="submit"
              onClick={handleSubmit}
              disabled={loading.otp || otp.length !== 6}
            >
              {loading.otp ? <SingleSpinner /> : "Submit"}
            </button>
          </div>
        </div>
        <div className="login-container-logo-box mt-auto ps-5">
          <div
            className="d-flex flex-row gap-2 align-items-center pointer-cursor color-primary"
            onClick={() => {
              navigate("/reset-password");
            }}
          >
            <span>
              <Icon
                icon="material-symbols:arrow-back-rounded"
                width="18"
                height="18"
              />
            </span>
            <span className="font-size-sm fw-semibold">Back to Password Reset</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default ValidatePasswordResetOtp;