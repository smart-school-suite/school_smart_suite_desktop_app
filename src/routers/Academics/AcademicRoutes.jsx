import path from "path";
import React, { Suspense } from "react";
import { Route } from "react-router-dom";
const Courses = React.lazy(() => import("../../pages/Academics/Courses"));
const AccessedStudents = React.lazy(() => import("../../pages/Academics/AccessedStudents"));
const Exams = React.lazy(() => import("../../pages/Academics/Exams"));
const ExamScores = React.lazy(() => import("../../pages/Academics/ExamScores"));
const ExamTimetable = React.lazy(() => import("../../pages/Academics/examTimeTable"));
const Gradesconfiguration = React.lazy(() => import("../../pages/Academics/Gradesconfiguration"));
const SpecialtyTimetable = React.lazy(() => import("../../pages/Academics/SpecialtyTimetable"));
const Timetable = React.lazy(() => import("../../pages/Academics/Timetable"));
const CourseStatistics = React.lazy(() => import("../../pages/Academics/Statistics/CoursesStats"));
const ExamStatistics = React.lazy(() => import("../../pages/Academics/Statistics/ExamsStats"));
const CoursesFinancialStats = React.lazy(() => import("../../pages/Academics/FinancialStats/CoursesFinancialStats"));
const Semester = React.lazy(() => import("../../pages/Academics/Semester"));
const ExamResitTimetable = React.lazy(() => import("../../pages/Academics/ExamResitTimetable"));
const ScoreStats = React.lazy(() => import("../../pages/Academics/Statistics/ScoreStats"));
const AccessedResitStudents = React.lazy(() => import("../../pages/Academics/AccessedResitStudents"));
const ResitStats = React.lazy(() => import("../../pages/Academics/Statistics/ResitStats"));
const ResitCourses = React.lazy(() => import("../../pages/Academics/ResitCourses"))
const AcademicRoutes = [
    <Route key="courses" path="/courses" element={
        <Suspense>
            <Courses />
        </Suspense>
    } />,
    <Route 
       key={"accessedResitStudents"}
       path="/accessed-resit-students"
       element={
         <Suspense>
            <AccessedResitStudents />
         </Suspense>
       }
    />,
    <Route 
      key={"resitStats"}
      path="/resit-stats"
      element={
         <Suspense>
            <ResitStats />
         </Suspense>
      }
    />,
    <Route 
      key={"resitCourses"}
      path="/resit-courses"
      element={
         <Suspense>
            <ResitCourses />
         </Suspense>
      }
    />,
    <Route 
      key={"resitTimetable"}
      path="/resit-timetable"
      element={
         <Suspense>
            <ExamResitTimetable />
         </Suspense>
      }
    />,
    <Route 
      key={"scoreStats"}
      path="score-stats"
      element={
        <Suspense>
            <ScoreStats />
        </Suspense>
      }
    />,
    <Route key={"semesters"} path="/semesters" element={
        <Suspense>
            <Semester />
        </Suspense>
    }
     
    />,
    <Route key="accessedStudents" path="/accessed-students" element={
        <Suspense>
            <AccessedStudents />
        </Suspense>
    }/>,
    <Route key="exams"  path="/exams" element={
        <Suspense>
            <Exams />
        </Suspense>
    } />,
    <Route key="examScores" path="/scores"  element={
        <Suspense>
            <ExamScores />
        </Suspense>
    } />,
    <Route key="examTimetable" path="/exam-timetable" element={
        <Suspense>
            <ExamTimetable />
        </Suspense>
    }/>,
    <Route key="gradesConfiguration" path="/grades-configuration" element={
        <Suspense>
            <Gradesconfiguration />
        </Suspense>
    } />,
    <Route key="specialtyTimetable" path="/time-table" element={
        <Suspense>
            <SpecialtyTimetable />
        </Suspense>
    }/>,
    <Route key="timetable" path="/view-timetable" element={
        <Suspense>
            <Timetable />
        </Suspense>
    } />,
    <Route key="courseStatistics" path="/course-stats" element={
        <Suspense>
            <CourseStatistics />
        </Suspense>
    }  />,
    <Route key="examStats" path="/exam-stats" element={
        <Suspense>
            <ExamStatistics />
        </Suspense>
    }/>,
    <Route key="coursesFinancialStats" path="/courses/financial-analysis" element={
        <Suspense>
            <CoursesFinancialStats />
        </Suspense>
    }/>
]
export default AcademicRoutes
