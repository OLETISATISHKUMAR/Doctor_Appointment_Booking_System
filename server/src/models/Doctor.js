const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  specialization: {
    type: String,
    required: true
  },
  hospital: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hospital',
    required: true
  },
  contactNumber: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return /^[0-9]{10}$/.test(v); // Validates a 10-digit contact number
      },
      message: 'Contact number must be a 10-digit number'
    }
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function(v) {
        return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(v); // Validates email format
      },
      message: 'Please enter a valid email address'
    }
  },
  qualification: {
    type: [String],  // An array of strings, assuming a doctor can have multiple qualifications
    required: true,
    validate: {
      validator: function(v) {
        return v.length > 0; // Ensure there is at least one qualification
      },
      message: 'Qualification is required'
    }
  }
});

module.exports = mongoose.model('Doctor', doctorSchema);
