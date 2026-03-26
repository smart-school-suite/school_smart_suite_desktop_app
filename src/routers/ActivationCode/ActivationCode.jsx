import React, { Suspense } from "react";
import ActivationCodeLayout from "../../layouts/ActivationCodeLayout";
import { Route } from "react-router-dom";
const ActivationCode = React.lazy(() =>
  import("../../pages/ActivationCode/ActivationCode")
);
const Teacher = React.lazy(() => import("../../pages/ActivationCode/Teacher"));
const Student = React.lazy(() => import("../../pages/ActivationCode/Student"));
const ActivationCodeUsage = React.lazy(() => import("../../pages/ActivationCode/ActivationCodeUsage"));
const Transations = React.lazy(() => import("../../pages/ActivationCode/Transactions"));
 const ActivationCodeRoutes = [
  <Route key={"activationCodeLayout"} element={<ActivationCodeLayout />}>
    <Route
      key={"activationCode"}
      path="/activation-code"
      element={
        <Suspense>
          <ActivationCode />
        </Suspense>
      }
    />
    ,
    <Route
      key={"activationCodeTeachers"}
      path="/activation-code/teacher"
      element={
        <Suspense>
          <Teacher />
        </Suspense>
      }
    />
    ,
    <Route
      key={"activationCodeStudents"}
      path="/activation-code/student"
      element={
        <Suspense>
          <Student />
        </Suspense>
      }
    />
    ,
        <Route
      key={"activationCodeUsage"}
      path="/activation-code/usage"
      element={
        <Suspense>
          <ActivationCodeUsage />
        </Suspense>
      }
    />
       ,
        <Route
      key={"activationTransactions"}
      path="/activation-code/transactions"
      element={
        <Suspense>
          <Transations />
        </Suspense>
      }
    />
  </Route>
];
export default ActivationCodeRoutes;