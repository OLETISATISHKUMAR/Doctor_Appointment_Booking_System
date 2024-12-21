const roleMiddleware = (roles) => (req, res, next) => {
  // Check if the user's role is in the allowed roles list
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ message: 'Access denied: insufficient permissions' });
  }
  next(); // User has permission, proceed to the next middleware or route handler
};

module.exports = { roleMiddleware };
