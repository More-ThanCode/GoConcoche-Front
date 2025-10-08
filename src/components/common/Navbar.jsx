import { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import {
	AppBar,
	Box,
	Toolbar,
	IconButton,
	Typography,
	Menu,
	Container,
	Avatar,
	Button,
	Tooltip,
	MenuItem,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import { useAuth } from '../../contexts/AuthContext';

const Navbar = () => {
	const navigate = useNavigate();
	const { user, logout } = useAuth();
	const [anchorElNav, setAnchorElNav] = useState(null);
	const [anchorElUser, setAnchorElUser] = useState(null);

	// Si no hay usuario logueado, no renderiza nada
	if (!user) return null;

	const authenticatedPages = [
		{ name: 'Search Vehicles', path: '/search-offers', requiresRenter: true },
		{ name: 'My Vehicles', path: '/my-vehicles', requiresOwner: true },
		{ name: 'My Offers', path: '/my-offers', requiresOwner: true },
		{ name: 'My Reservations', path: '/my-reservations', requiresRenter: true },
	];

	const userMenuOptions = [
		{ name: 'Profile', path: '/create-profile' },
		{ name: 'Logout', action: 'logout' },
	];

	const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
	const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
	const handleCloseNavMenu = () => setAnchorElNav(null);
	const handleCloseUserMenu = () => setAnchorElUser(null);

	const handleNavigation = (path) => {
		navigate(path);
		handleCloseNavMenu();
	};

	const handleUserMenuClick = (option) => {
		if (option.action === 'logout') {
			logout();
			navigate('/login');
		} else if (option.path) {
			navigate(option.path);
		}
		handleCloseUserMenu();
	};

	const getFilteredPages = () => {
		const isOwner = user?.roles?.some((role) => role.name === 'OWNER');
		const isRenter = user?.roles?.some((role) => role.name === 'RENTER');

		return authenticatedPages.filter((page) => {
			if (page.requiresOwner && !isOwner) return false;
			if (page.requiresRenter && !isRenter) return false;
			return true;
		});
	};

	const pages = getFilteredPages();

	return (
		<AppBar
			position='sticky'
			sx={{
				bgcolor: 'grey.50',
				color: 'primary.main',
				boxShadow: 'none',
			}}>
			<Container maxWidth='xl'>
				<Toolbar disableGutters>
					{/* Mobile */}
					<Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
						<IconButton
							size='large'
							aria-label='menu'
							aria-controls='menu-appbar'
							aria-haspopup='true'
							onClick={handleOpenNavMenu}
							color='inherit'>
							<MenuIcon />
						</IconButton>
						<Menu
							id='menu-appbar'
							anchorEl={anchorElNav}
							anchorOrigin={{
								vertical: 'bottom',
								horizontal: 'left',
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'left',
							}}
							open={Boolean(anchorElNav)}
							onClose={handleCloseNavMenu}
							sx={{
								display: { xs: 'block', md: 'none' },
							}}>
							{pages.map((page) => (
								<MenuItem key={page.name} onClick={() => handleNavigation(page.path)}>
									<Typography textAlign='center' color='primary.main'>
										{page.name}
									</Typography>
								</MenuItem>
							))}
						</Menu>
					</Box>

					{/* Logo - Mobile */}
					<DirectionsCarIcon
						sx={{ display: { xs: 'flex', md: 'none' }, mr: 1, color: 'primary.main' }}
					/>
					<Typography
						variant='h5'
						noWrap
						component={RouterLink}
						to='/'
						sx={{
							mr: 2,
							display: { xs: 'flex', md: 'none' },
							flexGrow: 1,
							fontFamily: 'monospace',
							fontWeight: 700,
							letterSpacing: '.3rem',
							color: 'primary.main',
							textDecoration: 'none',
						}}>
						GOCONCOCHE
					</Typography>

					{/* Menu items - Desktop */}
					<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
						{pages.map((page) => (
							<Button
								key={page.name}
								onClick={() => handleNavigation(page.path)}
								sx={{ my: 2, color: 'primary.main', display: 'block' }}>
								{page.name}
							</Button>
						))}
					</Box>

					{/* User Menu */}
					<Box sx={{ flexGrow: 0 }}>
						<Tooltip title='Open settings'>
							<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
								<Avatar alt={user.username}>
									{user.username?.charAt(0).toUpperCase()}
								</Avatar>
							</IconButton>
						</Tooltip>
						<Menu
							sx={{ mt: '45px' }}
							id='menu-appbar'
							anchorEl={anchorElUser}
							anchorOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							open={Boolean(anchorElUser)}
							onClose={handleCloseUserMenu}>
							<MenuItem disabled>
								<Typography textAlign='center' fontWeight='bold' color='primary.main'>
									{user.username}
								</Typography>
							</MenuItem>
							{userMenuOptions.map((option) => (
								<MenuItem
									key={option.name}
									onClick={() => handleUserMenuClick(option)}>
									<Typography textAlign='center' color='primary.main'>
										{option.name}
									</Typography>
								</MenuItem>
							))}
						</Menu>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
};

export default Navbar;
