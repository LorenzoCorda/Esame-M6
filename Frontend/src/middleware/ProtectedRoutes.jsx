import React from "react";
import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";

export const isToken = () => {
  return localStorage.getItem("token");
};

const ProtectedRoutes = () => {
  const isAuthorized = isToken();

  return isAuthorized ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoutes;
