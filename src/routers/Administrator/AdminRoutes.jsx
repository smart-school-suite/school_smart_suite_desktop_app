import path from "path";
import React, { Suspense } from "react";
import { Route } from "react-router-dom";
const Departments = React.lazy(() => import("../../pages/Administrators/Departments"));
const SchoolAdmins = React.lazy(() => import("../../pages/Administrators/SchoolAdmins"));
const Specialties = React.lazy(() => import("../../pages/Administrators/Specialties"));
const Teachers = React.lazy(() => import("../../pages/Administrators/Teachers"));
const HeadOfDepartment = React.lazy(() => import("../../pages/Administrators/HeadOfDepartment"));
const HeadOfSpecialty = React.lazy(() => import("../../pages/Administrators/HeadOfSpecialty"));
const AdministratorsRoutes = [
    <Route key={"deparment"}  path="/departments" element={
        <Suspense>
            <Departments />
        </Suspense>
    } />,
    <Route  key={"schoolAdmins"} path="/school-admins" element={
        <Suspense>
            <SchoolAdmins />
        </Suspense>
    }/>,
    <Route key={"specialties"} path="/specialties" element={
        <Suspense>
            <Specialties />
        </Suspense>
    }/>,
    <Route key={"teachers"} path="/teachers" element={
        <Suspense>
            <Teachers />
        </Suspense>
    }/>,
    <Route  key={"headofSpecialty"} path="/hos"  element={
        <Suspense>
            <HeadOfSpecialty />
        </Suspense>
    } />,
    <Route key={"headofDepartment"} path="/hod" element={
        <Suspense>
            <HeadOfDepartment />
        </Suspense>
    } />
];

export default AdministratorsRoutes;