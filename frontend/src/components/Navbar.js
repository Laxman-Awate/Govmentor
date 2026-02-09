import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBell, 
  faUser, 
  faChevronDown,
  faBars,
  faTimes,
  faSearch
} from '@fortawesome/free-solid-svg-icons';
import './Navbar.css';

function Navbar({ toggleSidebar, isSidebarOpen }) {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeAllMenus = () => {
    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo and Mobile Menu Toggle */}
        <div className="navbar-left">
          <button 
            className={`hamburger ${isSidebarOpen ? 'open' : ''}`} 
            onClick={toggleSidebar}
            aria-label="Toggle sidebar"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          
          <Link to="/" className="navbar-logo">
            GovMentor
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className={`navbar-center ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
          <div className="search-bar">
            <FontAwesomeIcon icon={faSearch} className="search-icon" />
            <input 
              type="text" 
              placeholder="Search mentors, topics..." 
              className="search-input"
            />
          </div>
          
          <div className="nav-links">
            <Link 
              to="/mentors" 
              className={`nav-link ${location.pathname === '/mentors' ? 'active' : ''}`}
              onClick={closeAllMenus}
            >
              Find Mentors
            </Link>
            <Link 
              to="/study-hub" 
              className={`nav-link ${location.pathname === '/study-hub' ? 'active' : ''}`}
              onClick={closeAllMenus}
            >
              Study Hub
            </Link>
            <Link 
              to="/about" 
              className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}
              onClick={closeAllMenus}
            >
              About
            </Link>
          </div>
        </div>

        {/* Right Side Navigation */}
        <div className="navbar-right">
          {currentUser ? (
            <>
              <button className="notification-btn" aria-label="Notifications">
                <FontAwesomeIcon icon={faBell} />
                <span className="notification-badge">3</span>
              </button>
              
              <div className="user-menu" ref={dropdownRef}>
                <button 
                  className="user-profile-btn" 
                  onClick={toggleDropdown}
                  aria-expanded={isDropdownOpen}
                  aria-haspopup="true"
                >
                  <div className="user-avatar">
                    <FontAwesomeIcon icon={faUser} />
                  </div>
                  <span className="username">
                    {currentUser.username || 'User'}
                    <FontAwesomeIcon 
                      icon={faChevronDown} 
                      className={`dropdown-arrow ${isDropdownOpen ? 'open' : ''}`} 
                    />
                  </span>
                </button>
                
                {isDropdownOpen && (
                  <div className="dropdown-menu">
                    <Link 
                      to="/profile" 
                      className="dropdown-item"
                      onClick={() => {
                        closeAllMenus();
                        setIsDropdownOpen(false);
                      }}
                    >
                      My Profile
                    </Link>
                    <Link 
                      to="/settings" 
                      className="dropdown-item"
                      onClick={() => {
                        closeAllMenus();
                        setIsDropdownOpen(false);
                      }}
                    >
                      Settings
                    </Link>
                    <button 
                      className="dropdown-item logout-btn"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="auth-buttons">
              <Link 
                to="/login" 
                className="btn btn-outline"
                onClick={closeAllMenus}
              >
                Login
              </Link>
              <Link 
                to="/register" 
                className="btn btn-primary"
                onClick={closeAllMenus}
              >
                Sign Up
              </Link>
            </div>
          )}
          
          {/* Mobile Menu Toggle Button */}
          <button 
            className="mobile-menu-toggle" 
            onClick={toggleMobileMenu}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMobileMenuOpen ? (
              <FontAwesomeIcon icon={faTimes} />
            ) : (
              <FontAwesomeIcon icon={faBars} />
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;