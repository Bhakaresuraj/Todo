# API Examples

This document provides detailed examples of API requests and responses for the Todo Application.

## Base URL
```
http://localhost:5000/api
```

## Authentication Endpoints

### 1. Register User

**Request:**
```http
POST /auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "password123"
}
```

**Success Response (201):**
```json
{
  "status": "success",
  "data": {
    "user": {
      "id": "65a1b2c3d4e5f6g7h8i9j0k1",
      "name": "John Doe",
      "email": "john.doe@example.com",
      "role": "user"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWExYjJjM2Q0ZTVmNmc3aDhqOWowazEiLCJpYXQiOjE3MDUwMDAwMDAsImV4cCI6MTcwNTYwNDgwMH0.example_token"
  }
}
```

**Error Response (400):**
```json
{
  "status": "error",
  "errors": [
    {
      "msg": "Email is required",
      "param": "email",
      "location": "body"
    }
  ]
}
```

### 2. Login

**Request:**
```http
POST /auth/login
Content-Type: application/json

{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

**Success Response (200):**
```json
{
  "status": "success",
  "data": {
    "user": {
      "id": "65a1b2c3d4e5f6g7h8i9j0k1",
      "name": "John Doe",
      "email": "john.doe@example.com",
      "role": "user"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWExYjJjM2Q0ZTVmNmc3aDhqOWowazEiLCJpYXQiOjE3MDUwMDAwMDAsImV4cCI6MTcwNTYwNDgwMH0.example_token"
  }
}
```

**Error Response (401):**
```json
{
  "status": "error",
  "message": "Invalid credentials"
}
```

## Todo Endpoints

All Todo endpoints require authentication. Include the JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

### 3. Create Todo

**Request:**
```http
POST /todos
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "title": "Complete project documentation",
  "description": "Write comprehensive documentation for the todo application",
  "status": "Pending",
  "priority": "High",
  "dueDate": "2024-12-31"
}
```

**Success Response (201):**
```json
{
  "status": "success",
  "data": {
    "_id": "65a1b2c3d4e5f6g7h8i9j0k2",
    "title": "Complete project documentation",
    "description": "Write comprehensive documentation for the todo application",
    "status": "Pending",
    "priority": "High",
    "dueDate": "2024-12-31T00:00:00.000Z",
    "user": {
      "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
      "name": "John Doe",
      "email": "john.doe@example.com"
    },
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

**Error Response (400):**
```json
{
  "status": "error",
  "errors": [
    {
      "msg": "Title is required",
      "param": "title",
      "location": "body"
    }
  ]
}
```

### 4. Get All Todos

**Request:**
```http
GET /todos?page=1&limit=10&status=Pending&priority=High&sortBy=createdAt&sortOrder=desc
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `status` (optional): Filter by status (Pending, In-Progress, Completed)
- `priority` (optional): Filter by priority (Low, Medium, High)
- `sortBy` (optional): Sort field (createdAt, dueDate, title, priority) (default: createdAt)
- `sortOrder` (optional): Sort order (asc, desc) (default: desc)

**Success Response (200):**
```json
{
  "status": "success",
  "data": [
    {
      "_id": "65a1b2c3d4e5f6g7h8i9j0k2",
      "title": "Complete project documentation",
      "description": "Write comprehensive documentation for the todo application",
      "status": "Pending",
      "priority": "High",
      "dueDate": "2024-12-31T00:00:00.000Z",
      "user": {
        "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
        "name": "John Doe",
        "email": "john.doe@example.com"
      },
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    },
    {
      "_id": "65a1b2c3d4e5f6g7h8i9j0k3",
      "title": "Review code",
      "description": "Review pull requests",
      "status": "In-Progress",
      "priority": "Medium",
      "dueDate": "2024-01-20T00:00:00.000Z",
      "user": {
        "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
        "name": "John Doe",
        "email": "john.doe@example.com"
      },
      "createdAt": "2024-01-14T09:15:00.000Z",
      "updatedAt": "2024-01-15T08:20:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "pages": 3
  }
}
```

### 5. Get Single Todo

**Request:**
```http
GET /todos/65a1b2c3d4e5f6g7h8i9j0k2
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Success Response (200):**
```json
{
  "status": "success",
  "data": {
    "_id": "65a1b2c3d4e5f6g7h8i9j0k2",
    "title": "Complete project documentation",
    "description": "Write comprehensive documentation for the todo application",
    "status": "Pending",
    "priority": "High",
    "dueDate": "2024-12-31T00:00:00.000Z",
    "user": {
      "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
      "name": "John Doe",
      "email": "john.doe@example.com"
    },
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

**Error Response (404):**
```json
{
  "status": "error",
  "message": "Todo not found"
}
```

### 6. Update Todo

**Request:**
```http
PUT /todos/65a1b2c3d4e5f6g7h8i9j0k2
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "title": "Updated title",
  "status": "In-Progress",
  "priority": "Medium"
}
```

**Note:** You can update any field. Only include the fields you want to update.

**Success Response (200):**
```json
{
  "status": "success",
  "data": {
    "_id": "65a1b2c3d4e5f6g7h8i9j0k2",
    "title": "Updated title",
    "description": "Write comprehensive documentation for the todo application",
    "status": "In-Progress",
    "priority": "Medium",
    "dueDate": "2024-12-31T00:00:00.000Z",
    "user": {
      "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
      "name": "John Doe",
      "email": "john.doe@example.com"
    },
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T11:45:00.000Z"
  }
}
```

**Error Response (404):**
```json
{
  "status": "error",
  "message": "Todo not found"
}
```

### 7. Delete Todo

**Request:**
```http
DELETE /todos/65a1b2c3d4e5f6g7h8i9j0k2
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Success Response (200):**
```json
{
  "status": "success",
  "data": {
    "message": "Todo deleted successfully"
  }
}
```

**Error Response (404):**
```json
{
  "status": "error",
  "message": "Todo not found"
}
```

## Error Responses

### Unauthorized (401)
```json
{
  "status": "error",
  "message": "Not authorized to access this route"
}
```

### Not Found (404)
```json
{
  "status": "error",
  "message": "Route /api/invalid not found"
}
```

### Validation Error (400)
```json
{
  "status": "error",
  "errors": [
    {
      "msg": "Title is required",
      "param": "title",
      "location": "body"
    },
    {
      "msg": "Password must be at least 6 characters",
      "param": "password",
      "location": "body"
    }
  ]
}
```

### Server Error (500)
```json
{
  "status": "error",
  "message": "Something went wrong!"
}
```

## Using cURL Examples

### Register
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john.doe@example.com",
    "password": "password123"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john.doe@example.com",
    "password": "password123"
  }'
```

### Create Todo
```bash
curl -X POST http://localhost:5000/api/todos \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "title": "Complete project",
    "description": "Finish the todo application",
    "status": "Pending",
    "priority": "High",
    "dueDate": "2024-12-31"
  }'
