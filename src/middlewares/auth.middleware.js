const jwt = require('jsonwebtoken');
const AppError = require('../utils/classes/app-error');

// Middleware for JWT verification
const authenticateJWT = (req, res, next) => {
  // Get auth header - The Authorization header is commonly used to send authentication tokens
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return next(new AppError("AUTHORIZATION_HEADER_MISSING", "Debe iniciar sesión para acceder", 401));
  }

  // Extract token from "Bearer <token>"
  const token = authHeader.split(' ')[1];

  if (!token) {
    return next(new AppError("TOKEN_MISSING", "Token faltante", 401));
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user to request
    req.user = decoded;

    next();
  } catch (error) {
    return next(new AppError("TOKEN_INVALID", "Token inválido o expirado", 403));
  }
};

const authenticateRefreshToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return next(new AppError("AUTHORIZATION_HEADER_MISSING", "Debe iniciar sesión para acceder", 401));
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return next(new AppError("TOKEN_MISSING", "Token faltante", 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET, { ignoreExpiration: true });
    req.user = decoded;
    next();
  } catch (error) {
    return next(new AppError("TOKEN_INVALID", "Token inválido o expirado", 403));
  }
};

module.exports = { authenticateJWT, authenticateRefreshToken };
