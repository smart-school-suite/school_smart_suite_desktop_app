import React, { Suspense } from "react";
import { Route } from "react-router-dom";
const Departments = React.lazy(() => import("../../pages/Administrators/Departments"));
const SchoolAdmins = React.lazy(() => import("../../pages/Administrators/SchoolAdmins"));
const Specialties = React.lazy(() => import("../../pages/Administrators/Specialties"));
const Teachers = React.lazy(() => import("../../pages/Administrators/Teachers"));
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
];

export default AdministratorsRoutes;