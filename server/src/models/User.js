const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['admin', 'doctor', 'hospital', 'user'], // Define the roles here
    default: 'user' // Default role is 'user'
  }
});

module.exports = mongoose.model('User', userSchema);
