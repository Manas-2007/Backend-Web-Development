const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Map endpoints to their respective controller methods
router.post('/mydata', authController.registerUser);
router.get('/mydata', authController.getUsersData);
router.post('/login', authController.loginUser);

module.exports = router;