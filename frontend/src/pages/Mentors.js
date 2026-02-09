// src/pages/Mentors.js
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faStar, 
  faMapMarkerAlt, 
  faGraduationCap, 
  faUserTie,
  faSearch
} from '@fortawesome/free-solid-svg-icons';
import './Mentors.css';

function Mentors() {
  const [searchQuery, setSearchQuery] = useState('');

  const mentors = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      subject: "Political Science",
      rating: 4.8,
      reviews: 128,
      experience: "8+ years",
      price: 800,
      location: "Mumbai, India",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      available: true
    },
    {
      id: 2,
      name: "Prof. Rajesh Kumar",
      subject: "Indian Economy",
      rating: 4.9,
      reviews: 215,
      experience: "12+ years",
      price: 1000,
      location: "Delhi, India",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      available: true
    },
    // Add more mentors as needed
  ];

  const filteredMentors = mentors.filter(mentor => 
    mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    mentor.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    mentor.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="mentors-page">
      <div className="mentors-header">
        <h1>Find Your Perfect Mentor</h1>
        <p>Connect with experienced mentors to guide your UPSC preparation</p>
        <div className="search-container">
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search by subject, name, or location" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="search-btn">Search</button>
        </div>
      </div>

      <div className="mentors-container">
        <div className="filters-sidebar">
          <h3>Filters</h3>
          <div className="filter-section">
            <h4>Subject</h4>
            <select>
              <option>All Subjects</option>
              <option>Political Science</option>
              <option>History</option>
              <option>Geography</option>
              <option>Economics</option>
            </select>
          </div>
          <div className="filter-section">
            <h4>Experience</h4>
            <label><input type="checkbox" /> 1-3 years</label>
            <label><input type="checkbox" /> 3-5 years</label>
            <label><input type="checkbox" /> 5+ years</label>
          </div>
          <div className="filter-section">
            <h4>Rating</h4>
            {[4, 3, 2, 1].map((rating) => (
              <label key={rating}>
                <input type="checkbox" />
                {[...Array(5)].map((_, i) => (
                  <FontAwesomeIcon 
                    key={i}
                    icon={faStar} 
                    className={i < rating ? "star-filled" : "star-empty"} 
                  />
                ))} & Up
              </label>
            ))}
          </div>
        </div>

        <div className="mentors-list">
          {filteredMentors.length > 0 ? (
            filteredMentors.map((mentor) => (
              <MentorCard key={mentor.id} mentor={mentor} />
            ))
          ) : (
            <div className="no-results">
              <h3>No mentors found</h3>
              <p>Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const MentorCard = ({ mentor }) => (
  <div className="mentor-card">
    <div className="mentor-image">
      <img src={mentor.image} alt={mentor.name} />
      {mentor.available && <span className="online-badge">Online</span>}
    </div>
    <div className="mentor-info">
      <h3>{mentor.name}</h3>
      <p className="mentor-subject">
        <FontAwesomeIcon icon={faGraduationCap} /> {mentor.subject}
      </p>
      <div className="mentor-rating">
        <span className="rating">
          <FontAwesomeIcon icon={faStar} className="star-filled" /> {mentor.rating}
        </span>
        <span className="reviews">({mentor.reviews} reviews)</span>
      </div>
      <p className="mentor-location">
        <FontAwesomeIcon icon={faMapMarkerAlt} /> {mentor.location}
      </p>
      <p className="mentor-experience">
        <FontAwesomeIcon icon={faUserTie} /> {mentor.experience} experience
      </p>
      <div className="mentor-footer">
        <span className="price">₹{mentor.price}/hr</span>
        <button className="book-btn">Book Session</button>
      </div>
    </div>
  </div>
);

export default Mentors;