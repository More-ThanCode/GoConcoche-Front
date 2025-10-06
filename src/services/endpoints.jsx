import api from './axiosConfig';

// ==================== AUTH ====================
export const authService = {
  register: (userData) => api.post('/auth/register', userData),
  
  login: (credentials) => api.post('/auth/login', credentials),
  
  refreshToken: () => api.post('/auth/refresh'),
  
  forgotPassword: (email) => api.post('/auth/forgot-password', { email }),
  
  resetPassword: (token, newPassword) => 
    api.post('/auth/reset-password', { token, newPassword }),
  
  validateResetToken: (token) => 
    api.get('/auth/validate-reset-token', { params: { token } }),
};

// ==================== ROLES ====================
export const rolesService = {
  getAllRoles: () => api.get('/roles'),
  
  getRoleById: (id) => api.get(`/roles/${id}`),
};

// ==================== USER ROLES ====================
export const userRolesService = {
  addRoleToMe: (roleName) => api.post(`/users/me/roles/${roleName}`),
  
  removeRoleFromMe: (roleName) => api.delete(`/users/me/roles/${roleName}`),
};

// ==================== OWNER PROFILES ====================
export const ownerProfileService = {
  create: (formData) => 
    api.post('/owner-profiles', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }),
  
  getMyProfile: () => api.get('/owner-profiles/profile'),
  
  getAll: () => api.get('/owner-profiles'),
  
  getById: (id) => api.get(`/owner-profiles/${id}`),
  
  updateMyProfile: (formData) => 
    api.put('/owner-profiles/profile', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }),
  
  deleteMyProfile: () => api.delete('/owner-profiles/me'),
  
  deleteById: (id) => api.delete(`/owner-profiles/${id}`),
};

// ==================== RENTER PROFILES ====================
export const renterProfileService = {
  create: (formData) => 
    api.post('/renter-profiles', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }),
  
  getAll: () => api.get('/renter-profiles'),
  
  getMyProfile: () => api.get('/renter-profiles/me'),
  
  getByUsername: (username) => api.get(`/renter-profiles/${username}`),
  
  getById: (id) => api.get(`/renter-profiles/id/${id}`),
  
  update: (formData) => 
    api.put('/renter-profiles', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }),
  
  deleteMyProfile: () => api.delete('/renter-profiles/me'),
  
  deleteById: (id) => api.delete(`/renter-profiles/id/${id}`),
};

// ==================== VEHICLES ====================
export const vehiclesService = {
  create: (formData) => 
    api.post('/vehicles', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }),
  
  getAll: () => api.get('/vehicles'),
  
  getByOwnerId: (ownerId) => api.get(`/vehicles/owner/${ownerId}`),
  
  getMyVehicles: () => api.get('/vehicles/my'),
  
  update: (id, formData) => 
    api.put(`/vehicles/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }),
  
  delete: (id) => api.delete(`/vehicles/${id}`),
};

// ==================== RENTAL OFFERS ====================
export const rentalOffersService = {
  create: (offerData) => api.post('/vehicle-rental-offers', offerData),
  
  getMyOffers: () => api.get('/vehicle-rental-offers/my-offers'),
  
  searchAvailable: (searchParams) => 
    api.get('/vehicle-rental-offers/search', { params: searchParams }),
  
  searchByCriteria: (filters) => 
    api.get('/vehicle-rental-offers/search/by-criteria', { params: filters }),
  
  delete: (id) => api.delete(`/vehicle-rental-offers/${id}`),
};

// ==================== VEHICLE RESERVATIONS ====================
export const reservationsService = {
  create: (reservationData) => 
    api.post('/vehicle-reservations', reservationData),

};