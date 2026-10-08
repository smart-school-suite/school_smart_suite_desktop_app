import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom"; 

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return isAuthenticated ? children : <Navigate to="/login-school-admin" replace />;
};

const ProtectedLoginRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return isAuthenticated ? <Navigate to="/" replace /> : children;
};

export { ProtectedRoute, ProtectedLoginRoute };