// import React from "react";
// import { Navigate } from "react-router-dom";
// import { useAuth0 } from "@auth0/auth0-react";

// const ProtectedRoute = ({ component: Component }) => {
//   const { isAuthenticated } = useAuth0();
//   return isAuthenticated ? <Component /> : <Navigate to="/" />;
// };

// export default ProtectedRoute;
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ component: Component }) => {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>; // Show a loading indicator while authentication is being checked
  }

  return isAuthenticated ? <Component /> : <Navigate to="/login" />;
};

export default ProtectedRoute;

