import React, { Suspense } from "react";
import { Route } from "react-router-dom";
const Courses = React.lazy(() => import("../../pages/Academics/Courses"));
const AccessedStudents = React.lazy(() => import("../../pages/Academics/AccessedStudents"));
const ExamGradesConfig = React.lazy(() => import("../../pages/Academics/ExamGradesConfig"));
const Exams = React.lazy(() => import("../../pages/Academics/Exams"));
const ExamScores = React.lazy(() => import("../../pages/Academics/ExamScores"));
const ExamResits = React.lazy(() => import("../../pages/Academics/Examsresit"));
const ExamTimetable = React.lazy(() => import("../../pages/Academics/examTimeTable"));
const Gradesconfiguration = React.lazy(() => import("../../pages/Academics/Gradesconfiguration"));
const SpecialtyTimetable = React.lazy(() => import("../../pages/Academics/SpecialtyTimetable"));
const Timetable = React.lazy(() => import("../../pages/Academics/Timetable"));
const CourseStatistics = React.lazy(() => import("../../pages/Academics/Statistics/CoursesStats"));
const ExamStatistics = React.lazy(() => import("../../pages/Academics/Statistics/ExamsStats"));
const CoursesFinancialStats = React.lazy(() => import("../../pages/Academics/FinancialStats/CoursesFinancialStats"));
const Semester = React.lazy(() => import("../../pages/Academics/Semester"))
const AcademicRoutes = [
    <Route key="courses" path="/courses" element={
        <Suspense>
            <Courses />
        </Suspense>
    } />,
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
    <Route key="examGradesConfig" path="" element={
        <Suspense>
            <ExamGradesConfig />
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
    <Route key="examResits" path="/exam-resits" element={
        <Suspense>
            <ExamResits />
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
    <Route key="courseStatistics" path="/courses/academic-analysis" element={
        <Suspense>
            <CourseStatistics />
        </Suspense>
    }  />,
    <Route key="examStats" path="/exam/academic-analysis" element={
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
