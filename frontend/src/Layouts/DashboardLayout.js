// src/Layouts/DashboardLayout.js
import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function DashboardLayout({ userType }) {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  if (currentUser.role !== userType) {
    return <Navigate to={`/${currentUser.role}/dashboard`} />;
  }

  return (
    <div className="dashboard-layout">
      <main className="dashboard-content">
        <div className="container">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default DashboardLayout;