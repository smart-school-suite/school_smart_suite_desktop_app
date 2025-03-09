import React, { Suspense } from "react";
import { Route } from "react-router-dom";
const SchoolElection = React.lazy(() => import("../../pages/Elections/SchoolElections"));
const SchoolElectionRoutes = [
    <Route key="schoolElection" path="/schoolElections" element={
        <Suspense>
            <SchoolElection />
        </Suspense>
    } />
];
export default SchoolElectionRoutes;