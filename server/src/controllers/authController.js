const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const responseHandler = require('../utils/responseHandler');

// Signup
exports.signup = async (req, res) => {
  try {
    const { name, email, password, role = 'user' } = req.body;  // Default role is 'user'

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('Error: User already exists');
      return responseHandler.error(res, 400, 'User already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);  // You can adjust saltRounds if needed

    // Create new user
    const user = new User({ name, email, password: hashedPassword, role });
    await user.save();

    // Generate JWT token with user role and userId
    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRY || '1h' });

    console.log('Success: User signed up and token generated');
    responseHandler.success(res, 201, { token });
  } catch (error) {
    console.log('Error: Error creating user', error);
    responseHandler.error(res, 500, 'Error creating user');
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      console.log('Error: User not found');
      return responseHandler.error(res, 404, 'User not found');
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('Error: Invalid credentials');
      return responseHandler.error(res, 400, 'Invalid credentials');
    }

    // Generate JWT token with userId and role
    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRY });
    
    console.log('Success: User logged in and token generated');
    responseHandler.success(res, 200, { token });
  } catch (error) {
    console.log('Error: Error logging in user', error);
    responseHandler.error(res, 500, 'Error logging in');
  }
};
