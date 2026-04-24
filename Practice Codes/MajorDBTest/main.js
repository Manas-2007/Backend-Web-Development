const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const dns = require('dns');
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
const app = express();
const PORT = 2000;

// DNS setup
dns.setServers(['1.1.1.1', '8.8.8.8']);

// Middleware
app.use(express.urlencoded({ extended: true }));

// Session setup
app.use(session({
    secret: "secretkey",
    resave: false,
    saveUninitialized: false
}));

// MongoDB connection
mongoose.connect("mongodb+srv://manas:manas@clusterdb.5dbbok0.mongodb.net/BcryptData?appName=ClusterDB")
.then(() => console.log("DBMS successfully connected"))
.catch(err => console.log("Server Connection Failed", err));

// Schema
const userSchema = new mongoose.Schema({
    ClientID: { type: Number, unique: true },
    Username: String,
    Password: String,
    DOB: String,
    Gender: String
});

const User = mongoose.model('User', userSchema);

// Server start
app.listen(PORT, () => {
    console.log(`Server is Live at http://localhost:${PORT}`);
});

// ================= ROUTES =================

// HOME
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});


// ================= REGISTER =================
app.post('/register',
    [
        body('clientId').isNumeric().withMessage("Client ID must be number"),
        body('username').notEmpty().withMessage("Username required"),
        body('password').isLength({ min: 5 }).withMessage("Password min 5 chars")
    ],
    async (req, res) => {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            // hash password
            const hashedPassword = await bcrypt.hash(req.body.password, 10);

            const newUser = new User({
                ClientID: req.body.clientId,
                Username: req.body.username,
                Password: hashedPassword,
                DOB: req.body.dob,
                Gender: req.body.gender
            });

            await newUser.save();

            console.log("User Registered Successfully 🔐");

            res.send("<h2>Registration Successful ✅</h2>");

        } catch (err) {
            console.log(err);
            res.send("Error in Registration ❌");
        }
    }
);


// ================= LOGIN =================
app.post('/login', async (req, res) => {

    const user = await User.findOne({ Username: req.body.username });

    if (!user) {
        return res.send("User not found ❌");
    }

    const match = await bcrypt.compare(req.body.password, user.Password);

    if (!match) {
        return res.send("Wrong password ❌");
    }

    // session create
    req.session.user = user;

    res.send("Login Successful ✅ Session Created");
});


// ================= DASHBOARD (PROTECTED) =================
app.get('/dashboard', (req, res) => {

    if (!req.session.user) {
        return res.redirect('/');
    }

    res.send(`<h2>Welcome ${req.session.user.Username} 👋</h2>`);
});


// ================= SEARCH =================
app.get('/search', async (req, res) => {

    const name = req.query.name;

    const result = await User.find({
        Username: { $regex: name, $options: "i" }
    });

    res.json(result);
});


// ================= LOGOUT =================
app.get('/logout', (req, res) => {

    req.session.destroy(() => {
        res.send("Logged out 🚪");
    });
});