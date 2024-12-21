const express = require('express');
const router = express.Router();
const {
  createDoctor,
  getAllDoctors,
  getDoctorById,
  updateDoctor,
  deleteDoctor,
} = require('../controllers/doctorController');
const { verifyToken, verifyRole } = require('../middleware/authMiddleware');

// Define allowed roles
const ADMIN_ROLE = "admin";

// Create a new doctor (Admin only)
router.post(
  '/',
  [verifyToken, verifyRole([ADMIN_ROLE])], // Authenticated + Admin role required
  createDoctor
);

// Get all doctors (Authenticated users)
router.get('/', verifyToken, getAllDoctors);

// Get doctor by ID (Authenticated users)
router.get('/:id', verifyToken, getDoctorById);

// Update doctor details (Admin only)
router.put(
  '/:id',
  [verifyToken, verifyRole([ADMIN_ROLE])], // Authenticated + Admin role required
  updateDoctor
);

// Delete a doctor (Admin only)
router.delete(
  '/:id',
  [verifyToken, verifyRole([ADMIN_ROLE])], // Authenticated + Admin role required
  deleteDoctor
);

module.exports = router;
