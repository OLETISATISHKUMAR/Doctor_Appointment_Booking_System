const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Super Admin Login
const superAdminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user is a Super Admin
    const user = await User.findOne({ email, role: 'SuperAdmin' });
    if (!user) {
      return res.status(404).json({ message: 'Super Admin not found.' });
    }

    // Compare password with the hashed password stored in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid password.' });
    }

    // Generate JWT token for Super Admin
    const token = jwt.sign({ userId: user._id, role: 'SuperAdmin' }, process.env.JWT_SECRET, {
      expiresIn: '1h', // Token expiration
    });

    // Send response with the generated token
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error logging in', error });
  }
};

module.exports = { superAdminLogin };
