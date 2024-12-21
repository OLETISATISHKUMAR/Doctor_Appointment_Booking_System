const express = require("express");
const router = express.Router();
const { addHospital, getAllHospitals, getHospitalById, updateHospital, deleteHospital } = require("../controllers/hospitalController");
const { authMiddleware } = require("../middleware/authMiddleware");
const { roleMiddleware } = require("../middleware/roleMiddleware");

// Add a new hospital (Only SuperAdmin or Admin can add hospitals)
router.post("/add", authMiddleware, roleMiddleware(["SuperAdmin", "Admin"]), addHospital);

// Get all hospitals (Accessible by all authenticated users)
router.get("/", authMiddleware, getAllHospitals);

// Get a hospital by ID
router.get("/:id", authMiddleware, getHospitalById);

// Update hospital details
router.put("/:id", authMiddleware, roleMiddleware(["SuperAdmin", "Admin"]), updateHospital);

// Delete a hospital
router.delete("/:id", authMiddleware, roleMiddleware(["SuperAdmin"]), deleteHospital);

module.exports = router;
