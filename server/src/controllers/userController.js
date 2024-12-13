const User = require('../models/User');
const responseHandler = require('../utils/responseHandler');

// Get all users (Only admin has access)
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    console.log('Success: Retrieved all users');
    responseHandler.success(res, 200, users);
  } catch (error) {
    console.log('Error: Error fetching users', error);
    responseHandler.error(res, 500, 'Error fetching users');
  }
};

// Get user by ID (Only admin or the user itself has access)
exports.getUserById = async (req, res) => {
  try {
    // If the logged-in user is not an admin, only allow them to access their own profile
    if (req.role !== 'admin' && req.userId !== req.params.id) {
      console.log('Error: Unauthorized access');
      return responseHandler.error(res, 403, 'Forbidden: Access denied');
    }

    const user = await User.findById(req.params.id);
    if (!user) {
      console.log('Error: User not found');
      return responseHandler.error(res, 404, 'User not found');
    }

    console.log('Success: Retrieved user by ID');
    responseHandler.success(res, 200, user);
  } catch (error) {
    console.log('Error: Error fetching user', error);
    responseHandler.error(res, 500, 'Error fetching user');
  }
};

// Create a new user (Only admin can create new users)
exports.createUser = async (req, res) => {
  try {
    if (req.role !== 'admin') {
      console.log('Error: Unauthorized access');
      return responseHandler.error(res, 403, 'Forbidden: Only admin can create users');
    }

    const { name, email, password, role } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('Error: User already exists');
      return responseHandler.error(res, 400, 'User already exists');
    }

    const user = new User({ name, email, password, role });
    await user.save();
    console.log('Success: User created');
    responseHandler.success(res, 201, user);
  } catch (error) {
    console.log('Error: Error creating user', error);
    responseHandler.error(res, 500, 'Error creating user');
  }
};

// Update user details (Only admin or the user itself can update their details)
exports.updateUser = async (req, res) => {
  try {
    // If the logged-in user is not an admin, only allow them to update their own profile
    if (req.role !== 'admin' && req.userId !== req.params.id) {
      console.log('Error: Unauthorized access');
      return responseHandler.error(res, 403, 'Forbidden: You can only update your own profile');
    }

    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user) {
      console.log('Error: User not found');
      return responseHandler.error(res, 404, 'User not found');
    }

    console.log('Success: User updated');
    responseHandler.success(res, 200, user);
  } catch (error) {
    console.log('Error: Error updating user', error);
    responseHandler.error(res, 500, 'Error updating user');
  }
};

// Delete a user (Only admin can delete users)
exports.deleteUser = async (req, res) => {
  try {
    if (req.role !== 'admin') {
      console.log('Error: Unauthorized access');
      return responseHandler.error(res, 403, 'Forbidden: Only admin can delete users');
    }

    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      console.log('Error: User not found');
      return responseHandler.error(res, 404, 'User not found');
    }

    console.log('Success: User deleted');
    responseHandler.success(res, 200, 'User deleted');
  } catch (error) {
    console.log('Error: Error deleting user', error);
    responseHandler.error(res, 500, 'Error deleting user');
  }
};
