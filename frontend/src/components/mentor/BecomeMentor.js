// frontend/src/components/mentor/BecomeMentor.js
import React, { useState } from 'react';
import { Button, Form, Container, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';

const BecomeMentor = () => {
  const [bio, setBio] = useState('');
  const [expertise, setExpertise] = useState('');
  const [experience, setExperience] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const { authToken } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await axios.put(
        'http://localhost:5000/api/mentor/profile',
        { bio, expertise, experience },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
          }
        }
      );
      setSuccess(true);
    } catch (err) {
      setError('Failed to update profile. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="my-5" style={{ maxWidth: '600px' }}>
      <h2 className="mb-4">Become a Mentor</h2>
      
      {error && <Alert variant="danger">{error}</Alert>}
      {success && (
        <Alert variant="success">
          Your mentor profile has been created successfully!
        </Alert>
      )}
      
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Expertise</Form.Label>
          <Form.Control
            type="text"
            placeholder="e.g., Web Development, Data Science, UI/UX Design"
            value={expertise}
            onChange={(e) => setExpertise(e.target.value)}
            required
          />
          <Form.Text className="text-muted">
            List your areas of expertise, separated by commas
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Years of Experience</Form.Label>
          <Form.Control
            type="number"
            min="0"
            value={experience}
            onChange={(e) => setExperience(parseInt(e.target.value, 10) || 0)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>Bio</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            placeholder="Tell us about yourself and your mentoring experience..."
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            required
          />
        </Form.Group>

        <Button 
          variant="primary" 
          type="submit" 
          disabled={loading}
        >
          {loading ? 'Updating...' : 'Become a Mentor'}
        </Button>
      </Form>
    </Container>
  );
};

export default BecomeMentor;