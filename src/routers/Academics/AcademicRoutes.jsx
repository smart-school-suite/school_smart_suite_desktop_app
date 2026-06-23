import React, { Suspense } from "react";
import { Route } from "react-router-dom";
const Gradesconfiguration = React.lazy(
  () => import("../../pages/Academics/Gradesconfiguration"),
);
const SemesterTimetable = React.lazy(
  () => import("../../pages/Academics/SemesterTimetable"),
);
const Semester = React.lazy(() => import("../../pages/Academics/Semester"));
const AcademicYear = React.lazy(
  () => import("../../pages/Academics/AcademicYear"),
);
const AcademicRoutes = [
  <Route
    key={"semesters"}
    path="/semesters"
    element={
      <Suspense>
        <Semester />
      </Suspense>
    }
  />,
  <Route
    key={"academic-years"}
    path="/academic-year"
    element={
      <Suspense>
        <AcademicYear />
      </Suspense>
    }
  />,
  <Route
    key="gradesConfiguration"
    path="/grades-configuration"
    element={
      <Suspense>
        <Gradesconfiguration />
      </Suspense>
    }
  />,
  <Route
    key="semesterTitable"
    path="/time-table"
    element={
      <Suspense>
        <SemesterTimetable />
      </Suspense>
    }
  />,
];
export default AcademicRoutes;
