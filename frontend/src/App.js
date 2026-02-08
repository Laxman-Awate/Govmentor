// src/App.js
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/login';
import Register from './pages/Register';
import Mentors from './pages/Mentors';
import StudyHub from './pages/StudyHub';
import About from './pages/About';
import Pricing from './pages/Pricing';
import DashboardLayout from './Layouts/DashboardLayout';
import StudentDashboard from './pages/student/Dashboard';
import MentorDashboard from './pages/mentor/Dashboard';
import NotFound from './pages/NotFound';

function App() {
  return (
    <div className="app">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/mentors" element={<Mentors />} />
          <Route path="/study-hub" element={<StudyHub />} />
          <Route path="/about" element={<About />} />
          <Route path="/pricing" element={<Pricing />} />
          
          {/* Protected Routes */}
          <Route element={<DashboardLayout userType="student" />}>
            <Route path="/student/dashboard" element={<StudentDashboard />} />
          </Route>
          
          <Route element={<DashboardLayout userType="mentor" />}>
            <Route path="/mentor/dashboard" element={<MentorDashboard />} />
          </Route>
          
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;