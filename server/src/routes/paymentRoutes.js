const express = require('express');
const router = express.Router();
const {
  createPayment,
  getAllPayments,
  getPaymentById,
  updatePaymentStatus,
} = require('../controllers/paymentController');

const { verifyToken, verifyRole } = require('../middleware/authMiddleware');

// Define role
const ADMIN_ROLE = 'admin';

// Create payment record (Admin only)
router.post('/', [verifyToken, verifyRole([ADMIN_ROLE])], createPayment);

// Get all payments (Authenticated users)
router.get('/', verifyToken, getAllPayments);

// Get payment by ID (Authenticated users)
router.get('/:id', verifyToken, getPaymentById);

// Update payment status (Admin only)
router.put('/:id/status', [verifyToken, verifyRole([ADMIN_ROLE])], updatePaymentStatus);

module.exports = router;
