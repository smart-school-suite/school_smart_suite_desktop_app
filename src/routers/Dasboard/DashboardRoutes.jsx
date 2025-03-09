import React, { Suspense }  from "react";
import { Route } from "react-router-dom";
const Dashboard = React.lazy(() => import("../../pages/Dasboard/Dashboard"));
const AcademicStatistics = React.lazy(() => import("../../pages/Dasboard/AcademicStatistics"));
const OperationalStatistics = React.lazy(() => import("../../pages/Dasboard/OperationalStatistics"));
const DashboardRoutes = [
   <Route  index  key={"financialDashboard"} element={
      <Suspense>
         <Dashboard />
      </Suspense>
   } />,
   <Route  key="academicAnalysis" path="/academic-analysis" element={
      <Suspense>
         <AcademicStatistics />
      </Suspense>
   } />,
   <Route  key="operationalAnalysis" path="/operational-analysis" element={
      <Suspense>
         <OperationalStatistics />
      </Suspense>
   }/>
];
export default DashboardRoutes;