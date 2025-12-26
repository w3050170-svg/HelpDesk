// import './App.css'
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Login from './assets/commponents/login'
// import Dashboard from './assets/commponents/Dashboard';
// import ProtectedRoute from './assets/commponents/ProtectedRoute';

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         {/* דף לוגין פתוח לכולם */}
//         <Route path="/" element={<Login />} />

//         {/* דף דאשבורד מוגן - רק למשתמש מחובר */}
//         <Route 
//           path="/dashboard" 
//           element={
//             <ProtectedRoute>
//               <Dashboard />
//             </ProtectedRoute>
//           } 
//         />

//         {/* דוגמה לדף שרק מנהל יכול לראות (נשתמש בזה בהמשך) */}
//         {/* <Route 
//           path="/admin-settings" 
//           element={
//             <ProtectedRoute allowedRoles={['admin']}>
//               <AdminSettings />
//             </ProtectedRoute>
//           } 
//         /> 
//         */}

//         {/* דף 404 (כל כתובת אחרת) */}
//         <Route path="*" element={<div style={{padding: '50px', textAlign: 'center'}}><h1>404 - הדף לא נמצא</h1></div>} />
//       </Routes>
//     </BrowserRouter>
//   )
// }

// export default App;




// import './App.css'
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Login from './assets/commponents/login'
// import Dashboard from './assets/commponents/Dashboard';
// import CreateTicket from './assets/commponents/CreateTicket'; // הדף החדש שבנינו
// import TicketDetails from './assets/commponents/TicketDetails'; // דף הצ'אט שנעשה עכשיו
// import ProtectedRoute from './assets/commponents/ProtectedRoute';
// import TicketsList from './assets/commponents/TicketsList';


// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         {/* דף לוגין פתוח לכולם */}
//         <Route path="/" element={<Login />} />

//         {/* דף דאשבורד מוגן */}
//         <Route 
//           path="/dashboard" 
//           element={
//             <ProtectedRoute>
//               <Dashboard />
//             </ProtectedRoute>
//           } 
//         />

//         {/* פיצ'ר פתיחת טיקט חדש - מוגן */}
//         <Route 
//           path="/tickets/new" 
//           element={
//             <ProtectedRoute>
//               <CreateTicket />
//             </ProtectedRoute>
//           } 
//         />

//         {/* פיצ'ר צפייה בפרטי טיקט וצ'אט תגובות - מוגן */}
//         <Route 
//           path="/tickets/:id" 
//           element={
//             <ProtectedRoute>
//               <TicketDetails />
//             </ProtectedRoute>
//           } 
//         />

//         {/* דף 404 (כל כתובת אחרת) */}
//         <Route path="*" element={
//           <div style={{padding: '50px', textAlign: 'center', fontFamily: 'Arial'}}>
//             <h1>404 - הדף לא נמצא</h1>
//             <p>אופס... נראה שהלכת לאיבוד.</p>
//           </div>
//         } />

// <Route 
//   path="/tickets" 
//   element={
//     <ProtectedRoute>
//       <TicketsList />
//     </ProtectedRoute>
//   } 
// />



//       </Routes>
//     </BrowserRouter>
//   )
// }

// export default App;



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