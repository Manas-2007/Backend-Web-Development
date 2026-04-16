const express = require('express');
const router = express.Router();

// Home page
router.get('/', (req, res) => {
    res.send(`
        <h1>Welcome to AIRbnb Project</h1>
        <a href="/home-tour">Add Home</a>
    `);
});

// Form page
router.get('/home-tour', (req, res) => {
    res.send(`
        <h1>Fill Property Form</h1>

        <form action="/home-tour" method="POST">
            <input type="text" name="houseName" placeholder="House Name" />
            <br><br>
            <input type="text" name="location" placeholder="Location" />
            <br><br>
            <button type="submit">Submit</button>
        </form>
    `);
});

// Form submit
router.post('/home-tour', (req, res) => {
    console.log(req.body);

    res.send(`
        <h1>Property Added Successfully ✅</h1>
        <p>House: ${req.body.houseName}</p>
        <p>Location: ${req.body.location}</p>
    `);
});

module.exports = router;