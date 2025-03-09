import React, { Suspense } from "react";
import { Route } from "react-router-dom";
const Events = React.lazy(() => import("../../pages/Events/Events"));
const EventRoutes = [
    <Route  path="/events"  key="events" element={
        <Suspense>
            <Events />
        </Suspense>
    }/>
];
export default EventRoutes;