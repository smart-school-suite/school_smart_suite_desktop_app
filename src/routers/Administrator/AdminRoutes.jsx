import React, { Suspense } from "react";
import { Route } from "react-router-dom";
import TeacherLayout from "../../layouts/TeacherLayout";
const Departments = React.lazy(() =>
  import("../../pages/Administrators/Departments")
);
const SchoolAdmins = React.lazy(() =>
  import("../../pages/Administrators/SchoolAdmins")
);
const Specialties = React.lazy(() =>
  import("../../pages/Administrators/Specialties")
);
const Teacher = React.lazy(() => import("../../pages/Administrators/Teachers"));
const TeacherSpecialty = React.lazy(() =>
  import("../../pages/Administrators/TeacherSpecialty")
);
const TeacherAvailability = React.lazy(() =>
  import("../../pages/Administrators/TeacherAvailability")
);
const TeacherCourse = React.lazy(() =>
  import("../../pages/Administrators/TeacherCourse")
);
const AdministratorsRoutes = [
  <Route
    key={"deparment"}
    path="/departments"
    element={
      <Suspense>
        <Departments />
      </Suspense>
    }
  />,
  <Route
    key={"schoolAdmins"}
    path="/school-admins"
    element={
      <Suspense>
        <SchoolAdmins />
      </Suspense>
    }
  />,
  <Route
    key={"specialties"}
    path="/specialties"
    element={
      <Suspense>
        <Specialties />
      </Suspense>
    }
  />,
  <Route key={"teachers"} element={<TeacherLayout />}>
    <Route
      key={"teachers"}
      path="/teacher"
      element={
        <Suspense>
          <Teacher />
        </Suspense>
      }
    />
    ,
    <Route
      key={"teacherCourse"}
      path="/teacher-course"
      element={
        <Suspense>
          <TeacherCourse />
        </Suspense>
      }
    />
    <Route
      key={"teacherSpecialty"}
      path="/teacher-specialty"
      element={
        <Suspense>
          <TeacherSpecialty />
        </Suspense>
      }
    />
    <Route
      key={"teacherAvailability"}
      path="/teacher-availability"
      element={
        <Suspense>
          <TeacherAvailability />
        </Suspense>
      }
    />
  </Route>,
];

export default AdministratorsRoutes;
