import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './assets/commponents/login'
import Register from './assets/commponents/Register'; // ייבוא דף ההרשמה החדש
import Dashboard from './assets/commponents/Dashboard';
import CreateTicket from './assets/commponents/CreateTicket'; 
import TicketDetails from './assets/commponents/TicketDetails'; 
import ProtectedRoute from './assets/commponents/ProtectedRoute';
import TicketsList from './assets/commponents/TicketsList';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* דפי כניסה והרשמה - פתוחים לכולם */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} /> {/* דף ההרשמה החדש */}

        {/* דף דאשבורד מוגן */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />

        {/* פיצ'ר פתיחת טיקט חדש - מוגן */}
        <Route 
          path="/tickets/new" 
          element={
            <ProtectedRoute>
              <CreateTicket />
            </ProtectedRoute>
          } 
        />

        {/* רשימת טיקטים - מוגן */}
        <Route 
          path="/tickets" 
          element={
            <ProtectedRoute>
              <TicketsList />
            </ProtectedRoute>
          } 
        />

        {/* פיצ'ר צפייה בפרטי טיקט וצ'אט תגובות - מוגן */}
        <Route 
          path="/tickets/:id" 
          element={
            <ProtectedRoute>
              <TicketDetails />
            </ProtectedRoute>
          } 
        />

        {/* דף 404 (כל כתובת אחרת) */}
        <Route path="*" element={
          <div style={{padding: '50px', textAlign: 'center', fontFamily: 'Arial', direction: 'rtl'}}>
            <h1>404 - הדף לא נמצא</h1>
            <p>אופס... נראה שהלכת לאיבוד.</p>
            <button onClick={() => window.location.href='/login'} style={{cursor: 'pointer', color: '#075e54', background: 'none', border: 'none', textDecoration: 'underline'}}>חזרה לדף הבית</button>
          </div>
        } />

      </Routes>
    </BrowserRouter>
  )
}

export default App;