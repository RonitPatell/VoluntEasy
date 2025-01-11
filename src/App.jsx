import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthButtons from "./components/AuthButtons";
import ProtectedRoute from "./components/ProtectedRoute";

const Dashboard = () => <h1>Dashboard: Private Page</h1>;

function App() {
  return (
    <Router>
      <div>
        <h1>My React Auth0 App</h1>
        <AuthButtons />
        <Routes>
          <Route path="/" element={<h2>Home Page</h2>} />
          <Route path="/dashboard" element={<ProtectedRoute component={Dashboard} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
