import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// הקומפוננטה מקבלת את הדף שאנחנו רוצים להציג (children)
// ואופציונלית - רשימת תפקידים שמורשים להיכנס (allowedRoles)
const ProtectedRoute = ({ children, allowedRoles }: { children: any, allowedRoles?: string[] }) => {
    const { isAuthenticated, userRole } = useAuth();

    // 1. אם המשתמש בכלל לא מחובר - שלח אותו לדף ה-Login
    if (!isAuthenticated) {
        return <Navigate to="/" />;
    }

    // 2. אם הגדרנו תפקידים ספציפיים והמשתמש לא אחד מהם - שלח אותו חזרה לדאשבורד
    if (allowedRoles && !allowedRoles.includes(userRole)) {
        return <Navigate to="/dashboard" />;
    }

    // 3. אם הכל תקין - הצג את הדף
    return children;
};

export default ProtectedRoute;