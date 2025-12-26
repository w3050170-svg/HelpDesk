// // import { useState } from 'react';
// // import axios from 'axios';
// // import { useNavigate } from 'react-router-dom';
// // // 1. מייבאים את ה"מפתח" לשימוש ברמקול המרכזי
// // import { useAuth } from '../context/AuthContext'; 

// // const Login = () => {
// //   const [password, setPassword] = useState('');
// //   const [email, setEmail] = useState('');
// //   const navigate = useNavigate();

// //   // 2. שואבים את פונקציית ה-login מתוך ה-Context
// //   const { login } = useAuth(); 


// // // const handleSubmit = async (e: React.FormEvent) => {
// // //     e.preventDefault();
// // //     try {
// // //       // 1. ניקוי רווחים ושימוש ב-Headers מפורשים
// // //       const response = await axios.post('http://localhost:4000/auth/login', 
// // //         { 
// // //           email: email.trim(), // מנקה רווחים שקורים בטעות
// // //           password: password.trim() 
// // //         },
// // //         {
// // //           headers: {
// // //             'Content-Type': 'application/json' // אומר לשרת: "אני שולח JSON"
// // //           }
// // //         }
// // //       );
      
// // //       const tokenFromServer = response.data.token;
// // //       // שימי לב: לפי ה-README השרת מחזיר אובייקט משתמש. ודאי שהנתיב נכון:
// // //       const roleFromServer = response.data.user.role;

// // //       login(tokenFromServer, roleFromServer); 

// // //       console.log("התחברות הצליחה:", response.data);
// // //       navigate('/dashboard');
// // //     } catch (error: any) {
// // //       // 2. כאן תראי בדיוק מה השרת עונה!
// // //       console.error("שגיאת התחברות:", error.response?.data);
      
// // //       // הודעה יותר ברורה למשתמש
// // //       const errorMsg = error.response?.data?.message || "פרטי התחברות שגויים, נסי שוב";
// // //       alert(errorMsg);
// // //     }
// // //   };
// // ///////////////שינוי/////////////////////////////////
// // // ////////////////////////////////////////////////
// // // const handleSubmit = async (e: React.FormEvent) => {
// // //   e.preventDefault();
// // //   try {
// // //     const response = await axios.post('http://localhost:4000/auth/login', 
// // //       { 
// // //         email: email.trim(),
// // //         password: password.trim() 
// // //       },
// // //       { headers: { 'Content-Type': 'application/json' } }
// // //     );
    
// // //     const { token, user } = response.data;
// // //     login(token, user); // Pass entire user object
// // //     navigate('/dashboard');
// // //   } catch (error: any) {
// // //     const errorMsg = error.response?.data?.message || "פרטי התחברות שגויים";
// // //     alert(errorMsg);
// // //   }
// // // };
// // /////////////////////////////////////////////////////////////////////////////////////
// // ///////////////////////////////////////////////////////////////////////////////////
// // // ... (imports)
// // const handleSubmit = async (e: React.FormEvent) => {
// //   e.preventDefault();
// //   try {
// //     const response = await axios.post('http://localhost:4000/auth/login', 
// //       { email: email.trim(), password: password.trim() },
// //       { headers: { 'Content-Type': 'application/json' } }
// //     );
// //     const { token, user } = response.data;
// //     login(token, user); // שולחים את שניהם ל-Context [cite: 36]
// //     navigate('/dashboard');
// //   } catch (error: any) {
// //     alert(error.response?.data?.message || "פרטי התחברות שגויים");
// //   }
// // };
// // // ...

// //   return (
// //     <div className="auth-container">
// //       <div className="auth-card">
// //         <h2>Login</h2>
// //         <form onSubmit={handleSubmit} className="auth-form">
// //           <input 
// //             className="form-input" 
// //             type="email" 
// //             value={email} 
// //             onChange={(e) => setEmail(e.target.value)} 
// //             placeholder="Enter your email" 
// //             required
// //           />
// //           <input 
// //             className="form-input" 
// //             type="password" 
// //             value={password} 
// //             onChange={(e) => setPassword(e.target.value)} 
// //             placeholder="Enter your password" 
// //             required
// //           />
// //           <button className="btn-primary" type='submit'>Login</button>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Login;


// // import { useState } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import axios from 'axios';
// // import { useAuth } from '../context/AuthContext';
// // import { 
// //  Container, Typography, Paper, TextField, Button, Stack 
// // } from '@mui/material';
// // import Swal from 'sweetalert2';

// // const Login = () => {
// //   const navigate = useNavigate();
// //   const { login } = useAuth();
// //   const [email, setEmail] = useState('');
// //   const [password, setPassword] = useState('');

// //   const handleLogin = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     try {
// //       const response = await axios.post('http://localhost:4000/auth/login', { email, password });
// //       const { token, user } = response.data;
      
// //       // שמירת הנתונים בקונטקסט
// //       login(token, user.role); 
      
