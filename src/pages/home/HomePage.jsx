import { useNavigate } from 'react-router-dom';
import {
	Container,
	Box,
	Typography,
	Button,
	Grid,
	Card,
	CardContent,
	CardMedia,
} from '@mui/material';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import SearchIcon from '@mui/icons-material/Search';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

const HomePage = () => {
	const navigate = useNavigate();

	const features = [
		{
			icon: <DirectionsCarIcon fontSize='large' />,
			title: 'Rent Vehicles',
			description: 'Find the perfect vehicle for your next trip',
		},
		{
			icon: <AttachMoneyIcon fontSize='large' />,
			title: 'Earn Money',
			description: 'Rent out your vehicle and earn extra income',
		},
		{
			icon: <SearchIcon fontSize='large' />,
			title: 'Easy Search',
			description: 'Simple and fast vehicle search system',
		},
	];

	return (
		<Box>
			{/* Hero Section */}
			<Box
				sx={{
					bgcolor: 'white',
					py: 2,
					mb: 0,
				}}>
				<Container maxWidth='lg'>
					<Grid
						container
						spacing={4}
						alignItems='center'>
						<Grid
							item
							xs={12}
							md={6}>
							<Typography
								variant='h2'
								component='h1'
								gutterBottom>
								Welcome to GoConcoche
							</Typography>
							<Typography
								variant='h5'
								paragraph>
								Rent vehicles or offer yours for rent
							</Typography>
							<Box sx={{ mt: 4 }}>
								<Button
									variant='contained'
									size='large'
									sx={{
										mr: 2,
										bgcolor: 'primary.main',
										color: 'white',
										'&:hover': { bgcolor: 'primary.dark' },
									}}
									onClick={() => navigate('/search-offers')}>
									Search Vehicles
								</Button>
								<Button
									variant='outlined'
									size='large'
									sx={{
										color: 'primary.main',
										borderColor: 'primary.main',
										'&:hover': {
											borderColor: 'primary.main',
											bgcolor: 'grey.50',
										},
									}}
									onClick={() => navigate('/create-profile')}>
									Get Started
								</Button>
							</Box>
						</Grid>
						<Grid
							item
							xs={12}
							md={6}>
							<Box
								sx={{
									height: 300,
									bgcolor: 'white',
									borderRadius: 2,
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
								}}>
								<img
									src='https://res.cloudinary.com/dpwkcusv6/image/upload/v1759448264/logo_pobtl9.png'
									alt='GoConCoche Logo'
									style={{ width: '300px', height: 'auto' }}
								/>
							</Box>
						</Grid>
					</Grid>
				</Container>
			</Box>

			{/* Features Section */}
			<Box
				sx={{
					bgcolor: 'primary.main',
					color: 'white',
					py: 3,
					mb: 1,
				}}>
				<Container maxWidth='lg'>
					<Typography
						variant='h3'
						align='center'
						gutterBottom>
						How It Works
					</Typography>
					<Typography
						variant='h6'
						align='center'
						color='white'
						paragraph>
						Simple, fast, and secure
					</Typography>
					<Grid
						container
						spacing={4}
						sx={{ mt: 4 }}>
						{features.map((feature, index) => (
							<Grid
								item
								xs={12}
								md={4}
								key={index}>
								<Card
									sx={{
										height: '100%',
										textAlign: 'center',
										p: 2,
										color: 'text.primary',
									}}>
									<CardContent>
										<Box sx={{ color: 'primary.main', mb: 2 }}>
											{feature.icon}
										</Box>
										<Typography
											variant='h5'
											component='h3'
											gutterBottom>
											{feature.title}
										</Typography>
										<Typography
											variant='body1'
											color='text.secondary'>
											{feature.description}
										</Typography>
									</CardContent>
								</Card>
							</Grid>
						))}
					</Grid>
				</Container>
			</Box>

			{/* CTA Section */}
			<Box sx={{ bgcolor: 'grey.100', py: 4 }}>
				<Container maxWidth='md'>
					<Typography
						variant='h3'
						align='center'
						gutterBottom>
						Ready to get started?
					</Typography>
					<Typography
						variant='h6'
						align='center'
						color='text.secondary'
						paragraph>
						Join thousands of users already using GoConcoche
					</Typography>
					<Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
						<Button
							variant='contained'
							size='large'
							onClick={() => navigate('/register')}>
							Sign Up Now
						</Button>
					</Box>
				</Container>
			</Box>
		</Box>
	);
};

export default HomePage;
