# GoConcoche Frontend

A modern, responsive vehicle rental platform built with React, Vite, and Material-UI.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Available Scripts](#available-scripts)
- [API Integration](#api-integration)
- [Authentication](#authentication)
- [Routing](#routing)
- [User Roles](#user-roles)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Overview

GoConcoche is a peer-to-peer vehicle rental platform that connects vehicle owners with renters. The application allows users to:
- **Owners**: List their vehicles and create rental offers
- **Renters**: Search for available vehicles and make reservations
- **Both**: Manage their profiles and view transaction history

## ✨ Features

### For Vehicle Owners
- 🚗 Add and manage multiple vehicles
- 💰 Create rental offers with custom pricing
- 📊 View all active offers
- 🖼️ Upload vehicle images
- ✏️ Edit vehicle details

### For Renters
- 🔍 Search available vehicles by location, brand, and model
- 📅 Filter offers by date and time
- 💳 Make reservations
- 📜 View reservation history
- 🪪 Upload and manage driver's license

### General Features
- 🔐 Secure authentication with JWT tokens
- 🔄 Automatic token refresh
- 📱 Fully responsive design
- 🎨 Modern Material-UI interface
- 🌐 Multi-role support (Owner/Renter)
- 👤 User profile management

## 🛠️ Tech Stack

- **Framework**: React 18.2
- **Build Tool**: Vite 5.0
- **UI Library**: Material-UI (MUI) 5.14
- **Routing**: React Router DOM 6.18
- **HTTP Client**: Axios 1.6
- **State Management**: React Context API
- **Icons**: Material Icons

## 📦 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v16 or higher)
- npm or yarn
- Git

## 🚀 Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/goconcoche-frontend.git
cd goconcoche-frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Create environment file**
```bash
cp .env.example .env
```

4. **Configure environment variables**
Edit `.env` and add your API URL:
```env
REACT_APP_API_URL=http://localhost:8080/api
```

5. **Start development server**
```bash
npm run dev
```

The application will open at `http://localhost:5173`

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# API Configuration
REACT_APP_API_URL=http://localhost:8080/api
```

### Vite Configuration

The `vite.config.js` file contains:
- React plugin setup
- Development server configuration
- Port settings (default: 3000, auto-increments if busy)

## 📜 Available Scripts

### Development
```bash
npm run dev
```
Starts the development server with hot reload at `http://localhost:5173`

### Build
```bash
npm run build
```
Creates an optimized production build in the `dist` folder

## 🔌 API Integration

### Axios Configuration

The application uses a centralized Axios instance with:
- **Base URL**: Configured via environment variables
- **Request Interceptor**: Automatically adds JWT token to headers
- **Response Interceptor**: Handles token refresh on 401 errors

### API Endpoints

Backend repo: https://github.com/More-ThanCode/GoConcoche


### Available Services

- **authService**: Authentication (login, register, password reset)
- **rolesService**: Role management
- **userRolesService**: User role assignment
- **ownerProfileService**: Owner profile CRUD
- **renterProfileService**: Renter profile CRUD
- **vehiclesService**: Vehicle management
- **rentalOffersService**: Rental offer operations
- **reservationsService**: Reservation handling

## 🔐 Authentication

### Token Management

- **Access Token**: Stored in `localStorage`
- **Refresh Token**: Stored in HTTP-only cookies (managed by backend)
- **Auto-refresh**: Automatically refreshes expired tokens

### Authentication Flow

1. User logs in with credentials
2. Backend returns access token and user data
3. Access token stored in localStorage
4. Token automatically added to all requests
5. On 401 error, token refresh is attempted
6. If refresh fails, user is redirected to login

## 🗺️ Routing

### Public Routes
- `/` - Home page
- `/login` - Login page
- `/register` - Registration page
- `/forgot-password` - Password recovery
- `/reset-password` - Password reset with token

### Protected Routes (Authenticated)
- `/profile` - User profile
- `/onboarding` - Initial profile setup

### Owner Routes (Requires OWNER role)
- `/my-vehicles` - Vehicle list
- `/vehicles/create` - Add new vehicle
- `/my-offers` - Rental offers
- `/offers/create` - Create rental offer

### Renter Routes (Requires RENTER role)
- `/search-offers` - Search available vehicles
- `/my-reservations` - Reservation history

## 👥 User Roles

### Available Roles

1. **OWNER**: Can list vehicles and create rental offers
2. **RENTER**: Can search vehicles and make reservations
3. **ADMIN**: Full system access (future implementation)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

**Made with ❤️ by the GoConcoche Team**