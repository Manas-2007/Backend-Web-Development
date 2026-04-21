const courses = require('../models/courseModel');

// Add course
exports.addCourse = (req, res) => {
    courses.push({
        Course_Name: req.body.courseName,
        Duration: req.body.duration
    });

    console.log("Course added:", courses);
    res.redirect('/');
};

// Get courses
exports.getCourses = (req, res) => {
    res.json(courses);
};