# Index Documentation

This document provides a comprehensive overview of the project's structure, components, and key files.

## Project Structure

### Frontend (`/src`)

#### Core Components
- `App.tsx`: Main application component with routing setup
- `main.tsx`: Application entry point
- `vite-env.d.ts`: TypeScript declarations for Vite

#### Pages (`/src/pages`)
- `Index.tsx`: Landing page
- `Login.tsx`: Authentication page
- `Register.tsx`: User registration
- `Profile.tsx`: User profile management
- `Admin.tsx`: Admin dashboard
- `Staff.tsx`: Staff dashboard
- `BloodRequest.tsx`: Blood request management
- `Blog.tsx`: News and updates
- `AboutUs.tsx`: About page
- `NotFound.tsx`: 404 error page

#### Components (`/src/components`)
- `ui/`: Shadcn/ui components
  - `button.tsx`: Button component
  - `card.tsx`: Card component
  - `input.tsx`: Input component
  - `select.tsx`: Select component
  - `tabs.tsx`: Tabs component
  - `toast.tsx`: Toast notifications
  - `dialog.tsx`: Modal dialogs
  - `dropdown-menu.tsx`: Dropdown menus
  - `form.tsx`: Form components
  - `table.tsx`: Table components
- `layout/`: Layout components
  - `Header.tsx`: Navigation header
  - `Footer.tsx`: Page footer
  - `Sidebar.tsx`: Navigation sidebar
- `auth/`: Authentication components
  - `LoginForm.tsx`: Login form
  - `RegisterForm.tsx`: Registration form
  - `ProtectedRoute.tsx`: Route protection
- `blood/`: Blood donation components
  - `BloodRequestForm.tsx`: Request form
  - `DonorCard.tsx`: Donor information
  - `InventoryTable.tsx`: Blood inventory

#### Contexts (`/src/contexts`)
- `AuthContext.tsx`: Authentication state management
- `ThemeContext.tsx`: Theme management
- `NotificationContext.tsx`: Notification system

#### Services (`/src/services`)
- `api.ts`: Axios instance and API configuration
- `auth.service.ts`: Authentication services
- `user.service.ts`: User management services
- `blood.service.ts`: Blood donation services
- `admin.service.ts`: Admin services

#### Types (`/src/types`)
- `api.ts`: API type definitions
- `auth.ts`: Authentication types
- `user.ts`: User-related types
- `blood.ts`: Blood donation types

#### Utils (`/src/lib`)
- `utils.ts`: Utility functions
- `axios.ts`: Axios configuration
- `validation.ts`: Form validation
- `date.ts`: Date formatting
- `storage.ts`: Local storage utilities

### Backend (`/backend`)

#### Core Files
- `index.ts`: Server entry point
- `swagger.yaml`: API documentation

#### Models (`/backend/src/models`)
- `User.ts`: User model
- `BloodRequest.ts`: Blood request model
- `SystemLog.ts`: System log model
- `Donation.ts`: Donation model

#### Controllers (`/backend/src/controllers`)
- `auth.ts`: Authentication controller
- `user.ts`: User management
- `blood.ts`: Blood request handling
- `admin.ts`: Admin operations

#### Routes (`/backend/src/routes`)
- `auth.ts`: Authentication routes
- `user.ts`: User routes
- `blood.ts`: Blood request routes
- `admin.ts`: Admin routes

#### Middleware (`/backend/src/middleware`)
- `auth.ts`: Authentication middleware
- `validation.ts`: Request validation
- `error.ts`: Error handling
- `logging.ts`: Request logging

#### Scripts (`/backend/src/scripts`)
- `seed.ts`: Database seeding
- `migrate.ts`: Database migrations

## Key Features

### Authentication System
- JWT-based authentication
- Role-based access control
- Protected routes
- Session management

### User Management
- User registration
- Profile management
- Role management
- Account settings

### Blood Donation System
- Blood request creation
- Donor matching
- Inventory management
- Donation tracking

### Admin Dashboard
- User management
- System monitoring
- Report generation
- Configuration settings

### Staff Interface
- Request management
- Donor records
- Inventory control
- Donation scheduling

## Development Tools

### Frontend
- Vite for build tooling
- TypeScript for type safety
- Tailwind CSS for styling
- React Query for data fetching
- React Router for navigation

### Backend
- Express.js framework
- MongoDB with Mongoose
- JWT for authentication
- Swagger for API docs
- Express Validator

## Testing

### Frontend Tests
- Component testing with React Testing Library
- Integration tests
- E2E tests with Cypress

### Backend Tests
- Unit tests with Jest
- Integration tests
- API tests

## Deployment

### Frontend
- Static file hosting
- CDN integration
- Environment configuration

### Backend
- Node.js hosting
- MongoDB deployment
- SSL/TLS setup
- Environment variables

## Monitoring

### System Monitoring
- Error logging
- Performance metrics
- User activity tracking
- System health checks

### Security
- Authentication logs
- Access control
- Data encryption
- Security headers

## Maintenance

### Regular Tasks
- Dependency updates
- Security patches
- Database backups
- Log rotation
- Performance optimization

### Documentation
- API documentation
- Code documentation
- User guides
- Deployment guides 