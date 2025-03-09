import { useSelector } from "react-redux";
import { useAuth } from "../../context/authContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ChangePassword() {
  const passwordResetToken = useSelector((state) => state.auth.passwordResetToken);
  const [passwordCredentails, setPasswordCredentails] = useState({
    new_password:"",
    new_password_confirmation:"",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswordCredentails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const { handleChangePassword, authError, loading  } = useAuth();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
      e.preventDefault();
      handleChangePassword(navigate, passwordCredentails,  passwordResetToken);     
  }
  return (
    <>
      <div className="container w-100 height-100 d-flex flex-column justify-content-center">
        <div className="d-flex flex-row align-items-center justify-content-around w-100">
          <div className="w-50 bg-white rounded-4 px-2 border shadow-sm py-4">
            <form onSubmit={handleSubmit}>
              <h4 className="text-center">Change Password</h4>
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
                {loading.changePassword ? "Submitting..." : "Submit"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
export default ChangePassword;
