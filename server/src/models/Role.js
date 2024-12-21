const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  permissions: { type: [String], default: [] }, // Optional for role-based permissions
});

module.exports = mongoose.model('Role', roleSchema);
