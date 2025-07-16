import React, { Suspense } from "react";
import { Route } from "react-router-dom";
const Parents = React.lazy(() => import("../../pages/Student/Parents"));
const Students = React.lazy(() => import("../../pages/Student/Students"));
const StudentBatches = React.lazy(() => import("../../pages/Student/studentBatches"));
const StudentDropouts = React.lazy(() => import("../../pages/Student/StudentDropouts"));
const StudentRoutes = [
    <Route key={"parents"} path="/parents" element={
        <Suspense>
            <Parents />
        </Suspense>
    } />,
    <Route 
      key={"studentDropout"}
      path="/studentDropout"
      element={
         <Suspense>
            <StudentDropouts />
         </Suspense>
      }
    />,
    <Route key={"students"} path="/students" element={
        <Suspense>
            <Students />
        </Suspense>
    }/>,
    <Route key={"studentBatches"} path="/student-batches" element={
        <Suspense>
            <StudentBatches />
        </Suspense>
    }/>
    
];

export default StudentRoutes;
