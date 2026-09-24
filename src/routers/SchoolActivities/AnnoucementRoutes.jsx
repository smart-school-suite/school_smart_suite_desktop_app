import { Route } from "react-router-dom";
import React, { Suspense } from "react";
const Annoucements = React.lazy(
  () => import("../../pages/Annoucement/Annoucements"),
);
const ActiveAnnouncement = React.lazy(
  () => import("../../pages/Annoucement/ActiveAnnouncement"),
);
const ScheduleAnnoucement = React.lazy(
  () => import("../../pages/Annoucement/ScheduleAnnoucement"),
);
const AnnouncementCategory = React.lazy(
  () => import("../../pages/Annoucement/AnnouncementCategory"),
);
const DraftAnnouncement = React.lazy(
  () => import("../../pages/Annoucement/DraftAnnouncement"),
);
import AnnouncementLayout from "../../layouts/AnnouncementLayout";

const AnnoucementsRoutes = [
  <Route key={"announcementLayout"} element={<AnnouncementLayout />}>
    <Route
      path="/all-announcement"
      key={"all-announcement"}
      element={
        <Suspense>
          <Annoucements />
        </Suspense>
      }
    />
    ,
    <Route
      path="/draft-announcement"
      key={"announcement-draft"}
      element={
        <Suspense>
          <DraftAnnouncement />
        </Suspense>
      }
    />
    ,
    <Route
      path="/announcement-category"
      key="announcement-category"
      element={
        <Suspense>
          <AnnouncementCategory />
        </Suspense>
      }
    />
    ,
    <Route
      path="/scheduled-announcement"
      key="scheduled-announcement"
      element={
        <Suspense>
          <ScheduleAnnoucement />
        </Suspense>
      }
    />
    ,
    <Route
      path="/active-announcement"
      key="active-announcement"
      element={
        <Suspense>
          <ActiveAnnouncement />
        </Suspense>
      }
    />
    ,
  </Route>,
];
export default AnnoucementsRoutes;
