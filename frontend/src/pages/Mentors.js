// src/pages/Mentors.js
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faStar, 
  faStarHalfAlt,
  faMapMarkerAlt,
  faGraduationCap,
  faBriefcase,
  faFilter,
  faSearch
} from '@fortawesome/free-solid-svg-icons';
import './Mentors.css';

const Mentors = () => {
  const [priceRange, setPriceRange] = useState(1000);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedRating, setSelectedRating] = useState(null);

  // Mock data for mentors
  const mentors = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      title: "Senior Civil Services Mentor",
      experience: "10+ years",
      rating: 4.8,
      reviews: 128,
      price: 999,
      subjects: ["UPSC", "State PSC", "Interview Prep"],
      image: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      id: 2,
      name: "Prof. Rajesh Kumar",
      title: "IAS Mentor & Educator",
      experience: "15+ years",
      rating: 4.9,
      reviews: 245,
      price: 1499,
      subjects: ["UPSC", "Essay Writing", "Current Affairs"],
      image: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      id: 3,
      name: "Dr. Priya Sharma",
      title: "Psychology Expert",
      experience: "8+ years",
      rating: 4.7,
      reviews: 98,
      price: 799,
      subjects: ["Psychology", "Interview Prep", "Personality Development"],
      image: "https://randomuser.me/api/portraits/women/68.jpg"
    }
  ];

  const categories = [
    "UPSC Preparation",
    "State PSC",
    "Interview Guidance",
    "Essay Writing",
    "Current Affairs",
    "Optional Subjects",
    "CSAT",
    "Personality Development"
  ];

  const handleCategoryToggle = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const handleRatingSelect = (rating) => {
    setSelectedRating(selectedRating === rating ? null : rating);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<FontAwesomeIcon key={i} icon={faStar} className="star-icon filled" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<FontAwesomeIcon key={i} icon={faStarHalfAlt} className="star-icon half" />);
      } else {
        stars.push(<FontAwesomeIcon key={i} icon={faStar} className="star-icon" />);
      }
    }
    return stars;
  };

  return (
    <div className="mentors-page">
      <div className="mentors-header">
        <h1>Find Your Perfect Mentor</h1>
        <p>Connect with experienced mentors to guide you through your exam preparation journey</p>
      </div>

      <div className="mentors-container">
        {/* Filters Section */}
        <div className="filters-section">
          <div className="filters-header">
            <FontAwesomeIcon icon={faFilter} />
            <h3>Filters</h3>
          </div>

          <div className="filter-group">
            <h4>Categories</h4>
            <div className="search-box">
              <FontAwesomeIcon icon={faSearch} className="search-icon" />
              <input type="text" placeholder="Search categories..." />
            </div>
            <div className="categories-list">
              {categories.map((category, index) => (
                <div 
                  key={index} 
                  className={`category-tag ${selectedCategories.includes(category) ? 'selected' : ''}`}
                  onClick={() => handleCategoryToggle(category)}
                >
                  {category}
                </div>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <h4>Price Range</h4>
            <div className="price-range">
              <span>₹0</span>
              <input 
                type="range" 
                min="0" 
                max="5000" 
                value={priceRange} 
                onChange={(e) => setPriceRange(e.target.value)} 
              />
              <span>₹5000+</span>
            </div>
            <div className="price-display">Up to ₹{priceRange}</div>
          </div>

          <div className="filter-group">
            <h4>Rating</h4>
            {[5, 4, 3, 2, 1].map((rating) => (
              <div 
                key={rating} 
                className={`rating-option ${selectedRating === rating ? 'selected' : ''}`}
                onClick={() => handleRatingSelect(rating)}
              >
                {renderStars(rating)}
                <span>& Up</span>
              </div>
            ))}
          </div>
        </div>

        {/* Mentors List */}
        <div className="mentors-list">
          <div className="mentors-sort">
            <span>{mentors.length} mentors found</span>
            <select>
              <option>Sort by: Recommended</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Rating: High to Low</option>
            </select>
          </div>

          {mentors.map((mentor) => (
            <div key={mentor.id} className="mentor-card">
              <div className="mentor-image">
                <img src={mentor.image} alt={mentor.name} />
              </div>
              <div className="mentor-info">
                <div className="mentor-header">
                  <h3>{mentor.name}</h3>
                  <span className="mentor-price">₹{mentor.price}/hr</span>
                </div>
                <p className="mentor-title">{mentor.title}</p>
                
                <div className="mentor-rating">
                  <div className="stars">
                    {renderStars(mentor.rating)}
                    <span>{mentor.rating}</span>
                    <span className="reviews">({mentor.reviews} reviews)</span>
                  </div>
                </div>

                <div className="mentor-details">
                  <div className="detail-item">
                    <FontAwesomeIcon icon={faBriefcase} />
                    <span>{mentor.experience} experience</span>
                  </div>
                  <div className="detail-item">
                    <FontAwesomeIcon icon={faGraduationCap} />
                    <span>500+ students mentored</span>
                  </div>
                </div>

                <div className="mentor-subjects">
                  {mentor.subjects.map((subject, index) => (
                    <span key={index} className="subject-tag">{subject}</span>
                  ))}
                </div>

                <div className="mentor-actions">
                  <button className="btn btn-outline">View Profile</button>
                  <button className="btn btn-primary">Book Session</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Mentors;