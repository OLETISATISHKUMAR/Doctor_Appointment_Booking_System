const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorController');
const authMiddleware = require('../middleware/authMiddleware');
const { body, validationResult } = require('express-validator'); // For validation (optional)

// Request validation for doctor creation and updates
const doctorValidation = [
  body('name').notEmpty().withMessage('Doctor name is required'),
  body('specialization').notEmpty().withMessage('Specialization is required'),
  body('hospital').notEmpty().withMessage('Hospital is required'),
  body('contactNumber').notEmpty().withMessage('Contact number is required').isNumeric().withMessage('Contact number must be a valid number'),
  body('email').isEmail().withMessage('A valid email is required')
];

// Validation check middleware
const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Get all doctors (only admin can access)
router.get('/', 
  authMiddleware.verifyToken, 
  authMiddleware.verifyRole(['admin']),  // Only admin can view all doctors
  doctorController.getDoctors
);

// Get doctor by ID (admin, doctor, and the user who created the doctor can access)
router.get('/:id', 
  authMiddleware.verifyToken, 
  authMiddleware.verifyRole(['admin', 'doctor', 'user']), // Admin, doctor, or the user who created the doctor
  doctorController.getDoctorById
);

// Create a new doctor (only admin can create doctors)
router.post(
  '/', 
  authMiddleware.verifyToken, 
  doctorValidation,  // Validate request body
  validateRequest,  // Check validation errors
  authMiddleware.verifyRole(['admin']),  // Only admin can create a new doctor
  doctorController.createDoctor
);

// Update a doctor (only admin can update doctor details)
router.put(
  '/:id', 
  authMiddleware.verifyToken, 
  doctorValidation,  // Validate request body
  validateRequest,  // Check validation errors
  authMiddleware.verifyRole(['admin']),  // Only admin can update doctor details
  doctorController.updateDoctor
);

// Delete a doctor (only admin can delete doctors)
router.delete('/:id', 
  authMiddleware.verifyToken, 
  authMiddleware.verifyRole(['admin']),  // Only admin can delete doctors
  doctorController.deleteDoctor
);





module.exports = router;
