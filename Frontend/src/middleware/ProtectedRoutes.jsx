import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";

export const isToken = () => {
  /* return JSON.parse(localStorage.getItem("token")); */
  return localStorage.getItem("token");
};

const ProtectedRoutes = () => {
  const isAuthorized = isToken();

  /* return isAuthorized ? <Outlet /> : <DashBoard />; */

  return isAuthorized ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoutes;
