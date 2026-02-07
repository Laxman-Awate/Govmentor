// frontend/src/services/api.js
const API_BASE_URL = 'http://localhost:5000/api';

// Helper function to handle responses
async function handleResponse(response) {
    const data = await response.json();
    if (!response.ok) {
        const error = (data && data.error) || response.statusText;
        return Promise.reject(error);
    }
    return data;
}

// Auth Service
export const authService = {
    async login(email, password) {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
            credentials: 'include'
        });
        return handleResponse(response);
    },

    async register(userData) {
        const response = await fetch(`${API_BASE_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData),
            credentials: 'include'
        });
        return handleResponse(response);
    },

    async getCurrentUser() {
        const token = localStorage.getItem('token');
        if (!token) return null;
        
        try {
            const response = await fetch(`${API_BASE_URL}/auth/me`, {
                headers: { 
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });
            return await handleResponse(response);
        } catch (error) {
            console.error('Error fetching current user:', error);
            return null;
        }
    },

    logout() {
        localStorage.removeItem('token');
        // You might want to add a logout endpoint in your backend
    }
};

// Mentor Service
export const mentorService = {
    async getAllMentors() {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_BASE_URL}/mentors`, {
            headers: { 
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        });
        return handleResponse(response);
    },

    async getMentorById(id) {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_BASE_URL}/mentors/${id}`, {
            headers: { 
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        });
        return handleResponse(response);
    }
};

// Session Service
export const sessionService = {
    async bookSession(sessionData) {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_BASE_URL}/sessions`, {
            method: 'POST',
            headers: { 
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(sessionData),
            credentials: 'include'
        });
        return handleResponse(response);
    },

    async getUserSessions() {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_BASE_URL}/sessions`, {
            headers: { 
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        });
        return handleResponse(response);
    }
};