import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { Suspense } from "react";
import Layout from "../layouts/layout";
import Pageloaderspinner from "../components/Spinners";
const SchoolTimeTable = React.lazy(() => import("../pages/schoolTimeTable"));
const Dashboard = React.lazy(() => import("../pages/Dashboard"));
const SchoolAdmin = React.lazy(() => import("../pages/schoolAdmin"));
const Exams = React.lazy(() => import("../pages/Exams"));
const Students = React.lazy(() => import("../pages/Students"));
const Examresits = React.lazy(() => import("../pages/Examsresit"));
const Scores = React.lazy(() => import("../pages/Scores"));
const Timetable = React.lazy(() => import("../pages/Timetable"));
const Schoolexpenses = React.lazy(() => import("../pages/Schoolexpenses"));
const Transferredstudents = React.lazy(() =>
  import("../pages/Transferredstudents")
);
const Transferrequest = React.lazy(() => import("../pages/Transferrequest"));
const Events = React.lazy(() => import("../pages/Events"));
const Messages = React.lazy(() => import("../pages/Messages"));
const Annoucements = React.lazy(() => import("../pages/Annoucements"));
const Customersupport = React.lazy(() => import("../pages/Customersupport"));
const Departments = React.lazy(() => import("../pages/Departments"));
const Specialties = React.lazy(() => import("../pages/Specialties"));
const Teachers = React.lazy(() => import("../pages/Teachers"));
const Courses = React.lazy(() => import("../pages/Courses"));
const Account = React.lazy(() => import("../pages/settings/Account"));
const Display = React.lazy(() => import("../pages/settings/Display"));
const Generalsettings = React.lazy(() =>
  import("../pages/settings/Generalsettings")
);
const New = React.lazy(() => import("../pages/settings/New"));
const Profile = React.lazy(() => import("../pages/settings/Profile"));
const Security = React.lazy(() => import("../pages/settings/Security"));
const Help = React.lazy(() => import("../pages/settings/Help"));
const Inbox = React.lazy(() => import("../pages/email/Inbox"));
const Junk = React.lazy(() => import("../pages/email/Junk"));
const Archieve = React.lazy(() => import("../pages/email/Archieve"));
const Draft = React.lazy(() => import("../pages/email/Draft"));
const Forums = React.lazy(() => import("../pages/email/Forums"));
const Promotion = React.lazy(() => import("../pages/email/Promotion"));
const Sent = React.lazy(() => import("../pages/email/Sent"));
const Shopping = React.lazy(() => import("../pages/email/Shopping"));
const Socials = React.lazy(() => import("../pages/email/Socials"));
const Trash = React.lazy(() => import("../pages/email/Trash"));
const Updates = React.lazy(() => import("../pages/email/Updates"));
const Composeemail = React.lazy(() => import("../pages/email/Composeemail"));
const Createschooladmin = React.lazy(() =>
  import("../pages/forms/Createschooladmin")
);
const Createstudent = React.lazy(() => import("../pages/forms/Createstudent"));
const Createtimetable = React.lazy(() =>
  import("../pages/forms/Createtimetable")
);
const Createteacher = React.lazy(() => import("../pages/forms/Createteacher"));
const Feepayment = React.lazy(() => import("../pages/Feepayment"));
const Gradesconfiguration = React.lazy(() =>
  import("../pages/Gradesconfiguration")
);
const Parents = React.lazy(() => import("../pages/Parents"));
const Createstudentscores = React.lazy(() =>
  import("../pages/forms/Createstudentscores")
);
const AcademicAnalysis = React.lazy(() =>
  import("../pages/statistics and analysis/Academic/AcademicAnalysis")
);
const OperationalAnalysis = React.lazy(() =>
  import("../pages/statistics and analysis/Operational/OperationalAnalysis")
);
const CoursesAcademicAnalysis = React.lazy(() =>
  import("../pages/statistics and analysis/Academic/coursesAcademicAnalysis")
);
const DepartmentAcademicAnalysis = React.lazy(() =>
  import("../pages/statistics and analysis/Academic/departmentAcademicAnalysis")
);
const ExamAcademicAnalysis = React.lazy(() =>
  import("../pages/statistics and analysis/Academic/examAcademicAnalysis")
);
const SpecialtiesAcademicAnalysis = React.lazy(() =>
  import("../pages/statistics and analysis/Academic/specialtyAcademicAnalysis")
);
const StudentAcademicAnalysis = React.lazy(() =>
  import("../pages/statistics and analysis/Academic/studentAcademicAnalysis")
);
const TeachersAcademicAnalysis = React.lazy(() =>
  import("../pages/statistics and analysis/Academic/teachersAcademicAnalysis")
);
const CoursesFinancialAnalysis = React.lazy(() =>
  import("../pages/statistics and analysis/Financial/coursesFinancialAnalysis")
);
const DepartmentFinancialAnalysis = React.lazy(() =>
  import(
    "../pages/statistics and analysis/Financial/departmentFinancialAnalysis"
  )
);
const FeePaymentFinancialAnalysis = React.lazy(() =>
  import(
    "../pages/statistics and analysis/Financial/feePaymentFinancialAnalysis"
  )
);
const SchoolExpensesFinancialAnalysis = React.lazy(() =>
  import(
    "../pages/statistics and analysis/Financial/schoolExpensesFinancialAnalysis"
  )
);
const SpecialtiesFinancialAnalysis = React.lazy(() =>
  import(
    "../pages/statistics and analysis/Financial/specialtyFinancialAnalysis"
  )
);
const StudentFinancialAnalysis = React.lazy(() =>
  import("../pages/statistics and analysis/Financial/studentFinancialAnalysis")
);
const TeacherFinancialAnalysis = React.lazy(() =>
  import("../pages/statistics and analysis/Financial/teacherFinancialAnalysis")
);
const StudentBatches = React.lazy(() => import("../pages/studentBatches"));
const ExamTimeTable = React.lazy(() => import("../pages/examTimeTable"));
const ResitPayments = React.lazy(() => import("../pages/resitPayments"));
const Createparent = React.lazy(() => import("../pages/forms/Createparent"));
import LoginSchoolAdmin from "../pages/signup/LoginSchoolAdmin";
import TwoStepVerification from "../pages/twoStepVerification";
import RegisterSchool from "../pages/signup/registerSchool";
import RegisterSchoolAdmin from "../pages/signup/registerSchoolAdmin";
import RegisterSchoolBranch from "../pages/signup/registerSchoolBranch";
import SubcriptionPlan from "../pages/signup/subcriptionPlans";
import Hero from "../pages/signup/Hero";
import  {ProtectedRoute, ProtectedLoginRoute } from "../components/protectedRoutes";
function Links() {
  return (
    <BrowserRouter>
      {/* auth routes*/}
      <Routes>
        <Route
          path="/register-school"
          element={
             <ProtectedLoginRoute>
              <RegisterSchool />
             </ProtectedLoginRoute>
          }
        >
        </Route>
        <Route
         path="/hero"
         element={
            <ProtectedLoginRoute>
              <Hero />
            </ProtectedLoginRoute>
         }
        ></Route>
        <Route
         path="/register/school-admin"
         element={
           <ProtectedLoginRoute>
            <RegisterSchoolAdmin />
           </ProtectedLoginRoute>
         }
        >
        </Route>
        <Route 
         path="/register/school-branch"
         element={
           <ProtectedLoginRoute>
            <RegisterSchoolBranch />
           </ProtectedLoginRoute>
         }
        />
        <Route
         path="/subcription/plan"
         element={
           <ProtectedLoginRoute>
            <SubcriptionPlan />
           </ProtectedLoginRoute>
         }
        >
        </Route>
      <Route 
       path="/create-schoolbranch"
       element={
         <ProtectedLoginRoute>
          <RegisterSchoolBranch/>
         </ProtectedLoginRoute>
       }
      ></Route>
      <Route
      path="/login-school-admin"
       element={
         <ProtectedLoginRoute>
          <LoginSchoolAdmin />
         </ProtectedLoginRoute>
       }
      >
      </Route>
      <Route
       path="/verify-otp"
       element={
         <ProtectedLoginRoute>
          <TwoStepVerification />
         </ProtectedLoginRoute>
       }
      >

      </Route>
        <Route element={<Layout />}>
          {/*stats and analysis routes starts*/}
          <Route
            path="/academic-analysis"
            element={
              <ProtectedRoute>
                <Suspense fallback={<Pageloaderspinner />}>
                <OperationalAnalysis />
              </Suspense>
              </ProtectedRoute>
            }
          />
          <Route
            path="/operational-analysis"
            element={
              <ProtectedRoute>
                <Suspense fallback={<Pageloaderspinner />}>
                <OperationalAnalysis />
              </Suspense>
              </ProtectedRoute>
            }
          />
          <Route
            path="/courses/academic-analysis"
            element={
              <ProtectedRoute>
                <Suspense fallback={<Pageloaderspinner />}>
                <CoursesAcademicAnalysis />
              </Suspense>
              </ProtectedRoute>
            }
          />
          <Route
            path="/department/academic-analysis"
            element={
              <ProtectedRoute>
                <Suspense fallback={<Pageloaderspinner />}>
                <DepartmentAcademicAnalysis />
              </Suspense>
              </ProtectedRoute>
            }
          />
          <Route
            path="/exam/academic-analysis"
            element={
              <ProtectedRoute>
                <Suspense fallback={<Pageloaderspinner />}>
                <ExamAcademicAnalysis />
              </Suspense>
              </ProtectedRoute>
            }
          />
          <Route
            path="/specailty/academic-analysis"
            element={
              <ProtectedRoute>
                <Suspense fallback={<Pageloaderspinner />}>
                <SpecialtiesAcademicAnalysis />
              </Suspense>
              </ProtectedRoute>
            }
          />
          <Route
            path="/student/academic-analysis"
            element={
              <ProtectedRoute>
                <Suspense fallback={<Pageloaderspinner />}>
                <StudentAcademicAnalysis />
              </Suspense>
              </ProtectedRoute>
            }
          />
          <Route
            path="/teacher/academic-analysis"
            element={
              <ProtectedRoute>
                <Suspense fallback={<Pageloaderspinner />}>
                <TeachersAcademicAnalysis />
              </Suspense>
              </ProtectedRoute>
            }
          />
          <Route
            path="/teacher/financial-analysis"
            element={
              <ProtectedRoute>
                <Suspense fallback={<Pageloaderspinner />}>
                <TeacherFinancialAnalysis />
              </Suspense>
              </ProtectedRoute>
            }
          />
          <Route
            path="/student/financial-analysis"
            element={
              <ProtectedRoute>
                <Suspense fallback={<Pageloaderspinner />}>
                <StudentFinancialAnalysis />
              </Suspense>
              </ProtectedRoute>
            }
          />
          <Route
            path="/specailty/financial-analysis"
            element={
              <ProtectedRoute>
                <Suspense fallback={<Pageloaderspinner />}>
                <SpecialtiesFinancialAnalysis />
              </Suspense>
              </ProtectedRoute>
            }
          />
          <Route
            path="/school-expenses/financial-analysis"
            element={
              <ProtectedRoute>
                <Suspense fallback={<Pageloaderspinner />}>
                <SchoolExpensesFinancialAnalysis />
              </Suspense>
              </ProtectedRoute>
            }
          />
          <Route
            path="/fee-payment/financial-analysis"
            element={
              <ProtectedRoute>
                <Suspense fallback={<Pageloaderspinner />}>
                <FeePaymentFinancialAnalysis />
              </Suspense>
              </ProtectedRoute>
            }
          />
          <Route
           path="/parents"
           element={
             <ProtectedRoute>
              <Suspense fallback={<Pageloaderspinner />}>
              <Parents />
             </Suspense>
             </ProtectedRoute>
           }
          >
          </Route>
          <Route
            path="/department/financial-analysis"
            element={
              <ProtectedRoute>
                <Suspense fallback={<Pageloaderspinner />}>
                <DepartmentFinancialAnalysis />
              </Suspense>
              </ProtectedRoute>
            }
          />
          <Route
            path="/courses/financial-analysis"
            element={
              <ProtectedRoute>
                <Suspense fallback={<Pageloaderspinner />}>
                <CoursesFinancialAnalysis />
              </Suspense>
              </ProtectedRoute>
            }
          />
          {/*stats and analysis routes starts*/}


          {/*form routes starts*/}
          <Route
            path="/create-parent"
            element={
               <ProtectedRoute>
                <Suspense fallback={<Pageloaderspinner />}>
                <Createparent />
               </Suspense>
               </ProtectedRoute>
            }
          >
          </Route>
          <Route
            path="/create-scores"
            element={
              <ProtectedRoute>
                <Suspense fallback={<Pageloaderspinner />}>
                <Createstudentscores />
              </Suspense>
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/create-school-admin"
            element={
              <ProtectedRoute>
                <Suspense fallback={<Pageloaderspinner />}>
                <Createschooladmin />
              </Suspense>
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/create-student"
            element={
              <ProtectedRoute>
                <Suspense fallback={<Pageloaderspinner />}>
                <Createstudent />
              </Suspense>
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/create-teacher"
            element={
              <ProtectedRoute>
                <Suspense fallback={<Pageloaderspinner />}>
                <Createteacher />
              </Suspense>
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/create-timetable"
            element={
              <ProtectedRoute>
                <Suspense fallback={<Pageloaderspinner />}>
                <Createtimetable />
              </Suspense>
              </ProtectedRoute>
            }
          ></Route>
          {/*form routes end */}

          <Route
            path="/emails/compose-email"
            element={
              <ProtectedRoute>
                <Suspense fallback={<Pageloaderspinner />}>
                <Composeemail />
              </Suspense>
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/fee-payments"
            element={
              <ProtectedRoute>
                <Suspense fallback={<Pageloaderspinner />}>
                <Feepayment />
              </Suspense>
              </ProtectedRoute>
            }
          ></Route>
          <Route 
           path="/student-batches"
           element={
             <ProtectedRoute>
              <Suspense fallback={<Pageloaderspinner />}>
              <StudentBatches />
             </Suspense>
             </ProtectedRoute>
           }
          >
          </Route>
          <Route
            path="/emails/inbox"
            element={
              <ProtectedRoute>
                <Suspense fallback={<Pageloaderspinner />}>
                <Inbox />
              </Suspense>
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/emails/junk"
            element={
              <ProtectedRoute>
                <Suspense fallback={<Pageloaderspinner />}>
                <Junk />
              </Suspense>
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/emails/archieve"
            element={
              <ProtectedRoute>
                <Suspense fallback={<Pageloaderspinner />}>
                <Archieve />
              </Suspense>
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/emails/draft"
            element={
              <ProtectedRoute>
                <Suspense fallback={<Pageloaderspinner />}>
                <Draft />
              </Suspense>
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/emails/forums"
            element={
              <ProtectedRoute>
                <Suspense fallback={<Pageloaderspinner />}>
                <Forums />
              </Suspense>
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/emails/promotion"
            element={
              <ProtectedRoute>
                <Suspense fallback={<Pageloaderspinner />}>
                <Promotion />
              </Suspense>
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/emails/sent"
            element={
              <ProtectedRoute>
                <Suspense fallback={<Pageloaderspinner />}>
                <Sent />
              </Suspense>
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/emails/shopping"
            element={
              <ProtectedRoute>
                <Suspense fallback={<Pageloaderspinner />}>
                <Shopping />
              </Suspense>
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/emails/socials"
            element={
              <ProtectedRoute>
                <Suspense fallback={<Pageloaderspinner />}>
                <Socials />
              </Suspense>
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/emails/trash"
            element={
              <ProtectedRoute>
                <Suspense fallback={<Pageloaderspinner />}>
                <Trash />
              </Suspense>
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/emails/updates"
            element={
              <ProtectedRoute>
                <Suspense fallback={<Pageloaderspinner />}>
                <Updates />
              </Suspense>
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/settings/account"
            element={
              <ProtectedRoute>
                <Suspense fallback={<Pageloaderspinner />}>
                <Account />
              </Suspense>
              </ProtectedRoute>
            }
          ></Route>
          <Route 
           path="/school-timetable"
           element={
             <ProtectedRoute>
              <Suspense fallback={<Pageloaderspinner />}>
              <SchoolTimeTable />
             </Suspense>
             </ProtectedRoute>
           }
          >
          </Route>
          <Route
            path="/settings/general-settings"
            element={
              <ProtectedRoute>
                <Suspense fallback={<Pageloaderspinner />}>
                <Generalsettings />
              </Suspense>
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/settings/display"
            element={
              <ProtectedRoute>
                <Suspense fallback={<Pageloaderspinner />}>
                <Display />
              </Suspense>
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/settings/updates"
            element={
              <ProtectedRoute>
                <Suspense fallback={<Pageloaderspinner />}>
                <New />
              </Suspense>
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/settings/profile"
            element={
              <ProtectedRoute>
                <Suspense fallback={<Pageloaderspinner />}>
                <Profile />
              </Suspense>
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/settings/security"
            element={
              <ProtectedRoute>
                <Suspense fallback={<Pageloaderspinner />}>
                <Security />
              </Suspense>
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/settings/help"
            element={
              <ProtectedRoute>
                <Suspense fallback={<Pageloaderspinner />}>
                <Help />
              </Suspense>
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/customer-support"
            element={
              <ProtectedRoute>
                <Suspense fallback={<Pageloaderspinner />}>
                <Customersupport />
              </Suspense>
              </ProtectedRoute>
            }
          ></Route>
          <Route
            index
            element={
                <ProtectedRoute>
                  <Suspense fallback={<Pageloaderspinner />}>
                <Dashboard />
              </Suspense>
                </ProtectedRoute>
            }
          />
          <Route
            path="/school-admins"
            element={
              <ProtectedRoute>
                <Suspense fallback={<Pageloaderspinner />}>
                <SchoolAdmin />
              </Suspense>
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/exams"
            element={
              <ProtectedRoute>
                <Suspense fallback={<Pageloaderspinner />}>
                <Exams />
              </Suspense>
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/students"
            element={
              <ProtectedRoute>
                <Suspense fallback={<Pageloaderspinner />}>
                <Students />
              </Suspense>
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/exam-resits"
            element={
              <ProtectedRoute>
                <Suspense fallback={<Pageloaderspinner />}>
                <Examresits />
              </Suspense>
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/scores"
            element={
              <ProtectedRoute>
                <Suspense fallback={<Pageloaderspinner />}>
                <Scores />
              </Suspense>
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/time-table"
            element={
              <ProtectedRoute>
                <Suspense fallback={<Pageloaderspinner />}>
                <Timetable />
              </Suspense>
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/school-expenses"
            element={
              <ProtectedRoute>
                <Suspense fallback={<Pageloaderspinner />}>
                <Schoolexpenses />
              </Suspense>
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/transfer-request"
            element={
              <ProtectedRoute>
                <Suspense fallback={<Pageloaderspinner />}>
                <Transferrequest />
              </Suspense>
              </ProtectedRoute>
            }
          ></Route>
          <Route
           path="/exam-timetable"
           element={
             <ProtectedRoute>
               <Suspense
              fallback={
                 <Pageloaderspinner />
              }
             >
              <ExamTimeTable />
             </Suspense>
             </ProtectedRoute>
           }
          >

          </Route>
          <Route
            path="/transferred-students"
            element={
              <ProtectedRoute>
                <Suspense fallback={<Pageloaderspinner />}>
                <Transferredstudents />
              </Suspense>
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/events"
            element={
              <ProtectedRoute>
                <Suspense fallback={<Pageloaderspinner />}>
                <Events />
              </Suspense>
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/annoucements"
            element={
              <ProtectedRoute>
                <Suspense fallback={<Pageloaderspinner />}>
                <Annoucements />
              </Suspense>
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/messages"
            element={
              <ProtectedRoute>
                 <Suspense fallback={<Pageloaderspinner />}>
                <Messages />
              </Suspense>
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/departments"
            element={
              <ProtectedRoute>
                <Suspense fallback={<Pageloaderspinner />}>
                <Departments />
              </Suspense>
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/specialties"
            element={
              <ProtectedRoute>
                <Suspense fallback={<Pageloaderspinner />}>
                <Specialties />
              </Suspense>
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/teachers"
            element={
              <ProtectedRoute>
                <Suspense fallback={<Pageloaderspinner />}>
                <Teachers />
              </Suspense>
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/courses"
            element={
              <ProtectedRoute>
                <Suspense fallback={<Pageloaderspinner />}>
                <Courses />
              </Suspense>
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/resit-payments"
            element={
              <ProtectedRoute>
                 <Suspense fallback={<Pageloaderspinner />}>
                <ResitPayments />
               </Suspense>
              </ProtectedRoute>
            }
          >  
          </Route>
          <Route
            path="/grades-configuration"
            element={
              <ProtectedRoute>
                <Suspense fallback={<Pageloaderspinner />}>
                <Gradesconfiguration />
              </Suspense>
              </ProtectedRoute>
            }
          ></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Links;
