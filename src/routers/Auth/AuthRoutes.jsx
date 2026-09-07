import ResetPassword from "../../pages/signup/ResetPassword";
import ValidatePasswordResetOtp from "../../pages/signup/ValidatePasswordResetOtp";
import ChangePassword from "../../pages/signup/ChangePassword";
import RegisterSchool from "../../pages/signup/registerSchool";
import RegisterSchoolAdmin from "../../pages/signup/registerSchoolAdmin";
import RegisterSchoolBranch from "../../pages/signup/registerSchoolBranch";
import Hero from "../../pages/signup/Hero";
import SubcriptionPlan from "../../pages/signup/subcriptionPlans";
import TwoStepVerification from "../../pages/signup/TwoStepVerification";
import LoginSchoolAdmin from "../../pages/signup/LoginSchoolAdmin";
import { Route } from "react-router-dom";
const AuthRoutes = [
   <Route key={"resetPassword"} path="/reset-password" element={<ResetPassword />}></Route>,
   <Route key={"validatedPasswordResetOtp"} path="/validate-otp" element={<ValidatePasswordResetOtp />}></Route>,
   <Route key={"changePassword"} path="/change-password" element={<ChangePassword />}></Route>,
   <Route key={"registerSchool"} path="/register-school" element={<RegisterSchool />}></Route>,
   <Route key={"hero"} path="/hero" element={<Hero />}></Route>,
   <Route key={"registerSchoolAdmin"} path="/register/school-admin" element={<RegisterSchoolAdmin />}></Route>,
   <Route key={"registerSchoolBranch"} path="/create-schoolbranch" element={<RegisterSchoolBranch />}></Route>,
   <Route key={"subscriptionPlans"} path="/subcription/plan" element={<SubcriptionPlan />}></Route>,
   <Route key={"loginSchoolAdmin"} path="/login-school-admin" element={<LoginSchoolAdmin />}></Route>,
   <Route key={"twoStepVerification"} path="/verify-otp" element={<TwoStepVerification />}></Route>
];
export default AuthRoutes;

