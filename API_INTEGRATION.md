# API Integration Documentation

This document provides detailed information about the Blood Donation Management System's API integration.

## Base URL

- Development: `http://localhost:3000/api`
- Production: `[production-url]/api`

## Authentication

All API endpoints except `/auth/login` and `/auth/register` require authentication using JWT tokens.

### Authentication Headers

```typescript
headers: {
  'Authorization': 'Bearer <your-jwt-token>',
  'Content-Type': 'application/json'
}
```

## API Endpoints

### Authentication

#### Register User
```typescript
POST /auth/register
Content-Type: application/json

{
  "email": string,
  "password": string,
  "name": string,
  "role": "donor" | "staff" | "admin",
  "phoneNumber": string,
  "address": string,
  "bloodType": string
}

Response: {
  "user": {
    "id": string,
    "email": string,
    "name": string,
    "role": string
  },
  "token": string
}
```

#### Login
```typescript
POST /auth/login
Content-Type: application/json

{
  "email": string,
  "password": string
}

Response: {
  "user": {
    "id": string,
    "email": string,
    "name": string,
    "role": string
  },
  "token": string
}
```

#### Get Profile
```typescript
GET /auth/profile
Authorization: Bearer <token>

Response: {
  "user": {
    "id": string,
    "email": string,
    "name": string,
    "role": string,
    "phoneNumber": string,
    "address": string,
    "bloodType": string,
    "lastDonation": string | null
  }
}
```

### User Management (Admin Only)

#### Get All Users
```typescript
GET /admin/users
Authorization: Bearer <token>
Query Parameters:
  - page: number (optional)
  - role: "admin" | "staff" | "donor" (optional)
  - search: string (optional)

Response: {
  "data": {
    "items": User[],
    "total": number,
    "page": number,
    "limit": number
  }
}
```

#### Update User
```typescript
PUT /admin/users/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "name"?: string,
  "email"?: string,
  "role"?: "admin" | "staff" | "donor",
  "phoneNumber"?: string,
  "address"?: string,
  "bloodType"?: string
}

Response: {
  "data": User
}
```

#### Delete User
```typescript
DELETE /admin/users/:id
Authorization: Bearer <token>

Response: {
  "success": true
}
```

### System Logs (Admin Only)

#### Get System Logs
```typescript
GET /admin/logs
Authorization: Bearer <token>
Query Parameters:
  - page: number (optional)
  - type: string (optional)

Response: {
  "data": {
    "items": SystemLog[],
    "total": number,
    "page": number,
    "limit": number
  }
}
```

### Blood Requests

#### Create Blood Request
```typescript
POST /blood-requests
Authorization: Bearer <token>
Content-Type: application/json

{
  "bloodType": string,
  "units": number,
  "urgency": "low" | "medium" | "high",
  "hospital": string,
  "reason": string,
  "requiredBy": string (ISO date)
}

Response: {
  "data": BloodRequest
}
```

#### Get Blood Requests
```typescript
GET /blood-requests
Authorization: Bearer <token>
Query Parameters:
  - status: "pending" | "fulfilled" | "cancelled" (optional)
  - bloodType: string (optional)
  - page: number (optional)

Response: {
  "data": {
    "items": BloodRequest[],
    "total": number,
    "page": number,
    "limit": number
  }
}
```

## Type Definitions

### User
```typescript
interface User {
  id: string;
  email: string;
  name: string;
  role: "admin" | "staff" | "donor";
  phoneNumber: string;
  address: string;
  bloodType: string;
  lastDonation: string | null;
  createdAt: string;
  updatedAt: string;
}
```

### BloodRequest
```typescript
interface BloodRequest {
  id: string;
  bloodType: string;
  units: number;
  urgency: "low" | "medium" | "high";
  status: "pending" | "fulfilled" | "cancelled";
  hospital: string;
  reason: string;
  requiredBy: string;
  requestedBy: string;
  createdAt: string;
  updatedAt: string;
}
```

### SystemLog
```typescript
interface SystemLog {
  id: string;
  type: string;
  message: string;
  userId: string | null;
  metadata: Record<string, any>;
  timestamp: string;
}
```

## Error Handling

The API uses standard HTTP status codes and returns error responses in the following format:

```typescript
{
  "error": string,
  "message": string,
  "details"?: any
}
```

Common status codes:
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error

## Rate Limiting

The API implements rate limiting to prevent abuse:
- 100 requests per minute for authenticated users
- 20 requests per minute for unauthenticated users

## Best Practices

1. Always handle API errors appropriately in your frontend code
2. Implement token refresh logic for long-running sessions
3. Cache responses when appropriate using React Query
4. Validate request data before sending
5. Use appropriate error boundaries in React components
6. Implement proper loading states for API calls

## Example Usage with React Query

```typescript
import { useQuery, useMutation } from '@tanstack/react-query';
import { api } from '@/services/api';

// Fetching blood requests
const useBloodRequests = (params?: BloodRequestParams) => {
  return useQuery({
    queryKey: ['bloodRequests', params],
    queryFn: () => api.get('/blood-requests', { params })
  });
};

// Creating a blood request
const useCreateBloodRequest = () => {
  return useMutation({
    mutationFn: (data: CreateBloodRequestData) => 
      api.post('/blood-requests', data)
  });
};
```

## Security Considerations

1. Never store JWT tokens in localStorage (use secure HTTP-only cookies in production)
2. Implement proper CORS policies
3. Validate all user input
4. Use HTTPS in production
5. Implement proper password hashing
6. Regular security audits
7. Keep dependencies updated

## Support

For API-related issues or questions:
1. Check the API documentation at `/api-docs`
2. Open an issue in the repository
3. Contact the development team