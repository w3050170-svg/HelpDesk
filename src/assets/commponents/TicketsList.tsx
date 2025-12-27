import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  Container, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Chip, Typography, Box, CircularProgress
} from '@mui/material';

const TicketsList = () => {
  const { token, userRole } = useAuth();
  const navigate = useNavigate();
  const [tickets, setTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:4000/tickets', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setTickets(response.data);
      } catch (err) {
        console.error('Error fetching tickets:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchTickets();
  }, [token]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 3, mb: 3 }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold' }}>
        {userRole === 'admin' ? 'כל הפניות' : 'הפניות שלי'}
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ bgcolor: 'grey.100' }}>
            <TableRow>
              <TableCell>נושא</TableCell>
              <TableCell align="center">סטטוס</TableCell>
              <TableCell align="center">עדיפות</TableCell>
              <TableCell align="center">פעולה</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tickets.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} align="center">אין פניות להצגה</TableCell>
              </TableRow>
            ) : (
              tickets.map((ticket) => (
                <TableRow key={ticket.id} hover>
                  <TableCell>{ticket.subject}</TableCell>
                  <TableCell align="center">
                    <Chip label={ticket.status_name} variant="outlined" />
                  </TableCell>
                  <TableCell align="center">{ticket.priority_name}</TableCell>
                  <TableCell align="center">
                    <Typography
                      color="primary"
                      sx={{ cursor: 'pointer' }}
                      onClick={() => navigate(`/tickets/${ticket.id}`)}
                    >
                      צפייה
                    </Typography>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default TicketsList;