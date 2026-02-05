# Todo List Application - MERN Stack

A production-quality, full-stack Todo List application built with MongoDB, Express.js, React.js, and Node.js. This application demonstrates clean architecture, best practices, and modern web development patterns.

## 🚀 Features

### Core Functionality
- **Full CRUD Operations** - Create, Read, Update, and Delete todos
- **Task Workflow** - Three status states: Pending, In-Progress, Completed
- **Priority Management** - Low, Medium, High priority levels
- **Due Date Tracking** - Set and track due dates with overdue indicators
- **JWT Authentication** - Secure user authentication and authorization
- **User Isolation** - Users can only access their own todos

### Advanced Features
- **Pagination** - Efficient data loading with pagination support
- **Filtering** - Filter todos by status and priority
- **Sorting** - Sort by created date, due date, title, or priority
- **Responsive Design** - Mobile-friendly UI
- **Form Validation** - Client and server-side validation
- **Error Handling** - Centralized error handling with user-friendly messages
- **Loading States** - Visual feedback during API calls

## 📁 Project Structure

```
Todo/
├── backend/
│   ├── config/
│   │   └── database.js          # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js    # Authentication controllers
│   │   └── todoController.js    # Todo controllers
│   ├── middlewares/
│   │   ├── auth.js              # JWT authentication middleware
│   │   ├── logger.js            # Request logging middleware
│   │   └── validator.js         # Input validation middleware
│   ├── models/
│   │   ├── User.js              # User model
│   │   └── Todo.js              # Todo model
│   ├── routes/
│   │   ├── authRoutes.js        # Authentication routes
│   │   └── todoRoutes.js        # Todo routes
│   ├── services/
│   │   ├── authService.js       # Authentication business logic
│   │   └── todoService.js       # Todo business logic
│   ├── utils/
│   │   ├── errorHandler.js      # Error handling utilities
│   │   └── jwt.js               # JWT utilities
│   ├── .env.example             # Environment variables example
│   ├── .gitignore
│   ├── package.json
│   └── server.js                # Express app entry point
│
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/
    │   │   ├── FilterBar.js     # Filter and sort component
    │   │   ├── Pagination.js    # Pagination component
    │   │   ├── PrivateRoute.js  # Protected route wrapper
    │   │   ├── TodoCard.js      # Todo card component
    │   │   └── TodoForm.js      # Todo form component
    │   ├── context/
    │   │   └── AuthContext.js   # Authentication context
    │   ├── pages/
    │   │   ├── Dashboard.js     # Main dashboard page
    │   │   ├── Login.js         # Login page
    │   │   ├── Register.js      # Registration page
    │   │   ├── Auth.css         # Auth page styles
    │   │   └── Dashboard.css    # Dashboard styles
    │   ├── services/
    │   │   ├── api.js           # Axios instance configuration
    │   │   ├── authService.js   # Auth API calls
    │   │   └── todoService.js   # Todo API calls
    │   ├── App.js               # Main app component
    │   ├── App.css              # Global styles
    │   ├── index.js             # React entry point
    │   └── index.css            # Base styles
    ├── .env.example             # Environment variables example
    ├── .gitignore
    └── package.json
```

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - MongoDB object modeling
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **express-validator** - Input validation
- **CORS** - Cross-origin resource sharing

### Frontend
- **React.js 18** - UI library
- **React Router DOM** - Routing
- **Axios** - HTTP client
- **Context API** - State management
- **React Hooks** - Functional components

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **MongoDB** (local installation or MongoDB Atlas account)

## 🔧 Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd Todo
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/todoapp

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d

# CORS Configuration
FRONTEND_URL=http://localhost:3000
```

**Important:** Replace `JWT_SECRET` with a strong, random string in production.

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

Create a `.env` file in the `frontend` directory:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

### 4. Start MongoDB

Make sure MongoDB is running on your system:

```bash
# For local MongoDB
mongod

# Or use MongoDB Atlas connection string in .env
```

## 🚀 Running the Application

### Development Mode

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

The backend server will start on `http://localhost:5000`

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```

The frontend will start on `http://localhost:3000` and automatically open in your browser.

### Production Mode

**Backend:**
```bash
cd backend
npm start
```

**Frontend:**
```bash
cd frontend
npm run build
# Serve the build folder using a static server like serve or nginx
```

## 📡 API Endpoints

