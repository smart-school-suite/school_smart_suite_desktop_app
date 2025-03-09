import React, { Suspense } from "react";
import { Route } from "react-router-dom";
const CustomerSupport = React.lazy(() => import("../../pages/CustomerSupport/Customersupport"));
const CustomerSupportRoutes = [
  <Route  key="customerSupport"  path="/customer-support"  element={
    <Suspense>
      <CustomerSupport />
    </Suspense>
  } />
];
export default CustomerSupportRoutes