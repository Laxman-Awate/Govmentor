// src/pages/mentor/Dashboard.js
import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

function MentorDashboard() {
  const { currentUser, logout } = useAuth();

  return (
    <div className="dashboard">
      <h1>Welcome, Mentor {currentUser?.username}!</h1>
      <p>This is your mentor dashboard.</p>
      <button onClick={logout} className="btn btn-outline">
        Logout
      </button>
    </div>
  );
}

export default MentorDashboard;