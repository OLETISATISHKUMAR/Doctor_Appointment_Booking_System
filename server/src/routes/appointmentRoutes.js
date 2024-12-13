const express = require("express");
const router = express.Router();
const appointmentController = require("../controllers/appointmentController");
const authMiddleware = require("../middleware/authMiddleware");
const { body, validationResult } = require("express-validator"); // For validation (optional)

// Request validation for appointment creation and updates
const appointmentValidation = [
  body("doctor").notEmpty().withMessage("Doctor is required"),
  body("hospital").notEmpty().withMessage("Hospital is required"),
  body("appointmentDate")
    .isISO8601()
    .withMessage("Valid appointment date is required"),
  body("timeSlot").notEmpty().withMessage("Time slot is required"),
  body("timeSlotRange")
    .isIn(["morning", "evening"])
    .withMessage("Valid timeSlotRange is required"),
];

// Validation check middleware
const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Get all appointments (only admin can access)
router.get(
  "/",
  authMiddleware.verifyToken,
  authMiddleware.verifyRole(["admin"]), // Only admin can view all appointments
  appointmentController.getAppointments
);

// Get appointment by ID (admins, doctors, and the user who created the appointment can access)
router.get(
  "/:id",
  authMiddleware.verifyToken,
  authMiddleware.verifyRole(["admin", "doctor", "user"]), // Admin, doctor, or the user who created the appointment
  appointmentController.getAppointmentById
);

// Create a new appointment (only users can create their own appointments)
router.post(
  "/",
  authMiddleware.verifyToken,
  appointmentValidation, // Validate request body
  validateRequest, // Check validation errors
  authMiddleware.verifyRole(["user"]), // Only user can create an appointment
  appointmentController.createAppointment
);

// Update an appointment (only the user who made the appointment or an admin can update)
router.put(
  "/:id",
  authMiddleware.verifyToken,
  appointmentValidation, // Validate request body
  validateRequest, // Check validation errors
  authMiddleware.verifyRole(["user", "admin"]), // Only the user or admin can update
  appointmentController.updateAppointment
);

// Delete an appointment (only the user who made the appointment or an admin can delete)
router.delete(
  "/:id",
  authMiddleware.verifyToken,
  authMiddleware.verifyRole(["user", "admin"]), // Only the user or admin can delete
  appointmentController.deleteAppointment
);

module.exports = router;
