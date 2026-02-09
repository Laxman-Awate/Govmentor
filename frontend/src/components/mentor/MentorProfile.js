// frontend/src/components/mentor/MentorProfile.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Button, Container, Row, Col, Form, Alert, Spinner } from 'react-bootstrap';
import { StarFill, Clock, Calendar } from 'react-bootstrap-icons';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';

const MentorProfile = () => {
  const { id } = useParams();
  const [mentor, setMentor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [duration, setDuration] = useState(30);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const { authToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMentor = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/mentors/${id}`, {
          headers: { Authorization: `Bearer ${authToken}` }
        });
        setMentor(response.data);
      } catch (err) {
        setError('Failed to load mentor profile');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMentor();
  }, [id, authToken]);

  const handleBooking = async (e) => {
    e.preventDefault();
    try {
      const scheduledTime = new Date(`${date}T${time}`);
      await axios.post(
        'http://localhost:5000/api/sessions',
        {
          mentor_id: id,
          scheduled_time: scheduledTime.toISOString(),
          duration: parseInt(duration, 10)
        },
        {
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
          }
        }
      );
      setBookingSuccess(true);
      setTimeout(() => navigate('/dashboard'), 2000);
    } catch (err) {
      setError('Failed to book session. Please try again.');
      console.error(err);
    }
  };

  if (loading) {
    return (
      <Container className="text-center my-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="my-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      {bookingSuccess && (
        <Alert variant="success" onClose={() => setBookingSuccess(false)} dismissible>
          Session booked successfully! Redirecting to dashboard...
        </Alert>
      )}
      
      <Row>
        <Col md={4}>
          <Card className="mb-4">
            <Card.Img 
              variant="top" 
              src={mentor.profile_pic || 'https://via.placeholder.com/300'} 
              style={{ height: '300px', objectFit: 'cover' }}
            />
            <Card.Body>
              <Card.Title>{mentor.username}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                {mentor.expertise || 'Mentor'}
              </Card.Subtitle>
              <div className="d-flex align-items-center mb-2">
                <StarFill className="text-warning me-1" />
                <span className="me-2">{mentor.rating || '4.8'}</span>
                <span className="text-muted">({mentor.sessions_completed || 0} sessions)</span>
              </div>
              <div className="d-flex align-items-center text-muted mb-2">
                <Clock className="me-2" />
                <span>30 min session</span>
              </div>
              <div className="d-flex align-items-center text-muted mb-3">
                <Calendar className="me-2" />
                <span>Flexible hours</span>
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={8}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>About</Card.Title>
              <Card.Text>
                {mentor.bio || 'No bio available.'}
              </Card.Text>
              
              <h5 className="mt-4">Expertise</h5>
              <div className="d-flex flex-wrap gap-2 mb-4">
                {mentor.expertise ? 
                  mentor.expertise.split(',').map((skill, i) => (
                    <span key={i} className="badge bg-primary">
                      {skill.trim()}
                    </span>
                  )) : 
                  <span className="text-muted">No expertise listed</span>
                }
              </div>
              
              <h5>Book a Session</h5>
              <Form onSubmit={handleBooking}>
                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Date</Form.Label>
                      <Form.Control 
                        type="date" 
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required 
                      />
                    </Form.Group>
                  </Col>
                  <Col md={3}>
                    <Form.Group>
                      <Form.Label>Time</Form.Label>
                      <Form.Control 
                        type="time" 
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        required 
                      />
                    </Form.Group>
                  </Col>
                  <Col md={3}>
                    <Form.Group>
                      <Form.Label>Duration (min)</Form.Label>
                      <Form.Select 
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                      >
                        <option value="30">30 min</option>
                        <option value="60">60 min</option>
                        <option value="90">90 min</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>
                <Button variant="primary" type="submit">
                  Book Session
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default MentorProfile;