import './index.css'
import React from "react";
import ReactDOM from "react-dom/client";
import { Auth0Provider } from "@auth0/auth0-react";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Auth0Provider
    domain="dev-8ednezwqq36kf4ie.ca.auth0.com"
    clientId="PPkqxCFIPfBhSwpkyOGV37o4EVnLG5vj"
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
  >
    <App />
  </Auth0Provider>
);

