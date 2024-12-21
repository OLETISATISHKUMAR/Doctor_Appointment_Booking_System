const Hospital = require("../models/Hospital");

// Add a new hospital
const addHospital = async (req, res) => {
  const { name, address, contactDetails, password, consultationFees, policies, openingHours } = req.body;
  try {
    const hospital = new Hospital({ name, address, contactDetails, password, consultationFees, policies, openingHours });
    await hospital.save();
    res.status(201).json({ message: "Hospital added successfully", hospital });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding hospital", error });
  }
};

// Get all hospitals
const getAllHospitals = async (req, res) => {
  try {
    const hospitals = await Hospital.find().populate("doctors branches");
    res.status(200).json(hospitals);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching hospitals", error });
  }
};

// Get a hospital by ID
const getHospitalById = async (req, res) => {
  try {
    const hospital = await Hospital.findById(req.params.id).populate("doctors branches");
    if (!hospital) return res.status(404).json({ message: "Hospital not found" });
    res.status(200).json(hospital);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching hospital", error });
  }
};

// Update hospital details
const updateHospital = async (req, res) => {
  try {
    const hospital = await Hospital.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!hospital) return res.status(404).json({ message: "Hospital not found" });
    res.status(200).json({ message: "Hospital updated successfully", hospital });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating hospital", error });
  }
};

// Delete a hospital
const deleteHospital = async (req, res) => {
  try {
    const hospital = await Hospital.findById(req.params.id);
    if (!hospital) return res.status(404).json({ message: "Hospital not found" });

    await hospital.remove();
    res.status(200).json({ message: "Hospital deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting hospital", error });
  }
};

module.exports = { addHospital, getAllHospitals, getHospitalById, updateHospital, deleteHospital };
