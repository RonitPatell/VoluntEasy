import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import './Dashboard.css';

const Dashboard = () => {
  const { isAuthenticated, user } = useAuth0();
  const goal = 40; // Set a 40-hour volunteering goal

  // State for volunteering experiences
  const [volunteeringExperiences, setVolunteeringExperiences] = useState([]);
  const [newExperience, setNewExperience] = useState({
    position: '',
    location: '',
    hours: '',
  });

  // Calculate total hours from the table
  const totalHours = volunteeringExperiences.reduce(
    (sum, experience) => sum + parseFloat(experience.hours || 0),
    0
  );

  // Handle adding a new volunteering experience
  const handleAddExperience = () => {
    if (newExperience.position && newExperience.location && parseFloat(newExperience.hours) > 0) {
      setVolunteeringExperiences([
        ...volunteeringExperiences,
        { ...newExperience, hours: parseFloat(newExperience.hours) },
      ]);
      setNewExperience({ position: '', location: '', hours: '' });
    } else {
      alert('Please fill in all fields with valid data.');
    }
  };

  // Handle removing a volunteering experience
  const handleRemoveExperience = (index) => {
    const updatedExperiences = [...volunteeringExperiences];
    updatedExperiences.splice(index, 1);
    setVolunteeringExperiences(updatedExperiences);
  };

  if (!isAuthenticated) {
    return (
      <div className="dashboard-container">
        <h1>Please log in to access the dashboard</h1>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Welcome, {user.name}</h1>
      </header>

      {/* Progress Bar Section */}
      <section className="dashboard-content">
        <h2>Your Progress</h2>
        <div className="progress-container">
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${Math.min((totalHours / goal) * 100, 100)}%` }}
            ></div>
          </div>
          <p>
            You’ve completed <strong>{Math.min(totalHours, goal)}</strong> out of{' '}
            <strong>{goal}</strong> hours!
          </p>
          {totalHours > goal && (
            <p className="extra-hours">
              <strong>{totalHours - goal}</strong> extra hours logged beyond the goal!
            </p>
          )}
        </div>
      </section>

      {/* Volunteering Experiences Table */}
      <section className="volunteering-experiences">
        <h2>Volunteering Experiences</h2>
        <table className="volunteering-table">
          <thead>
            <tr>
              <th>Position</th>
              <th>Location</th>
              <th>Hours</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {volunteeringExperiences.map((experience, index) => (
              <tr key={index}>
                <td>{experience.position}</td>
                <td>{experience.location}</td>
                <td>{experience.hours}</td>
                <td>
                  <span
                    className="remove-icon"
                    onClick={() => handleRemoveExperience(index)}
                  >
                    &minus;
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Add New Experience Form */}
        <div className="add-experience-form">
          <h3>Add New Volunteering Experience</h3>
          <input
            type="text"
            placeholder="Position"
            value={newExperience.position}
            onChange={(e) => setNewExperience({ ...newExperience, position: e.target.value })}
            className="experience-input"
          />
          <input
            type="text"
            placeholder="Location"
            value={newExperience.location}
            onChange={(e) => setNewExperience({ ...newExperience, location: e.target.value })}
            className="experience-input"
          />
          <input
            type="number"
            placeholder="Hours"
            value={newExperience.hours}
            onChange={(e) => setNewExperience({ ...newExperience, hours: e.target.value })}
            className="experience-input"
          />
          <button className="btn btn-add-experience" onClick={handleAddExperience}>
            Add Experience
          </button>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
