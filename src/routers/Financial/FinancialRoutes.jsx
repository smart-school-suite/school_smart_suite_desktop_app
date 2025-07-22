import React, { Suspense } from "react";
import { Route } from "react-router-dom";
const RegistrationFees = React.lazy(() =>
  import("../../pages/Finances/RegistrationFees")
);
const RegistrationFeeTransactions = React.lazy(() =>
  import("../../pages/Finances/Transactions/RegistrationFeesTransactions")
);
const ResitFee = React.lazy(() => import("../../pages/Finances/ResitFee"));
const ResitFeeTransactions = React.lazy(() =>
  import("../../pages/Finances/Transactions/ResitFeeTransactions")
);
const SchoolExpenses = React.lazy(() =>
  import("../../pages/Finances/Schoolexpenses")
);
const TuitionFees = React.lazy(() => import("../../pages/Finances/TuitionFee"));
const TuitionFeeTransactions = React.lazy(() =>
  import("../../pages/Finances/Transactions/TuitionFeeTransactions")
);
const AdditionalFees = React.lazy(() =>
  import("../../pages/Finances/AdditionalFees")
);
const AdditionalFeeTransactions = React.lazy(() =>
  import("../../pages/Finances/Transactions/AdditionalFeesTransactions")
);
const SchoolExpensesCategory = React.lazy(() =>
  import("../../pages/Finances/SchoolExpensesCategory")
);
const FeeSchedule = React.lazy(() =>
  import("../../pages/Finances/FeeSchedule")
);
const BillStudentAdditionalFee = React.lazy(() =>
  import("../../pages/Finances/BillStudentAdditionalFee")
);
const AdditionalFeeCategory = React.lazy(() =>
  import("../../pages/Finances/AdditionalFeeCategory")
);
import SchoolExpensesLayout from "../../layouts/SchoolExpensesLayout";
import RegistrationFeeLayout from "../../layouts/RegistrationFeeLayout";
import TuitionFeeLayout from "../../layouts/TuitionFeeLayout";
import AdditionalFeeLayout from "../../layouts/AdditionalFeeLayout";
const FinancialRoutes = [
  <Route
    key={"resitFee"}
    path="/resit-payment"
    element={
      <Suspense>
        <ResitFee />
      </Suspense>
    }
  />,
  <Route
    key={"resitFeeTransactions"}
    path="/resitfee-transaction"
    element={
      <Suspense>
        <ResitFeeTransactions />
      </Suspense>
    }
  />,
  <Route key={"registrationFeeLayout"} element={<RegistrationFeeLayout />}>
    <Route
      key={"registrationFees"}
      path="/registration-fees"
      element={
        <Suspense>
          <RegistrationFees />
        </Suspense>
      }
    />
    ,
    <Route
      key={"registrationFeeTransactions"}
      path="/registrationfee-transactions"
      element={
        <Suspense>
          <RegistrationFeeTransactions />
        </Suspense>
      }
    />
    ,
  </Route>,
  <Route element={<SchoolExpensesLayout />} key={"schoolExpensesLayout"}>
    <Route
      key={"schoolExpensesCategory"}
      path="/school-expense-category"
      element={
        <Suspense>
          <SchoolExpensesCategory />
        </Suspense>
      }
    />
    <Route
      key={"schoolExpenses"}
      path="/school-expense"
      element={
        <Suspense>
          <SchoolExpenses />
        </Suspense>
      }
    />
  </Route>,
  <Route key={"additionalFeeManagement"} element={<AdditionalFeeLayout />}>
    <Route
      key={"additionalFees"}
      path="/additional-fees"
      element={
        <Suspense>
          <AdditionalFees />
        </Suspense>
      }
    />
    ,
    <Route
      key={"additionalFeeTransactions"}
      path="/additionalfee-transactions"
      element={
        <Suspense>
          <AdditionalFeeTransactions />
        </Suspense>
      }
    />
    ,
    <Route
      key={"billStudentAdditionalFee"}
      path="/additional-fee/student-billing"
      element={
        <Suspense>
          <BillStudentAdditionalFee />
        </Suspense>
      }
    />
    ,
    <Route
      key={"additionalFeeCategory"}
      path="/additional-fee/category"
      element={
        <Suspense>
          <AdditionalFeeCategory />
        </Suspense>
      }
    />
  </Route>,
  <Route key={"tuitionFeeLayout"} element={<TuitionFeeLayout />}>
    <Route
      key={"tuitionFees"}
      path="/fee-payments"
      element={
        <Suspense>
          <TuitionFees />
        </Suspense>
      }
    />
    ,
    <Route
      key={"tuitionFeeTransactions"}
      path="/fee-payment-transactions"
      element={
        <Suspense>
          <TuitionFeeTransactions />
        </Suspense>
      }
    />
    <Route
      key={"tuitionFeeSchedule"}
      path="/fee-payment-schedule"
      element={
        <Suspense>
          <FeeSchedule />
        </Suspense>
      }
    />
  </Route>,
];
export default FinancialRoutes;
