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
import LoginSchoolAdmin from "../pages/LoginSchoolAdmin";
import TwoStepVerification from "../pages/twoStepVerification";
import RegisterSchool from "../pages/signup/registerSchool";
import RegisterSchoolAdmin from "../pages/signup/registerSchoolAdmin";
import RegisterSchoolBranch from "../pages/signup/registerSchoolBranch";
import SubcriptionPlan from "../pages/signup/subcriptionPlans";
function Links() {
  return (
    <BrowserRouter>
      {/* auth routes*/}
      <Routes>
        <Route
          path="/register-school"
          element={
             <RegisterSchool />
          }
        >
        </Route>
        <Route
         path="/register/school-admin"
         element={
           <RegisterSchoolAdmin />
         }
        >
        </Route>
        <Route 
         path="/register/school-branch"
         element={
           <RegisterSchoolBranch />
         }
        />
        <Route
         path="/subcription/plan"
         element={
           <SubcriptionPlan />
         }
        >
        </Route>
      <Route 
       path="/create-schoolbranch"
       element={
         <RegisterSchoolBranch/>
       }
      ></Route>
      <Route
      path="/login-school-admin"
       element={
         <LoginSchoolAdmin />
       }
      >
      </Route>
      <Route
       path="/verify-otp"
       element={
         <TwoStepVerification />
       }
      >

      </Route>
        <Route element={<Layout />}>
          {/*stats and analysis routes starts*/}
          <Route
            path="/academic-analysis"
            element={
              <Suspense fallback={<Pageloaderspinner />}>
                <AcademicAnalysis />
              </Suspense>
            }
          />
          <Route
            path="/operational-analysis"
            element={
              <Suspense fallback={<Pageloaderspinner />}>
                <OperationalAnalysis />
              </Suspense>
            }
          />
          <Route
            path="/courses/academic-analysis"
            element={
              <Suspense fallback={<Pageloaderspinner />}>
                <CoursesAcademicAnalysis />
              </Suspense>
            }
          />
          <Route
            path="/department/academic-analysis"
            element={
              <Suspense fallback={<Pageloaderspinner />}>
                <DepartmentAcademicAnalysis />
              </Suspense>
            }
          />
          <Route
            path="/exam/academic-analysis"
            element={
              <Suspense fallback={<Pageloaderspinner />}>
                <ExamAcademicAnalysis />
              </Suspense>
            }
          />
          <Route
            path="/specailty/academic-analysis"
            element={
              <Suspense fallback={<Pageloaderspinner />}>
                <SpecialtiesAcademicAnalysis />
              </Suspense>
            }
          />
          <Route
            path="/student/academic-analysis"
            element={
              <Suspense fallback={<Pageloaderspinner />}>
                <StudentAcademicAnalysis />
              </Suspense>
            }
          />
          <Route
            path="/teacher/academic-analysis"
            element={
              <Suspense fallback={<Pageloaderspinner />}>
                <TeachersAcademicAnalysis />
              </Suspense>
            }
          />
          <Route
            path="/teacher/financial-analysis"
            element={
              <Suspense fallback={<Pageloaderspinner />}>
                <TeacherFinancialAnalysis />
              </Suspense>
            }
          />
          <Route
            path="/student/financial-analysis"
            element={
              <Suspense fallback={<Pageloaderspinner />}>
                <StudentFinancialAnalysis />
              </Suspense>
            }
          />
          <Route
            path="/specailty/financial-analysis"
            element={
              <Suspense fallback={<Pageloaderspinner />}>
                <SpecialtiesFinancialAnalysis />
              </Suspense>
            }
          />
          <Route
            path="/school-expenses/financial-analysis"
            element={
              <Suspense fallback={<Pageloaderspinner />}>
                <SchoolExpensesFinancialAnalysis />
              </Suspense>
            }
          />
          <Route
            path="/fee-payment/financial-analysis"
            element={
              <Suspense fallback={<Pageloaderspinner />}>
                <FeePaymentFinancialAnalysis />
              </Suspense>
            }
          />
          <Route
           path="/parents"
           element={
             <Suspense fallback={<Pageloaderspinner />}>
              <Parents />
             </Suspense>
           }
          >
          </Route>
          <Route
            path="/department/financial-analysis"
            element={
              <Suspense fallback={<Pageloaderspinner />}>
                <DepartmentFinancialAnalysis />
              </Suspense>
            }
          />
          <Route
            path="/courses/financial-analysis"
            element={
              <Suspense fallback={<Pageloaderspinner />}>
                <CoursesFinancialAnalysis />
              </Suspense>
            }
          />
          {/*stats and analysis routes starts*/}


          {/*form routes starts*/}
          <Route
            path="/create-parent"
            element={
               <Suspense fallback={<Pageloaderspinner />}>
                <Createparent />
               </Suspense>
            }
          >
          </Route>
          <Route
            path="/create-scores"
            element={
              <Suspense fallback={<Pageloaderspinner />}>
                <Createstudentscores />
              </Suspense>
            }
          ></Route>
          <Route
            path="/create-school-admin"
            element={
              <Suspense fallback={<Pageloaderspinner />}>
                <Createschooladmin />
              </Suspense>
            }
          ></Route>
          <Route
            path="/create-student"
            element={
              <Suspense fallback={<Pageloaderspinner />}>
                <Createstudent />
              </Suspense>
            }
          ></Route>
          <Route
            path="/create-teacher"
            element={
              <Suspense fallback={<Pageloaderspinner />}>
                <Createteacher />
              </Suspense>
            }
          ></Route>
          <Route
            path="/create-timetable"
            element={
              <Suspense fallback={<Pageloaderspinner />}>
                <Createtimetable />
              </Suspense>
            }
          ></Route>
          {/*form routes end */}

          <Route
            path="/emails/compose-email"
            element={
              <Suspense fallback={<Pageloaderspinner />}>
                <Composeemail />
              </Suspense>
            }
          ></Route>
          <Route
            path="/fee-payments"
            element={
              <Suspense fallback={<Pageloaderspinner />}>
                <Feepayment />
              </Suspense>
            }
          ></Route>
          <Route 
           path="/student-batches"
           element={
             <Suspense fallback={<Pageloaderspinner />}>
              <StudentBatches />
             </Suspense>
           }
          >
          </Route>
          <Route
            path="/emails/inbox"
            element={
              <Suspense fallback={<Pageloaderspinner />}>
                <Inbox />
              </Suspense>
            }
          ></Route>
          <Route
            path="/emails/junk"
            element={
              <Suspense fallback={<Pageloaderspinner />}>
                <Junk />
              </Suspense>
            }
          ></Route>
          <Route
            path="/emails/archieve"
            element={
              <Suspense fallback={<Pageloaderspinner />}>
                <Archieve />
              </Suspense>
            }
          ></Route>
          <Route
            path="/emails/draft"
            element={
              <Suspense fallback={<Pageloaderspinner />}>
                <Draft />
              </Suspense>
            }
          ></Route>
          <Route
            path="/emails/forums"
            element={
              <Suspense fallback={<Pageloaderspinner />}>
                <Forums />
              </Suspense>
            }
          ></Route>
          <Route
            path="/emails/promotion"
            element={
              <Suspense fallback={<Pageloaderspinner />}>
                <Promotion />
              </Suspense>
            }
          ></Route>
          <Route
            path="/emails/sent"
            element={
              <Suspense fallback={<Pageloaderspinner />}>
                <Sent />
              </Suspense>
            }
          ></Route>
          <Route
            path="/emails/shopping"
            element={
              <Suspense fallback={<Pageloaderspinner />}>
                <Shopping />
              </Suspense>
            }
          ></Route>
          <Route
            path="/emails/socials"
            element={
              <Suspense fallback={<Pageloaderspinner />}>
                <Socials />
              </Suspense>
            }
          ></Route>
          <Route
            path="/emails/trash"
            element={
              <Suspense fallback={<Pageloaderspinner />}>
                <Trash />
              </Suspense>
            }
          ></Route>
          <Route
            path="/emails/updates"
            element={
              <Suspense fallback={<Pageloaderspinner />}>
                <Updates />
              </Suspense>
            }
          ></Route>
          <Route
            path="/settings/account"
            element={
              <Suspense fallback={<Pageloaderspinner />}>
                <Account />
              </Suspense>
            }
          ></Route>
          <Route 
           path="/school-timetable"
           element={
             <Suspense fallback={<Pageloaderspinner />}>
              <SchoolTimeTable />
             </Suspense>
           }
          >
          </Route>
          <Route
            path="/settings/general-settings"
            element={
              <Suspense fallback={<Pageloaderspinner />}>
                <Generalsettings />
              </Suspense>
            }
          ></Route>
          <Route
            path="/settings/display"
            element={
              <Suspense fallback={<Pageloaderspinner />}>
                <Display />
              </Suspense>
            }
          ></Route>
          <Route
            path="/settings/updates"
            element={
              <Suspense fallback={<Pageloaderspinner />}>
                <New />
              </Suspense>
            }
          ></Route>
          <Route
            path="/settings/profile"
            element={
              <Suspense fallback={<Pageloaderspinner />}>
                <Profile />
              </Suspense>
            }
          ></Route>
          <Route
            path="/settings/security"
            element={
              <Suspense fallback={<Pageloaderspinner />}>
                <Security />
              </Suspense>
            }
          ></Route>
          <Route
            path="/settings/help"
            element={
              <Suspense fallback={<Pageloaderspinner />}>
                <Help />
              </Suspense>
            }
          ></Route>
          <Route
            path="/customer-support"
            element={
              <Suspense fallback={<Pageloaderspinner />}>
                <Customersupport />
              </Suspense>
            }
          ></Route>
          <Route
            index
            element={
                <Suspense fallback={<Pageloaderspinner />}>
                <Dashboard />
              </Suspense>

            }
          />
          <Route
            path="/school-admins"
            element={
              <Suspense fallback={<Pageloaderspinner />}>
                <SchoolAdmin />
              </Suspense>
            }
          ></Route>
          <Route
            path="/exams"
            element={
              <Suspense fallback={<Pageloaderspinner />}>
                <Exams />
              </Suspense>
            }
          ></Route>
          <Route
            path="/students"
            element={
              <Suspense fallback={<Pageloaderspinner />}>
                <Students />
              </Suspense>
            }
          ></Route>
          <Route
            path="/exam-resits"
            element={
              <Suspense fallback={<Pageloaderspinner />}>
                <Examresits />
              </Suspense>
            }
          ></Route>
          <Route
            path="/scores"
            element={
              <Suspense fallback={<Pageloaderspinner />}>
                <Scores />
              </Suspense>
            }
          ></Route>
          <Route
            path="/time-table"
            element={
              <Suspense fallback={<Pageloaderspinner />}>
                <Timetable />
              </Suspense>
            }
          ></Route>
          <Route
            path="/school-expenses"
            element={
              <Suspense fallback={<Pageloaderspinner />}>
                <Schoolexpenses />
              </Suspense>
            }
          ></Route>
          <Route
            path="/transfer-request"
            element={
              <Suspense fallback={<Pageloaderspinner />}>
                <Transferrequest />
              </Suspense>
            }
          ></Route>
          <Route
           path="/exam-timetable"
           element={
             <Suspense
              fallback={
                 <Pageloaderspinner />
              }
             >
              <ExamTimeTable />
             </Suspense>
           }
          >

          </Route>
          <Route
            path="/transferred-students"
            element={
              <Suspense fallback={<Pageloaderspinner />}>
                <Transferredstudents />
              </Suspense>
            }
          ></Route>
          <Route
            path="/events"
            element={
              <Suspense fallback={<Pageloaderspinner />}>
                <Events />
              </Suspense>
            }
          ></Route>
          <Route
            path="/annoucements"
            element={
              <Suspense fallback={<Pageloaderspinner />}>
                <Annoucements />
              </Suspense>
            }
          ></Route>
          <Route
            path="/messages"
            element={
              <Suspense fallback={<Pageloaderspinner />}>
                <Messages />
              </Suspense>
            }
          ></Route>
          <Route
            path="/departments"
            element={
              <Suspense fallback={<Pageloaderspinner />}>
                <Departments />
              </Suspense>
            }
          ></Route>
          <Route
            path="/specialties"
            element={
              <Suspense fallback={<Pageloaderspinner />}>
                <Specialties />
              </Suspense>
            }
          ></Route>
          <Route
            path="/teachers"
            element={
              <Suspense fallback={<Pageloaderspinner />}>
                <Teachers />
              </Suspense>
            }
          ></Route>
          <Route
            path="/courses"
            element={
              <Suspense fallback={<Pageloaderspinner />}>
                <Courses />
              </Suspense>
            }
          ></Route>
          <Route
            path="/resit-payments"
            element={
               <Suspense fallback={<Pageloaderspinner />}>
                <ResitPayments />
               </Suspense>
            }
          >  
          </Route>
          <Route
            path="/grades-configuration"
            element={
              <Suspense fallback={<Pageloaderspinner />}>
                <Gradesconfiguration />
              </Suspense>
            }
          ></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Links;
