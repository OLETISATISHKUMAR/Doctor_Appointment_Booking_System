const Hospital = require('../models/Hospital');
const responseHandler = require('../utils/responseHandler');

// Get all hospitals
exports.getHospitals = async (req, res) => {
  try {
    const hospitals = await Hospital.find();
    console.log('Success: Retrieved all hospitals');
    responseHandler.success(res, 200, hospitals);
  } catch (error) {
    console.log('Error: Error fetching hospitals', error);
    responseHandler.error(res, 500, 'Error fetching hospitals');
  }
};

// Get hospital by ID
exports.getHospitalById = async (req, res) => {
  try {
    const hospital = await Hospital.findById(req.params.id);
    if (!hospital) {
      console.log('Error: Hospital not found');
      return responseHandler.error(res, 404, 'Hospital not found');
    }
    console.log('Success: Retrieved hospital by ID');
    responseHandler.success(res, 200, hospital);
  } catch (error) {
    console.log('Error: Error fetching hospital', error);
    responseHandler.error(res, 500, 'Error fetching hospital');
  }
};

// Create a new hospital
exports.createHospital = async (req, res) => {
  try {
    const { name, address, contactNumber, email } = req.body;
    const newHospital = new Hospital({ name, address, contactNumber, email });
    await newHospital.save();
    console.log('Success: Hospital created');
    responseHandler.success(res, 201, newHospital);
  } catch (error) {
    console.log('Error: Error creating hospital', error);
    responseHandler.error(res, 500, 'Error creating hospital');
  }
};

// Update a hospital
exports.updateHospital = async (req, res) => {
  try {
    const hospital = await Hospital.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!hospital) {
      console.log('Error: Hospital not found');
      return responseHandler.error(res, 404, 'Hospital not found');
    }
    console.log('Success: Hospital updated');
    responseHandler.success(res, 200, hospital);
  } catch (error) {
    console.log('Error: Error updating hospital', error);
    responseHandler.error(res, 500, 'Error updating hospital');
  }
};

// Delete a hospital
exports.deleteHospital = async (req, res) => {
  try {
    const hospital = await Hospital.findByIdAndDelete(req.params.id);
    if (!hospital) {
      console.log('Error: Hospital not found');
      return responseHandler.error(res, 404, 'Hospital not found');
    }
    console.log('Success: Hospital deleted');
    responseHandler.success(res, 200, 'Hospital deleted');
  } catch (error) {
    console.log('Error: Error deleting hospital', error);
    responseHandler.error(res, 500, 'Error deleting hospital');
  }
};
