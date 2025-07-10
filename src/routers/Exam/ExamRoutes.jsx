import React, { Suspense } from "react";
import { Route } from "react-router-dom";
const Exam = React.lazy(() => import("../../pages/Exam/Exam"));
const ExamCandidates = React.lazy(() =>
  import("../../pages/Exam/ExamCandidate")
);
const ExamTimetable = React.lazy(() =>
  import("../../pages/Exam/ExamTimetable")
);

const ExamRoutes = [
  <Route
    key="exam"
    path="/exam"
    element={
      <Suspense>
        <Exam />
      </Suspense>
    }
  />,
  <Route
    key="examCandidate"
    path="/exam-candidate"
    element={
      <Suspense>
        <ExamCandidates />
      </Suspense>
    }
  />,
  <Route
    key="examTimetable"
    path="/exam-timetable"
    element={
      <Suspense>
        <ExamTimetable />
      </Suspense>
    }
  />,
];
export default ExamRoutes;