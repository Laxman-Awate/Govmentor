import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="home-page">
      {/* Navbar */}
      <nav className="navbar">
        <div className="container">
          <Link to="/" className="logo">GovMentor</Link>
          <ul className="nav-links">
            <li><Link to="/" className="active">Home</Link></li>
            <li><Link to="/mentors">Find Mentors</Link></li>
            <li><Link to="/studyhub">Study Hub</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/pricing">Pricing</Link></li>
            <li><Link to="/login" className="btn btn-outline">Login</Link></li>
            <li><Link to="/register" className="btn btn-primary">Sign Up</Link></li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>Prepare for Government Exams with Expert Mentors</h1>
            <p>Get personalized guidance, study plans, and mock tests to ace your exams.</p>
            <div className="cta-buttons">
              <Link to="/register" className="btn btn-primary">Get Started</Link>
              <Link to="/mentors" className="btn btn-outline">Find a Mentor</Link>
            </div>
          </div>
          <div className="hero-image">
            <img 
              src="https://img.freepik.com/free-vector/online-tutorials-concept_52683-37480.jpg" 
              alt="Students learning" 
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2>Why Choose GovMentor?</h2>
          <div className="feature-grid">
            <div className="feature-card">
              <div className="icon">👨‍🏫</div>
              <h3>Expert Mentors</h3>
              <p>Learn from experienced mentors who have aced government exams.</p>
            </div>
            <div className="feature-card">
              <div className="icon">📚</div>
              <h3>Comprehensive Study Material</h3>
              <p>Access previous year question papers and mock tests.</p>
            </div>
            <div className="feature-card">
              <div className="icon">📱</div>
              <h3>AI-Powered Study Plans</h3>
              <p>Get personalized study plans based on your goals and progress.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <div className="container">
          <h2>What Our Students Say</h2>
          <div className="testimonial-grid">
            <div className="testimonial-card">
              <div className="quote">"GovMentor helped me crack my dream job in the first attempt!"</div>
              <div className="author">- Rahul Sharma, UPSC 2023</div>
            </div>
            <div className="testimonial-card">
              <div className="quote">"The personalized guidance I received was invaluable for my preparation."</div>
              <div className="author">- Priya Patel, SSC CGL 2023</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <h2>Ready to Start Your Journey?</h2>
          <p>Join thousands of students who have already started their preparation with GovMentor.</p>
          <Link to="/register" className="btn btn-primary btn-lg">Get Started for Free</Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>GovMentor</h3>
              <p>Your trusted partner in government exam preparation.</p>
            </div>
            <div className="footer-section">
              <h4>Quick Links</h4>
              <ul>
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/mentors">Find Mentors</Link></li>
                <li><Link to="/pricing">Pricing</Link></li>
                <li><Link to="/contact">Contact</Link></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Legal</h4>
              <ul>
                <li><Link to="/privacy">Privacy Policy</Link></li>
                <li><Link to="/terms">Terms of Service</Link></li>
                <li><Link to="/refund">Refund Policy</Link></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&​copy; {new Date().getFullYear()} GovMentor. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;