const students = require('../models/studentModel');

// Add student
exports.addStudent = (req, res) => {
    students.push({
        Name: req.body.name,
        Email: req.body.email
    });

    console.log("Student added:", students);
    res.redirect('/');
};

// Get students
exports.getStudents = (req, res) => {
    res.json(students);
};