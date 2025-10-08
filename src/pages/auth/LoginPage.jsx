import React, { useState } from 'react';
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
	OutlinedInput,
	InputLabel,
	InputAdornment,
	IconButton,
	FormControl,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';

const LoginPage = () => {
	const navigate = useNavigate();
	const { login } = useAuth();
	const [formData, setFormData] = useState({
		username: '',
		password: '',
	});
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleClickShowPassword = () => {
		setShowPassword(!showPassword);
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
		setLoading(true);

		try {
			await login(formData);
			navigate('/');
		} catch (err) {
			setError(err.response?.data?.message || 'Login error');
		} finally {
			setLoading(false);
		}
	};

	return (
		<Container maxWidth='sm'>
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
						Sign In
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
						<TextField
							margin='normal'
							required
							fullWidth
							id='username'
							label='Username'
							name='username'
							autoComplete='username'
							autoFocus
							value={formData.username}
							onChange={handleChange}
						/>
						
						<FormControl 
							fullWidth 
							margin='normal' 
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
								autoComplete='current-password'
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

						<Button
							type='submit'
							fullWidth
							variant='contained'
							sx={{ mt: 3, mb: 2 }}
							disabled={loading}>
							{loading ? 'Signing in...' : 'Sign In'}
						</Button>

						<Box sx={{ textAlign: 'center' }}>
							<Link
								component={RouterLink}
								to='/forgot-password'
								variant='body2'>
								Forgot your password?
							</Link>
						</Box>

						<Box sx={{ textAlign: 'center', mt: 2 }}>
							<Typography variant='body2'>
								Don't have an account?{' '}
								<Link
									component={RouterLink}
									to='/register'>
									Register
								</Link>
							</Typography>
						</Box>
					</Box>
				</Paper>
			</Box>
		</Container>
	);
};

export default LoginPage;