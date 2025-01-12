// import React from 'react'; 
// import { Auth0Provider } from '@auth0/auth0-react';
// import Navbar from './components/Navbar';
// import HeroSection from './components/HeroSection';
// import './App.css';

// const App = () => {
//   const domain = 'dev-8ednezwqq36kf4ie.ca.auth0.com';
//   const clientId = 'PPkqxCFIPfBhSwpkyOGV37o4EVnLG5vj';

//   return (
//     <Auth0Provider
//       domain={domain}
//       clientId={clientId}
//       authorizationParams={{
//         redirect_uri: window.location.origin,
//       }}
//     >
//       <div className="app">
//         <Navbar />
//         <HeroSection />
//       </div>
//     </Auth0Provider>
//   );
// };

// export default App;

import React from 'react';
import { Auth0Provider, useAuth0 } from '@auth0/auth0-react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import Dashboard from './pages/Dashboard';
import About from './pages/About';
import Volunteering from './pages/Volunteering';
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
      <Router>
        <Navbar />
        <Routes>
          {/* Home Route */}
          <Route path="/" element={<Home />} />
          {/* About Route */}
          <Route path="/about" element={<ProtectedRoute component={About} />} />
          {/* Dashboard Route */}
          <Route path="/dashboard" element={<ProtectedRoute component={Dashboard} />} />
          {/* Volunteering Route */}
          <Route path="/volunteering" element={<ProtectedRoute component={Volunteering} />} />
        </Routes>
      </Router>
    </Auth0Provider>
  );
};

const Home = () => {
  const { isAuthenticated } = useAuth0();

  if (isAuthenticated) {
    // Redirect authenticated users to the Dashboard
    return <Navigate to="/dashboard" />;
  }

  return <HeroSection />;
};

const ProtectedRoute = ({ component: Component }) => {
  const { isAuthenticated } = useAuth0();

  if (!isAuthenticated) {
    // Redirect to the home page if not authenticated
    return <Navigate to="/" />;
  }

  return <Component />;
};

export default App;
