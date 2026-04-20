const express = require("express");
const router = express.Router();

// Import controller functions
const {
    addUser,
    deleteUser
} = require("../controllers/userController");

// ✅ Add User (from form)
router.post("/add-user", addUser);

// ✅ Delete User
router.post("/delete-user", deleteUser);

module.exports = router;