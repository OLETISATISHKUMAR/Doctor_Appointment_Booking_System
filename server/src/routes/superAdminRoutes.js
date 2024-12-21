const express = require('express');
const { superAdminLogin } = require('../controllers/superAdminController');
const router = express.Router();

// Route for Super Admin login
router.post('/login', superAdminLogin);

module.exports = router;
