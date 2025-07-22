import React, { Suspense } from "react";
import { Route } from "react-router-dom";
const Dashboard = React.lazy(() => import("../../pages/Dasboard/Dashboard"));
const AcademicStatistics = React.lazy(() =>
  import("../../pages/Dasboard/AcademicStatistics")
);
const OperationalStatistics = React.lazy(() =>
  import("../../pages/Dasboard/OperationalStatistics")
);
import DashboardLayout from "../../layouts/DashboardLayout";
const DashboardRoutes = [
  <Route key={"dashboardLayout"} element={<DashboardLayout />}>
    <Route
      index
      key={"financialDashboard"}
      element={
        <Suspense>
          <Dashboard />
        </Suspense>
      }
    />
    ,
    <Route
      key="academicAnalysis"
      path="/academic-analysis"
      element={
        <Suspense>
          <AcademicStatistics />
        </Suspense>
      }
    />
    ,
    <Route
      key="operationalAnalysis"
      path="/operational-analysis"
      element={
        <Suspense>
          <OperationalStatistics />
        </Suspense>
      }
    />
  </Route>,
];
export default DashboardRoutes;
