import React from "react";
import { Navigate } from "react-router-dom";


export default function ProtectedRoute( {children} ) {
  
  const tokenAdmin = localStorage.getItem("tokenAdmin");
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  const token = localStorage.getItem("token");

  if (!tokenAdmin && !token && !isLoggedIn) {
    return <Navigate to="/login" />;
  }
  return children;
}
