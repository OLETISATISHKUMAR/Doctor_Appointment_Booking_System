const jwt = require('jsonwebtoken');

// Function to generate a JWT token
exports.generateToken = (user) => {
  const payload = {
    userId: user._id,
    email: user.email,
    role: user.role, // user role (admin, doctor, patient)
  };

  // Generate token with an expiry time of 1 hour
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

  return token;
};

// Function to verify a JWT token
exports.verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded; // Returns decoded token if valid
  } catch (err) {
    throw new Error('Invalid token');
  }
};