### Authentication

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "status": "success",
  "data": {
    "user": {
      "id": "user_id",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user"
    },
    "token": "jwt_token_here"
  }
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "status": "success",
  "data": {
    "user": {
      "id": "user_id",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user"
    },
    "token": "jwt_token_here"
  }
}
```

### Todos (Protected Routes - Requires JWT Token)

#### Create Todo
```http
POST /api/todos
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "title": "Complete project",
  "description": "Finish the todo application",
  "status": "Pending",
  "priority": "High",
  "dueDate": "2024-12-31"
}
```

#### Get All Todos (with pagination, filtering, sorting)
```http
GET /api/todos?page=1&limit=10&status=Pending&priority=High&sortBy=createdAt&sortOrder=desc
Authorization: Bearer <jwt_token>
```

**Query Parameters:**
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)
- `status` - Filter by status (Pending, In-Progress, Completed)
- `priority` - Filter by priority (Low, Medium, High)
- `sortBy` - Sort field (createdAt, dueDate, title, priority)
- `sortOrder` - Sort order (asc, desc)

**Response:**
```json
{
  "status": "success",
  "data": [
    {
      "_id": "todo_id",
      "title": "Complete project",
      "description": "Finish the todo application",
      "status": "Pending",
      "priority": "High",
      "dueDate": "2024-12-31T00:00:00.000Z",
      "user": {
        "_id": "user_id",
        "name": "John Doe",
        "email": "john@example.com"
      },
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
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

#### Get Single Todo
```http
GET /api/todos/:id
Authorization: Bearer <jwt_token>
```

#### Update Todo
```http
PUT /api/todos/:id
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "title": "Updated title",
  "status": "In-Progress"
}
```

#### Delete Todo
```http
DELETE /api/todos/:id
Authorization: Bearer <jwt_token>
```

## 🗄️ Database Models

### User Model
```javascript
{
  name: String (required, max 50 chars),
  email: String (required, unique, lowercase),
  password: String (required, hashed, min 6 chars),
  role: String (enum: ['user', 'admin'], default: 'user'),
  timestamps: true
}
```

### Todo Model
```javascript
{
  title: String (required, max 200 chars),
  description: String (optional, max 1000 chars),
  status: String (enum: ['Pending', 'In-Progress', 'Completed'], default: 'Pending'),
  priority: String (enum: ['Low', 'Medium', 'High'], default: 'Medium'),
  dueDate: Date (optional),
  user: ObjectId (reference to User, required),
  timestamps: true
}
```

## 🔒 Security Features

- **Password Hashing** - Passwords are hashed using bcrypt before storage
- **JWT Authentication** - Secure token-based authentication
- **Input Validation** - Server-side validation using express-validator
- **CORS Protection** - Configured CORS for allowed origins
- **User Isolation** - Users can only access their own todos
- **Error Handling** - Centralized error handling without exposing sensitive information

## 🎨 Frontend Features

- **Protected Routes** - Routes protected with authentication check
- **Context API** - Global state management for authentication
- **Form Validation** - Client-side validation with error messages
- **Loading States** - Visual feedback during API operations
- **Responsive Design** - Mobile-friendly interface
- **Error Handling** - User-friendly error messages

## 🧪 Testing the API

You can use tools like **Postman** or **curl** to test the API endpoints:

```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"password123"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'

# Get Todos (replace TOKEN with actual JWT token)
curl -X GET http://localhost:5000/api/todos \
  -H "Authorization: Bearer TOKEN"
```

## 📝 Code Quality & Best Practices

### Backend
- ✅ Clean Architecture - Separation of concerns (routes, controllers, services, models)
- ✅ Error Handling - Centralized error handling middleware
- ✅ Input Validation - Server-side validation for all inputs
- ✅ Security - Password hashing, JWT authentication, CORS
- ✅ Logging - Request logging middleware
- ✅ Environment Configuration - Environment-based configuration
- ✅ Database Indexing - Optimized queries with indexes

### Frontend
- ✅ Component-Based Architecture - Reusable components
- ✅ Hooks - Functional components with React Hooks
- ✅ Context API - Global state management
- ✅ Error Handling - User-friendly error messages
- ✅ Loading States - Visual feedback
- ✅ Form Validation - Client-side validation
- ✅ Responsive Design - Mobile-friendly UI

## 🚀 Production Deployment Notes

### Backend
1. Set `NODE_ENV=production`
2. Use a strong `JWT_SECRET`
3. Configure proper CORS origins
4. Use MongoDB Atlas or managed MongoDB service
5. Set up proper logging and monitoring
6. Use environment variables for all sensitive data
7. Enable HTTPS
8. Set up rate limiting
9. Use helmet.js for security headers

### Frontend
1. Build the production bundle: `npm run build`
2. Serve static files using nginx or similar
3. Configure environment variables
4. Set up proper error tracking (e.g., Sentry)
5. Enable HTTPS
6. Configure proper caching headers

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

Built with ❤️ following clean architecture and best practices.

## 📞 Support

For support, email your-email@example.com or create an issue in the repository.

---

**Happy Coding! 🎉**
