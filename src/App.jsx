// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import AuthButtons from "./components/AuthButtons";
// import ProtectedRoute from "./components/ProtectedRoute";
// import HomePage from "./pages/Home"; // Assuming this is your Home page
// import LoginPage from "./pages/Login"; // Assuming this is your Login page
// import Navbar from "./components/Navbar";

// const Dashboard = () => (
//   <div>
//     <h1>Dashboard: Private Page</h1>
//     <p>Welcome to your private dashboard!</p>
//   </div>
// );

// function App() {
//   return (
//     <Router>
//       <div>
//         <Navbar />
//         {/* Header */}
//         <h1>VoluntEasy</h1>
//         <AuthButtons />

//         {/* Define Routes */}
//         <Routes>
//           {/* Public Home Page */}
//           <Route path="/" element={<HomePage />} />

//           {/* Public Login Page */}
//           <Route path="/login" element={<LoginPage />} />

//           {/* Private Dashboard Page */}
//           <Route path="/dashboard" element={<ProtectedRoute component={Dashboard} />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;

import React from 'react'; 
import { Auth0Provider } from '@auth0/auth0-react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import './App.css';

const App = () => {
  const domain = 'dev-8ednezwqq36kf4ie.ca.auth0.com';
  const clientId = 'PPkqxCFIPfBhSwpkyOGV37o4EVnLG5vj';

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <div className="app">
        <Navbar />
        <HeroSection />
      </div>
    </Auth0Provider>
  );
};

export default App;