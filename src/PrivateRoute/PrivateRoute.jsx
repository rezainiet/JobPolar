import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );
  }

  if (!user) {
    // Redirect to the login page if the user is not authenticated
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Render the protected content if the user is authenticated
  return <>{children}</>;
};

export default PrivateRoute;