// //       navigate('/dashboard');
// //     } catch (err: any) {
// //       Swal.fire('שגיאה', 'אימייל או סיסמה שגויים', 'error');
// //     }
// //   };

// //   return (
// //     <Container maxWidth="xs" sx={{ mt: 10, direction: 'rtl' }}>
// //       <Paper elevation={3} sx={{ p: 4, borderRadius: 4, textAlign: 'center' }}>
// //         <Typography variant="h5" fontWeight="bold" sx={{ mb: 3, color: '#075e54' }}>
// //           התחברות למערכת
// //         </Typography>
        
// //         <form onSubmit={handleLogin}>
// //           <Stack spacing={2}>
// //             <TextField
// //               label="אימייל"
// //               type="email"
// //               required
// //               fullWidth
// //               value={email}
// //               onChange={(e) => setEmail(e.target.value)}
// //               sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
// //             />
// //             <TextField
// //               label="סיסמה"
// //               type="password"
// //               required
// //               fullWidth
// //               value={password}
// //               onChange={(e) => setPassword(e.target.value)}
// //               sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
// //             />
            
// //             <Button 
// //               type="submit" 
// //               variant="contained" 
// //               fullWidth
// //               sx={{ 
// //                 mt: 1, 
// //                 py: 1.5, 
// //                 borderRadius: 5, 
// //                 bgcolor: '#075e54', 
// //                 '&:hover': { bgcolor: '#054c44' } 
// //               }}
// //             >
// //               התחבר
// //             </Button>

// //             {/* הקישור שביקשת */}
// //             <Typography variant="body2" sx={{ mt: 2 }}>
// //               אין לך חשבון?{' '}
// //               <span 
// //                 style={{ 
// //                   color: '#075e54', 
// //                   cursor: 'pointer', 
// //                   fontWeight: 'bold', 
// //                   textDecoration: 'underline' 
// //                 }}
// //                 onClick={() => navigate('/register')}
// //               >
// //                 הירשם כאן
// //               </span>
// //             </Typography>
// //           </Stack>
// //         </form>
// //       </Paper>
// //     </Container>
// //   );
// // };

// // export default Login;

// /////////////////////////////////////////////////////////////////////////////////////////

// // import { useState } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import axios from 'axios';
// // import { useAuth } from '../context/AuthContext';
// // import { Container, Typography, Paper, TextField, Button, Stack } from '@mui/material';
// // import Swal from 'sweetalert2';

// // const Login = () => {
// //   const navigate = useNavigate();
// //   const { login } = useAuth();
// //   const [email, setEmail] = useState('');
// //   const [password, setPassword] = useState('');

// //   const handleLogin = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     try {
// //       const response = await axios.post('http://localhost:4000/auth/login', { 
// //         email: email.trim(), 
// //         password: password.trim() 
// //       });
// //       const { token, user } = response.data;
      
// //       // כאן הוספתי await כדי לוודא שהסטייט מתעדכן לפני הניווט
// //       await login(token, user.role); 
// //       navigate('/dashboard');
// //     } catch (err: any) {
// //       Swal.fire('שגיאה', 'אימייל או סיסמה שגויים', 'error');
// //     }
// //   };

// //   return (
// //     <Container maxWidth="xs" sx={{ mt: 10, direction: 'rtl' }}>
// //       <Paper elevation={3} sx={{ p: 4, borderRadius: 4, textAlign: 'center' }}>
// //         <Typography variant="h5" fontWeight="bold" sx={{ mb: 3, color: '#075e54' }}>
// //           התחברות
// //         </Typography>
// //         <form onSubmit={handleLogin}>
// //           <Stack spacing={2}>
// //             <TextField label="אימייל" type="email" required fullWidth value={email}
// //               onChange={(e) => setEmail(e.target.value)}
// //               sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
// //             />
// //             <TextField label="סיסמה" type="password" required fullWidth value={password}
// //               onChange={(e) => setPassword(e.target.value)}
// //               sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
// //             />
// //             <Button type="submit" variant="contained" fullWidth
// //               sx={{ mt: 1, py: 1.5, borderRadius: 5, bgcolor: '#075e54', '&:hover': { bgcolor: '#054c44' } }}>
// //               התחבר
// //             </Button>
// //             <Typography variant="body2" sx={{ mt: 2 }}>
// //               אין לך חשבון?{' '}
// //               <span style={{ color: '#075e54', cursor: 'pointer', fontWeight: 'bold', textDecoration: 'underline' }}
// //                 onClick={() => navigate('/register')}>
// //                 הירשם כאן
// //               </span>
// //             </Typography>
// //           </Stack>
// //         </form>
// //       </Paper>
// //     </Container>
// //   );
// // };

// // export default Login;


// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { useAuth } from '../context/AuthContext';
// import { Container, Typography, Paper, TextField, Button, Stack } from '@mui/material';
// import Swal from 'sweetalert2';

