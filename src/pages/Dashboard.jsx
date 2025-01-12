import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import './Dashboard.css';

const Dashboard = () => {
  const { isAuthenticated, user } = useAuth0();
  const [hours, setHours] = useState(0);
  const [volunteeringEntries, setVolunteeringEntries] = useState([]);
  const [newEntry, setNewEntry] = useState({ position: '', location: '', hours: '' });
  const goal = 40;

  // Fetch hours and entries from the backend
  useEffect(() => {
    const fetchData = async () => {
      if (!isAuthenticated || !user) return;

      try {
        // Fetch total hours
        const hoursResponse = await fetch(`http://127.0.0.1:5000/api/hours/${user.sub}`);
        const hoursData = await hoursResponse.json();
        setHours(hoursData.hours || 0);

        // Fetch volunteer entries
        const entriesResponse = await fetch(`http://127.0.0.1:5000/api/entries/${user.sub}`);
        const entriesData = await entriesResponse.json();
        setVolunteeringEntries(entriesData.entries || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [isAuthenticated, user]);

  // Add a new table entry and update the progress bar
  const handleAddEntry = async () => {
    if (!newEntry.position || !newEntry.location || parseFloat(newEntry.hours) <= 0) {
      alert('Please fill in all fields with valid data.');
      return;
    }

    const entry = {
      position: newEntry.position,
      location: newEntry.location,
      hours: parseFloat(newEntry.hours),
    };

    try {
      const response = await fetch('http://127.0.0.1:5000/api/entries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: user.sub, ...entry }),
      });

      if (response.ok) {
        const data = await response.json();
        setVolunteeringEntries((prev) => [...prev, entry]);
        setHours(data.hours); // Update total hours
        setNewEntry({ position: '', location: '', hours: '' }); // Clear input fields
      } else {
        console.error('Error saving entry:', response.statusText);
      }
    } catch (error) {
      console.error('Error saving entry:', error);
    }
  };

  // Delete a table entry and update the progress bar
  const handleDeleteEntry = async (entryId) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/api/entries/${entryId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        const data = await response.json();
        setVolunteeringEntries((prev) => prev.filter((entry) => entry.id !== entryId));
        setHours(data.hours); // Update total hours
      } else {
        console.error('Error deleting entry:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting entry:', error);
    }
  };

  // Reset all hours and entries
  const handleReset = async () => {
    const confirmReset = window.confirm(
      'Are you sure you want to reset your hours and delete all entries? This action cannot be undone.'
    );

    if (!confirmReset) return;

    try {
      const response = await fetch(`http://127.0.0.1:5000/api/reset/${user.sub}`, {
        method: 'POST',
      });

      if (response.ok) {
        setHours(0);
        setVolunteeringEntries([]);
        alert('Your hours and entries have been reset successfully.');
      } else {
        console.error('Error resetting hours:', response.statusText);
      }
    } catch (error) {
      console.error('Error resetting hours:', error);
    }
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Welcome, {isAuthenticated && user ? user.name : 'Guest'}</h1>
      </header>

      <section className="progress-container">
        <h2>Track Your Volunteering Hours</h2>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${Math.min((hours / goal) * 100, 100)}%` }}
          ></div>
        </div>
        <p className="hours-display">
          {hours < goal
            ? `You've completed ${hours} out of ${goal} hours!`
            : `You've exceeded the goal by ${hours - goal} hours!`}
        </p>
        <button className="btn-reset" onClick={handleReset}>
          Reset Hours
        </button>
      </section>

      <section className="volunteering-experiences">
        <h3>Volunteering Entries</h3>
        <table className="volunteering-table">
          <thead>
            <tr>
              <th>Position</th>
              <th>Location</th>
              <th>Hours</th>
            </tr>
          </thead>
          <tbody>
            {volunteeringEntries.map((entry) => (
              <tr key={entry.id}>
                <td>{entry.position}</td>
                <td>{entry.location}</td>
                <td>
                  {entry.hours}
                  <span
                    className="remove-icon"
                    onClick={() => handleDeleteEntry(entry.id)}
                  >
                    &minus;
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="add-experience-form">
        <h3>Add a New Volunteering Entry</h3>
        <input
          type="text"
          placeholder="Position"
          className="experience-input"
          value={newEntry.position}
          onChange={(e) => setNewEntry({ ...newEntry, position: e.target.value })}
        />
        <input
          type="text"
          placeholder="Location"
          className="experience-input"
          value={newEntry.location}
          onChange={(e) => setNewEntry({ ...newEntry, location: e.target.value })}
        />
        <input
          type="number"
          placeholder="Hours"
          className="experience-input"
          value={newEntry.hours}
          onChange={(e) => setNewEntry({ ...newEntry, hours: e.target.value })}
        />
        <button className="btn-add-experience" onClick={handleAddEntry}>
          Add Entry
        </button>
      </section>
    </div>
  );
};

export default Dashboard;
