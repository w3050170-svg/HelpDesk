
// import { useEffect, useState, useRef } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { useAuth } from '../context/AuthContext';
// import {
//   Box, Container, Typography, Paper, TextField, 
//   Button, IconButton, Stack, Chip
// } from '@mui/material';
// import { 
//   ArrowBack as ArrowBackIcon, 
//   Send as SendIcon,
//   Person as PersonIcon,
//   SupportAgent as AdminIcon,
//   Lock as LockIcon
// } from '@mui/icons-material';
// import Swal from 'sweetalert2';

// const TicketDetails = () => {
//   const { id } = useParams();
//   const { token, userRole } = useAuth();
//   const navigate = useNavigate();
//   const [ticket, setTicket] = useState<any>(null);
//   const [comments, setComments] = useState<any[]>([]);
//   const [auth, setAuth] = useState<any>(null);
//   const [newComment, setNewComment] = useState('');
//   const scrollRef = useRef<HTMLDivElement>(null);

//   // בדיקה אם הפנייה סגורה לפי שם הסטטוס
//   const isClosed = ticket?.status_name === 'closed';

//   const fetchDetails = async () => {
//     try {
//       // GET /tickets/:id - שליפת פרטי הפנייה
//       const resTicket = await axios.get(`http://localhost:4000/tickets/${id}`, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       setTicket(resTicket.data);

//       // GET /tickets/:ticketId/comments - שליפת התגובות
//       const resComments = await axios.get(`http://localhost:4000/tickets/${id}/comments`, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       setComments(resComments.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const fetchUserInfo = async (token: string) => {
//     try {
//       // GET /auth/me - פרטי המשתמש המחובר
//       const response = await fetch('http://localhost:4000/auth/me', {
//         method: 'GET',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         }
//       });
//       if (response.ok) {
//         const userData = await response.json();
//         setAuth(userData); 
//       }
//     } catch (error) {
//       console.error("Error fetching user info:", error);
//     }
//   };

//   // פונקציה לסגירת פנייה - עודכן ל-PATCH לפי ה-README של השרת כדי למנוע 404
//   const handleCloseTicket = async () => {
//     try {
//       const result = await Swal.fire({
//         title: 'לסגור את הפנייה?',
//         text: "לא ניתן יהיה להוסיף תגובות לאחר הסגירה",
//         icon: 'warning',
//         showCancelButton: true,
//         confirmButtonColor: '#3085d6',
//         cancelButtonColor: '#d33',
//         confirmButtonText: 'כן, סגור פנייה',
//         cancelButtonText: 'ביטול'
//       });

//       if (result.isConfirmed) {
//         // שימוש ב-PATCH לכתובת הפנייה הכללית כפי שמוגדר בשרת
//         await axios.patch(`http://localhost:4000/tickets/${id}`, 
//           { status_id: 2 }, // סטטוס 2 = סגור
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//         Swal.fire('נסגר!', 'הפנייה נסגרה בהצלחה.', 'success');
//         fetchDetails();
//       }
//     } catch (err) {
//       Swal.fire('שגיאה', 'לא ניתן לסגור את הפנייה', 'error');
//     }
//   };

//   useEffect(() => {
//     fetchUserInfo(token);
//     fetchDetails();
//   }, [id, token]);

//   useEffect(() => {
//     if (scrollRef.current) {
//       scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
//     }
//   }, [comments]);

//   const handleSendComment = async () => {
//     if (!newComment.trim() || isClosed) return;
//     try {
//       // POST /tickets/:ticketId/comments
//       await axios.post(`http://localhost:4000/tickets/${id}/comments`, 
//         { content: newComment },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setNewComment('');
//       fetchDetails();
//     } catch (err) {
//       Swal.fire('שגיאה', 'השליחה נכשלה', 'error');
//     }
//   };

//   if (!ticket) return null;

//   return (
//     <Container maxWidth="md" sx={{ mt: 3, mb: 3, direction: 'rtl' }}>
//       <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
//         <IconButton onClick={() => navigate('/dashboard')}>
//           <ArrowBackIcon />
//         </IconButton>

