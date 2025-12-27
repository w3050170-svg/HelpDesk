import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  Box, Drawer, AppBar, Toolbar, List, Typography, Divider,
  ListItem, ListItemButton, ListItemIcon, ListItemText, Container,
  Grid, Card, CardContent, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Chip, Avatar, CssBaseline
} from '@mui/material';
import {
  Dashboard as DashIcon,
  ConfirmationNumber as TicketIcon,
  AddCircle as AddIcon,
  ExitToApp as LogoutIcon,
  Person as PersonIcon,
} from '@mui/icons-material';

const drawerWidth = 240;

interface Ticket {
  id: number;
  subject: string;
  description: string;
  status_name: string;
  priority_name: string;
  created_by: number;
  assigned_to?: number | null;
  created_at: string;
}

const Dashboard = () => {
  const { token, userRole, logout } = useAuth();
  const navigate = useNavigate();
  const [tickets, setTickets] = useState<Ticket[]>([]);

  useEffect(() => {
    if (token) {
      const fetchTickets = async () => {
        try {
          const response = await axios.get('http://localhost:4000/tickets', {
            headers: { Authorization: `Bearer ${token}` }
          });
          setTickets(response.data);
        } catch (err) {
          console.error("Error fetching tickets", err);
        }
      };
      fetchTickets();
    }
  }, [token]);

  return (
    <Box key={userRole} sx={{ display: 'flex', direction: 'rtl' }}>
      <CssBaseline />
      
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, bgcolor: '#075e54' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 'bold' }}>
            מערכת ניהול פניות - Helpdesk
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="body1">
              {userRole === 'admin' ? 'מנהל מערכת' : userRole}
            </Typography>
            <Avatar sx={{ bgcolor: 'secondary.main' }}><PersonIcon /></Avatar>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        key={`drawer-${userRole}`}
        variant="permanent"
        anchor="right"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate('/dashboard')}>
                <ListItemIcon><DashIcon /></ListItemIcon>
                <ListItemText primary="דאשבורד" sx={{ textAlign: 'right' }} />
              </ListItemButton>
            </ListItem>

            {userRole === 'customer' && (
              <ListItem disablePadding>
                <ListItemButton onClick={() => navigate('/tickets/new')}>
                  <ListItemIcon><AddIcon /></ListItemIcon>
                  <ListItemText primary="פתיחת פניה" sx={{ textAlign: 'right' }} />
                </ListItemButton>
              </ListItem>
            )}

            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate('/tickets')}>
                <ListItemIcon><TicketIcon /></ListItemIcon>
                <ListItemText primary="כל הכרטיסים" sx={{ textAlign: 'right' }} />
              </ListItemButton>
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={logout}>
                <ListItemIcon><LogoutIcon /></ListItemIcon>
                <ListItemText primary="התנתקות" sx={{ textAlign: 'right' }} />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h4" gutterBottom sx={{ textAlign: 'right', mb: 4, fontWeight: 'medium' }}>
            שלום, ברוך הבא לדאשבורד
          </Typography>

          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid size={{ xs: 12, md: 4 }}>
              <Card elevation={3}>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography color="textSecondary" gutterBottom>סה"כ פניות</Typography>
                  <Typography variant="h3">{tickets.length}</Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <Card elevation={3} sx={{ borderTop: '4px solid green' }}>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography color="textSecondary" gutterBottom>פניות פתוחות</Typography>
                  <Typography variant="h3" color="success.main">
                    {tickets.filter(t => t.status_name === 'open').length}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <Card elevation={3} sx={{ borderTop: '4px solid red' }}>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography color="textSecondary" gutterBottom>דחיפות גבוהה</Typography>
                  <Typography variant="h3" color="error.main">
                    {tickets.filter(t => t.priority_name?.toLowerCase() === 'high').length}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <TableContainer component={Paper} elevation={4}>
            <Table sx={{ minWidth: 650 }}>
              <TableHead sx={{ bgcolor: 'grey.100' }}>
                <TableRow>
                  <TableCell align="right" sx={{ fontWeight: 'bold' }}>נושא הפניה</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold' }}>סטטוס</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold' }}>רמת דחיפות</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold' }}>פעולות</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tickets.map((ticket) => (
                  <TableRow key={ticket.id} hover>
                    <TableCell align="right">{ticket.subject}</TableCell>
                    <TableCell align="center">
                      <Chip 
                        label={ticket.status_name} 
                        color={ticket.status_name === 'open' ? 'success' : 'default'} 
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="body2" color={ticket.priority_name === 'high' ? 'error' : 'textPrimary'}>
                        {ticket.priority_name}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <ListItemButton 
                        onClick={() => navigate(`/tickets/${ticket.id}`)}
                        sx={{ justifyContent: 'center', color: 'primary.main' }}
                      >
                        צפייה בתגובות
                      </ListItemButton>
                    </TableCell>
                  </TableRow>
                ))}
                {tickets.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} align="center">אין נתונים להצגה</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </Box>
    </Box>
  );
};

export default Dashboard;