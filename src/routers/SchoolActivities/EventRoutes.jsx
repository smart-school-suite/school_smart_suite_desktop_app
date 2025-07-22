import React, { Suspense } from "react";
import { Route } from "react-router-dom";
const EventTags = React.lazy(() => import("../../pages/Events/EventTags"));
const ExpiredEvents = React.lazy(() =>
  import("../../pages/Events/ExpiredEvents")
);
const DraftEvents = React.lazy(() => import("../../pages/Events/DraftEvents"));
const ScheduledEvents = React.lazy(() =>
  import("../../pages/Events/ScheduledEvents")
);
const EventCategories = React.lazy(() =>
  import("../../pages/Events/EventCategories")
);
const Events = React.lazy(() => import("../../pages/Events/Events"));
import SchoolEventLayout from "../../layouts/SchoolEventLayout";
const EventRoutes = [
  <Route key={"schoolEventLayout"} element={<SchoolEventLayout />}>
    <Route
      path="/events"
      key="events"
      element={
        <Suspense>
          <Events />
        </Suspense>
      }
    />
    ,
    <Route
      path="/event-tags"
      key="eventTags"
      element={
        <Suspense>
          <EventTags />
        </Suspense>
      }
    />
    ,
    <Route
      path="/event-categories"
      key="eventCategory"
      element={
        <Suspense>
          <EventCategories />
        </Suspense>
      }
    />
    ,
    <Route
      path="/schedule-event"
      key="scheduleEvent"
      element={
        <Suspense>
          <ScheduledEvents />
        </Suspense>
      }
    />
    <Route
      path="/expired-event"
      key="expiredEvent"
      element={
        <Suspense>
          <ExpiredEvents />
        </Suspense>
      }
    />
    <Route
      path="/draft-event"
      key="draftEvent"
      element={
        <Suspense>
          <DraftEvents />
        </Suspense>
      }
    />
  </Route>,
];
export default EventRoutes;
