import { Container, Box, Typography, Paper, Alert } from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';

const ProfilePage = () => {
  const { user } = useAuth();

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          My Profile
        </Typography>

        <Alert severity="info" sx={{ mt: 3 }}>
          Profile management functionality is under development.
        </Alert>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            User Information
          </Typography>
          <Typography variant="body1">
            Username: {user?.username || 'Not available'}
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default ProfilePage;