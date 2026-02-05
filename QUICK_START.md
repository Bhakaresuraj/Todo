# Quick Start Guide

Get the Todo Application up and running in 5 minutes!

## Prerequisites Check

Make sure you have installed:
- ✅ Node.js (v14+)
- ✅ npm or yarn
- ✅ MongoDB (local or Atlas)

## Step-by-Step Setup

### 1. Install Backend Dependencies

```bash
cd backend
npm install
```

### 2. Configure Backend Environment

Create `backend/.env` file:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/todoapp
JWT_SECRET=your_secret_key_here_change_in_production
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:3000
```

**For MongoDB Atlas users:**
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/todoapp
```

### 3. Start MongoDB

**Local MongoDB:**
```bash
# On Linux/Mac
mongod

# On Windows (if installed as service, it should be running automatically)
```

**Or use MongoDB Atlas** - No local installation needed!

### 4. Start Backend Server

```bash
cd backend
npm run dev
```

You should see:
```
MongoDB Connected: ...
Server running in development mode on port 5000
```

### 5. Install Frontend Dependencies

Open a **new terminal**:

```bash
cd frontend
npm install
```

### 6. Configure Frontend Environment

Create `frontend/.env` file:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

### 7. Start Frontend Development Server

```bash
cd frontend
npm start
```

The browser should automatically open at `http://localhost:3000`

## 🎉 You're Done!

1. **Register** a new account at `http://localhost:3000/register`
2. **Login** with your credentials
3. **Create** your first todo!

## Troubleshooting

### MongoDB Connection Error

**Problem:** `MongoDB connection error`

**Solutions:**
- Make sure MongoDB is running: `mongod` or check MongoDB service
- Verify `MONGODB_URI` in `.env` is correct
- For Atlas: Check your IP whitelist and connection string

### Port Already in Use

**Problem:** `Port 5000 already in use`

**Solution:**
- Change `PORT` in `backend/.env` to another port (e.g., `5001`)
- Update `FRONTEND_URL` accordingly
- Update `REACT_APP_API_URL` in `frontend/.env`

### CORS Error

**Problem:** `CORS policy error`

**Solution:**
- Ensure `FRONTEND_URL` in `backend/.env` matches your frontend URL
- Default is `http://localhost:3000`

### Frontend Can't Connect to Backend

**Problem:** `Network Error` or `Cannot connect to API`

**Solutions:**
- Verify backend is running on port 5000
- Check `REACT_APP_API_URL` in `frontend/.env`
- Ensure backend CORS is configured correctly

### JWT Token Errors

**Problem:** `Not authorized` errors

**Solutions:**
- Make sure you're logged in
- Check if token is stored in localStorage
- Try logging out and logging in again

## Testing the API

### Using Browser Console

1. Open browser console (F12)
2. Login to get a token
3. Run:

```javascript
// Get token from localStorage
const token = localStorage.getItem('token');

// Test API
fetch('http://localhost:5000/api/todos', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
})
.then(res => res.json())
.then(data => console.log(data));
```

### Using Postman

1. Import the collection (create manually)
2. Set environment variable `base_url` = `http://localhost:5000/api`
3. Register/Login to get token
4. Set token in Authorization header: `Bearer <token>`
5. Test endpoints

## Next Steps

- Read the full [README.md](README.md) for detailed documentation
- Check [API_EXAMPLES.md](API_EXAMPLES.md) for API usage examples
- Explore the codebase structure
- Customize the application to your needs!

## Common Commands

```bash
# Backend
cd backend
npm install          # Install dependencies
npm run dev         # Start development server
npm start           # Start production server

# Frontend
cd frontend
npm install          # Install dependencies
npm start           # Start development server
npm run build       # Build for production
```

---

**Happy Coding! 🚀**
