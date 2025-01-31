import React from "react";
import { Navigate } from "react-router-dom"; 
const isAuthenticated = localStorage.getItem("auth_token");
const ProtectedRoute = ({ children }) => {
  return isAuthenticated ? children : <Navigate to="/" replace />;
};

const ProtectedLoginRoute = ({ children }) => {
  return isAuthenticated ? <Navigate to="/" replace /> : children;
};

export { ProtectedRoute, ProtectedLoginRoute };