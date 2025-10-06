import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Button,
  Grid,
  CircularProgress,
  Alert,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { rentalOffersService } from '../../services/endpoints';
import OfferCard from '../../components/offers/OfferCard';

const MyOffersPage = () => {
  const navigate = useNavigate();
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchOffers();
  }, []);

  const fetchOffers = async () => {
    try {
      const response = await rentalOffersService.getMyOffers();
      setOffers(response.data);
    } catch (err) {
      setError('Error loading offers');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (offerId) => {
    if (!window.confirm('Are you sure you want to delete this offer?')) {
      return;
    }

    try {
      await rentalOffersService.delete(offerId);
      setOffers(offers.filter((o) => o.id !== offerId));
    } catch (err) {
      alert('Error deleting offer');
    }
  };

  if (loading) {
    return (
      <Container>
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">My Rental Offers</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate('/offers/create')}
        >
          Create Offer
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {offers.length === 0 ? (
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography variant="h6" color="text.secondary" paragraph>
            You haven't created any rental offers yet
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate('/offers/create')}
          >
            Create Your First Offer
          </Button>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {offers.map((offer) => (
            <Grid item xs={12} sm={6} md={4} key={offer.id}>
              <OfferCard offer={offer} showActions={false} />
              <Button
                color="error"
                fullWidth
                sx={{ mt: 1 }}
                onClick={() => handleDelete(offer.id)}
              >
                Delete Offer
              </Button>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default MyOffersPage;