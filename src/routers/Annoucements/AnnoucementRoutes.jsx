import { Route } from "react-router-dom";
import React, { Suspense } from "react";
const Annoucements = React.lazy(() => import("../../pages/Media/Annoucements"));
const ViewAnnoucements = React.lazy(() => import("../../pages/Media/Annoucement/ViewAnnoucements"));
const Settings = React.lazy(() => import("../../pages/Media/Annoucement/Settings"));
const ScheduleAnnoucement = React.lazy(() => import("../../pages/Media/Annoucement/ScheduleAnnoucement"));
const ExpiredAnnoucement = React.lazy(() => import("../../pages/Media/Annoucement/ExpiredAnnoucement"));
const EngagmentAnalytics = React.lazy(() =>  import("../../pages/Media/Annoucement/EngamentAnalytics"));
const ArchieveAnnoucement = React.lazy(() => import("../../pages/Media/Annoucement/ArchievedAnnoucement"));
const AnnoucementsRoutes = [
    <Route  path="/annoucements" key="annoucement" element={
        <Suspense>
            <Annoucements />
        </Suspense>
    } />,
    <Route 
      path="/archieveAnnoucement" key="archieveAnnoucement" element={
         <Suspense>
             <ArchieveAnnoucement />
         </Suspense>
      }
    />,
    <Route
      path="/engagementAnalytics" key="engagementAnalytics" element={
         <Suspense>
           <EngagmentAnalytics />
         </Suspense>
      } 
    />,
    <Route 
     path="/expiredAnnoucement" key="expiredAnnoucement" element={
          <Suspense>
           <ExpiredAnnoucement />
          </Suspense>
     }
    />,
    <Route 
      path="/scheduledAnnoucement" key="scheduledAnnoucement" element={
         <Suspense>
          <ScheduleAnnoucement  />
         </Suspense>
      }
    />,
    <Route 
     path="/annoucementSettings" key="annoucementSettings" element={
         <Suspense>
            <Settings />
         </Suspense>
     }
    />,
    <Route 
      path="/viewAnnoucement" key="viewAnnoucement" element={
         <Suspense>
            <ViewAnnoucements />
         </Suspense>
      }
    />
];
export default AnnoucementsRoutes;