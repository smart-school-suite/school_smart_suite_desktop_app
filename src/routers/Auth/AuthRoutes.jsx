import ResetPassword from "../../pages/Signup/ResetPassword";
import ValidatePasswordResetOtp from "../../pages/Signup/ValidatePasswordResetOtp";
import ChangePassword from "../../pages/Signup/ChangePassword";
import RegisterSchool from "../../pages/Signup/RegisterSchool";
import RegisterSchoolAdmin from "../../pages/Signup/RegisterSchoolAdmin";
import RegisterSchoolBranch from "../../pages/Signup/RegisterSchoolBranch";
// import Hero from "../../pages/Signup/Hero";
import SubcriptionPlan from "../../pages/Signup/SubcriptionPlans";
import TwoStepVerification from "../../pages/Signup/TwoStepVerification";
import LoginSchoolAdmin from "../../pages/Signup/LoginSchoolAdmin";
import { Route } from "react-router-dom";
const AuthRoutes = [
   <Route key={"resetPassword"} path="/reset-password" element={<ResetPassword />}></Route>,
   <Route key={"validatedPasswordResetOtp"} path="/validate-otp" element={<ValidatePasswordResetOtp />}></Route>,
   <Route key={"changePassword"} path="/change-password" element={<ChangePassword />}></Route>,
   <Route key={"registerSchool"} path="/register-school" element={<RegisterSchool />}></Route>,
   // <Route key={"hero"} path="/hero" element={<Hero />}></Route>,
   <Route key={"registerSchoolAdmin"} path="/register/school-admin" element={<RegisterSchoolAdmin />}></Route>,
   <Route key={"registerSchoolBranch"} path="/create-schoolbranch" element={<RegisterSchoolBranch />}></Route>,
   <Route key={"subscriptionPlans"} path="/subcription/plan" element={<SubcriptionPlan />}></Route>,
   <Route key={"loginSchoolAdmin"} path="/login-school-admin" element={<LoginSchoolAdmin />}></Route>,
   <Route key={"twoStepVerification"} path="/verify-otp" element={<TwoStepVerification />}></Route>
];
export default AuthRoutes;

