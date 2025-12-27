import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext'; 
import { 
  Container, Typography, Paper, TextField, Button, Stack 
} from '@mui/material';
import Swal from 'sweetalert2';

const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); 
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:4000/auth/register', formData);
      
      const loginRes = await axios.post('http://localhost:4000/auth/login', {
        email: formData.email,
        password: formData.password
      });

      const { token, user } = loginRes.data;
      
      login(token, user.role); 

      navigate('/dashboard');

    } catch (err: any) {
      Swal.fire('שגיאה', err.response?.data?.error || 'ההרשמה נכשלה', 'error');
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 8, direction: 'rtl' }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 4, textAlign: 'center' }}>
        <Typography variant="h5" fontWeight="bold" sx={{ mb: 3, color: '#075e54' }}>
          יצירת חשבון חדש
        </Typography>
        
        <form onSubmit={handleRegister}>
          <Stack spacing={2}>
            <TextField
              label="שם מלא"
              required
              fullWidth
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
            />
            <TextField
              label="אימייל"
              type="email"
              required
              fullWidth
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
            />
            <TextField
              label="סיסמה"
              type="password"
              required
              fullWidth
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
            />
            
            <Button 
              type="submit" 
              variant="contained" 
              fullWidth
              sx={{ 
                mt: 2, 
                py: 1.5, 
                borderRadius: 5, 
                bgcolor: '#075e54', 
                '&:hover': { bgcolor: '#054c44' } 
              }}
            >
              הירשם והיכנס
            </Button>
            
            <Button 
              variant="text" 
              onClick={() => navigate('/login')}
              sx={{ color: 'gray' }}
            >
              כבר יש לי חשבון? להתחברות
            </Button>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
};

export default Register;