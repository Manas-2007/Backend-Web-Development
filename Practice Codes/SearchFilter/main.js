const express = require('express');
const path = require('path');
const app = express();
const PORT = 2000;
const mongoose = require('mongoose');
const dns = require('dns');

// DNS Fix
dns.setServers(['1.1.1.1', '8.8.8.8']);

// Middleware
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
mongoose.connect("mongodb+srv://manas:manas@clusterdb.5dbbok0.mongodb.net/FilterTest?appName=ClusterDB")
.then(() => {
    console.log("DBMS successfully connected");

    app.listen(PORT, () => {
        console.log(`Server is Live at http://localhost:${PORT}`);
    });
})
.catch((err) => {
    console.log("Server Connection Failed", err);
});

// Home Route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// Schema
const userSchema = new mongoose.Schema({
    ClientID: {
        type: Number,
        unique: true
    },
    Username: String,
    Password: String,
    DOB: String,
    Gender: String
});

// Model
const list = mongoose.model('list', userSchema);

// Register Route
app.post('/register', async (req, res) => {
    try {
        const data = new list({
            ClientID: req.body.clientId,
            Username: req.body.username,
            Password: req.body.password,
            DOB: req.body.dob,
            Gender: req.body.gender
        });

        await data.save();

        console.log("DATA SUBMITTED SUCCESSFULLY......");

        res.send("<center><h2>Your Response has been Recorded ✅</h2></center>");

    } catch (err) {
        console.log(err);

        if (err.code === 11000) {
            res.send("<center><h2>Client ID already exists ❌</h2></center>");
        } else {
            res.send("<center><h2>Error! Your data NOT Submitted...</h2></center>");
        }
    }
});

// 🔍 Search Route (Username based)
app.get('/search', async (req, res) => {
    try {
        const name = req.query.name;

        const result = await list.find({
            Username: { $regex: name, $options: "i" }
        });

        if (result.length === 0) {
            return res.send("<center><h2>No user found ❌</h2></center>");
        }

        res.json(result);

    } catch (err) {
        console.log(err);
        res.send("Error in searching");
    }
});