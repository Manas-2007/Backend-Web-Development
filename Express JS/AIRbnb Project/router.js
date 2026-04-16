const express = require('express');
const path=require('path');
const router = express.Router();

// Home page
router.get('/', (req, res) => {
    res.sendFile(
       path.join(__dirname,'home.html')
    );
});

// Form page
router.get('/home-tour', (req, res) => {
   res.sendFile(
       path.join(__dirname,'home.html')
    );
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