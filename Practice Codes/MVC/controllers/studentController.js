const students = require('../models/studentModel');

// Add student
exports.addStudent = (req, res) => {
    students.push({
        Name: req.body.name,
        Email: req.body.email,
        Age: req.body.age
    });

    console.log("Student Added:", students);
    res.redirect('/');
};

// Get students
exports.getStudents = (req, res) => {
    res.json(students);
};