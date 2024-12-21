const Patient = require('../models/Patient');
const logger = require('../utils/logger');
const { patientValidation } = require('../validation/patientValidation');

// Create a new patient
exports.createPatient = async (req, res) => {
  const { error } = patientValidation(req.body);
  if (error) {
    return res.status(400).json({ msg: error.details[0].message });
  }

  const { name, email, age, address, contactNumber } = req.body;
  try {
    const newPatient = new Patient({
      name,
      email,
      age,
      address,
      contactNumber,
    });

    await newPatient.save();
    logger.info('Patient created successfully');
    res.status(201).json({ msg: 'Patient created successfully', patient: newPatient });
  } catch (err) {
    logger.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Get all patients
exports.getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.find();
    res.status(200).json({ patients });
  } catch (err) {
    logger.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Get a patient by ID
exports.getPatientById = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) {
      return res.status(404).json({ msg: 'Patient not found' });
    }
    res.status(200).json({ patient });
  } catch (err) {
    logger.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Update patient details
exports.updatePatient = async (req, res) => {
  const { error } = patientValidation(req.body);
  if (error) {
    return res.status(400).json({ msg: error.details[0].message });
  }

  const { name, email, age, address, contactNumber } = req.body;
  try {
    const updatedPatient = await Patient.findByIdAndUpdate(
      req.params.id,
      { name, email, age, address, contactNumber },
      { new: true }
    );
    if (!updatedPatient) {
      return res.status(404).json({ msg: 'Patient not found' });
    }
    logger.info('Patient updated successfully');
    res.status(200).json({ msg: 'Patient updated successfully', patient: updatedPatient });
  } catch (err) {
    logger.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Delete a patient
exports.deletePatient = async (req, res) => {
  try {
    const deletedPatient = await Patient.findByIdAndDelete(req.params.id);
    if (!deletedPatient) {
      return res.status(404).json({ msg: 'Patient not found' });
    }
    logger.info('Patient deleted successfully');
    res.status(200).json({ msg: 'Patient deleted successfully' });
  } catch (err) {
    logger.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};
