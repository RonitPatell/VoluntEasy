import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const AuthButtons = () => {
  const { loginWithRedirect, logout, isAuthenticated, user, isLoading } = useAuth0();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      {!isAuthenticated ? (
        <button onClick={() => loginWithRedirect()}>Log In</button>
      ) : (
        <div>
          <p>Welcome, {user.name}</p>
          <button
            onClick={() =>
              logout({ logoutParams: { returnTo: window.location.origin } })
            }
          >
            Log Out
          </button>
        </div>
      )}
    </div>
  );
};

export default AuthButtons;
