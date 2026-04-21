const express = require('express');
const router = express.Router();

// temporary storage
const students = [];

// Add student
router.post('/add', (req, res) => {
    students.push({
        Name: req.body.name,
        Email: req.body.email
    });

    console.log("Student added:", students);
    res.redirect('/');
});

// Display students
router.get('/list', (req, res) => {
    res.json(students);
});

module.exports = router;