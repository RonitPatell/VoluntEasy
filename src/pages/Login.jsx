import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginPage = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-6">Log In to VoluntEasy</h1>
      <button
        onClick={() => loginWithRedirect()}
        className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
      >
        Log In
      </button>
    </div>
  );
};

export default LoginPage;