//         {/* כפתור סגירת פנייה - מופיע רק למנהל/נציג ורק אם הפנייה פתוחה */}
//         {(userRole === 'admin' || userRole === 'agent') && !isClosed && (
//           <Button 
//             variant="contained" 
//             color="error" 
//             size="small" 
//             startIcon={<LockIcon />}
//             onClick={handleCloseTicket}
//             sx={{ borderRadius: 2 }}
//           >
//             סגור פנייה
//           </Button>
//         )}
        
//         {/* תגית שמראה שהפנייה סגורה */}
//         {isClosed && <Chip label="פנייה סגורה" color="error" variant="outlined" icon={<LockIcon />} />}
//       </Stack>

//       <Paper elevation={0} sx={{ p: 2, mb: 2, borderRadius: 3, border: '1px solid #eee', bgcolor: '#fafafa' }}>
//         <Typography variant="h6" fontWeight="bold">{ticket.subject}</Typography>
//         <Typography variant="body2" color="text.secondary">{ticket.description}</Typography>
//       </Paper>

//       <Paper elevation={3} sx={{ borderRadius: 4, overflow: 'hidden', bgcolor: '#f0f2f5' }}>
//         <Box 
//           ref={scrollRef}
//           sx={{ 
//             height: '58vh', 
//             overflowY: 'auto', 
//             p: 2, 
//             display: 'flex', 
//             flexDirection: 'column',
//             gap: 2
//         }}>

//           {comments.map((comment) => {
//             const isFromCustomer = auth?.email === comment.author_email; 

//             return (
//               <Box 
//                 key={comment.id} 
//                 sx={{ 
//                   alignSelf: isFromCustomer ? 'flex-start' : 'flex-end', 
//                   maxWidth: '75%',
//                   display: 'flex',
//                   gap: 1,
//                   flexDirection: isFromCustomer ? 'row' : 'row-reverse'
//                 }}
//               >
//                 {isFromCustomer ? <PersonIcon fontSize="small" color="action" /> : <AdminIcon fontSize="small" color="primary" />}

//                 <Box sx={{ 
//                   p: 1.5, 
//                   borderRadius: 3, 
//                   bgcolor: isFromCustomer ? '#dcf8c6' : '#fff',
//                   boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
//                   border: isFromCustomer ? 'none' : '1px solid #e0e0e0'
//                 }}>
//                   <Typography sx={{ fontSize: '0.75rem', fontWeight: 'bold', mb: 0.5, color: isFromCustomer ? '#2e7d32' : '#1976d2' }}>
//                     {comment.author_name} 
//                   </Typography>
//                   <Typography variant="body2">{comment.content}</Typography>
//                   <Typography variant="caption" sx={{ fontSize: '0.6rem', color: 'gray', display: 'block', mt: 0.5, textAlign: 'left' }}>
//                     {new Date(comment.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//                   </Typography>
//                 </Box>
//               </Box>
//             );
//           })}
//         </Box>

//         <Box sx={{ p: 2, bgcolor: '#fff', borderTop: '1px solid #ddd' }}>
//           {/* אם הפנייה סגורה - לא ניתן להקליד הודעה */}
//           {!isClosed ? (
//             <Stack direction="row" spacing={1}>
//               <TextField
//                 fullWidth
//                 size="small"
//                 placeholder="כתוב הודעה..."
//                 value={newComment}
//                 onChange={(e) => setNewComment(e.target.value)}
//                 onKeyPress={(e) => e.key === 'Enter' && handleSendComment()}
//                 sx={{ '& .MuiOutlinedInput-root': { borderRadius: 5 } }}
//               />
//               <Button 
//                 variant="contained" 
//                 onClick={handleSendComment}
//                 sx={{ borderRadius: 5, minWidth: 50, bgcolor: '#075e54', '&:hover': { bgcolor: '#054c44' } }}
//               >
//                 <SendIcon />
//               </Button>
//             </Stack>
//           ) : (
//             <Typography sx={{ textAlign: 'center', color: 'gray', py: 1 }}>
//               הפנייה סגורה לקבלת תגובות חדשות
//             </Typography>
//           )}
//         </Box>
//       </Paper>
//     </Container>
//   );
// };

