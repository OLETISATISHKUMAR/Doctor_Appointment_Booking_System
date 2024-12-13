const jwt = require('jsonwebtoken');
const responseHandler = require('../utils/responseHandler');

// Middleware to verify the token
exports.verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');  // Expect token in the Authorization header

  if (!token) {
    return responseHandler.error(res, 401, 'Authorization token required');
  }

  try {
    // Verify token and decode user data
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Log the decoded token for debugging purposes (optional, remove in production)
    console.log('Decoded Token:', decoded);

    req.user = decoded; // Attach user info to request object (userId, role)
    next(); // Token is valid, proceed to the next middleware/route handler
  } catch (error) {
    // Check for specific JWT errors
    if (error.name === 'TokenExpiredError') {
      return responseHandler.error(res, 401, 'Token has expired');
    }
    return responseHandler.error(res, 401, 'Invalid or expired token');
  }
};

// Middleware to verify if the user has the required role(s)
exports.verifyRole = (...allowedRoles) => {
  return (req, res, next) => {
    const { role } = req.user; // Get role from the decoded JWT token

    // Log user role and allowed roles for debugging
    console.log('User Role:', role); // Log the user role
    console.log('Allowed Roles:', allowedRoles); // Log the allowed roles

    if (!allowedRoles.includes(role)) {
      console.log('Access Denied: Insufficient permissions');
      return responseHandler.error(res, 403, 'Access denied. Insufficient permissions');
    }

    next(); // Role is valid, proceed to the next middleware/route handler
  };
};

