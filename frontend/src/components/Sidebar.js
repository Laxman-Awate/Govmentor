// src/components/Sidebar.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHome, 
  faUserTie, 
  faBook, 
  faUsers,
  faGraduationCap,
  faCalendarAlt,
  faCog
} from '@fortawesome/free-solid-svg-icons';
import './Sidebar.css';

function Sidebar() {
  const location = useLocation();

  const navItems = [
    { path: '/student/dashboard', icon: faHome, label: 'Dashboard' },
    { path: '/mentors', icon: faUserTie, label: 'Find Mentors' },
    { path: '/study-materials', icon: faBook, label: 'Study Materials' },
    { path: '/my-mentors', icon: faUsers, label: 'My Mentors' },
    { path: '/sessions', icon: faCalendarAlt, label: 'My Sessions' },
    { path: '/profile', icon: faGraduationCap, label: 'My Profile' },
    { path: '/settings', icon: faCog, label: 'Settings' },
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>GovMentor</h2>
      </div>
      <nav className="sidebar-nav">
        <ul>
          {navItems.map((item) => (
            <li key={item.path} className={location.pathname === item.path ? 'active' : ''}>
              <Link to={item.path}>
                <FontAwesomeIcon icon={item.icon} className="nav-icon" />
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;