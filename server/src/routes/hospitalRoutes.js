const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const hospitalController = require("../controllers/hospitalController");

// Only 'admin' and 'hospital' roles can access these routes
router.get(
  "/",
  authMiddleware.verifyToken,
  authMiddleware.verifyRole(["admin", "hospital"]),
  hospitalController.getHospitals
);
router.get(
  "/:id",
  authMiddleware.verifyToken,
  authMiddleware.verifyRole(["admin", "hospital"]),
  hospitalController.getHospitalById
);
router.post(
  "/",
  authMiddleware.verifyToken,
  authMiddleware.verifyRole(["admin"]),
  hospitalController.createHospital
); // Only 'admin' can create
router.put(
  "/:id",
  authMiddleware.verifyToken,
  authMiddleware.verifyRole(["admin", "hospital"]),
  hospitalController.updateHospital
);
router.delete(
  "/:id",
  authMiddleware.verifyToken,
  authMiddleware.verifyRole(["admin"]),
  hospitalController.deleteHospital
); // Only 'admin' can delete

router.get(
  '/admin-dashboard',
  authMiddleware.verifyToken,    // Verify token first
  authMiddleware.verifyRole('admin'), // Then verify role
  (req, res) => {
    res.send('Welcome to the admin dashboard!');
  }
);


module.exports = router;
