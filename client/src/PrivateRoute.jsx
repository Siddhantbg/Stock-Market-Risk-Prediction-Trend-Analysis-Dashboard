import React from "react";
import { Navigate } from "react-router-dom";

// Example usage: <PrivateRoute isAuthenticated={userIsLoggedIn}><Dashboard /></PrivateRoute>
const PrivateRoute = ({ isAuthenticated, children }) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default PrivateRoute;
