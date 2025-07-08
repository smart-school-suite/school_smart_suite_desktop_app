import React, { Suspense } from "react";
import { Route } from "react-router-dom";
const Generalsettings = React.lazy(() =>  import("../../pages/settings/Generalsettings"));
import SetttingLayout from "../../layouts/SettingLayout";
const Display = React.lazy(() => import("../../pages/settings/Display"));
const Profile = React.lazy(() => import("../../pages/settings/Profile"));
const Security = React.lazy(() => import("../../pages/settings/Security"));
const School = React.lazy(() => import("../../pages/settings/School"));
const SchoolBranch = React.lazy(() => import("../../pages/settings/SchoolBranch"))
const AppSettings = React.lazy(() => import("../../pages/settings/AppSettings"));
const Subscriptions = React.lazy(() => import("../../pages/settings/Subscriptions"));
const SettingsRoutes =  [
   <Route key={"settingLayout"}  element={<SetttingLayout />}>
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
  <Route key={"school"} path="/settings/school" element={
    <Suspense>
      <School />
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
  <Route key={"schoolBranch"}  path="/settings/school-branch" element={
    <Suspense>
      <SchoolBranch />
    </Suspense>
  }/>,
  <Route key={"subscriptions"}  path="/settings/subscription" element={
    <Suspense>
      <Subscriptions />
    </Suspense>
  }/>,
  <Route key={"appSettings"} path="/settings/app-settings" element={
     <Suspense>
      <AppSettings />
    </Suspense>
  }/> 
   </Route>
];
export default SettingsRoutes;
