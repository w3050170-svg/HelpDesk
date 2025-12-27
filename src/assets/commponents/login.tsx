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
      
      login(token, user); 
      
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