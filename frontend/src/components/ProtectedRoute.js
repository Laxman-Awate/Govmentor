// frontend/src/components/ProtectedRoute.js
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function ProtectedRoute({ children, requiredRole = null }) {
    const { currentUser } = useAuth();

    if (!currentUser) {
        // Redirect to login if not authenticated
        return <Navigate to="/login" />;
    }

    if (requiredRole && currentUser.role !== requiredRole) {
        // Redirect to unauthorized if role doesn't match
        return <Navigate to="/unauthorized" />;
    }

    return children;
}