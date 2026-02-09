// src/Layouts/DashboardLayout.js
import React from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import './DashboardLayout.css';

function DashboardLayout({ userType }) {
  const { currentUser } = useAuth();
  const location = useLocation();

  // List of paths that don't require specific role check
  const publicPaths = ['/mentors'];
  const isPublicPath = publicPaths.some(path => location.pathname.startsWith(path));

  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Skip role check for public paths
  if (!isPublicPath && currentUser.role !== userType) {
    return <Navigate to={`/${currentUser.role}/dashboard`} replace />;
  }

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <main className="dashboard-content">
          <div className="container">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;