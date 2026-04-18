const express=require('express');
const router=express.Router();
const userController = require("../controllers/userController");
const path = require("path");

router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../index.html"));
});
//Register Route
router.post("/register",userController.registerUser);

module.exports=router;