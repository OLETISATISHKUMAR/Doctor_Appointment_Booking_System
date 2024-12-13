const Doctor = require('../models/Doctor');
const responseHandler = require('../utils/responseHandler');

// Get all doctors
exports.getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find();
    console.log('Success: Retrieved all doctors');
    responseHandler.success(res, 200, doctors);
  } catch (error) {
    console.log('Error: Error fetching doctors', error);
    responseHandler.error(res, 500, 'Error fetching doctors');
  }
};

// Get doctor by ID
exports.getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) {
      console.log('Error: Doctor not found');
      return responseHandler.error(res, 404, 'Doctor not found');
    }
    console.log('Success: Retrieved doctor by ID');
    responseHandler.success(res, 200, doctor);
  } catch (error) {
    console.log('Error: Error fetching doctor', error);
    responseHandler.error(res, 500, 'Error fetching doctor');
  }
};

// Create a new doctor
exports.createDoctor = async (req, res) => {
  try {
    const { name, specialization, hospital, contactNumber, email, qualification } = req.body;

    // Validation for required fields
    if (!name || !specialization || !hospital || !contactNumber || !email || !qualification) {
      console.log('Error: Missing required fields');
      return responseHandler.error(res, 400, 'Missing required fields');
    }

    const newDoctor = new Doctor({ name, specialization, hospital, contactNumber, email, qualification });
    await newDoctor.save();
    console.log('Success: Doctor created');
    responseHandler.success(res, 201, newDoctor);
  } catch (error) {
    console.log('Error: Error creating doctor', error);
    responseHandler.error(res, 500, 'Error creating doctor');
  }
};

// Update a doctor
exports.updateDoctor = async (req, res) => {
  try {
    const { name, specialization, hospital, contactNumber, email, qualification } = req.body;

    // Validation for required fields
    if (!name || !specialization || !hospital || !contactNumber || !email || !qualification) {
      console.log('Error: Missing required fields');
      return responseHandler.error(res, 400, 'Missing required fields');
    }

    const doctor = await Doctor.findByIdAndUpdate(req.params.id, { name, specialization, hospital, contactNumber, email, qualification }, { new: true });
    if (!doctor) {
      console.log('Error: Doctor not found');
      return responseHandler.error(res, 404, 'Doctor not found');
    }
    console.log('Success: Doctor updated');
    responseHandler.success(res, 200, doctor);
  } catch (error) {
    console.log('Error: Error updating doctor', error);
    responseHandler.error(res, 500, 'Error updating doctor');
  }
};

// Delete a doctor
exports.deleteDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndDelete(req.params.id);
    if (!doctor) {
      console.log('Error: Doctor not found');
      return responseHandler.error(res, 404, 'Doctor not found');
    }
    console.log('Success: Doctor deleted');
    responseHandler.success(res, 200, 'Doctor deleted');
  } catch (error) {
    console.log('Error: Error deleting doctor', error);
    responseHandler.error(res, 500, 'Error deleting doctor');
  }
};
