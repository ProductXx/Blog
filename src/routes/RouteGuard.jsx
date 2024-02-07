import Cookies from "js-cookie";
import React from "react";
import { Navigate } from "react-router-dom";

const RouteGuard = ({ children }) => {
  const token = Cookies.get("token");

  if (token) {
    return <Navigate to={"/"} />;
  }
  return <div>{children}</div>;
};

export default RouteGuard;
