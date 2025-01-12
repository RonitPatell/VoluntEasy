import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import './HeroSection.css';

const HeroSection = () => {
  const { isAuthenticated, user } = useAuth0();

  return (
    <div className="hero-section">
      {isAuthenticated ? (
        <div className="hero-authenticated">
          <h1>Welcome Back, {user?.name || 'Friend'}!</h1>
          <p>We're thrilled to have you here. Explore new opportunities today!</p>
        </div>
      ) : (
        <div className="hero-unauthenticated">
          <h1>Welcome to VoluntEasy</h1>
          <p>Discover volunteering opportunities and track your progress.</p>
        </div>
      )}
    </div>
  );
};

export default HeroSection;
