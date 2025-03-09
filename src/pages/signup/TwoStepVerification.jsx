import { useState } from "react";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
function TwoStepVerification(){
  const [ otp, setOtp ] = useState("");
  const { handleTwoStepVerification, loading, authError } = useAuth();
   const otpTokenHeader = useSelector((state) => state.auth.otpTokenHeader);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleTwoStepVerification(otp, navigate, otpTokenHeader);
  }
     return(
        <>
                  <div className="container w-100 height-100 d-flex flex-column justify-content-center">
      <div className="d-flex flex-row align-items-center justify-content-around w-100">
        <div className="w-50 bg-white rounded-4 px-2 border shadow-sm py-4">
          <form onSubmit={handleSubmit}>
            <h4 className="text-center">Login Admin</h4>
            {
                 authError.otp && <div className="alert alert-danger">
                    {
                        authError.otp
                    }
                 </div>
             }
            <div className="mb-4">
              <span>One Time Code</span>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="enter six digit code"
                className="form-control"
              />
            </div>
        
            <button
              className="w-100 mt-2 border-none rounded-3 p-2 primary-background text-white"
              type="submit"
              disabled={loading.otp}
            >
               {loading.otp ? 'Submitting...' : 'Submit'}
            </button>
          </form>
        </div>
      </div>
    </div>
        </>
     )
}

export default TwoStepVerification;