import React, { Suspense } from "react";
import { Route } from "react-router-dom";
const SchoolElection = React.lazy(() => import("../../pages/Elections/SchoolElections"));
const PassElections = React.lazy(() => import("../../pages/Elections/PassElections"));
const ElectionApplication = React.lazy(() => import("../../pages/Elections/ElectionApplication"));
const ElectionCandidate = React.lazy(()  => import("../../pages/Elections/ElectionCandidates"));
const ViewElections = React.lazy(() => import("../../pages/Elections/ViewElections"));
const PassWinners = React.lazy(() => import("../../pages/Elections/PassWinners"));
const ElectionSettings = React.lazy(() => import("../../pages/Elections/ElectionSettings"))
const ElectionResults = React.lazy(() => import("../../pages/Elections/ElectionResults"))
const ElectionRoles = React.lazy(() => import("../../pages/Elections/ElectionRoles"))
const SchoolElectionRoutes = [
    <Route key="schoolElection" path="/schoolElections" element={
        <Suspense>
            <SchoolElection />
        </Suspense>
    } />,
    <Route 
      key="passElections" path="/passElection" element={
         <Suspense>
            <PassElections />
         </Suspense>
      }
    />,
    <Route 
      key="electionApplication" path="/electionApplication" element={
         <Suspense>
            <ElectionApplication />
         </Suspense>
      }
    />,
    <Route 
      key="electionCandidate" path="/electionCandidates" element={
         <Suspense>
          <ElectionCandidate />
         </Suspense>
      }
    />,
    <Route 
      key="viewElections" path="/viewElections" element={
         <Suspense>
            <ViewElections />
         </Suspense>
      }
    />,
    <Route 
      key="passWinners" path="/passWinners" element={
         <Suspense>
            <PassWinners />
         </Suspense>
      }
    />,
   <Route 
     key="electionSettings" path="/electionSettings" element={
         <Suspense>
            <ElectionSettings />
         </Suspense>
     }
   />,
   <Route 
     key="electionResults" path="/electionResults" element={
         <Suspense>
            <ElectionResults />
         </Suspense>
     }
   />,
   <Route 
     key="electionRoles" path="/electionRoles" element={
       <Suspense>
         <ElectionRoles />
       </Suspense>
     }
   />
];
export default SchoolElectionRoutes;