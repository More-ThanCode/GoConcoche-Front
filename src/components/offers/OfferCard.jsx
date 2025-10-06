import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  Chip,
} from '@mui/material';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { SEATER_LABELS, FUEL_LABELS } from '../../utils/constants';

const OfferCard = ({ offer, showActions = true }) => {
  const navigate = useNavigate();

  const formatDateTime = (dateTime) => {
    return new Date(dateTime).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleReserve = () => {
    // Navigate to reservation page with offer ID
    navigate(`/reservations/create?offerId=${offer.id}`);
  };

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component="div"
        sx={{
          height: 200,
          bgcolor: 'grey.200',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {offer.vehicle?.imageUrl ? (
          <img
            src={offer.vehicle.imageUrl}
            alt={`${offer.vehicle.brand} ${offer.vehicle.model}`}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <DirectionsCarIcon sx={{ fontSize: 80, color: 'grey.400' }} />
        )}
      </CardMedia>

      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" component="h2" gutterBottom>
          {offer.vehicle?.brand} {offer.vehicle?.model}
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <LocationOnIcon fontSize="small" sx={{ mr: 0.5, color: 'text.secondary' }} />
          <Typography variant="body2" color="text.secondary">
            {offer.location?.city || 'Location not specified'}
          </Typography>
        </Box>

        <Typography variant="body2" color="text.secondary" gutterBottom>
          {formatDateTime(offer.startDateTime)} - {formatDateTime(offer.endDateTime)}
        </Typography>

        <Box sx={{ display: 'flex', gap: 1, mt: 2, flexWrap: 'wrap' }}>
          {offer.vehicle?.seater && (
            <Chip
              label={SEATER_LABELS[offer.vehicle.seater]}
              size="small"
              color="primary"
              variant="outlined"
            />
          )}
          {offer.vehicle?.fuelTypeCar && (
            <Chip
              label={FUEL_LABELS[offer.vehicle.fuelTypeCar]}
              size="small"
              color="secondary"
              variant="outlined"
            />
          )}
        </Box>

        <Typography variant="h6" color="primary" sx={{ mt: 2 }}>
          ${offer.priceHour}/hour
        </Typography>
      </CardContent>

      {showActions && (
        <CardActions>
          <Button size="small" variant="contained" onClick={handleReserve} fullWidth>
            Reserve
          </Button>
        </CardActions>
      )}
    </Card>
  );
};

export default OfferCard;