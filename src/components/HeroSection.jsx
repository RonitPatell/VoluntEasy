import React from 'react';
import './HeroSection.css';
import { useAuth0 } from '@auth0/auth0-react';

const HeroSection = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <div>
      {isAuthenticated ? (
        <h2>Welcome to the Hero Section!</h2>
      ) : (
        <div className="hero-section">
      <div className="hero-content">
        <h1>Welcome to VoluntEasy</h1>
        <p>Discover volunteering opportunities and track your progress.</p>
      </div>
      <div className="hero-image">
        <div className="futuristic-shape"></div>
      </div>
    </div>
      )}
    </div>
  );
};

export default HeroSection;

