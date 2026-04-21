const express = require('express');
const router = express.Router();

const studentController = require('../controllers/studentController');

// Add student
router.post('/add', studentController.addStudent);

// List students
router.get('/list', studentController.getStudents);

module.exports = router;