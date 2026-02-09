// src/App.js
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Mentors from './pages/Mentors';
import Home from './pages/Home';
import Login from './pages/login';
import Register from './pages/Register';
import StudyHub from './pages/StudyHub';
import About from './pages/About';
import Pricing from './pages/Pricing';
import DashboardLayout from './Layouts/DashboardLayout';
import StudentDashboard from './pages/student/Dashboard';
import MentorDashboard from './pages/mentor/Dashboard'; 
import NotFound from './pages/NotFound';
import MentorList from './components/mentor/MentorList';
import MentorProfile from './components/mentor/MentorProfile';
import BecomeMentor from './components/mentor/BecomeMentor';
import PrivateRoute from './components/PrivateRoute';

import './App.css';

function App() {
  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route path="/pricing" element={<Pricing />} />
        
        <Route element={<DashboardLayout userType="student" />}>
          <Route path="/student/dashboard" element={
            <PrivateRoute>
              <StudentDashboard />
            </PrivateRoute>
          } />
        </Route>
        
        <Route element={<DashboardLayout userType="mentor" />}>
          <Route path="/mentor/dashboard" element={
            <PrivateRoute>
              <MentorDashboard />
            </PrivateRoute>
          } />
        </Route>

        <Route path="/mentors" element={
          <DashboardLayout>
            <Mentors />
          </DashboardLayout>
        } />

        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </div>
  );
}

export default App;