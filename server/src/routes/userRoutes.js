const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const userController = require("../controllers/userController");

// Admin can manage users, regular users can only view their own profiles
router.get(
  "/",
  authMiddleware.verifyToken,
  authMiddleware.verifyRole(["admin"]),
  userController.getUsers
);
router.get(
  "/:id",
  authMiddleware.verifyToken,
  authMiddleware.verifyRole(["admin", "user"]),
  userController.getUserById
);
router.post(
  "/",
  authMiddleware.verifyToken,
  authMiddleware.verifyRole(["admin"]),
  userController.createUser
);
router.put(
  "/:id",
  authMiddleware.verifyToken,
  authMiddleware.verifyRole(["admin", "user"]),
  userController.updateUser
);
router.delete(
  "/:id",
  authMiddleware.verifyToken,
  authMiddleware.verifyRole(["admin"]),
  userController.deleteUser
);

module.exports = router;
