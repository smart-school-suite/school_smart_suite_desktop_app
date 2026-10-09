import React, { Suspense } from "react";
import { Route } from "react-router-dom";
const Exam = React.lazy(() => import("../../pages/Exam/Exam"));
const ExamCandidates = React.lazy(
  () => import("../../pages/Exam/ExamCandidate"),
);
const ExamTimetable = React.lazy(
  () => import("../../pages/Exam/ExamTimetable"),
);
const ExamInvigilator = React.lazy(
  () => import("../../pages/Exam/ExamInvigilator"),
);

const ExamResults = React.lazy(() => import("../../pages/Exam/ExamResults"));
const ExamRoutes = [
  <Route
    key={"examInvigilator"}
    path="/exam-invigilator"
    element={
      <Suspense>
        <ExamInvigilator />
      </Suspense>
    }
  />,
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
  <Route
    key="exam-results"
    path="/exam-result"
    element={
      <Suspense>
        <ExamResults />
      </Suspense>
    }
  />,
];
export default ExamRoutes;
