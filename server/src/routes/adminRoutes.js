const express = require("express");
const router = express.Router();
const {
  createAdmin,
  listAdmins,
  updateAdmin,
  deleteAdmin,
} = require("../controllers/adminController");
const { authMiddleware } = require("../middleware/authMiddleware");
const { roleMiddleware } = require("../middleware/roleMiddleware");

// Route to create an admin (only accessible by SuperAdmin)
router.post("/create", authMiddleware, roleMiddleware(["SuperAdmin"]), createAdmin);

// Route to list all admins (only accessible by SuperAdmin)
router.get("/", authMiddleware, roleMiddleware(["SuperAdmin"]), listAdmins);

// Route to update admin details (only accessible by SuperAdmin)
router.put("/:adminId", authMiddleware, roleMiddleware(["SuperAdmin"]), updateAdmin);

// Route to delete an admin (only accessible by SuperAdmin)
router.delete("/:adminId", authMiddleware, roleMiddleware(["SuperAdmin"]), deleteAdmin);

module.exports = router;
