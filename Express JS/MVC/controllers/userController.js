const { User, users } = require("../modals/userModal");

exports.registerUser = (req, res) => {
    const { name, email, age } = req.body;

    if (age < 18) {
        return res.send("Not Allowed");
    }

    // create new user using class
    const newUser = new User(name, email, age);

    // store in array (acts like DB)
    users.push(newUser);

    res.send({
        message: "User registered successfully",
        data: newUser,
        allUsers: users
    });
};