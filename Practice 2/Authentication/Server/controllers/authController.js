const User = require('../models/userModel');

// Handle registration business logic
exports.registerUser = (req, res) => {
    const data = req.body;
    User.save(data);
    res.json({
        message: "Data Sent",
    });
};

// Handle all data retrieval logic
exports.getUsersData = (req, res) => {
    const allUsers = User.getAll();
    res.json(allUsers);
};

// Handle login validation business logic
exports.loginUser = (req, res) => {
    const loginData = req.body;
    const userfound = User.authenticate(loginData);

    if (userfound) {
        res.json({
            success: true,
            message: "Login Successful....",
            user: userfound
        });
    } else {
        res.json({
            success: false,
            message: "User NOT Registered!....."
        });
    }
};