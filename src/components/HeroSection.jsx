import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import './HeroSection.css';

const HeroSection = () => {
  const { loginWithRedirect } = useAuth0(); // Get the login method from Auth0

  return (
    <div className="hero-section">
      <div className="hero-content">
        <h1 className="hero-title">Welcome to VoluntEasy</h1>
        <p className="hero-subtitle">Discover volunteering opportunities and track your progress.</p>
        {/* Updated Button */}
        <button className="hero-button" onClick={() => loginWithRedirect()}>
          Get Started
        </button>
      </div>
      <div className="hero-animation">
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
      </div>
    </div>
  );
};

export default HeroSection;
