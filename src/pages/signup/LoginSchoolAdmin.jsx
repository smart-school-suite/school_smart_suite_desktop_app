import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import { Icon } from "@iconify/react";
function LoginSchoolAdmin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { handleLogin, loading, authError } = useAuth();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleLogin(email, password, navigate);
  };

  return (
    <>
     <div className="login-container px-4">
        <div className=" login-container-logo-box ps-5">
           <img src="./logo/blue_logo.png"  className="login-logo" />
        </div>

        <div className="login-container-form" style={{ height:"70%" }}>
           <div className="login-container-form-box-two">
                <img src="./svg/login.svg" alt=""/>
          </div>
          <div className="login-container-form-box-one">
            <h1 className="fw-bold my-4">Login School Admin</h1>
          <form onSubmit={handleSubmit}>
              {authError.login && (
                <div className="alert alert-danger">{authError.login}</div>
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

              <div className="mb-4">
                <span>Password</span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter Your Password"
                  className="form-control"
                />
              </div>
              <div className="my-1 d-flex justify-content-end"></div>
              <button
                className="w-100 mt-2 border-none rounded-3 p-2 primary-background text-white"
                type="submit"
                disabled={loading.login}
              >
                {loading.login ? <SingleSpinner /> : "Login"}
              </button>
            </form>
            <div className="pointer-cursor font-size-sm mt-4"
              onClick={() => {
                 navigate("/reset-password")
              }}
            >
              <span>Password Forgotten ? <span className="color-primary">Reset Password</span></span>
            </div>
          </div>
         
        </div>
        <div className=" login-container-logo-box mt-auto ps-5">
           <div className="d-flex flex-row gap-2 align-items-center pointer-cursor"
             onClick={() => {
               navigate('/hero')
             }}
           >
            <span><Icon icon="material-symbols:arrow-back-rounded" width="24" height="24" /></span>
            <span className="font-size-sm fw-semibold">Back</span>
           </div>
        </div>
     </div>
    </>
  );
}

export default LoginSchoolAdmin;
