const express = require("express");
const { register, login } = require("../controllers/authController");
const router = express.Router();

// Validator middleware (using express-validator for request validation)
const { check, validationResult } = require("express-validator");

// Registration Route with validation checks
router.post(
  "/register",
  [
    check("name", "Name is required").notEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password must be at least 6 characters").isLength({ min: 6 }),
  ],
  async (req, res, next) => {
    // Validate the request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Call register controller if validation passes
    return await register(req, res);
  }
);

// Login Route with validation checks
router.post(
  "/login",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").notEmpty(),
  ],
  async (req, res, next) => {
    // Validate the request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Call login controller if validation passes
    return await login(req, res);
  }
);

module.exports = router;
