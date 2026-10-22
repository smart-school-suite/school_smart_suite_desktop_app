import { TOKEN_KEY } from "@/constants";
import { AblyProvider, ChannelProvider } from "ably/react";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createAblyClient } from "../ably/ably";
import FullScreenLoader from "../components/PageLoaders/FullScreenLoader";
import {
  ProtectedLoginRoute,
  ProtectedRoute,
} from "../components/RouteComponentHelpers/ProtectedRoutes";
import AuthLayout from "../layouts/AuthLayout";
import Layout from "../layouts/layout";
import { secureTokenStorage } from "../services/secureStore/secureTokenStorage";
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
  const adminId = useSelector((state) => state.auth?.user?.authSchoolAdmin?.id);
  const schoolBranchId = useSelector(
    (state) => state.auth?.user?.authSchoolAdmin?.school_branch_id,
  );

  const [tokenState, setTokenState] = useState({ adminId: null, token: null });

  useEffect(() => {
    if (!adminId) {
      setTokenState({ adminId: null, token: null });
      return;
    }

    let cancelled = false;
    (async () => {
      const token = await secureTokenStorage.get(TOKEN_KEY.AUTH_TOKEN);
      if (!cancelled) setTokenState({ adminId, token });
    })();

    return () => {
      cancelled = true;
    };
  }, [adminId]);

  const tokenReady = !adminId || tokenState.adminId === adminId;
  const token = tokenReady ? tokenState.token : null;

  const ablyClient = useMemo(() => {
    if (!token || !adminId) return null;
    return createAblyClient(token, adminId);
  }, [token, adminId]);

  useEffect(() => {
    return () => {
      ablyClient?.close();
    };
  }, [ablyClient]);

  const authPending = Boolean(adminId) && !tokenReady;

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
              {authPending ? (
                <FullScreenLoader />
              ) : ablyClient ? (
                <AblyProvider client={ablyClient}>
                  <ChannelProvider
                    channelName={`private:App.Models.Schooladmin.${adminId}`}
                  >
                    <ChannelProvider
                      channelName={`private:schoolBranch.${schoolBranchId}.schoolAdmin.${adminId}.semesterTimetable`}
                    >
                      <ChannelProvider
                        channelName={`private:schoolBranch.${schoolBranchId}.schoolAdmin.${adminId}.jobs`}
                      >
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
            ...PromotionRoute,
          ]}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Links;