import React from 'react';
import './HeroSection.css';

const HeroSection = () => {
  return (
    <div className="hero-section">
      <div className="hero-content">
        <h1>Welcome to the Future</h1>
        <p>Experience tomorrow's technology, today.</p>
        <button className="cta-button">Get Started</button>
      </div>
      <div className="hero-image">
        <div className="futuristic-shape"></div>
      </div>
    </div>
  );
};

export default HeroSection;

