import { useState, useEffect } from 'react';
import {
	Container,
	Box,
	Typography,
	Grid,
	CircularProgress,
	Alert,
	Paper,
	TextField,
	Button,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { rentalOffersService } from '../../services/endpoints';
import OfferCard from '../../components/offers/OfferCard';

const SearchOffersPage = () => {
	const [offers, setOffers] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const [filters, setFilters] = useState({
		city: '',
		brand: '',
		model: '',
	});

	const handleFilterChange = (e) => {
		setFilters({
			...filters,
			[e.target.name]: e.target.value,
		});
	};

	const handleSearch = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError('');

		// Filtrar campos vacíos para enviar solo los que tienen valor (opcional, pero hace explícito que son opcionales)
		const activeFilters = Object.fromEntries(
			Object.entries(filters).filter(([key, value]) => value.trim() !== ''),
		);

		try {
			const response = await rentalOffersService.searchByCriteria(
				activeFilters,
			);
			setOffers(response.data);
		} catch (err) {
			setError('Error searching offers');
		} finally {
			setLoading(false);
		}
	};

	return (
		<Container
			maxWidth='lg'
			sx={{ mt: 4, mb: 4 }}>
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
			<Typography
				variant='h4'
				gutterBottom>
				Search Available Vehicles
			</Typography>

			<Paper
				elevation={3}
				sx={{ p: 3, mb: 4 }}>
				<Box
					component='form'
					onSubmit={handleSearch}>
					<Grid
						container
						spacing={2}>
						<Grid
							item
							xs={12}
							sm={4}>
							<TextField
								fullWidth
								label='City'
								name='city'
								value={filters.city}
								onChange={handleFilterChange}
								placeholder='e.g., Madrid'
								helperText='Optional'
							/>
						</Grid>
						<Grid
							item
							xs={12}
							sm={3}>
							<TextField
								fullWidth
								label='Brand'
								name='brand'
								value={filters.brand}
								onChange={handleFilterChange}
								placeholder='e.g., Toyota'
								helperText='Optional'
							/>
						</Grid>
						<Grid
							item
							xs={12}
							sm={3}>
							<TextField
								fullWidth
								label='Model'
								name='model'
								value={filters.model}
								onChange={handleFilterChange}
								placeholder='e.g., Corolla'
								helperText='Optional'
							/>
						</Grid>
						<Grid
							item
							xs={12}
							sm={2}>
							<Button
								type='submit'
								variant='contained'
								fullWidth
								sx={{ height: '56px' }}
								startIcon={<SearchIcon />}
								disabled={loading}>
								{loading ? <CircularProgress size={24} /> : 'Search'}
							</Button>
						</Grid>
					</Grid>
				</Box>
			</Paper>

			{error && (
				<Alert
					severity='error'
					sx={{ mb: 2 }}>
					{error}
				</Alert>
			)}

			{loading ? (
				<Box
					display='flex'
					justifyContent='center'
					mt={4}>
					<CircularProgress />
				</Box>
			) : offers.length === 0 ? (
				<Box sx={{ textAlign: 'center', mt: 4 }}>
					<Typography
						variant='h6'
						color='text.secondary'>
						No offers found. Try adjusting your search criteria.
					</Typography>
				</Box>
			) : (
				<Grid
					container
					spacing={3}>
					{offers.map((offer) => (
						<Grid
							item
							xs={12}
							sm={6}
							md={4}
							key={offer.id}>
							<OfferCard offer={offer} />
						</Grid>
					))}
				</Grid>
			)}
		</Container>
	);
};

export default SearchOffersPage;
