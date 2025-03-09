import React, { Suspense } from "react";
import { Route } from "react-router-dom";
const Parents = React.lazy(() => import("../../pages/Student/Parents"));
const Students = React.lazy(() => import("../../pages/Student/Students"));
const StudentBatches = React.lazy(() => import("../../pages/Student/studentBatches"));
const StudentAcademicStats = React.lazy(() => import("../../pages/Student/Statistics/Academic/StudentAcademicStats"));
const StudentFinancialStats = React.lazy(() => import("../../pages/Student/Statistics/Financial/StudentFinancialStats"));
const StudentRoutes = [
    <Route key={"parents"} path="/parents" element={
        <Suspense>
            <Parents />
        </Suspense>
    } />,
    <Route key={"students"} path="/students" element={
        <Suspense>
            <Students />
        </Suspense>
    }/>,
    <Route key={"studentBatches"} path="/student-batches" element={
        <Suspense>
            <StudentBatches />
        </Suspense>
    }/>,
    <Route key={"studentAcademicStats"} path="/student/academic-analysis" element={
        <Suspense>
            <StudentAcademicStats />
        </Suspense>
    }/>,
    <Route key={"studentFinancialStats"} path="/student/financial-analysis" element={
        <Suspense>
            <StudentFinancialStats />
        </Suspense>
    }/>
];

export default StudentRoutes;
