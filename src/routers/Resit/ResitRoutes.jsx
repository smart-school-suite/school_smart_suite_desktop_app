import React, { Suspense } from "react";
import { Route } from "react-router-dom";
const ResitCandidate = React.lazy(() => import("../../pages/Resit/ResitCandidate"));
const ResitExam = React.lazy(() => import("../../pages/Resit/ResitExam"))
const ResitTimetable = React.lazy(() => import("../../pages/Resit/ResitTimetable"));
const StudentResit = React.lazy(() => import("../../pages/Resit/StudentResit"));

const ResitRoutes = [
      <Route key="ResitCandidate" path="/resit-candidate" element={
          <Suspense>
              <ResitCandidate  />
          </Suspense>
      } />,
      <Route key={"ResitExam"} path="/resit-exams" element={
          <Suspense>
              <ResitExam />
          </Suspense>
      }
       
      />,
      <Route key="ResitTimetable" path="/resit-timetable" element={
          <Suspense>
              <ResitTimetable />
          </Suspense>
      } />,
      <Route key="StudentResit" path="/student-resit" element={
          <Suspense>
              <StudentResit />
          </Suspense>
      }/>
];

export default ResitRoutes;