const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');

// Route für die Registrierung
router.post('/register', register);

// Route für das Login
router.post('/login', login);

module.exports = router;
