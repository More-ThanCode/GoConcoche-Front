import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/common/PrivateRoute';

import LoginPage from './pages/auth/LoginPage.jsx';
import RegisterPage from './pages/auth/RegisterPage';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';
import ResetPasswordPage from './pages/auth/ResetPasswordPage';

import HomePage from './pages/home/HomePage';
import OnboardingPage from './pages/onboarding/OnboardingPage';
import MyVehiclesPage from './pages/vehicles/MyVehiclesPage';
import CreateVehiclePage from './pages/vehicles/CreateVehiclePage';
import SearchOffersPage from './pages/offers/SearchOffersPage';
import MyOffersPage from './pages/offers/MyOffersPage';
import CreateOfferPage from './pages/offers/CreateOfferPage';
import MyReservationsPage from './pages/reservations/MyReservationsPage';
import ProfilePage from './pages/profile/ProfilePage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />

            {/* Protected Routes */}
            <Route 
              path="/onboarding" 
              element={
                <PrivateRoute>
                  <OnboardingPage />
                </PrivateRoute>
              } 
            />
            
            <Route 
              path="/profile" 
              element={
                <PrivateRoute>
                  <ProfilePage />
                </PrivateRoute>
              } 
            />

            {/* Owner Routes */}
            <Route 
              path="/my-vehicles" 
              element={
                <PrivateRoute requiredRole="OWNER">
                  <MyVehiclesPage />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/vehicles/create" 
              element={
                <PrivateRoute requiredRole="OWNER">
                  <CreateVehiclePage />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/my-offers" 
              element={
                <PrivateRoute requiredRole="OWNER">
                  <MyOffersPage />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/offers/create" 
              element={
                <PrivateRoute requiredRole="OWNER">
                  <CreateOfferPage />
                </PrivateRoute>
              } 
            />

            {/* Renter Routes */}
            <Route 
              path="/search-offers" 
              element={
                <PrivateRoute requiredRole="RENTER">
                  <SearchOffersPage />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/my-reservations" 
              element={
                <PrivateRoute requiredRole="RENTER">
                  <MyReservationsPage />
                </PrivateRoute>
              } 
            />

            {/* 404 */}
            <Route path="/404" element={<NotFoundPage />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;