import { useState } from "react";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import { Icon } from "@iconify/react";
function ResetPassword() {
  const [email, setEmail] = useState("");
  const { handlePasswordReset, loading, authError } = useAuth();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    await handlePasswordReset(navigate, email);
  };
  return (
    <>
      <div className="login-container px-4">
        <div className=" login-container-logo-box ps-5">
          <img src="./logo/blue_logo.png" className="login-logo" />
        </div>

        <div className="login-container-form" style={{ height: "70%" }}>
          <div className="login-container-form-box-two">
            <img src="./svg/password-forgotten.svg" alt="" />
          </div>
          <div className="login-container-form-box-one">
            <h1 className="fw-bold my-4">Reset Password</h1>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <span>Email</span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@gmail.com"
                  className="form-control"
                />
              </div>
             <button
                className="w-100 mt-2 border-none rounded-3 p-2 primary-background text-white"
                type="submit"
                disabled={loading.passwordReset}
              >
                {loading.passwordReset ? <SingleSpinner /> : "Send Code"}
              </button>
            </form>
            <div
              className="pointer-cursor font-size-sm mt-4"
              onClick={() => {
                navigate("/reset-password");
              }}
            >
            </div>
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
    </>
  );
}
export default ResetPassword;
