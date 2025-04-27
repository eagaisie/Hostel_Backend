# Hostel Management System Backend

This is the backend server for the Hostel Management System.

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory with the following variables:
   ```
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=hostel_management
   DB_USER=your_username
   DB_PASSWORD=your_password
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRES_IN=24h
   PORT=3000
   NODE_ENV=development
   ```
4. Set up the database:
   ```bash
   psql -U your_username -d hostel_management -f schema.sql
   ```
5. Create admin user:
   ```bash
   node create-admin.js
   ```

## Running the Server

Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

## API Endpoints

### Authentication
- POST /api/auth/login - User login
- POST /api/auth/register - User registration
- GET /api/auth/logout - User logout

### Hostels
- GET /api/hostels - Get all hostels
- GET /api/hostels/:id - Get hostel by ID
- POST /api/hostels - Create new hostel
- PUT /api/hostels/:id - Update hostel
- DELETE /api/hostels/:id - Delete hostel

### Rooms
- GET /api/rooms - Get all rooms
- GET /api/rooms/:id - Get room by ID
- POST /api/rooms - Create new room
- PUT /api/rooms/:id - Update room
- DELETE /api/rooms/:id - Delete room

### Applications
- GET /api/applications - Get all applications
- GET /api/applications/:id - Get application by ID
- POST /api/applications - Create new application
- PUT /api/applications/:id - Update application
- DELETE /api/applications/:id - Delete application

## Database Schema

The database schema is defined in `schema.sql`. It includes tables for:
- Users
- Hostels
- Rooms
- Applications
- Maintenance Requests
- Complaints

## Error Handling

The API uses standard HTTP status codes:
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error 