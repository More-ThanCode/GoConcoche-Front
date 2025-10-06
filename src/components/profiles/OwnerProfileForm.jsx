import { useState } from 'react';
import { Box, Button, Typography, Alert } from '@mui/material';
import { ownerProfileService } from '../../services/endpoints';

const OwnerProfileForm = ({ profile, onSuccess }) => {
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const formData = new FormData();
      if (image) {
        formData.append('image', image);
      }

      if (profile) {
        await ownerProfileService.updateMyProfile(formData);
      } else {
        await ownerProfileService.create(formData);
      }

      onSuccess?.();
    } catch (err) {
      setError(err.response?.data?.message || 'Error saving owner profile');
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

      <Typography variant="body1" gutterBottom>
        Upload your profile picture (optional)
      </Typography>

      <Button variant="outlined" component="label" fullWidth sx={{ mt: 2 }}>
        Choose Profile Image
        <input
          type="file"
          hidden
          accept="image/*"
          onChange={handleImageChange}
        />
      </Button>

      {image && (
        <Typography variant="caption" display="block" sx={{ mt: 1 }}>
          Selected: {image.name}
        </Typography>
      )}

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

export default OwnerProfileForm;