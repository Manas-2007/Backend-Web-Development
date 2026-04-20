const User = require("../models/user");

// ✅ Add User
exports.addUser = async (req, res) => {
    try {
        const data = {
            ...req.body,

            // convert checkbox to boolean
            married: req.body.married === "on"
        };

        const newUser = await User.create(data);

        res.send("User Added Successfully ✅");
    } catch (err) {
        console.log(err);
        res.send("Error Adding User ❌");
    }
};


// ❌ Delete User
exports.deleteUser = async (req, res) => {
    try {
        const { email } = req.body;

        const result = await User.deleteOne({ email });

        if (result.deletedCount === 0) {
            return res.send("User Not Found ❌");
        }

        res.send("User Deleted Successfully ✅");
    } catch (err) {
        console.log(err);
        res.send("Error Deleting User ❌");
    }
};