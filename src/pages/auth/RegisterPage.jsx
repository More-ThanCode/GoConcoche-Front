import { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import {
	Container,
	Box,
	TextField,
	Button,
	Typography,
	Link,
	Alert,
	Paper,
	Grid,
	FormControlLabel,
	Checkbox,
	OutlinedInput,
	InputLabel,
	InputAdornment,
	IconButton,
	FormControl,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';

const RegisterPage = () => {
	const navigate = useNavigate();
	const { register } = useAuth();
	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		dateOfBirth: '',
		phoneNumber: '',
		username: '',
		email: '',
		password: '',
		confirmPassword: '',
		isOwner: false,
		isRenter: true,
	});
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	const handleChange = (e) => {
		const { name, value, checked, type } = e.target;
		setFormData({
			...formData,
			[name]: type === 'checkbox' ? checked : value,
		});
	};

	const handleClickShowPassword = () => {
		setShowPassword(!showPassword);
	};

	const handleClickShowConfirmPassword = () => {
		setShowConfirmPassword(!showConfirmPassword);
	};

	const handleMouseDownPassword = (e) => {
		e.preventDefault();
	};

	const handleMouseUpPassword = (e) => {
		e.preventDefault();
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError('');

		if (formData.password !== formData.confirmPassword) {
			setError('Passwords do not match');
			return;
		}

		if (!formData.isOwner && !formData.isRenter) {
			setError('Please select at least one role');
			return;
		}

		setLoading(true);

		try {
			const roleIds = [];
			if (formData.isRenter) roleIds.push(2);
			if (formData.isOwner) roleIds.push(3);

			const userData = {
				firstName: formData.firstName,
				lastName: formData.lastName,
				dateOfBirth: formData.dateOfBirth,
				phoneNumber: formData.phoneNumber,
				username: formData.username,
				email: formData.email,
				password: formData.password,
				roleIds,
			};

			await register(userData);
			navigate('/onboarding');
		} catch (err) {
			setError(err.response?.data?.message || 'Error during registration');
		} finally {
			setLoading(false);
		}
	};

	return (
		<Container maxWidth='lg'>
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
				<Paper
					elevation={3}
					sx={{ p: 4, width: '100%' }}>
					<Typography
						component='h1'
						variant='h4'
						align='center'
						gutterBottom>
						Create Account
					</Typography>

					{error && (
						<Alert
							severity='error'
							sx={{ mb: 2 }}>
							{error}
						</Alert>
					)}

					<Box
						component='form'
						onSubmit={handleSubmit}
						sx={{ mt: 1 }}>
						<Grid
							container
							spacing={2}>
							{/* Row 1: First Name, Last Name, Username */}
							<Grid
								item
								xs={12}
								md={4}>
								<TextField
									required
									fullWidth
									label='First Name'
									name='firstName'
									value={formData.firstName}
									onChange={handleChange}
								/>
							</Grid>
							<Grid
								item
								xs={12}
								md={4}>
								<TextField
									required
									fullWidth
									label='Last Name'
									name='lastName'
									value={formData.lastName}
									onChange={handleChange}
								/>
							</Grid>
							<Grid
								item
								xs={12}
								md={4}>
								<TextField
									required
									fullWidth
									label='Username'
									name='username'
									value={formData.username}
									onChange={handleChange}
								/>
							</Grid>

							{/* Row 2: Email, Phone Number, Date of Birth */}
							<Grid
								item
								xs={12}
								md={4}>
								<TextField
									required
									fullWidth
									label='Email'
									name='email'
									type='email'
									value={formData.email}
									onChange={handleChange}
								/>
							</Grid>
							<Grid
								item
								xs={12}
								md={4}>
								<TextField
									required
									fullWidth
									label='Phone Number'
									name='phoneNumber'
									value={formData.phoneNumber}
									onChange={handleChange}
									placeholder='+34612345678'
								/>
							</Grid>
							<Grid
								item
								xs={12}
								md={4}>
								<TextField
									required
									fullWidth
									label='Date of Birth'
									name='dateOfBirth'
									type='date'
									value={formData.dateOfBirth}
									onChange={handleChange}
									InputLabelProps={{ shrink: true }}
								/>
							</Grid>

							{/* Row 3: Password and Confirm Password */}
							<Grid
								item
								xs={12}
								md={6}>
								<FormControl 
									fullWidth 
									variant='outlined'
									required
								>
									<InputLabel htmlFor='outlined-adornment-password'>
										Password
									</InputLabel>
									<OutlinedInput
										id='outlined-adornment-password'
										name='password'
										type={showPassword ? 'text' : 'password'}
										value={formData.password}
										onChange={handleChange}
										endAdornment={
											<InputAdornment position='end'>
												<IconButton
													aria-label={
														showPassword ? 'hide the password' : 'display the password'
													}
													onClick={handleClickShowPassword}
													onMouseDown={handleMouseDownPassword}
													onMouseUp={handleMouseUpPassword}
													edge='end'
												>
													{showPassword ? <VisibilityOff /> : <Visibility />}
												</IconButton>
											</InputAdornment>
										}
										label='Password'
									/>
								</FormControl>
							</Grid>
							<Grid
								item
								xs={12}
								md={6}>
								<FormControl 
									fullWidth 
									variant='outlined'
									required
								>
									<InputLabel htmlFor='outlined-adornment-confirm-password'>
										Confirm Password
									</InputLabel>
									<OutlinedInput
										id='outlined-adornment-confirm-password'
										name='confirmPassword'
										type={showConfirmPassword ? 'text' : 'password'}
										value={formData.confirmPassword}
										onChange={handleChange}
										endAdornment={
											<InputAdornment position='end'>
												<IconButton
													aria-label={
														showConfirmPassword ? 'hide the password' : 'display the password'
													}
													onClick={handleClickShowConfirmPassword}
													onMouseDown={handleMouseDownPassword}
													onMouseUp={handleMouseUpPassword}
													edge='end'
												>
													{showConfirmPassword ? <VisibilityOff /> : <Visibility />}
												</IconButton>
											</InputAdornment>
										}
										label='Confirm Password'
									/>
								</FormControl>
							</Grid>

							{/* Row 4: Role Selection */}
							<Grid
								item
								xs={12}>
								<Box sx={{ display: 'flex', gap: 3 }}>
									<FormControlLabel
										control={
											<Checkbox
												checked={formData.isRenter}
												onChange={handleChange}
												name='isRenter'
											/>
										}
										label='Rent vehicles'
									/>
									<FormControlLabel
										control={
											<Checkbox
												checked={formData.isOwner}
												onChange={handleChange}
												name='isOwner'
											/>
										}
										label='Offer my vehicles for rent'
									/>
								</Box>
							</Grid>
						</Grid>

						<Button
							type='submit'
							fullWidth
							variant='contained'
							sx={{ mt: 3, mb: 2 }}
							disabled={loading}>
							{loading ? 'Creating account...' : 'Register'}
						</Button>

						<Box sx={{ textAlign: 'center' }}>
							<Typography variant='body2'>
								Already have an account?{' '}
								<Link
									component={RouterLink}
									to='/login'>
									Login
								</Link>
							</Typography>
						</Box>
					</Box>
				</Paper>
			</Box>
		</Container>
	);
};

export default RegisterPage;