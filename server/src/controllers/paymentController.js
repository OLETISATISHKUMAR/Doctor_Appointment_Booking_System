const Payment = require('../models/Payment');
const Appointment = require('../models/Appointment');
const logger = require('../utils/logger');
const { paymentValidation, statusValidation } = require('../validation/paymentValidation');

// Create payment record
exports.createPayment = async (req, res) => {
  const { error } = paymentValidation(req.body);
  if (error) {
    return res.status(400).json({ msg: error.details[0].message });
  }

  const { appointmentId, amount, status, paymentMethod } = req.body;

  try {
    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) {
      return res.status(404).json({ msg: 'Appointment not found' });
    }

    const newPayment = new Payment({
      appointment: appointmentId,
      amount,
      status,
      paymentMethod,
    });

    await newPayment.save();

    appointment.paymentStatus = status;
    await appointment.save();

    logger.info('Payment processed successfully');
    res.status(201).json({ msg: 'Payment processed successfully', payment: newPayment });
  } catch (err) {
    logger.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Get all payments
exports.getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find().populate('appointment');
    res.status(200).json({ payments });
  } catch (err) {
    logger.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Get payment by ID
exports.getPaymentById = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id).populate('appointment');
    if (!payment) {
      return res.status(404).json({ msg: 'Payment not found' });
    }
    res.status(200).json({ payment });
  } catch (err) {
    logger.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Update payment status
exports.updatePaymentStatus = async (req, res) => {
  const { error } = statusValidation(req.body);
  if (error) {
    return res.status(400).json({ msg: error.details[0].message });
  }

  const { status } = req.body;

  try {
    const updatedPayment = await Payment.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updatedPayment) {
      return res.status(404).json({ msg: 'Payment not found' });
    }

    logger.info('Payment status updated successfully');
    res.status(200).json({ msg: 'Payment status updated successfully', payment: updatedPayment });
  } catch (err) {
    logger.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};
