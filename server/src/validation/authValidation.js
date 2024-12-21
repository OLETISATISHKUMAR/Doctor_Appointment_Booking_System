const { check } = require("express-validator");

// Register validation schema
const registerValidation = [
  check("name")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters long."),
  check("email")
    .isEmail()
    .withMessage("Please provide a valid email address."),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long."),
  check("role")
    .isIn(["user", "admin", "doctor"])
    .withMessage("Role must be one of the following: user, admin, doctor"),
];

// Login validation schema
const loginValidation = [
  check("email")
    .isEmail()
    .withMessage("Please provide a valid email address."),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long."),
];

module.exports = { registerValidation, loginValidation };
