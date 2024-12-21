const express = require('express');
const router = express.Router();
const {
  createAppointment,
  getAllAppointments,
  getAppointmentById,
  updateAppointmentStatus,
  deleteAppointment,
} = require('../controllers/appointmentController');

const { verifyToken, verifyRole } = require('../middleware/authMiddleware');

// Define role
const ADMIN_ROLE = 'admin';

// Create a new appointment (Admin only)
router.post('/', [verifyToken, verifyRole([ADMIN_ROLE])], createAppointment);

// Get all appointments (Authenticated users)
router.get('/', verifyToken, getAllAppointments);

// Get an appointment by ID (Authenticated users)
router.get('/:id', verifyToken, getAppointmentById);

// Update appointment status (Admin only)
router.put('/:id/status', [verifyToken, verifyRole([ADMIN_ROLE])], updateAppointmentStatus);

// Delete an appointment (Admin only)
router.delete('/:id', [verifyToken, verifyRole([ADMIN_ROLE])], deleteAppointment);

module.exports = router;
