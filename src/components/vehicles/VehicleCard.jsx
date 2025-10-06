import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Chip,
  Box,
} from '@mui/material';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { SEATER_LABELS, FUEL_LABELS } from '../../utils/constants';

const VehicleCard = ({ vehicle, onDelete, onEdit }) => {
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
        {vehicle.imageUrl ? (
          <img
            src={vehicle.imageUrl}
            alt={`${vehicle.brand} ${vehicle.model}`}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <DirectionsCarIcon sx={{ fontSize: 80, color: 'grey.400' }} />
        )}
      </CardMedia>

      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" component="h2" gutterBottom>
          {vehicle.brand} {vehicle.model}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Year: {vehicle.year} • Color: {vehicle.color}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Plate: {vehicle.plateNumber}
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, mt: 1, flexWrap: 'wrap' }}>
          <Chip
            label={SEATER_LABELS[vehicle.seater] || vehicle.seater}
            size="small"
            color="primary"
            variant="outlined"
          />
          <Chip
            label={FUEL_LABELS[vehicle.fuelTypeCar] || vehicle.fuelTypeCar}
            size="small"
            color="secondary"
            variant="outlined"
          />
          {vehicle.childSeatsNumber > 0 && (
            <Chip
              label={`${vehicle.childSeatsNumber} Child Seats`}
              size="small"
              variant="outlined"
            />
          )}
        </Box>
      </CardContent>

      <CardActions>
        {onEdit && (
          <Button size="small" startIcon={<EditIcon />} onClick={() => onEdit(vehicle)}>
            Edit
          </Button>
        )}
        {onDelete && (
          <Button
            size="small"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={() => onDelete(vehicle.id)}
          >
            Delete
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default VehicleCard;