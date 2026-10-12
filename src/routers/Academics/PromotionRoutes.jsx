import React, { Suspense } from "react";
import { Route } from "react-router-dom";
import PromotionLayout from "../../layouts/PromotionLayout";
const PromotionRun = React.lazy(
  () => import("../../pages/Academics/PromotionRun"),
);
const StudentPromotionRecord = React.lazy(
  () => import("../../pages/Academics/StudentPromotionRecord"),
);

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
    />
  </Route>,
];

export default PromotionRoute;
