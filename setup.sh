#!/bin/bash

# Todo Application Setup Script
# This script will help you set up the application

echo "=========================================="
echo "Todo Application Setup"
echo "=========================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed"
    echo ""
    echo "Installing Node.js..."
    curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
    sudo apt-get install -y nodejs
    echo "✅ Node.js installed"
else
    echo "✅ Node.js is installed: $(node --version)"
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed"
    echo "npm should come with Node.js. Please reinstall Node.js."
    exit 1
else
    echo "✅ npm is installed: $(npm --version)"
fi

echo ""
echo "=========================================="
echo "Setting up Backend"
echo "=========================================="

# Navigate to backend
cd backend

# Install backend dependencies
echo "Installing backend dependencies..."
npm install

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "Creating backend .env file..."
    cat > .env << 'EOF'
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/todoapp
JWT_SECRET=my_super_secret_jwt_key_12345_change_in_production
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:3000
EOF
    echo "✅ Backend .env file created"
else
    echo "✅ Backend .env file already exists"
fi

cd ..

echo ""
echo "=========================================="
echo "Setting up Frontend"
echo "=========================================="

# Navigate to frontend
cd frontend

# Install frontend dependencies
echo "Installing frontend dependencies..."
npm install

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "Creating frontend .env file..."
    cat > .env << 'EOF'
REACT_APP_API_URL=http://localhost:5000/api
EOF
    echo "✅ Frontend .env file created"
else
    echo "✅ Frontend .env file already exists"
fi

cd ..

echo ""
echo "=========================================="
echo "Setup Complete!"
echo "=========================================="
echo ""
echo "Next steps:"
echo "1. Make sure MongoDB is running:"
echo "   sudo systemctl start mongod"
echo ""
echo "2. Start backend (in one terminal):"
echo "   cd backend && npm run dev"
echo ""
echo "3. Start frontend (in another terminal):"
echo "   cd frontend && npm start"
echo ""
echo "For detailed instructions, see INSTALLATION_GUIDE.md"
echo ""
