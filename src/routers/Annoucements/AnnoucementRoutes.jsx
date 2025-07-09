import { Route } from "react-router-dom";
import React, { Suspense } from "react";
const Annoucements = React.lazy(() => import("../../pages/Annoucement/Annoucements"));
const ViewAnnoucements = React.lazy(() => import("../../pages/Annoucement/ActiveAnnouncement"));
const Settings = React.lazy(() => import("../../pages/Annoucement/Settings"));
const ScheduleAnnoucement = React.lazy(() => import("../../pages/Annoucement/ScheduleAnnoucement"));
const ExpiredAnnoucement = React.lazy(() => import("../../pages/Annoucement/ExpiredAnnoucement"));
const AnnouncementCategory = React.lazy(() =>  import("../../pages/Annoucement/AnnouncementCategory"));
const ArchieveAnnoucement = React.lazy(() => import("../../pages/Annoucement/ArchievedAnnoucement"));
import AnnouncementLayout from "../../layouts/AnnouncementLayout";
const AnnouncementTags = React.lazy(() => import("../../pages/Annoucement/AnnouncementTag"));


const AnnoucementsRoutes = [
<Route key={"announcementLayout"} element={<AnnouncementLayout />} >
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
      path="/announcement-category" key="announcementCategory" element={
         <Suspense>
           <AnnouncementCategory />
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
    />,
    <Route
     path="/announcement-tag" 
     key={"announcementTag"}
     element={
       <Suspense>
         <AnnouncementTags />
       </Suspense>
     }
    >

    </Route>
</Route>
];
export default AnnoucementsRoutes;