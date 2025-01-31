import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
function Hero() {
  const navigate = useNavigate();
  return (
    <>
      <div className="w-100 height-100">
        <div className="container h-100 flex-column d-flex justify-content-center align-items-center">
          <div className="w-75">
            <h1
              style={{
                fontSize: "6rem",
                fontWeight: "bold",
                textAlign: "center",
              }}
              className="color-primary"
            >
              {" "}
              <Icon icon="mingcute:book-4-fill" /> EduPulse
            </h1>
            <h4 style={{ fontSize: "3rem", textAlign: "center" }}
             onClick={() => {
              navigate("/")
             }}
            >
              Streamline Your School’s Management with EduPulse
            </h4>
            <p>
              Manage students, teachers, and parents seamlessly while optimizing
              school operations—so you can dedicate more time to education.
            </p>
            <div className="d-flex flex-row align-items-center gap-2 justify-content-center mt-3">
              <button 
               className="w-25 border-none rounded-3 p-3 primary-background text-white"
               onClick={() => {
                 navigate("/register-school")
               }}
              >
                Get Started
              </button>
              <button className="w-25 border-none rounded-3 p-3 primary-background-100 color-primary"
               onClick={() => {
                 navigate("/login-school-admin")
               }}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Hero;
