import { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Grid,
  MenuItem,
  Typography,
  Alert,
} from '@mui/material';
import { SEATER_TYPES, FUEL_TYPES, SEATER_LABELS, FUEL_LABELS } from '../../utils/constants';
import { vehiclesService } from '../../services/endpoints';

const VehicleForm = ({ vehicle, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    vin: vehicle?.vin || '',
    plateNumber: vehicle?.plateNumber || '',
    insuranceNumber: vehicle?.insuranceNumber || '',
    model: vehicle?.model || '',
    brand: vehicle?.brand || '',
    year: vehicle?.year || new Date().getFullYear(),
    color: vehicle?.color || '',
    seater: vehicle?.seater || 'SEDAN',
    childSeatsNumber: vehicle?.childSeatsNumber || 0,
    fuelTypeCar: vehicle?.fuelTypeCar || 'PETROL',
    fuelConsumption: vehicle?.fuelConsumption || '',
    image: null,
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        if (formData[key] !== null) {
          formDataToSend.append(key, formData[key]);
        }
      });

      if (vehicle?.id) {
        await vehiclesService.update(vehicle.id, formDataToSend);
      } else {
        await vehiclesService.create(formDataToSend);
      }

      onSuccess?.();
    } catch (err) {
      setError(err.response?.data?.message || 'Error saving vehicle');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            label="VIN"
            name="vin"
            value={formData.vin}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            label="Plate Number"
            name="plateNumber"
            value={formData.plateNumber}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            label="Insurance Number"
            name="insuranceNumber"
            value={formData.insuranceNumber}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            label="Brand"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            label="Model"
            name="model"
            value={formData.model}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            label="Year"
            name="year"
            type="number"
            value={formData.year}
            onChange={handleChange}
            inputProps={{ min: 1900, max: new Date().getFullYear() + 1 }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            label="Color"
            name="color"
            value={formData.color}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            select
            label="Body Type"
            name="seater"
            value={formData.seater}
            onChange={handleChange}
          >
            {Object.keys(SEATER_TYPES).map((key) => (
              <MenuItem key={key} value={key}>
                {SEATER_LABELS[key]}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            select
            label="Fuel Type"
            name="fuelTypeCar"
            value={formData.fuelTypeCar}
            onChange={handleChange}
          >
            {Object.keys(FUEL_TYPES).map((key) => (
              <MenuItem key={key} value={key}>
                {FUEL_LABELS[key]}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            label="Fuel Consumption"
            name="fuelConsumption"
            value={formData.fuelConsumption}
            onChange={handleChange}
            placeholder="6.5 L/100km"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Child Seats"
            name="childSeatsNumber"
            type="number"
            value={formData.childSeatsNumber}
            onChange={handleChange}
            inputProps={{ min: 0, max: 10 }}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="outlined" component="label" fullWidth>
            Upload Vehicle Image
            <input
              type="file"
              hidden
              accept="image/*"
              name="image"
              onChange={handleChange}
            />
          </Button>
          {formData.image && (
            <Typography variant="caption" display="block" sx={{ mt: 1 }}>
              Selected: {formData.image.name}
            </Typography>
          )}
        </Grid>
      </Grid>

      <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={loading}
        >
          {loading ? 'Saving...' : vehicle?.id ? 'Update Vehicle' : 'Create Vehicle'}
        </Button>
        {onCancel && (
          <Button variant="outlined" fullWidth onClick={onCancel}>
            Cancel
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default VehicleForm;