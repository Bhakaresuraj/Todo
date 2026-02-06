# Complete Installation Guide - Step by Step

This guide will help you install all prerequisites and run the Todo application from scratch.

## Prerequisites Installation

### Step 1: Install Node.js and npm

**For Ubuntu/Debian:**
```bash
# Update package list
sudo apt update

# Install Node.js (this will install npm automatically)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify installation
node --version
npm --version
```

**Alternative (using snap):**
```bash
sudo snap install node --classic
```

**For other Linux distributions:**
- Visit: https://nodejs.org/en/download/
- Or use your distribution's package manager

### Step 2: Install MongoDB

**Option A: Install MongoDB Community Edition (Local)**

```bash
# Import MongoDB public GPG key
wget -qO - https://www.mongodb.org/static/pgp/server-7.0.asc | sudo apt-key add -

# Add MongoDB repository
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list

# Update package list
sudo apt-get update

# Install MongoDB
sudo apt-get install -y mongodb-org

# Start MongoDB service
sudo systemctl start mongod

# Enable MongoDB to start on boot
sudo systemctl enable mongod

# Verify MongoDB is running
sudo systemctl status mongod
```

**Option B: Use MongoDB Atlas (Cloud - Recommended for beginners)**

1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up for free account
3. Create a free cluster
4. Get your connection string (we'll use it later)

**Option C: Install MongoDB using Docker (if you have Docker)**

```bash
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

### Step 3: Verify MongoDB Installation (if installed locally)

```bash
# Check MongoDB version
mongod --version

# Connect to MongoDB shell (optional)
mongosh
```

## Application Setup

### Step 4: Navigate to Project Directory

```bash
cd /home/bhakare/Desktop/Todo
```

### Step 5: Install Backend Dependencies

```bash
cd backend
npm install
```

**Expected output:** You should see packages being installed. Wait for it to complete.

### Step 6: Create Backend Environment File

```bash
# Create .env file
cat > .env << 'EOF'
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/todoapp
JWT_SECRET=my_super_secret_jwt_key_12345_change_in_production
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:3000
EOF

# Verify the file was created
cat .env
```

**If using MongoDB Atlas:**
```bash
# Replace MONGODB_URI with your Atlas connection string
# Format: mongodb+srv://username:password@cluster.mongodb.net/todoapp
cat > .env << 'EOF'
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb+srv://your-username:your-password@cluster0.xxxxx.mongodb.net/todoapp?retryWrites=true&w=majority
JWT_SECRET=my_super_secret_jwt_key_12345_change_in_production
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:3000
EOF
```

### Step 7: Start MongoDB (if using local MongoDB)

```bash
# Start MongoDB service
sudo systemctl start mongod

# Or if using systemd
sudo service mongod start

# Verify it's running
sudo systemctl status mongod
```

### Step 8: Start Backend Server

```bash
# Make sure you're in the backend directory
cd /home/bhakare/Desktop/Todo/backend

# Start the server
npm run dev
```

**Expected output:**
```
MongoDB Connected: localhost:27017
Server running in development mode on port 5000
```

**Keep this terminal open!** The backend server is now running.

### Step 9: Open New Terminal for Frontend

Open a **new terminal window** (keep backend running in the first terminal).

### Step 10: Install Frontend Dependencies

```bash
cd /home/bhakare/Desktop/Todo/frontend
npm install
```

**Expected output:** You should see packages being installed. Wait for it to complete.

### Step 11: Create Frontend Environment File

```bash
# Create .env file
cat > .env << 'EOF'
REACT_APP_API_URL=http://localhost:5000/api
EOF

# Verify the file was created
cat .env
```

### Step 12: Start Frontend Development Server

```bash
# Make sure you're in the frontend directory
cd /home/bhakare/Desktop/Todo/frontend

# Start the React app
npm start
```

**Expected output:**
- The browser should automatically open at `http://localhost:3000`
- If not, manually open: http://localhost:3000

## 🎉 Application is Running!

You should now see:
- **Backend**: Running on http://localhost:5000
- **Frontend**: Running on http://localhost:3000 (should open automatically)

## First Time Usage

1. **Register**: Click "Register" or go to http://localhost:3000/register
   - Enter your name, email, and password
   - Click "Register"

2. **Login**: After registration, you'll be automatically logged in
   - Or go to http://localhost:3000/login

3. **Create Todo**: Click "+ New Todo" button
   - Fill in the form
   - Click "Create"

4. **Manage Todos**: 
   - Edit, delete, or change status
   - Use filters and sorting
   - Navigate pages

## Troubleshooting

### Problem: "node: command not found"
**Solution:** Node.js is not installed or not in PATH
```bash
# Reinstall Node.js (see Step 1)
# Or add to PATH if installed elsewhere
```

### Problem: "npm: command not found"
**Solution:** npm is not installed
```bash
# npm comes with Node.js, reinstall Node.js (see Step 1)
```

### Problem: "MongoDB connection error"
**Solutions:**
1. **Check if MongoDB is running:**
   ```bash
   sudo systemctl status mongod
   ```

2. **Start MongoDB:**
   ```bash
   sudo systemctl start mongod
   ```

3. **Check MongoDB URI in .env file:**
   ```bash
   cd /home/bhakare/Desktop/Todo/backend
   cat .env
   ```

4. **For MongoDB Atlas:** Make sure your IP is whitelisted and connection string is correct

### Problem: "Port 5000 already in use"
**Solution:** Another application is using port 5000
```bash
# Find and kill the process
sudo lsof -ti:5000 | xargs kill -9

# Or change port in backend/.env
# Change PORT=5000 to PORT=5001
# Update FRONTEND_URL accordingly
```

### Problem: "Port 3000 already in use"
**Solution:** Another React app is running
```bash
# Find and kill the process
sudo lsof -ti:3000 | xargs kill -9

# Or React will ask to use a different port (press Y)
```

### Problem: "Cannot find module" errors
**Solution:** Dependencies not installed
```bash
# Backend
cd /home/bhakare/Desktop/Todo/backend
rm -rf node_modules package-lock.json
npm install

# Frontend
cd /home/bhakare/Desktop/Todo/frontend
rm -rf node_modules package-lock.json
npm install
```

### Problem: "CORS error" in browser
**Solution:** Check backend .env file
```bash
cd /home/bhakare/Desktop/Todo/backend
cat .env
# Make sure FRONTEND_URL=http://localhost:3000
```

### Problem: Frontend can't connect to backend
**Solution:** 
1. Make sure backend is running (check terminal 1)
2. Check frontend .env file:
   ```bash
   cd /home/bhakare/Desktop/Todo/frontend
   cat .env
   # Should be: REACT_APP_API_URL=http://localhost:5000/api
   ```
3. Restart frontend after changing .env

## Quick Command Reference

```bash
# Start MongoDB (local)
sudo systemctl start mongod

# Check MongoDB status
sudo systemctl status mongod

# Start Backend (Terminal 1)
cd /home/bhakare/Desktop/Todo/backend
npm run dev

# Start Frontend (Terminal 2)
cd /home/bhakare/Desktop/Todo/frontend
npm start

# Stop servers
# Press Ctrl+C in each terminal
```

## Next Steps

- Read `README.md` for detailed documentation
- Check `API_EXAMPLES.md` for API usage
- Explore the codebase
- Customize the application

---

**Happy Coding! 🚀**
