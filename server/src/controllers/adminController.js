const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Create Admin
const createAdmin = async (req, res) => {
  try {
    // Destructure the fields from request body
    const { name, email, password, role } = req.body;

    // Check if the admin already exists in the database
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Admin with this email already exists' });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user (admin) object
    const user = new User({ name, email, password: hashedPassword, role });

    // Save the new admin to the database
    await user.save();

    res.status(201).json({ message: 'Admin created successfully!' });
  } catch (error) {
    console.error('Error creating admin:', error);
    res.status(400).json({ error: error.message });
  }
};

// List Admins
const listAdmins = async (req, res) => {
  try {
    // Find all users with the role "Admin"
    const admins = await User.find({ role: 'Admin' });

    // If no admins found, send a message
    if (admins.length === 0) {
      return res.status(404).json({ message: 'No admins found' });
    }

    res.status(200).json(admins);
  } catch (error) {
    console.error('Error fetching admins:', error);
    res.status(400).json({ error: error.message });
  }
};

// Update Admin
const updateAdmin = async (req, res) => {
  try {
    const { adminId } = req.params;
    const { name, email, password, role } = req.body;

    // Find the admin by ID
    const admin = await User.findById(adminId);
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    // If password is provided, hash it
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      admin.password = hashedPassword;
    }

    // Update admin fields
    admin.name = name || admin.name;
    admin.email = email || admin.email;
    admin.role = role || admin.role;

    // Save the updated admin to the database
    await admin.save();

    res.status(200).json({ message: 'Admin updated successfully!', admin });
  } catch (error) {
    console.error('Error updating admin:', error);
    res.status(400).json({ error: error.message });
  }
};

// Delete Admin
const deleteAdmin = async (req, res) => {
  try {
    const { adminId } = req.params;

    // Find the admin by ID
    const admin = await User.findById(adminId);
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    // Delete the admin from the database
    await admin.remove();

    res.status(200).json({ message: 'Admin deleted successfully!' });
  } catch (error) {
    console.error('Error deleting admin:', error);
    res.status(400).json({ error: error.message });
  }
};

module.exports = { createAdmin, listAdmins, updateAdmin, deleteAdmin };
