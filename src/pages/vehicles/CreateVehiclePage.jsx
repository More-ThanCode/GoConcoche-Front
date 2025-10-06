// src/pages/vehicles/CreateVehiclePage.jsx
import { useNavigate } from 'react-router-dom';
import { Container, Box, Typography, Paper } from '@mui/material';
import VehicleForm from '../../components/vehicles/VehicleForm';

const CreateVehiclePage = () => {
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate('/my-vehicles');
  };

  const handleCancel = () => {
    navigate('/my-vehicles');
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Add New Vehicle
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          Fill in the details of your vehicle
        </Typography>
        <Box sx={{ mt: 3 }}>
          <VehicleForm onSuccess={handleSuccess} onCancel={handleCancel} />
        </Box>
      </Paper>
    </Container>
  );
};

export default CreateVehiclePage;