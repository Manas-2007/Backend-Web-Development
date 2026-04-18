const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const path = require("path");

// 🏠 Home page (form)
router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../index.html"));
});

// 📩 Register user
router.post("/register", userController.registerUser);

module.exports = router;