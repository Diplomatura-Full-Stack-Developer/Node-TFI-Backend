const jwt = require('jsonwebtoken');
const AppError = require('../utils/classes/app-error');

// Middleware for JWT verification
const authenticateJWT = (req, res, next) => {
  // Get auth header - The Authorization header is commonly used to send authentication tokens
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return next(new AppError("AUTHORIZATION_HEADER_MISSING", "Authorization header missing", 401));
  }

  // Extract token from "Bearer <token>"
  const token = authHeader.split(' ')[1];

  if (!token) {
    return next(new AppError("TOKEN_MISSING", "Token missing", 401));
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user to request
    req.user = decoded;

    next();
  } catch (error) {
    return next(new AppError("TOKEN_INVALID", "Invalid or expired token", 403));
  }
};

module.exports = { authenticateJWT };