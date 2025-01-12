import React from 'react';
import './HeroSection.css';
import { useAuth0 } from '@auth0/auth0-react';

const HeroSection = () => {
  const { isAuthenticated, user } = useAuth0();

  return (
    <div className="hero-section">
      {isAuthenticated ? (
        <div className="hero-authenticated">
          <h1 className="hero-heading">Welcome Back, {user?.name || "Friend"}!</h1>
          <p className="hero-message">
            We're thrilled to have you here. Explore new opportunities to make an impact today!
          </p>
        </div>
      ) : (
        <>
          <div className="hero-content">
            <h1>Welcome to VoluntEasy</h1>
            <p>Discover volunteering opportunities and track your progress.</p>
          </div>
          <div className="hero-image">
            <div className="futuristic-shape"></div>
          </div>
        </>
      )}
    </div>
  );
};

export default HeroSection;

