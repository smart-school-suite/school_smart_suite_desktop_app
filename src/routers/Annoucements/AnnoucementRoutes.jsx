import { Route } from "react-router-dom";
import React, { Suspense } from "react";
const Annoucements = React.lazy(() => import("../../pages/Media/Annoucements"));
const AnnoucementsRoutes = [
    <Route  path="/annoucements" key="annoucement" element={
        <Suspense>
            <Annoucements />
        </Suspense>
    } />
];
export default AnnoucementsRoutes;