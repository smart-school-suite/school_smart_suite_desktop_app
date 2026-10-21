import React, { Suspense } from "react";
import { Route } from "react-router-dom";
import PromotionLayout from "../../layouts/PromotionLayout";
const PromotionRun = React.lazy(
  () => import("../../pages/Academics/PromotionRun"),
);
const StudentPromotionRecord = React.lazy(
  () => import("../../pages/Academics/StudentPromotionRecord"),
);
const GraduationBatch = React.lazy(() => import("../../pages/Promotion/GraduationBatch"));
const GraduationRecord = React.lazy(() => import("../../pages/Promotion/GraduationRecord"));
const Alumni = React.lazy(() => import("../../pages/Promotion/Alumni"));
const PromotionRoute = [
  <Route key={"courseLayout"} element={<PromotionLayout />}>
    <Route
      key="promotions"
      path="/promotion-runs"
      element={
        <Suspense>
          <PromotionRun />
        </Suspense>
      }
    />
    ,
    <Route
      key="promotion-student-record"
      path="/promotion-student-record"
      element={
        <Suspense>
          <StudentPromotionRecord />
        </Suspense>
      }
    />,
    <Route
      key="graduation-batch"
      path="/graduation-batch"
      element={
        <Suspense>
          <GraduationBatch />
        </Suspense>
      }
    />,
    <Route
      key="graduation-records"
      path="/graduation-record"
      element={
        <Suspense>
          <GraduationRecord />
        </Suspense>
      }
    />,
    <Route
      key="alumni"
      path="/alumni"
      element={
        <Suspense>
          <Alumni />
        </Suspense>
      }
    />,
  </Route>,
];

export default PromotionRoute;
