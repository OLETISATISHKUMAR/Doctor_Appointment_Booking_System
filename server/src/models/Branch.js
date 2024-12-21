// src/models/Branch.js
const mongoose = require('mongoose');

const BranchSchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    hospital: { type: mongoose.Schema.Types.ObjectId, ref: 'Hospital', required: true },
    admins: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Admins managing this branch
}, { timestamps: true });

module.exports = mongoose.model('Branch', BranchSchema);
