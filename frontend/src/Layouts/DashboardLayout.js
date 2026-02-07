// src/Layouts/DashboardLayout.js
import React from 'react';
import { Outlet, Navigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function DashboardLayout({ userType }) {
  const { currentUser, logout } = useAuth();

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  if (currentUser.role !== userType) {
    return <Navigate to={`/${currentUser.role}/dashboard`} />;
  }

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="dashboard-layout">
      <header className="dashboard-header">
        <nav className="container">
          <div className="nav-brand">
            <Link to="/">GovMentor</Link>
          </div>
          <div className="nav-links">
            <span>Welcome, {currentUser.username} ({currentUser.role})</span>
            <button onClick={handleLogout} className="btn btn-outline btn-sm">
              Logout
            </button>
          </div>
        </nav>
      </header>
      <main className="dashboard-content">
        <div className="container">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default DashboardLayout;