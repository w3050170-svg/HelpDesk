import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, allowedRoles }: { children: any, allowedRoles?: string[] }) => {
    const { isAuthenticated, userRole } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/" />;
    }

    if (allowedRoles && !allowedRoles.includes(userRole)) {
        return <Navigate to="/dashboard" />;
    }

    return children;
};

export default ProtectedRoute;