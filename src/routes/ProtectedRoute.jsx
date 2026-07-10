import PropTypes from "prop-types";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useAuth } from "../context/auth";

import { Loader } from "../components/common";

export const ProtectedRoute = ({ children }) => {
  const {
    user,
    loading,
  } = useAuth();

  const location = useLocation();

  if (loading) {
    return (
      <Loader message="Verificando autenticación..." />
    );
  }

  if (!user) {
    return (
      <Navigate
        to="/admin/login"
        replace
        state={{ from: location }}
      />
    );
  }

  return children ?? <Outlet />;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node,
};