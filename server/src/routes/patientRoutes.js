const express = require('express');
const router = express.Router();
const {
  createPatient,
  getAllPatients,
  getPatientById,
  updatePatient,
  deletePatient,
} = require('../controllers/patientController');

const { verifyToken, verifyRole } = require('../middleware/authMiddleware');

// Define role
const ADMIN_ROLE = 'admin';

// Create a new patient (Authenticated)
router.post('/', verifyToken, createPatient);

// Get all patients (Authenticated)
router.get('/', verifyToken, getAllPatients);

// Get patient by ID (Authenticated)
router.get('/:id', verifyToken, getPatientById);

// Update patient details (Admin only)
router.put('/:id', [verifyToken, verifyRole([ADMIN_ROLE])], updatePatient);

// Delete a patient (Admin only)
router.delete('/:id', [verifyToken, verifyRole([ADMIN_ROLE])], deletePatient);

module.exports = router;
