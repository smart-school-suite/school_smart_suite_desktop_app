import { AblyProvider, ChannelProvider } from "ably/react";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createAblyClient } from "../ably/ably";
import {
  ProtectedLoginRoute,
  ProtectedRoute,
} from "../components/RouteComponentHelpers/ProtectedRoutes";
import AuthLayout from "../layouts/AuthLayout";
import Layout from "../layouts/layout";
import AcademicRoutes from "./Academics/AcademicRoutes";
import CourseRoute from "./Academics/CourseRoutes";
import PromotionRoute from "./Academics/PromotionRoutes";
import ActivationCodeRoutes from "./ActivationCode/ActivationCode";
import AdministratorsRoutes from "./Administrator/AdminRoutes";
import AuthRoutes from "./Auth/AuthRoutes";
import DashboardRoutes from "./Dasboard/DashboardRoutes";
import ExamRoutes from "./Exam/ExamRoutes";
import FinancialRoutes from "./Financial/FinancialRoutes";
import ResitRoutes from "./Resit/ResitRoutes";
import AnnoucementsRoutes from "./SchoolActivities/AnnoucementRoutes";
import SchoolElectionRoutes from "./SchoolActivities/ElectionRoutes";
import EventRoutes from "./SchoolActivities/EventRoutes";
import SettingsRoutes from "./Settings/SettingsRoutes";
import StudentRoutes from "./Student/StudentRoutes";
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
                          <ChannelProvider channelName={`private:schoolBranch.${schoolBranchId}.schoolAdmin.${adminId}.jobs`} >
                        <Layout />
                        </ChannelProvider>
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
                ...ActivationCodeRoutes,
                ...CourseRoute,
                ...PromotionRoute
              ]}
            </Route>
          </Routes>
    </BrowserRouter>
  );
}

export default Links;
