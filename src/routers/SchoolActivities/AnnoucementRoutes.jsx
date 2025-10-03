import { Route } from "react-router-dom";
import React, { Suspense } from "react";
const Annoucements = React.lazy(() => import("../../pages/Annoucement/Annoucements"));
const ViewAnnoucements = React.lazy(() => import("../../pages/Annoucement/ActiveAnnouncement"));
const ScheduleAnnoucement = React.lazy(() => import("../../pages/Annoucement/ScheduleAnnoucement"));
const ExpiredAnnoucement = React.lazy(() => import("../../pages/Annoucement/ExpiredAnnoucement"));
const AnnouncementCategory = React.lazy(() =>  import("../../pages/Annoucement/AnnouncementCategory"));
const DraftAnnouncement = React.lazy(() => import("../../pages/Annoucement/DraftAnnouncement"))
import AnnouncementLayout from "../../layouts/AnnouncementLayout";

const AnnoucementsRoutes = [
<Route key={"announcementLayout"} element={<AnnouncementLayout />} >
       <Route  path="/announcement-overview" key="annoucement" element={
        <Suspense>
            <Annoucements />
        </Suspense>
    } />,
    <Route 
     path="/draft-annoucement" 
      key={"announcement-draft"}
      element={
        <Suspense>
          <DraftAnnouncement />
        </Suspense>
      }
    />
    <Route
      path="/announcement-category" key="announcement-category" element={
         <Suspense>
           <AnnouncementCategory />
         </Suspense>
      } 
    />,
    <Route 
     path="/expired-annoucement" key="expired-annoucement" element={
          <Suspense>
           <ExpiredAnnoucement />
          </Suspense>
     }
    />,
    <Route 
      path="/scheduled-annoucement" key="scheduled-annoucement" element={
         <Suspense>
          <ScheduleAnnoucement  />
         </Suspense>
      }
    />,
    <Route 
      path="/announcement" key="viewAnnoucement" element={
         <Suspense>
            <ViewAnnoucements />
         </Suspense>
      }
    />,
</Route>
];
export default AnnoucementsRoutes;