// export default TicketDetails;




import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import {
  Box, Container, Typography, Paper, TextField, 
  Button, IconButton, Stack, Chip, MenuItem, Select, FormControl, InputLabel
} from '@mui/material';
import { 
  ArrowBack as ArrowBackIcon, 
  Send as SendIcon,
  Person as PersonIcon,
  SupportAgent as AdminIcon,
  Lock as LockIcon,
  AssignmentInd as AssignIcon
} from '@mui/icons-material';
import Swal from 'sweetalert2';

const TicketDetails = () => {
  const { id } = useParams();
  const { token, userRole } = useAuth();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState<any>(null);
  const [comments, setComments] = useState<any[]>([]);
  const [auth, setAuth] = useState<any>(null);
  const [agents, setAgents] = useState<any[]>([]); // רשימת סוכנים לבחירה
  const [newComment, setNewComment] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  const isClosed = ticket?.status_name === 'closed';

  const fetchDetails = async () => {
    try {
      const resTicket = await axios.get(`http://localhost:4000/tickets/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTicket(resTicket.data);

      const resComments = await axios.get(`http://localhost:4000/tickets/${id}/comments`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setComments(resComments.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchAgents = async () => {
    if (userRole !== 'admin') return;
    try {
      // GET /users - שליפת כל המשתמשים כדי למצוא סוכנים
      const res = await axios.get('http://localhost:4000/users', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const onlyAgents = res.data.filter((u: any) => u.role === 'agent');
      setAgents(onlyAgents);
    } catch (err) {
      console.error("Error fetching agents:", err);
    }
  };

  const fetchUserInfo = async (token: string) => {
    try {
      const response = await fetch('http://localhost:4000/auth/me', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        const userData = await response.json();
        setAuth(userData); 
      }
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  // פונקציה להקצאת סוכן - משתמשת ב-PATCH לפי ה-README
  const handleAssignAgent = async (agentId: any) => {
    try {
      await axios.patch(`http://localhost:4000/tickets/${id}`, 
        { assigned_to: agentId }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
      Swal.fire('עודכן!', 'הפנייה הוקצתה לסוכן.', 'success');
      fetchDetails();
    } catch (err) {
      Swal.fire('שגיאה', 'לא ניתן להקצות סוכן', 'error');
    }
  };

  const handleCloseTicket = async () => {
    try {
      const result = await Swal.fire({
        title: 'לסגור את הפנייה?',
        text: "לא ניתן יהיה להוסיף תגובות לאחר הסגירה",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'כן, סגור פנייה',
        cancelButtonText: 'ביטול'
      });

      if (result.isConfirmed) {
        await axios.patch(`http://localhost:4000/tickets/${id}`, 
          { status_id: 2 }, 
          { headers: { Authorization: `Bearer ${token}` } }
        );
        Swal.fire('נסגר!', 'הפנייה נסגרה בהצלחה.', 'success');
        fetchDetails();
      }
    } catch (err) {
      Swal.fire('שגיאה', 'לא ניתן לסגור את הפנייה', 'error');
    }
  };

  useEffect(() => {
    fetchUserInfo(token);
    fetchDetails();
    fetchAgents();
  }, [id, token]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [comments]);

  const handleSendComment = async () => {
    if (!newComment.trim() || isClosed) return;
    try {
      await axios.post(`http://localhost:4000/tickets/${id}/comments`, 
        { content: newComment },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNewComment('');
      fetchDetails();
    } catch (err) {
      Swal.fire('שגיאה', 'השליחה נכשלה', 'error');
    }
  };

  if (!ticket) return null;

  return (
    <Container maxWidth="md" sx={{ mt: 3, mb: 3, direction: 'rtl' }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
        <IconButton onClick={() => navigate('/dashboard')}>
          <ArrowBackIcon />
        </IconButton>

        <Stack direction="row" spacing={1} alignItems="center">
          {/* בחירת סוכן - מופיע רק למנהל */}
          {userRole === 'admin' && !isClosed && (
            <FormControl size="small" sx={{ minWidth: 150 }}>
              <InputLabel id="assign-label">הקצה לסוכן</InputLabel>
              <Select
                labelId="assign-label"
                label="הקצה לסוכן"
                value={ticket.assigned_to || ''}
                onChange={(e) => handleAssignAgent(e.target.value)}
                sx={{ borderRadius: 2 }}
              >
                {agents.map((agent) => (
                  <MenuItem key={agent.id} value={agent.id}>{agent.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          )}

          {(userRole === 'admin' || userRole === 'agent') && !isClosed && (
            <Button 
              variant="contained" 
              color="error" 
              size="small" 
              startIcon={<LockIcon />}
              onClick={handleCloseTicket}
              sx={{ borderRadius: 2 }}
            >
              סגור פנייה
            </Button>
          )}
        </Stack>
        
        {isClosed && <Chip label="פנייה סגורה" color="error" variant="outlined" icon={<LockIcon />} />}
      </Stack>

      <Paper elevation={0} sx={{ p: 2, mb: 2, borderRadius: 3, border: '1px solid #eee', bgcolor: '#fafafa' }}>
        <Typography variant="h6" fontWeight="bold">{ticket.subject}</Typography>
        <Typography variant="body2" color="text.secondary">{ticket.description}</Typography>
        {ticket.assigned_to_name && (
          <Chip 
            icon={<AssignIcon fontSize="small" />} 
            label={`בטיפול: ${ticket.assigned_to_name}`} 
            size="small" 
            sx={{ mt: 1, bgcolor: '#e3f2fd', color: '#1976d2' }} 
          />
        )}
      </Paper>

      <Paper elevation={3} sx={{ borderRadius: 4, overflow: 'hidden', bgcolor: '#f0f2f5' }}>
        <Box 
          ref={scrollRef}
          sx={{ 
            height: '58vh', 
            overflowY: 'auto', 
            p: 2, 
            display: 'flex', 
            flexDirection: 'column',
            gap: 2
        }}>

          {comments.map((comment) => {
            const isFromCustomer = auth?.email === comment.author_email; 

            return (
              <Box 
                key={comment.id} 
                sx={{ 
                  alignSelf: isFromCustomer ? 'flex-start' : 'flex-end', 
                  maxWidth: '75%',
                  display: 'flex',
                  gap: 1,
                  flexDirection: isFromCustomer ? 'row' : 'row-reverse'
                }}
              >
                {isFromCustomer ? <PersonIcon fontSize="small" color="action" /> : <AdminIcon fontSize="small" color="primary" />}

                <Box sx={{ 
                  p: 1.5, 
                  borderRadius: 3, 
                  bgcolor: isFromCustomer ? '#dcf8c6' : '#fff',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
                  border: isFromCustomer ? 'none' : '1px solid #e0e0e0'
                }}>
                  <Typography sx={{ fontSize: '0.75rem', fontWeight: 'bold', mb: 0.5, color: isFromCustomer ? '#2e7d32' : '#1976d2' }}>
                    {comment.author_name} 
                  </Typography>
                  <Typography variant="body2">{comment.content}</Typography>
                  <Typography variant="caption" sx={{ fontSize: '0.6rem', color: 'gray', display: 'block', mt: 0.5, textAlign: 'left' }}>
                    {new Date(comment.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </Typography>
                </Box>
              </Box>
            );
          })}
        </Box>

        <Box sx={{ p: 2, bgcolor: '#fff', borderTop: '1px solid #ddd' }}>
          {!isClosed ? (
            <Stack direction="row" spacing={1}>
              <TextField
                fullWidth
                size="small"
                placeholder="כתוב הודעה..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendComment()}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 5 } }}
              />
              <Button 
                variant="contained" 
                onClick={handleSendComment}
                sx={{ borderRadius: 5, minWidth: 50, bgcolor: '#075e54', '&:hover': { bgcolor: '#054c44' } }}
              >
                <SendIcon />
              </Button>
            </Stack>
          ) : (
            <Typography sx={{ textAlign: 'center', color: 'gray', py: 1 }}>
              הפנייה סגורה לקבלת תגובות חדשות
            </Typography>
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default TicketDetails;