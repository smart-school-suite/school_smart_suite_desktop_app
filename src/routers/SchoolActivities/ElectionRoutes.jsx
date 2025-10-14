import React, { Suspense } from "react";
import { Route } from "react-router-dom";
const ElectionOverview = React.lazy(() =>
  import("../../pages/Elections/ElectionOverview")
);
const ElectionApplication = React.lazy(() =>
  import("../../pages/Elections/ElectionApplication")
);
const ElectionCandidate = React.lazy(() =>
  import("../../pages/Elections/ElectionCandidates")
);
const ElectionRoles = React.lazy(() =>
  import("../../pages/Elections/ElectionRoles")
);
const ElectionType = React.lazy(() =>
  import("../../pages/Elections/ElectionType")
);
const Elections = React.lazy(() => import("../../pages/Elections/Elections"));
const ElectionHistory = React.lazy(() => import("../../pages/Elections/ElectionHistory"));
import SchoolElectionLayout from "../../layouts/SchoolElectionLayout";
const SchoolElectionRoutes = [
  <Route key={"schoolElection"} element={<SchoolElectionLayout />}>
    <Route
      key="schoolElection"
      path="/election-overview"
      element={
        <Suspense>
          <ElectionOverview />
        </Suspense>
      }
    />
    ,
    <Route
      key="electionHistory"
      path="/election-history"
      element={
        <Suspense>
          <ElectionHistory />
        </Suspense>
      }
    />
    ,
    <Route
      key="elections"
      path="/elections"
      element={
        <Suspense>
          <Elections />
        </Suspense>
      }
    />
    ,
    <Route
      key="electionType"
      path="/election-type"
      element={
        <Suspense>
          <ElectionType />
        </Suspense>
      }
    />
    ,
    <Route
      key="electionApplication"
      path="/election-application"
      element={
        <Suspense>
          <ElectionApplication />
        </Suspense>
      }
    />
    ,
    <Route
      key="electionCandidate"
      path="/election-candidates"
      element={
        <Suspense>
          <ElectionCandidate />
        </Suspense>
      }
    />
    ,
    <Route
      key="electionRoles"
      path="/election-roles"
      element={
        <Suspense>
          <ElectionRoles />
        </Suspense>
      }
    />
  </Route>,
];
export default SchoolElectionRoutes;
