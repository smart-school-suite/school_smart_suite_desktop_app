import React, { Suspense } from "react";
import { Navigate } from "react-router-dom"; 
import { useAuth } from "../context/authContext";

const ProtectedRoute = ({ element: Element, ...rest }) => {
  const { isAuthenticated  } = useAuth(); // Let's assume there's a loading state
  return isAuthenticated ? (
    <Element {...rest} />
  ) : (
    <Navigate to="/login-school-admin" replace /> 
  );
};

export default ProtectedRoute;