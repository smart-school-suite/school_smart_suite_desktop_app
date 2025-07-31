import { useSelector } from "react-redux";
import { useAuth } from "../../context/authContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { SingleSpinner } from "../../components/Spinners/Spinners";
function ChangePassword() {
  const passwordResetToken = useSelector(
    (state) => state.auth.passwordResetToken
  );
  const [passwordCredentails, setPasswordCredentails] = useState({
    new_password: "",
    new_password_confirmation: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswordCredentails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const { handleChangePassword, authError, loading } = useAuth();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    handleChangePassword(navigate, passwordCredentails, passwordResetToken);
  };
  return (
    <>
      <div className="login-container px-4">
        <div className=" login-container-logo-box ps-5">
          <img src="./logo/blue_logo.png" className="login-logo" />
        </div>

        <div className="login-container-form" style={{ height: "70%" }}>
          <div className="login-container-form-box-two">
            <img src="./svg/change-password.svg" alt="" />
          </div>
          <div className="login-container-form-box-one">
            <h1 className="fw-bold my-4">Change Password</h1>
            <form onSubmit={handleSubmit}>
              {authError.changePassword && (
                <div className="alert alert-danger">
                  {authError.changePassword}
                </div>
              )}
              <div className="mb-4">
                <span>New Password</span>
                <input
                  type="password"
                  value={passwordCredentails.new_password}
                  name="new_password"
                  onChange={handleChange}
                  placeholder="Enter Password"
                  className="form-control"
                />
              </div>
              <div className="mb-4">
                <span>Password Confirmation</span>
                <input
                  type="password"
                  name="new_password_confirmation"
                  className="form-control"
                  value={passwordCredentails.new_password_confirmation}
                  onChange={handleChange}
                  placeholder="Enter Password Confirmation"
                />
              </div>
              <button
                className="w-100 mt-2 border-none rounded-3 p-2 primary-background text-white"
                type="submit"
                disabled={loading.changePassword}
              >
                {loading.changePassword ? <SingleSpinner /> : "Change Password"}
              </button>
            </form>
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
    </>
  );
}
export default ChangePassword;
