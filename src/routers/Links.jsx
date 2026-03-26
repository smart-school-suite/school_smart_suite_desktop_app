import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../layouts/layout";
import {
  ProtectedRoute,
  ProtectedLoginRoute,
} from "../components/RouteComponentHelpers/protectedRoutes";
import AuthLayout from "../layouts/AuthLayout";
import AuthRoutes from "./Auth/AuthRoutes";
import AcademicRoutes from "./Academics/AcademicRoutes";
import AdministratorsRoutes from "./Administrator/AdminRoutes";
import AnnoucementsRoutes from "./SchoolActivities/AnnoucementRoutes";
import SchoolElectionRoutes from "./SchoolActivities/ElectionRoutes";
import DashboardRoutes from "./Dasboard/DashboardRoutes";
import EventRoutes from "./SchoolActivities/EventRoutes";
import FinancialRoutes from "./Financial/FinancialRoutes";
import SettingsRoutes from "./Settings/SettingsRoutes";
import StudentRoutes from "./Student/StudentRoutes";
import ExamRoutes from "./Exam/ExamRoutes";
import ResitRoutes from "./Resit/ResitRoutes";
import ActivationCodeRoutes from "./ActivationCode/ActivationCode";
import { useSelector } from "react-redux";
import { AblyProvider, ChannelProvider } from "ably/react";
import { createAblyClient } from "../ably/ably";
import { useMemo } from "react";
function Links() {
  const token = useSelector((state) => state.auth?.token);
  const apiKey = useSelector((state) => state.auth?.apiKey);
  const adminId = useSelector((state) => state.auth?.user?.authSchoolAdmin?.id);
  const schoolBranchId = useSelector((state) => state.auth?.user?.authSchoolAdmin?.school_branch_id);
  const ablyClient = useMemo(() => {
    if (!token || !adminId) return null;
    return createAblyClient(token, adminId, apiKey);
  }, [token, adminId, apiKey]);
  return (
    <BrowserRouter>
          <Routes>
            <Route
              element={
                <ProtectedLoginRoute>
                  <AuthLayout />
                </ProtectedLoginRoute>
              }
            >
              {[...AuthRoutes]}
            </Route>
            <Route
              element={
                <ProtectedRoute>
                  {ablyClient ? (
                    <AblyProvider client={ablyClient}>
                      <ChannelProvider channelName={`private:App.Models.Schooladmin.${adminId}`}>
                        <ChannelProvider channelName={`private:schoolBranch.${schoolBranchId}.schoolAdmin.${adminId}.semesterTimetable`} >
                        <Layout />
                        </ChannelProvider>
                      </ChannelProvider>
                    </AblyProvider>
                  ) : (
                    <Layout />
                  )}
                </ProtectedRoute>
              }
            >
              {[
                ...SettingsRoutes,
                ...StudentRoutes,
                ...AcademicRoutes,
                ...AdministratorsRoutes,
                ...AnnoucementsRoutes,
                ...DashboardRoutes,
                ...EventRoutes,
                ...FinancialRoutes,
                ...SchoolElectionRoutes,
                ...ExamRoutes,
                ...ResitRoutes,
                ...ActivationCodeRoutes
              ]}
            </Route>
          </Routes>
    </BrowserRouter>
  );
}

export default Links;