```

### Get Todos
```bash
curl -X GET "http://localhost:5000/api/todos?page=1&limit=10&status=Pending" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Update Todo
```bash
curl -X PUT http://localhost:5000/api/todos/TODO_ID \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "status": "Completed"
  }'
```

### Delete Todo
```bash
curl -X DELETE http://localhost:5000/api/todos/TODO_ID \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## Using JavaScript Fetch Examples

### Register
```javascript
const response = await fetch('http://localhost:5000/api/auth/register', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: 'John Doe',
    email: 'john.doe@example.com',
    password: 'password123',
  }),
});

const data = await response.json();
console.log(data);
```

### Login
```javascript
const response = await fetch('http://localhost:5000/api/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: 'john.doe@example.com',
    password: 'password123',
  }),
});

const data = await response.json();
const token = data.data.token;
localStorage.setItem('token', token);
```

### Create Todo
```javascript
const token = localStorage.getItem('token');

const response = await fetch('http://localhost:5000/api/todos', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  },
  body: JSON.stringify({
    title: 'Complete project',
    description: 'Finish the todo application',
    status: 'Pending',
    priority: 'High',
    dueDate: '2024-12-31',
  }),
});

const data = await response.json();
console.log(data);
```

### Get Todos
```javascript
const token = localStorage.getItem('token');

const response = await fetch(
  'http://localhost:5000/api/todos?page=1&limit=10&status=Pending',
  {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  }
);

const data = await response.json();
console.log(data);
```
