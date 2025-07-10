import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Layout from "../layouts/layout";
import {
  ProtectedRoute,
  ProtectedLoginRoute,
} from "../components/RouteComponentHelpers/protectedRoutes";
import AuthLayout from "../layouts/AuthLayout";
import AuthRoutes from "./Auth/AuthRoutes";
import AcademicRoutes from "./Academics/AcademicRoutes";
import AdministratorsRoutes from "./Administrator/AdminRoutes";
import AnnoucementsRoutes from "./Annoucements/AnnoucementRoutes";
import CustomerSupportRoutes from "./CustomerSupport/CustomerSpportRoutes";
import DashboardRoutes from "./Dasboard/DashboardRoutes";
import EventRoutes from "./Events/EventRoutes";
import FinancialRoutes from "./Financial/FinancialRoutes";
import FormRoutes from "./Forms/FormRoutes";
import SettingsRoutes from "./Settings/SettingsRoutes";
import StudentRoutes from "./Student/StudentRoutes";
import SchoolElectionRoutes from "./Election/ElectionRoutes";
import ExamRoutes from "./Exam/ExamRoutes";
import ResitRoutes from "./Resit/ResitRoutes";
import { CSSTransition, TransitionGroup } from "react-transition-group";
function Links() {
  return (
    <BrowserRouter>
      <TransitionGroup>
      <CSSTransition key={location.key} classNames="fade" timeout={300}>
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
              <Layout />
            </ProtectedRoute>
          }
        >
            {[
              ...SettingsRoutes,
              ...StudentRoutes,
              ...AcademicRoutes,
              ...AdministratorsRoutes,
              ...AnnoucementsRoutes,
              ...CustomerSupportRoutes,
              ...DashboardRoutes,
              ...EventRoutes,
              ...FinancialRoutes,
              ...FormRoutes,
              ...SchoolElectionRoutes,
              ...ExamRoutes,
              ...ResitRoutes
            ]}
        </Route>
      </Routes>
      </CSSTransition>
      </TransitionGroup>
    </BrowserRouter>
  );
}

export default Links;
