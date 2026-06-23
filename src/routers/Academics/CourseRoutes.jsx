import React, { Suspense } from "react";
import { Route } from "react-router-dom";
import CourseLayout from "../../layouts/CourseLayout";
const JointCourseTimetable = React.lazy(
  () => import("../../pages/Academics/JointCourseTimetable"),
);
const JointCourse = React.lazy(
  () => import("../../pages/Academics/JointCourse"),
);
const Courses = React.lazy(() => import("../../pages/Academics/Courses"));
const Gradesconfiguration = React.lazy(
  () => import("../../pages/Academics/Gradesconfiguration"),
);

const CourseRoute = [
  <Route key={"courseLayout"} element={<CourseLayout />}>
    <Route
      key="courses"
      path="/courses"
      element={
        <Suspense>
          <Courses />
        </Suspense>
      }
    />
    ,
    <Route
      key="joint-courses"
      path="/joint-course"
      element={
        <Suspense>
          <JointCourse />
        </Suspense>
      }
    />
    ,
    <Route
      key="joint-courses-timetable"
      path="/joint-course-timetable"
      element={
        <Suspense>
          <JointCourseTimetable />
        </Suspense>
      }
    />
  </Route>
];

export default CourseRoute;
