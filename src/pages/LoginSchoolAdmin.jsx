import { EmailInput } from "../components/formComponents"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
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
          <div className="container w-100 height-100 d-flex flex-column justify-content-center">
      <div className="d-flex flex-row align-items-center justify-content-around w-100">
        <div className="w-50 bg-white rounded-4 px-2 border shadow-sm py-4">
          <form onSubmit={handleSubmit}>
            <h4 className="text-center">Login Admin</h4>
             {
                 authError.login && <div className="alert alert-danger">
                    {
                        authError.login
                    }
                 </div>
             }
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
        
            <button
              className="w-100 mt-2 border-none rounded-3 p-2 primary-background text-white"
              type="submit"
              disabled={loading.login} 
            >
              {loading.login ? "Logging in..." : "Login"} 
            </button>
          </form>
        </div>
      </div>
    </div>
    </>
  );
}

export default LoginSchoolAdmin;
