const courses = require('../models/courseModel');

// Add course
exports.addCourse = (req, res) => {
    courses.push({
        Course: req.body.courseName,
        Duration: req.body.duration
    });

    console.log("Course Added:", courses);
    res.redirect('/');
};

// Get courses
exports.getCourses = (req, res) => {
    res.json(courses);
};