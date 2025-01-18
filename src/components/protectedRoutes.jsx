import React from "react";
import { Navigate } from "react-router-dom"; 
const isAuthenticated = localStorage.getItem("auth_token");
console.log(isAuthenticated);
const ProtectedRoute = ({ children }) => {
  return isAuthenticated ? children : <Navigate to="/login-school-admin" replace />;
};

const ProtectedLoginRoute = ({ children }) => {
  return isAuthenticated ? <Navigate to="/" replace /> : children;
};

export { ProtectedRoute, ProtectedLoginRoute };