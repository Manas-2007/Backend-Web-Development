const express = require('express');
const router = express.Router();

const courses = [];

router.post('/add', (req, res) => {
    courses.push({
        Course_Name: req.body.courseName,
        Duration: req.body.duration
    });

    console.log("Course added:", courses);
    res.redirect('/');
});

router.get('/list', (req, res) => {
    res.json(courses);
});

module.exports = router;