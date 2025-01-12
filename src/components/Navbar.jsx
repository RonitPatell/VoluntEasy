// src/components/Navbar.jsx
// import React from "react";
// import { Link } from "react-router-dom";
// import "./Navbar.css"; // Import CSS for the Navbar

// const Navbar = () => {
//   return (
//     <nav className="navbar">
//       <div className="navbar-container">
//       <Link to="/" className="navbar-logo">
//           <img
//             src="../public/logo.svg" // Path to your logo image
//             alt="App Logo"
//             className="navbar-logo-img"
//           />
//         </Link>
//         <ul className="navbar-menu">
//           <li className="navbar-item">
//             <Link to="/" className="navbar-link">
//               Home
//             </Link>
//           </li>
//           <li className="navbar-item">
//             <Link to="/login" className="navbar-link">
//               Login
//             </Link>
//           </li>
//           <li className="navbar-item">
//             <Link to="/dashboard" className="navbar-link">
//               Dashboard
//             </Link>
//           </li>
//         </ul>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import './Navbar.css';

const Navbar = () => {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src="../public/logo.svg" alt="Company Logo" />
      </div>
      <div className="navbar-links">
        <a href="/" className="nav-link">Home</a>
        {isAuthenticated && (
          <>
            <a href="/dashboard" className="nav-link">Dashboard</a>
            <a href="/volunteering" className="nav-link">Volunteering</a>
            <button
              className="login-button logout-button"
              onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
            >
              Log Out
            </button>
          </>
        )}
        {!isAuthenticated && (
          <button className="login-button" onClick={() => loginWithRedirect()}>
            Log In
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
