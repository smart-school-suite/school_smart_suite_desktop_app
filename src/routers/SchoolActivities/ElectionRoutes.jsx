import React, { Suspense } from "react";
import { Route } from "react-router-dom";
const ElectionOverview = React.lazy(() => import("../../pages/Elections/ElectionOverview"));
const PassElections = React.lazy(() => import("../../pages/Elections/PassElections"));
const ElectionApplication = React.lazy(() => import("../../pages/Elections/ElectionApplication"));
const ElectionCandidate = React.lazy(()  => import("../../pages/Elections/ElectionCandidates"));
const ViewElections = React.lazy(() => import("../../pages/Elections/ViewElections"));
const PassWinners = React.lazy(() => import("../../pages/Elections/PassWinners"));
const ElectionResults = React.lazy(() => import("../../pages/Elections/ElectionResults"))
const ElectionRoles = React.lazy(() => import("../../pages/Elections/ElectionRoles"))
import SchoolElectionLayout from "../../layouts/SchoolElectionLayout";
const SchoolElectionRoutes = [
    <Route key={"schoolElection"} element={<SchoolElectionLayout />}>
          <Route key="schoolElection" path="/election-overview" element={
        <Suspense>
            <ElectionOverview />
        </Suspense>
    } />,
    <Route 
      key="passElections" path="/past-election" element={
         <Suspense>
            <PassElections />
         </Suspense>
      }
    />,
    <Route 
      key="electionApplication" path="/election-application" element={
         <Suspense>
            <ElectionApplication />
         </Suspense>
      }
    />,
    <Route 
      key="electionCandidate" path="/election-candidates" element={
         <Suspense>
          <ElectionCandidate />
         </Suspense>
      }
    />,
    <Route 
      key="viewElections" path="/view-elections" element={
         <Suspense>
            <ViewElections />
         </Suspense>
      }
    />,
    <Route 
      key="passWinners" path="/past-Winners" element={
         <Suspense>
            <PassWinners />
         </Suspense>
      }
    />,
   <Route 
     key="electionResults" path="/election-results" element={
         <Suspense>
            <ElectionResults />
         </Suspense>
     }
   />,
   <Route 
     key="electionRoles" path="/election-roles" element={
       <Suspense>
         <ElectionRoles />
       </Suspense>
     }
   />
    </Route>
];
export default SchoolElectionRoutes;