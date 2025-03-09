import React, { Suspense } from "react";
import { Route } from "react-router-dom";
const Generalsettings = React.lazy(() =>  import("../../pages/settings/Generalsettings"));
const Display = React.lazy(() => import("../../pages/settings/Display"));
const New  = React.lazy(() => import("../../pages/settings/New"));
const Profile = React.lazy(() => import("../../pages/settings/Profile"));
const Security = React.lazy(() => import("../../pages/settings/Security"));
const Help = React.lazy(() => import("../../pages/settings/Help"));

const SettingsRoutes =  [
  
  <Route key={"generalSettings"} path="/settings/general-settings" element={
    <Suspense>
      <Generalsettings />
    </Suspense>
  }/>,
  <Route key={"display"} path="/settings/display" element={
    <Suspense>
      <Display />
    </Suspense>
  }/>,
  <Route key={"new"} path="/settings/updates" element={
    <Suspense>
      <New />
    </Suspense>
  }/>,
  <Route key={"profile"} path="/settings/profile" element={
    <Suspense>
      <Profile />
    </Suspense>
  }/>,
  <Route key={"securiy"} path="/settings/security" element={
    <Suspense>
      <Security />
    </Suspense>
  }></Route>,
  <Route key={"help"}  path="/settings/help" element={
    <Suspense>
      <Help />
    </Suspense>
  }/>
];
export default SettingsRoutes;
