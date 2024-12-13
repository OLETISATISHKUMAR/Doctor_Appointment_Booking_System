const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { body, validationResult } = require('express-validator'); // For validation

// Request validation for signup and login
const signupValidation = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('A valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
];

const loginValidation = [
  body('email').isEmail().withMessage('A valid email is required'),
  body('password').notEmpty().withMessage('Password is required')
];

// Validation check middleware
const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// User signup route
router.post(
  '/signup',
  signupValidation, // Validate signup fields
  validateRequest,   // Check validation errors
  authController.signup
);

// User login route
router.post(
  '/login',
  loginValidation, // Validate login fields
  validateRequest, // Check validation errors
  authController.login
);




module.exports = router;
