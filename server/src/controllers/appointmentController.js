const Appointment = require('../models/Appointment');
const Doctor = require('../models/Doctor');
const Patient = require('../models/Patient');
const Hospital = require('../models/Hospital');
const logger = require('../utils/logger');
const { appointmentValidation, statusValidation } = require('../validation/appointmentValidation');

// Create a new appointment
exports.createAppointment = async (req, res) => {
  const { error } = appointmentValidation(req.body);
  if (error) {
    return res.status(400).json({ msg: error.details[0].message });
  }

  const { patientId, doctorId, hospitalId, date, timeSlot, hospitalAddress, doctorQualification } = req.body;

  try {
    const patient = await Patient.findById(patientId);
    const doctor = await Doctor.findById(doctorId);
    const hospital = await Hospital.findById(hospitalId);

    if (!patient || !doctor || !hospital) {
      return res.status(404).json({ msg: 'Patient, Doctor, or Hospital not found' });
    }

    const newAppointment = new Appointment({
      patient: patientId,
      doctor: doctorId,
      hospital: hospitalId,
      date,
      timeSlot,
      hospitalAddress,
      doctorQualification,
    });

    await newAppointment.save();
    logger.info('Appointment created successfully');
    res.status(201).json({ msg: 'Appointment created successfully', appointment: newAppointment });
  } catch (err) {
    logger.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Get all appointments
exports.getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate('patient')
      .populate('doctor')
      .populate('hospital');
    res.status(200).json({ appointments });
  } catch (err) {
    logger.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Get appointment by ID
exports.getAppointmentById = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id)
      .populate('patient')
      .populate('doctor')
      .populate('hospital');
    if (!appointment) {
      return res.status(404).json({ msg: 'Appointment not found' });
    }
    res.status(200).json({ appointment });
  } catch (err) {
    logger.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Update appointment status
exports.updateAppointmentStatus = async (req, res) => {
  const { error } = statusValidation(req.body);
  if (error) {
    return res.status(400).json({ msg: error.details[0].message });
  }

  const { status } = req.body;
  try {
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!updatedAppointment) {
      return res.status(404).json({ msg: 'Appointment not found' });
    }
    logger.info('Appointment status updated successfully');
    res.status(200).json({ msg: 'Appointment status updated successfully', appointment: updatedAppointment });
  } catch (err) {
    logger.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Delete an appointment
exports.deleteAppointment = async (req, res) => {
  try {
    const deletedAppointment = await Appointment.findByIdAndDelete(req.params.id);
    if (!deletedAppointment) {
      return res.status(404).json({ msg: 'Appointment not found' });
    }
    logger.info('Appointment deleted successfully');
    res.status(200).json({ msg: 'Appointment deleted successfully' });
  } catch (err) {
    logger.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};
