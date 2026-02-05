const { verifyToken } = require('../utils/jwt');
const { AppError } = require('../utils/errorHandler');
const User = require('../models/User');

const protect = async (req, res, next) => {
  try {
    let token;

    // Check for token in headers
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return next(
        new AppError('Not authorized to access this route', 401)
      );
    }

    try {
      // Verify token
      const decoded = verifyToken(token);
      
      // Get user from token
      req.user = await User.findById(decoded.userId).select('-password');
      
      if (!req.user) {
        return next(new AppError('User not found', 404));
      }

      next();
    } catch (error) {
      return next(new AppError('Not authorized to access this route', 401));
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { protect };
