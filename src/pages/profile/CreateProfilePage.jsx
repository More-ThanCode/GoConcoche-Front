import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
	Container,
	Box,
	TextField,
	Button,
	Typography,
	Alert,
	Paper,
	Grid,
	Tabs,
	Tab,
	MenuItem,
	CircularProgress,
} from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';
import { ownerProfileService, renterProfileService } from '../../services/endpoints';

const CreateProfilePage = () => {
	const navigate = useNavigate();
	const { user } = useAuth();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');
	const [activeTab, setActiveTab] = useState(0);
	const [checkingProfiles, setCheckingProfiles] = useState(true);

	const isOwner = user?.roles?.some((role) => role.name === 'OWNER');
	const isRenter = user?.roles?.some((role) => role.name === 'RENTER');

	const [ownerImage, setOwnerImage] = useState(null);
	const [ownerProfileExists, setOwnerProfileExists] = useState(false);

	const [renterFormData, setRenterFormData] = useState({
		typeLicense: '',
		licenseNumber: '',
		expiredDate: '',
	});
	const [renterImage, setRenterImage] = useState(null);
	const [renterProfileExists, setRenterProfileExists] = useState(false);

	useEffect(() => {
		checkExistingProfiles();
	}, []);

	const checkExistingProfiles = async () => {
		setCheckingProfiles(true);
		try {
			if (isOwner) {
				try {
					await ownerProfileService.getMyProfile();
					setOwnerProfileExists(true);
				} catch (err) {
					setOwnerProfileExists(false);
				}
			}

			if (isRenter) {
				try {
					await renterProfileService.getMyProfile();
					setRenterProfileExists(true);
				} catch (err) {
					setRenterProfileExists(false);
				}
			}
		} catch (err) {
			console.error('Error checking profiles:', err);
		} finally {
			setCheckingProfiles(false);
		}
	};

	const handleRenterChange = (e) => {
		setRenterFormData({
			...renterFormData,
			[e.target.name]: e.target.value,
		});
	};

	const handleOwnerImageChange = (e) => {
		if (e.target.files && e.target.files[0]) {
			setOwnerImage(e.target.files[0]);
		}
	};

	const handleRenterImageChange = (e) => {
		if (e.target.files && e.target.files[0]) {
			setRenterImage(e.target.files[0]);
		}
	};

	const handleSubmitOwnerProfile = async (e) => {
		e.preventDefault();
		setError('');
		setSuccess('');
		setLoading(true);

		try {
			const formData = new FormData();
			if (ownerImage) {
				formData.append('image', ownerImage);
			}

			await ownerProfileService.create(formData);
			setSuccess('Owner profile created successfully!');
			setOwnerProfileExists(true);
			
			// Si solo es owner, redirigir
			if (isOwner && !isRenter) {
				setTimeout(() => navigate('/'), 2000);
			}
		} catch (err) {
			setError(err.response?.data?.message || 'Error creating owner profile');
		} finally {
			setLoading(false);
		}
	};

	const handleSubmitRenterProfile = async (e) => {
		e.preventDefault();
		setError('');
		setSuccess('');
		setLoading(true);

		try {
			const formData = new FormData();
			formData.append('typeLicense', renterFormData.typeLicense);
			formData.append('licenseNumber', renterFormData.licenseNumber);
			formData.append('expiredDate', renterFormData.expiredDate);
			if (renterImage) {
				formData.append('image', renterImage);
			}

			await renterProfileService.create(formData);
			setSuccess('Renter profile created successfully!');
			setRenterProfileExists(true);
			
			if (isRenter && !isOwner) {
				setTimeout(() => navigate('/'), 2000);
			}
		} catch (err) {
			setError(err.response?.data?.message || 'Error creating renter profile');
		} finally {
			setLoading(false);
		}
	};

	const handleTabChange = (event, newValue) => {
		setActiveTab(newValue);
		setError('');
		setSuccess('');
	};

	const handleContinue = () => {
		navigate('/');
	};

	if (checkingProfiles) {
		return (
			<Container maxWidth='md'>
				<Box
					sx={{
						marginTop: 8,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}>
					<img
						src='https://res.cloudinary.com/dpwkcusv6/image/upload/v1759448264/logo_pobtl9.png'
						alt='GoConCoche Logo'
						style={{ width: '300px', height: 'auto' }}
					/>
				</Box>
				<Box
					sx={{
						marginTop: 8,
						display: 'flex',
						justifyContent: 'center',
					}}>
					<CircularProgress />
				</Box>
			</Container>
		);
	}

	if ((isOwner && ownerProfileExists || !isOwner) && (isRenter && renterProfileExists || !isRenter)) {
		return (
			<Container maxWidth='md'>
				<Box
					sx={{
						marginTop: 8,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}>
					<img
						src='https://res.cloudinary.com/dpwkcusv6/image/upload/v1759448264/logo_pobtl9.png'
						alt='GoConCoche Logo'
						style={{ width: '300px', height: 'auto' }}
					/>
				</Box>
				<Box sx={{ marginTop: 8 }}>
					<Paper elevation={3} sx={{ p: 4 }}>
						<Typography variant='h5' align='center' gutterBottom>
							Your profiles are already complete!
						</Typography>
						<Button
							fullWidth
							variant='contained'
							sx={{ mt: 2 }}
							onClick={handleContinue}>
							Go to Dashboard
						</Button>
					</Paper>
				</Box>
			</Container>
		);
	}

	return (
		<Container maxWidth='md'>
			<Box
				sx={{
					marginTop: 8,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}>
				<img
					src='https://res.cloudinary.com/dpwkcusv6/image/upload/v1759448264/logo_pobtl9.png'
					alt='GoConCoche Logo'
					style={{ width: '300px', height: 'auto' }}
				/>
			</Box>
			<Box
				sx={{
					marginTop: 4,
					marginBottom: 4,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}>
				<Paper elevation={3} sx={{ p: 4, width: '100%' }}>
					<Typography component='h1' variant='h4' align='center' gutterBottom>
						Complete Your Profile
					</Typography>

					<Typography variant='body1' align='center' color='text.secondary' sx={{ mb: 3 }}>
						Complete your profile information to start using GoConCoche
					</Typography>

					{error && (
						<Alert severity='error' sx={{ mb: 2 }}>
							{error}
						</Alert>
					)}

					{success && (
						<Alert severity='success' sx={{ mb: 2 }}>
							{success}
						</Alert>
					)}

					{/* Tabs si el usuario tiene ambos roles */}
					{isOwner && isRenter && (
						<Tabs value={activeTab} onChange={handleTabChange} centered sx={{ mb: 3 }}>
							<Tab label='Owner Profile' disabled={ownerProfileExists} />
							<Tab label='Renter Profile' disabled={renterProfileExists} />
						</Tabs>
					)}

					{/* Owner Profile Form */}
					{((isOwner && !isRenter) || (isOwner && isRenter && activeTab === 0)) && !ownerProfileExists && (
						<Box component='form' onSubmit={handleSubmitOwnerProfile}>
							<Typography variant='h6' gutterBottom sx={{ mt: 2 }}>
								Owner Profile
							</Typography>
							<Typography variant='body2' color='text.secondary' gutterBottom>
								Upload a profile image (optional)
							</Typography>

							<Button
								variant='outlined'
								component='label'
								fullWidth
								sx={{ mt: 2, mb: 2 }}>
								{ownerImage ? ownerImage.name : 'Upload Profile Image'}
								<input
									type='file'
									hidden
									accept='image/*'
									onChange={handleOwnerImageChange}
								/>
							</Button>

							<Button
								type='submit'
								fullWidth
								variant='contained'
								sx={{ mt: 3 }}
								disabled={loading}>
								{loading ? 'Creating...' : 'Create Owner Profile'}
							</Button>
						</Box>
					)}

					{/* Renter Profile Form */}
					{((isRenter && !isOwner) || (isOwner && isRenter && activeTab === 1)) && !renterProfileExists && (
						<Box component='form' onSubmit={handleSubmitRenterProfile}>
							<Typography variant='h6' gutterBottom sx={{ mt: 2 }}>
								Renter Profile
							</Typography>
							<Typography variant='body2' color='text.secondary' gutterBottom sx={{ mb: 3 }}>
								Please provide your driver's license information
							</Typography>

							<Grid container spacing={2}>
								<Grid item xs={12} md={6}>
									<TextField
										required
										fullWidth
										select
										label='License Type'
										name='typeLicense'
										value={renterFormData.typeLicense}
										onChange={handleRenterChange}>
										<MenuItem value='A'>A - Motorcycle</MenuItem>
										<MenuItem value='B'>B - Car</MenuItem>
										<MenuItem value='C'>C - Truck</MenuItem>
										<MenuItem value='D'>D - Bus</MenuItem>
									</TextField>
								</Grid>

								<Grid item xs={12} md={6}>
									<TextField
										required
										fullWidth
										label='License Number'
										name='licenseNumber'
										value={renterFormData.licenseNumber}
										onChange={handleRenterChange}
										placeholder='12345678A'
									/>
								</Grid>

								<Grid item xs={12}>
									<TextField
										required
										fullWidth
										label='Expiration Date'
										name='expiredDate'
										type='date'
										value={renterFormData.expiredDate}
										onChange={handleRenterChange}
										InputLabelProps={{ shrink: true }}
									/>
								</Grid>

								<Grid item xs={12}>
									<Typography variant='body2' color='text.secondary' gutterBottom>
										Upload driver's license image
									</Typography>
									<Button
										variant='outlined'
										component='label'
										fullWidth
										sx={{ mt: 1 }}>
										{renterImage ? renterImage.name : 'Upload License Image'}
										<input
											type='file'
											hidden
											accept='image/*'
											onChange={handleRenterImageChange}
										/>
									</Button>
								</Grid>
							</Grid>

							<Button
								type='submit'
								fullWidth
								variant='contained'
								sx={{ mt: 3 }}
								disabled={loading}>
								{loading ? 'Creating...' : 'Create Renter Profile'}
							</Button>
						</Box>
					)}

					{/* Botón para continuar si ambos perfiles están completos */}
					{isOwner && isRenter && ownerProfileExists && renterProfileExists && (
						<Box sx={{ mt: 3 }}>
							<Alert severity='success' sx={{ mb: 2 }}>
								All profiles completed successfully!
							</Alert>
							<Button
								fullWidth
								variant='contained'
								onClick={handleContinue}>
								Continue to Dashboard
							</Button>
						</Box>
					)}

					{/* Botón para omitir si solo falta un perfil */}
					{isOwner && isRenter && (ownerProfileExists || renterProfileExists) && !(ownerProfileExists && renterProfileExists) && (
						<Button
							fullWidth
							variant='outlined'
							sx={{ mt: 2 }}
							onClick={handleContinue}>
							Skip for now
						</Button>
					)}
				</Paper>
			</Box>
		</Container>
	);
};

export default CreateProfilePage;