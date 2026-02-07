// src/App.js
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/login';
import Register from './pages/Register';
import DashboardLayout from './Layouts/DashboardLayout';
import StudentDashboard from './pages/student/Dashboard';
import MentorDashboard from './pages/mentor/Dashboard';
import NotFound from './pages/NotFound';

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Student Routes */}
        <Route path="/student" element={<DashboardLayout userType="student" />}>
          <Route index element={<StudentDashboard />} />
          <Route path="dashboard" element={<StudentDashboard />} />
        </Route>
        
        {/* Mentor Routes */}
        <Route path="/mentor" element={<DashboardLayout userType="mentor" />}>
          <Route index element={<MentorDashboard />} />
          <Route path="dashboard" element={<MentorDashboard />} />
        </Route>
        
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </div>
  );
}

export default App;