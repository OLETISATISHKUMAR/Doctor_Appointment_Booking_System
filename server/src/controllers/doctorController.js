const Doctor = require('../models/Doctor');
const logger = require('../utils/logger');
const { doctorCreateValidation, doctorUpdateValidation } = require('../validation/doctorValidation');

// Create a new doctor
exports.createDoctor = async (req, res) => {
  const { error } = doctorCreateValidation(req.body);
  if (error) return res.status(400).json({ msg: error.details[0].message });

  const { name, email, specialization, qualification, hospital, fees, availability } = req.body;
  try {
    const newDoctor = new Doctor({
      name,
      email,
      specialization,
      qualification,
      hospital,
      fees,
      availability,
    });

    await newDoctor.save();
    logger.info('Doctor created successfully');
    res.status(201).json({ msg: 'Doctor created successfully', doctor: newDoctor });
  } catch (err) {
    logger.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Get all doctors
exports.getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find().populate('hospital');
    res.status(200).json({ doctors });
  } catch (err) {
    logger.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Get a doctor by ID
exports.getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id).populate('hospital');
    if (!doctor) {
      return res.status(404).json({ msg: 'Doctor not found' });
    }
    res.status(200).json({ doctor });
  } catch (err) {
    logger.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Update doctor details
exports.updateDoctor = async (req, res) => {
  const { error } = doctorUpdateValidation(req.body);
  if (error) return res.status(400).json({ msg: error.details[0].message });

  const { name, email, specialization, qualification, hospital, fees, availability } = req.body;
  try {
    const updatedDoctor = await Doctor.findByIdAndUpdate(
      req.params.id,
      { name, email, specialization, qualification, hospital, fees, availability },
      { new: true }
    );
    if (!updatedDoctor) {
      return res.status(404).json({ msg: 'Doctor not found' });
    }
    logger.info('Doctor updated successfully');
    res.status(200).json({ msg: 'Doctor updated successfully', doctor: updatedDoctor });
  } catch (err) {
    logger.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Delete a doctor
exports.deleteDoctor = async (req, res) => {
  try {
    const deletedDoctor = await Doctor.findByIdAndDelete(req.params.id);
    if (!deletedDoctor) {
      return res.status(404).json({ msg: 'Doctor not found' });
    }
    logger.info('Doctor deleted successfully');
    res.status(200).json({ msg: 'Doctor deleted successfully' });
  } catch (err) {
    logger.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};
