const express = require('express');
const router = express.Router();

const courseController = require('../controllers/courseController');

// Add course
router.post('/add', courseController.addCourse);

// List courses
router.get('/list', courseController.getCourses);

module.exports = router;