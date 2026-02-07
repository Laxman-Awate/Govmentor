// frontend/src/components/Navbar.js
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Navbar() {
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/" className="logo">GovMentor</Link>
            </div>
            
            {currentUser ? (
                <div className="navbar-menu">
                    <div className="navbar-start">
                        <Link to={`/${currentUser.role}`} className="navbar-item">
                            Dashboard
                        </Link>
                        <Link to={`/${currentUser.role}/sessions`} className="navbar-item">
                            My Sessions
                        </Link>
                        {currentUser.role === 'student' && (
                            <Link to="/student/mentors" className="navbar-item">
                                Find Mentors
                            </Link>
                        )}
                    </div>
                    <div className="navbar-end">
                        <div className="navbar-item has-dropdown is-hoverable">
                            <div className="navbar-link">
                                <span className="icon-text">
                                    <span className="icon">
                                        <i className="fas fa-user"></i>
                                    </span>
                                    <span>{currentUser.username}</span>
                                </span>
                            </div>
                            <div className="navbar-dropdown">
                                <Link to={`/${currentUser.role}/profile`} className="navbar-item">
                                    Profile
                                </Link>
                                <hr className="navbar-divider" />
                                <button onClick={handleLogout} className="navbar-item button is-ghost">
                                    Logout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="navbar-end">
                    <div className="navbar-item">
                        <div className="buttons">
                            <Link to="/register" className="button is-primary">
                                <strong>Sign up</strong>
                            </Link>
                            <Link to="/login" className="button is-light">
                                Log in
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}

export default Navbar;