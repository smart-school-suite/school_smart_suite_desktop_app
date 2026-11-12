import React, { Suspense } from "react";
import { Route } from "react-router-dom";
import SchoolElectionLayout from "../../layouts/SchoolElectionLayout";

const Elections = React.lazy(() => import("../../pages/Elections/Elections"));
const ElectionWorkspace = React.lazy(() => import("../../pages/Elections/ElectionWorkspace"));
const ElectionType = React.lazy(() => import("../../pages/Elections/ElectionType"));
const ElectionRoles = React.lazy(() => import("../../pages/Elections/ElectionRoles"));
const ElectionApplication = React.lazy(() => import("../../pages/Elections/ElectionApplication"));
const ElectionCandidate = React.lazy(() => import("../../pages/Elections/ElectionCandidates"));
const ElectionOfficeHolders = React.lazy(() => import("../../pages/Elections/ElectionOfficeHolders"));
const ElectionHistory = React.lazy(() => import("../../pages/Elections/ElectionHistory"));

const routes = [
  { key: "elections", path: "/elections", Page: Elections },
  { key: "electionWorkspace", path: "/elections/:electionId", Page: ElectionWorkspace },
  { key: "electionType", path: "/election-type", Page: ElectionType },
  { key: "electionRoles", path: "/election-roles", Page: ElectionRoles },
  { key: "electionApplication", path: "/election-application", Page: ElectionApplication },
  { key: "electionCandidate", path: "/election-candidates", Page: ElectionCandidate },
  { key: "electionOfficeHolders", path: "/election-office-holders", Page: ElectionOfficeHolders },
  { key: "electionHistory", path: "/election-history", Page: ElectionHistory },
];

const SchoolElectionRoutes = [
  <Route key="schoolElection" element={<SchoolElectionLayout />}>
    {routes.map(({ key, path, Page }) => (
      <Route
        key={key}
        path={path}
        element={
          <Suspense>
            <Page />
          </Suspense>
        }
      />
    ))}
  </Route>,
];

export default SchoolElectionRoutes;
