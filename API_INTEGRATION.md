# API Integration Documentation

## Base URLs
- Development: `https://localhost:44396/api`
- Production: [To be configured]

## Authentication
All API requests must include a valid JWT token in the Authorization header:
```
Authorization: Bearer [token]
```

## Available Endpoints

### Authentication
- `POST /api/Auth/login` - User login
- `POST /api/Auth/register` - User registration
- `POST /api/Auth/refresh-token` - Refresh JWT token
- `POST /api/Auth/revoke-token` - Revoke JWT token

### User Management
- `GET /api/User` - Get user by ID
- `PUT /api/User` - Update user
- `DELETE /api/User` - Delete user
- `GET /api/User/all` - Get all users

### Blood Bank Management
- `GET /api/BloodBank` - Get all blood banks
- `GET /api/BloodBank/{id}` - Get blood bank by ID
- `POST /api/BloodBank` - Create blood bank
- `PUT /api/BloodBank/{id}` - Update blood bank
- `DELETE /api/BloodBank/{id}` - Delete blood bank

### Blood Request Management
- `GET /api/BloodRequest` - Get all blood requests
- `GET /api/BloodRequest/{id}` - Get blood request by ID
- `POST /api/BloodRequest` - Create blood request
- `PUT /api/BloodRequest/{id}` - Update blood request
- `DELETE /api/BloodRequest/{id}` - Delete blood request

### Campaign Management
- `GET /api/Campaign` - Get all campaigns
- `GET /api/Campaign/{id}` - Get campaign by ID
- `POST /api/Campaign` - Create campaign
- `PUT /api/Campaign/{id}` - Update campaign
- `DELETE /api/Campaign/{id}` - Delete campaign

### Donation History Management
- `GET /api/DonationHistory` - Get all donation histories
- `GET /api/DonationHistory/{id}` - Get donation history by ID
- `POST /api/DonationHistory` - Create donation history
- `PUT /api/DonationHistory/{id}` - Update donation history
- `DELETE /api/DonationHistory/{id}` - Delete donation history

## Response Format
All responses will be in JSON format and include:
- Success responses: Requested data with 2xx status codes
- Error responses: Error message and details with appropriate status codes (4xx or 5xx)

## Error Handling
Common HTTP status codes:
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error
