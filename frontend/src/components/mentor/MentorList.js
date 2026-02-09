// frontend/src/components/mentor/MentorList.js
import React, { useState, useEffect } from 'react';
import { Card, Button, Row, Col, Container, Form, InputGroup } from 'react-bootstrap';
import { Search, StarFill } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';

const MentorList = () => {
  const [mentors, setMentors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const { authToken } = useAuth();

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/mentors/search', {
          headers: { Authorization: `Bearer ${authToken}` }
        });
        setMentors(response.data);
      } catch (error) {
        console.error('Error fetching mentors:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMentors();
  }, [authToken]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredMentors = mentors.filter(mentor => 
    mentor.username.toLowerCase().includes(searchTerm) ||
    (mentor.expertise && mentor.expertise.toLowerCase().includes(searchTerm)) ||
    (mentor.bio && mentor.bio.toLowerCase().includes(searchTerm))
  );

  if (loading) {
    return <div>Loading mentors...</div>;
  }

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Find a Mentor</h2>
      
      {/* Search Bar */}
      <InputGroup className="mb-4">
        <InputGroup.Text>
          <Search />
        </InputGroup.Text>
        <Form.Control
          placeholder="Search mentors by name, expertise, or bio..."
          onChange={handleSearch}
        />
      </InputGroup>

      {/* Mentor Grid */}
      <Row xs={1} md={2} lg={3} className="g-4">
        {filteredMentors.map((mentor) => (
          <Col key={mentor.id}>
            <Card className="h-100 shadow-sm">
              <Card.Img 
                variant="top" 
                src={mentor.profile_pic || 'https://via.placeholder.com/150'} 
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <Card.Body>
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <Card.Title className="mb-0">{mentor.username}</Card.Title>
                  <div className="d-flex align-items-center">
                    <StarFill className="text-warning me-1" />
                    <span>{mentor.rating || '4.8'}</span>
                  </div>
                </div>
                <Card.Subtitle className="text-muted mb-2">
                  {mentor.expertise || 'Mentor'}
                </Card.Subtitle>
                <Card.Text className="text-truncate-3" style={{ height: '72px' }}>
                  {mentor.bio || 'No bio available'}
                </Card.Text>
                <div className="d-flex justify-content-between align-items-center">
                  <span className="text-muted small">
                    {mentor.sessions_completed || 0} sessions
                  </span>
                  <Link to={`/mentors/${mentor.id}`} className="btn btn-primary btn-sm">
                    View Profile
                  </Link>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default MentorList;