import { useState } from 'react';
import { Box, TextField, Button, Typography, Paper, Container, MenuItem } from '@mui/material';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const CreateTicket = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ subject: '', description: '', priority_id: 1 });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:4000/tickets', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      Swal.fire({
        title: 'נשלח בהצלחה!',
        text: 'הטיקט שלך בטיפול',
        icon: 'success',
        confirmButtonColor: '#4e73df'
      });
      
      navigate('/dashboard');
    } catch (err) {
      Swal.fire('אופס...', 'משהו השתבש בשליחה', 'error');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 10 }}>
      <Paper elevation={6} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold', textAlign: 'right' }}>
          פתיחת פניה חדשה 📝
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            label="נושא הפניה"
            fullWidth
            required
            variant="outlined"
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
          />
          <TextField
            label="תיאור הבעיה"
            fullWidth
            multiline
            rows={4}
            required
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
          <TextField
            select
            label="רמת דחיפות"
            value={formData.priority_id}
            onChange={(e) => setFormData({ ...formData, priority_id: Number(e.target.value) })}
          >
            <MenuItem value={1}>נמוכה</MenuItem>
            <MenuItem value={2}>בינונית</MenuItem>
            <MenuItem value={3}>גבוהה 🔥</MenuItem>
          </TextField>
          <Button type="submit" variant="contained" size="large" sx={{ bgcolor: '#4e73df', py: 1.5 }}>
            שלח פניה למערכת
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default CreateTicket;