// const Login = () => {
//   const navigate = useNavigate();
//   const { login } = useAuth();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   // const handleLogin = async (e: React.FormEvent) => {
//   //   e.preventDefault();
//   //   try {
//   //     const response = await axios.post('http://localhost:4000/auth/login', { 
//   //       email: email.trim(), 
//   //       password: password.trim() 
//   //     });
      
//   //     const { token, user } = response.data;
      
//   //     // עדכון ה-State ב-Context והמתנה לסיום העדכון
//   //     await login(token, user); 
      
//   //     // ניווט רק לאחר שה-State עודכן
//   //     navigate('/dashboard');
//   //   } catch (err: any) {
//   //     Swal.fire('שגיאה', 'אימייל או סיסמה שגויים', 'error');
//   //   }
//   // };

// // const handleLogin = async (e: React.FormEvent) => {
// //   e.preventDefault();
// //   try {
// //     const response = await axios.post('http://localhost:4000/auth/login', { 
// //       email: email.trim(), 
// //       password: password.trim() 
// //     });
    
// //     const { token, user } = response.data;
    
// //     // שליחת הטוקן והמשתמש ל-Context
// //     // זה יעדכן את ה-userRole ב-State המרכזי מיד!
// //     login(token, user); 
    
// //     // עכשיו הניווט יקרה כשהמידע כבר קיים בזיכרון של React
// //     navigate('/dashboard');
// //   } catch (err: any) {
// //     Swal.fire('שגיאה', 'אימייל או סיסמה שגויים', 'error');
// //   }
// // };


// const handleLogin = async (e: React.FormEvent) => {
//   e.preventDefault();
//   try {
//     const response = await axios.post('http://localhost:4000/auth/login', { 
//       email: email.trim(), 
//       password: password.trim() 
//     });
    
//     const { token, user } = response.data;
    
//     // מחכים שה-State יתעדכן לגמרי
//     await login(token, user); 
    
//     // רק עכשיו עוברים עמוד - הכפתור יופיע מיד!
//     navigate('/dashboard');
//   } catch (err: any) {
//     Swal.fire('שגיאה', 'אימייל או סיסמה שגויים', 'error');
//   }
// };

//   return (
//     <Container maxWidth="xs" sx={{ mt: 10, direction: 'rtl' }}>
//       <Paper elevation={3} sx={{ p: 4, borderRadius: 4, textAlign: 'center' }}>
//         <Typography variant="h5" fontWeight="bold" sx={{ mb: 3, color: '#075e54' }}>
//           התחברות
//         </Typography>
//         <form onSubmit={handleLogin}>
//           <Stack spacing={2}>
//             <TextField label="אימייל" type="email" required fullWidth value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
//             />
//             <TextField label="סיסמה" type="password" required fullWidth value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
//             />
//             <Button type="submit" variant="contained" fullWidth
//               sx={{ mt: 1, py: 1.5, borderRadius: 5, bgcolor: '#075e54', '&:hover': { bgcolor: '#054c44' } }}>
//               התחבר
//             </Button>
//             <Typography variant="body2" sx={{ mt: 2 }}>
//               אין לך חשבון?{' '}
//               <span style={{ color: '#075e54', cursor: 'pointer', fontWeight: 'bold', textDecoration: 'underline' }}
//                 onClick={() => navigate('/register')}>
//                 הירשם כאן
//               </span>
//             </Typography>
//           </Stack>
//         </form>
//       </Paper>
//     </Container>
//   );
// };

// export default Login;



import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Container, Typography, Paper, TextField, Button, Stack } from '@mui/material';
import Swal from 'sweetalert2';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/auth/login', { 
        email: email.trim(), 
        password: password.trim() 
      });
      
      const { token, user } = response.data;
      
      // שליחת הנתונים ל-Context והמתנה קצרה לעדכון הזיכרון
      await login(token, user); 
      
      // מעבר לעמוד הבא כשהמידע כבר קיים ב-State
      navigate('/dashboard');
    } catch (err: any) {
      Swal.fire('שגיאה', 'אימייל או סיסמה שגויים', 'error');
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 10, direction: 'rtl' }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 4, textAlign: 'center' }}>
        <Typography variant="h5" fontWeight="bold" sx={{ mb: 3, color: '#075e54' }}>
          התחברות
        </Typography>
        <form onSubmit={handleLogin}>
          <Stack spacing={2}>
            <TextField label="אימייל" type="email" required fullWidth value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
            />
            <TextField label="סיסמה" type="password" required fullWidth value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
            />
            <Button type="submit" variant="contained" fullWidth
              sx={{ mt: 1, py: 1.5, borderRadius: 5, bgcolor: '#075e54', '&:hover': { bgcolor: '#054c44' } }}>
              התחבר
            </Button>
            <Typography variant="body2" sx={{ mt: 2 }}>
              אין לך חשבון?{' '}
              <span style={{ color: '#075e54', cursor: 'pointer', fontWeight: 'bold', textDecoration: 'underline' }}
                onClick={() => navigate('/register')}>
                הירשם כאן
              </span>
            </Typography>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
};

export default Login;