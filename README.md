# Blood Donation Management System

A full-stack web application for managing blood donation operations, built with React, TypeScript, Express, and MongoDB.

## Project Overview

This system provides a comprehensive platform for blood donation management with three main user roles:
- **Donors**: Can register, manage their profile, and track donation history
- **Staff**: Can manage blood requests, inventory, and donor records
- **Administrators**: Have full system access including user management and system monitoring

## Tech Stack

### Frontend
- React 18 with TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- Shadcn/ui for UI components
- React Query for data fetching
- React Router for navigation
- Axios for API communication

### Backend
- Node.js with Express
- TypeScript
- MongoDB with Mongoose
- JWT for authentication
- Swagger/OpenAPI for API documentation
- Express Validator for request validation

## Project Structure

```
├── src/                    # Frontend source code
│   ├── components/        # Reusable UI components
│   ├── contexts/         # React contexts (Auth, etc.)
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utility functions
│   ├── pages/           # Page components
│   ├── services/        # API service functions
│   └── types/           # TypeScript type definitions
│
├── backend/              # Backend source code
│   ├── src/
│   │   ├── controllers/ # Route controllers
│   │   ├── middleware/  # Express middleware
│   │   ├── models/      # Mongoose models
│   │   ├── routes/      # API routes
│   │   ├── scripts/     # Utility scripts
│   │   └── types/       # TypeScript types
│   └── swagger.yaml     # API documentation
```

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (v6 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd blood-donation-system
```

2. Install frontend dependencies:
```bash
npm install
```

3. Install backend dependencies:
```bash
cd backend
npm install
```

4. Set up environment variables:
   - Create `.env` file in the backend directory
   - Add the following variables:
     ```
     MONGODB_URI=mongodb://localhost:27017/blood-donation
     JWT_SECRET=your-secret-key
     PORT=3000
     ```

5. Seed the database with initial data:
```bash
cd backend
npm run seed
```

### Running the Application

1. Start the backend server:
```bash
cd backend
npm run dev
```

2. Start the frontend development server:
```bash
npm run dev
```

3. Access the application:
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3000
   - API Documentation: http://localhost:3000/api-docs

## Default Accounts

The system comes with a default admin account:
- Email: admin@blooddonation.com
- Password: Admin@123

**Important**: Change the default admin password after first login.

## Features

### Authentication & Authorization
- JWT-based authentication
- Role-based access control (Admin, Staff, Donor)
- Protected routes and API endpoints
- Session management

### User Management
- User registration and profile management
- Role-based permissions
- Profile updates and password changes
- Account deletion

### Blood Donation Management
- Blood request creation and tracking
- Donor matching system
- Donation history tracking
- Blood inventory management

### Admin Features
- User management dashboard
- System monitoring and logs
- Report generation
- System configuration

### Staff Features
- Blood request management
- Donor record management
- Inventory tracking
- Donation scheduling

## API Documentation

The API is documented using Swagger/OpenAPI. Access the API documentation at:
- Development: http://localhost:3000/api-docs
- Production: [production-url]/api-docs

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, please open an issue in the repository or contact the development team.
