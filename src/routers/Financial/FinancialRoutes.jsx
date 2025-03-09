import React, { Suspense } from "react";
import { Route } from "react-router-dom";
const RegistrationFees = React.lazy(() => import("../../pages/Finances/RegistrationFees"));
const RegistrationFeeStats = React.lazy(() => import("../../pages/Finances/Statistics/RegistrationFeeStats"));
const RegistrationFeeTransactions = React.lazy(() => import("../../pages/Finances/Transactions/RegistrationFeesTransactions"));
const ResitFee = React.lazy(() => import("../../pages/Finances/ResitFee"));
const ResitFeeTransactions = React.lazy(() => import("../../pages/Finances/Transactions/ResitFeeTransactions"));
const ResitFeeStats = React.lazy(() => import("../../pages/Finances/Statistics/ResitFeeStats"));
const SchoolExpenses = React.lazy(() => import("../../pages/Finances/Schoolexpenses"));
const SchoolExpensesStats = React.lazy(() => import("../../pages/Finances/Statistics/SchoolExpensesStats"));
const TuitionFeeStats = React.lazy(() => import("../../pages/Finances/Statistics/TuitionFeeStats"));
const TuitionFees = React.lazy(() => import("../../pages/Finances/TuitionFee"));
const TuitionFeeTransactions = React.lazy(() => import("../../pages/Finances/Transactions/TuitionFeeTransactions"));
const AdditionalFees = React.lazy(() => import("../../pages/Finances/AdditionalFees"));
const AdditionalFeeStats = React.lazy(() => import("../../pages/Finances/Statistics/AdditionalFeeStats"));
const AdditionalFeeTransactions = React.lazy(() => import("../../pages/Finances/Transactions/AdditionalFeesTransactions"));
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
  <Route key={"resitFeeStats"} path="/resitFeeStatistics" element={
     <Suspense>
      <ResitFeeStats />
     </Suspense>
  }
  
  />,
  <Route key={"registrationFees"} path="/registrationFees" element={
    <Suspense>
      <RegistrationFees />
    </Suspense>
  }/>,
  <Route key={"registrationFeeStats"} path="/registrationFeeStats" element={
     <Suspense>
      <RegistrationFeeStats />
     </Suspense>
  }/>,
  <Route key={"registrationFeeTransactions"} path="/registrationFeesTransactions" element={
    <Suspense>
      <RegistrationFeeTransactions />
    </Suspense>
  }/>,
  <Route key={"additionalFees"} path="/additionalFees"  element={
    <Suspense>
      <AdditionalFees />
    </Suspense>
  }/>,
  <Route key={"additionalFeeStats"} path="/additionalFeeStats" element={
    <Suspense>
      <AdditionalFeeStats />
    </Suspense>
  }/>,
  <Route key={"additionalFeeTransactions"} path="/additionalFeeTransactions" element={
     <Suspense>
      <AdditionalFeeTransactions />
     </Suspense>
  }/>,
  
  <Route key={"schoolExpenses"} path="/school-expenses" element={
    <Suspense>
      <SchoolExpenses />
    </Suspense>
  }/>,
  <Route key={"schoolExpensesStats"} path="/school-expenses/financial-analysis" element={
    <Suspense>
      <SchoolExpensesStats />
    </Suspense>
  }/>,
  <Route key={"tuitionFeeStats"} path="/tuitionFeeStats" element={
    <Suspense>
      <TuitionFeeStats />
    </Suspense>
  }/>,
  <Route key={"tuitionFees"} path="/fee-payments" element={
    <Suspense>
      <TuitionFees />
    </Suspense>
  }/>,
  <Route key={"tuitionFeeTransactions"} path="/fee-payment/transactions" element={
     <Suspense>
      <TuitionFeeTransactions />
     </Suspense>
  }/>,
];
export default FinancialRoutes