// src/pages/student/Dashboard.js
import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

function StudentDashboard() {
  const { currentUser, logout } = useAuth();

  return (
    <div className="dashboard">
      <h1>Welcome, {currentUser?.username}!</h1>
      <p>This is your student dashboard.</p>
      <button onClick={logout} className="btn btn-outline">
        Logout
      </button>
    </div>
  );
}

export default StudentDashboard;