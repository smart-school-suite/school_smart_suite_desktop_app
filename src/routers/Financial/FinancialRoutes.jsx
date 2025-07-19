import React, { Suspense } from "react";
import { Route } from "react-router-dom";
const RegistrationFees = React.lazy(() => import("../../pages/Finances/RegistrationFees"));
const RegistrationFeeTransactions = React.lazy(() => import("../../pages/Finances/Transactions/RegistrationFeesTransactions"));
const ResitFee = React.lazy(() => import("../../pages/Finances/ResitFee"));
const ResitFeeTransactions = React.lazy(() => import("../../pages/Finances/Transactions/ResitFeeTransactions"));
const SchoolExpenses = React.lazy(() => import("../../pages/Finances/Schoolexpenses"));
const TuitionFees = React.lazy(() => import("../../pages/Finances/TuitionFee"));
const TuitionFeeTransactions = React.lazy(() => import("../../pages/Finances/Transactions/TuitionFeeTransactions"));
const AdditionalFees = React.lazy(() => import("../../pages/Finances/AdditionalFees"));
const AdditionalFeeTransactions = React.lazy(() => import("../../pages/Finances/Transactions/AdditionalFeesTransactions"));
const SchoolExpensesCategory = React.lazy(() => import("../../pages/Finances/SchoolExpensesCategory"));
const FeeSchedule = React.lazy(() => import("../../pages/Finances/FeeSchedule"));
import SchoolExpensesLayout from "../../layouts/SchoolExpensesLayout";
import RegistrationFeeLayout from "../../layouts/RegistrationFeeLayout";
import TuitionFeeLayout from "../../layouts/TuitionFeeLayout";
const FinancialRoutes = [
  <Route key={"resitFee"} path="/resit-payments" element={
    <Suspense>
      <ResitFee />
    </Suspense>
  }/>,
  <Route  key={"resitFeeTransactions"} path="/resitFeeTransactions" element={
     <Suspense>
      <ResitFeeTransactions />
     </Suspense>
  }/>,
  <Route
    key={"registrationFeeLayout"}
    element={<RegistrationFeeLayout />}
  >
    <Route key={"registrationFees"} path="/registrationFees" element={
    <Suspense>
      <RegistrationFees />
    </Suspense>
  }/>,
  <Route key={"registrationFeeTransactions"} path="/registrationFee-transactions" element={
    <Suspense>
      <RegistrationFeeTransactions />
    </Suspense>
  }/>,
  </Route>,
 <Route element={<SchoolExpensesLayout />} key={"schoolExpensesLayout"}>
   <Route key={"schoolExpensesCategory"} path="/school-expense-category" element={
    <Suspense>
      <SchoolExpensesCategory />
    </Suspense>
  }/>
   <Route key={"schoolExpenses"} path="/school-expenses" element={
    <Suspense>
      <SchoolExpenses />
    </Suspense>
  }/>
 </Route>,
  
  <Route key={"additionalFees"} path="/additionalFees"  element={
    <Suspense>
      <AdditionalFees />
    </Suspense>
  }/>,
  <Route key={"additionalFeeTransactions"} path="/additionalFeeTransactions" element={
     <Suspense>
      <AdditionalFeeTransactions />
     </Suspense>
  }/>,
   <Route key={"tuitionFeeLayout"} element={<TuitionFeeLayout />}>
    <Route key={"tuitionFees"} path="/fee-payments" element={
    <Suspense>
      <TuitionFees />
    </Suspense>
  }/>,
  <Route key={"tuitionFeeTransactions"} path="/fee-payment/transactions" element={
     <Suspense>
      <TuitionFeeTransactions />
     </Suspense>
  }/>
  <Route key={"tuitionFeeSchedule"} path="/fee-payment/schedule" element={
     <Suspense>
      <FeeSchedule />
     </Suspense>
  }/>
   </Route>,
];
export default FinancialRoutes