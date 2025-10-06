import { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  MenuItem,
  Grid,
  Typography,
  Alert,
} from '@mui/material';
import { LICENSE_TYPES } from '../../utils/constants';
import { renterProfileService } from '../../services/endpoints';

const RenterProfileForm = ({ profile, onSuccess }) => {
  const [formData, setFormData] = useState({
    typeLicense: profile?.typeLicense || 'B',
    licenseNumber: profile?.licenseNumber || '',
    expiredDate: profile?.expiredDate || '',
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
      formDataToSend.append('typeLicense', formData.typeLicense);
      formDataToSend.append('licenseNumber', formData.licenseNumber);
      formDataToSend.append('expiredDate', formData.expiredDate);
      if (formData.image) {
        formDataToSend.append('image', formData.image);
      }

      if (profile) {
        await renterProfileService.update(formDataToSend);
      } else {
        await renterProfileService.create(formDataToSend);
      }

      onSuccess?.();
    } catch (err) {
      setError(err.response?.data?.message || 'Error saving renter profile');
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
            select
            label="License Type"
            name="typeLicense"
            value={formData.typeLicense}
            onChange={handleChange}
          >
            {Object.keys(LICENSE_TYPES).map((key) => (
              <MenuItem key={key} value={key}>
                Type {key}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            label="License Number"
            name="licenseNumber"
            value={formData.licenseNumber}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            label="Expiration Date"
            name="expiredDate"
            type="date"
            value={formData.expiredDate}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="outlined" component="label" fullWidth>
            Upload License Image
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

      <Button
        type="submit"
        variant="contained"
        fullWidth
        sx={{ mt: 3 }}
        disabled={loading}
      >
        {loading ? 'Saving...' : profile ? 'Update Profile' : 'Create Profile'}
      </Button>
    </Box>
  );
};

export default RenterProfileForm;