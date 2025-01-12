import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import './Dashboard.css';

const Dashboard = () => {
  const { isAuthenticated, user } = useAuth0();
  const [volunteeringExperiences, setVolunteeringExperiences] = useState([]);
  const [totalHours, setTotalHours] = useState(0);
  const [newExperience, setNewExperience] = useState({
    position: '',
    location: '',
    hours: '',
  });

  // Fetch data from back-end on load
  useEffect(() => {
    if (!isAuthenticated || !user) return;

    const fetchExperiences = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/api/volunteer/${user.sub}`);
        const data = await response.json();
        setVolunteeringExperiences(data.experiences || []);
        setTotalHours(
          data.experiences.reduce((sum, exp) => sum + parseFloat(exp.hours || 0), 0)
        );
      } catch (error) {
        console.error('Error fetching experiences:', error);
      }
    };

    fetchExperiences();
  }, [isAuthenticated, user]);

  // Add experience
  const handleAddExperience = async () => {
    if (
      !newExperience.position ||
      !newExperience.location ||
      parseFloat(newExperience.hours) <= 0
    ) {
      alert('Please fill in all fields with valid data.');
      return;
    }

    const newEntry = {
      position: newExperience.position,
      location: newExperience.location,
      hours: parseFloat(newExperience.hours),
    };

    try {
      const response = await fetch('http://127.0.0.1:5000/api/volunteer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: user.sub, ...newEntry }),
      });

      if (response.ok) {
        setVolunteeringExperiences((prev) => [...prev, newEntry]);
        setTotalHours((prev) => prev + newEntry.hours);
        setNewExperience({ position: '', location: '', hours: '' });
      } else {
        console.error('Failed to save experience to the database.');
      }
    } catch (error) {
      console.error('Error saving experience:', error);
    }
  };

  // Render UI
  return (
    <div className="dashboard-container">
      <h1>Welcome, {isAuthenticated && user ? user.name : 'Guest'}</h1>
      <div>
        <h2>Total Hours: {totalHours}</h2>
        <ul>
          {volunteeringExperiences.map((exp, index) => (
            <li key={index}>
              {exp.position} - {exp.location} - {exp.hours} hours
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Add Experience</h2>
        <input
          type="text"
          placeholder="Position"
          value={newExperience.position}
          onChange={(e) =>
            setNewExperience({ ...newExperience, position: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Location"
          value={newExperience.location}
          onChange={(e) =>
            setNewExperience({ ...newExperience, location: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Hours"
          value={newExperience.hours}
          onChange={(e) =>
            setNewExperience({ ...newExperience, hours: e.target.value })
          }
        />
        <button onClick={handleAddExperience}>Add Experience</button>
      </div>
    </div>
  );
};

export default Dashboard;
