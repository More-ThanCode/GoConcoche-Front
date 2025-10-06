import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Button,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Alert,
} from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';
import { userRolesService, ownerProfileService, renterProfileService } from '../../services/endpoints';
import OwnerProfileForm from '../../components/profiles/OwnerProfileForm';
import RenterProfileForm from '../../components/profiles/RenterProfileForm';

const OnboardingPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeStep, setActiveStep] = useState(0);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const steps = ['Choose Role', 'Complete Profile'];

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleFinish = () => {
    navigate('/');
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" align="center" gutterBottom>
            Welcome! Let's set up your profile
          </Typography>

          <Stepper activeStep={activeStep} sx={{ mt: 4, mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {activeStep === 0 && (
            <Box>
              <Typography variant="h6" gutterBottom>
                What would you like to do?
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
                <Button
                  variant="outlined"
                  fullWidth
                  size="large"
                  onClick={handleNext}
                >
                  Rent Vehicles
                </Button>
                <Button
                  variant="outlined"
                  fullWidth
                  size="large"
                  onClick={handleNext}
                >
                  Offer My Vehicles
                </Button>
              </Box>
            </Box>
          )}

          {activeStep === 1 && (
            <Box>
              <Typography variant="h6" gutterBottom>
                Complete your profile
              </Typography>
              {/* Here you would render the appropriate profile form */}
              <Box sx={{ mt: 3 }}>
                <Button
                  variant="contained"
                  onClick={handleFinish}
                >
                  Complete Setup
                </Button>
              </Box>
            </Box>
          )}
        </Paper>
      </Box>
    </Container>
  );
};

export default OnboardingPage;