import { useState } from "react";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
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
      <div className="container w-100 height-100 d-flex flex-column justify-content-center">
        <div className="d-flex flex-row align-items-center justify-content-around w-100">
          <div className="w-50 bg-white rounded-4 px-2 border shadow-sm py-4">
            <form onSubmit={handleSubmit}>
              <h4 className="text-center">Reset Password</h4>
              {authError.passwordResetError && (
                <div className="alert alert-danger">
                  {authError.passwordResetError}
                </div>
              )}
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
                {loading.passwordReset ? "Sending... Code" : "Send Code"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
export default ResetPassword;
