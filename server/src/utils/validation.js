const { body } = require('express-validator');

// Function for validating user input (example: user registration)
exports.validateUserInput = [
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('name').notEmpty().withMessage('Name is required'),
];

// Function for validating appointment input
exports.validateAppointmentInput = [
  body('doctor').isMongoId().withMessage('Doctor ID is required and must be valid'),
  body('patient').isMongoId().withMessage('Patient ID is required and must be valid'),
  body('date').isISO8601().withMessage('Please provide a valid date'),
  body('timeSlot').notEmpty().withMessage('Time slot is required'),
];
