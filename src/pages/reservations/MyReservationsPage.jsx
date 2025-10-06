import { Container, Box, Typography, Alert } from '@mui/material';

const MyReservationsPage = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        My Reservations
      </Typography>

      <Alert severity="info" sx={{ mt: 3 }}>
        Reservations functionality is under development. You'll be able to view and manage your vehicle reservations here.
      </Alert>

      <Box sx={{ mt: 4 }}>
        <Typography variant="body1" color="text.secondary">
          This page will display:
        </Typography>
        <ul>
          <li>Active reservations</li>
          <li>Past reservations</li>
          <li>Reservation details and status</li>
          <li>Cancel reservation option</li>
        </ul>
      </Box>
    </Container>
  );
};

export default MyReservationsPage;