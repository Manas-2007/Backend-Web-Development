const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const dns=require('dns');
const app = express();
const PORT = 3000;
//Changing DNS

dns.setServers(["1.1.1.1","8.8.8.8"]);      


/* ---------------- Middleware ---------------- */
app.use(express.urlencoded({ extended: true }));

/* ---------------- MongoDB Connection ---------------- */
mongoose.connect('mongodb+srv://manas:manas@clusterdb.5dbbok0.mongodb.net/ProjectDB?retryWrites=true&w=majority')      
.then(() => console.log('MongoDB Connected Successfully'))
.catch(err => console.log('MongoDB Error:', err));

/* ---------------- Schema + Model ---------------- */
const userSchema = new mongoose.Schema({
    name: String,
    email: String
});

const User = mongoose.model('User', userSchema);

/* ---------------- Routes ---------------- */

// Home Page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Save Data to MongoDB
app.post('/submit', async (req, res) => {
    try {
        const newUser = new User({
            name: req.body.name,
            email: req.body.email
        });

        await newUser.save();

        console.log("Data Saved:", newUser);
        res.redirect('/');
    } catch (error) {
        console.log("Error saving data:", error);
        res.status(500).send("Something went wrong");
    }
});

/* ---------------- Server Start ---------------- */
app.listen(PORT, () => {
    console.log(`Server Live at http://localhost:${PORT}`);
});


function add(a,b)
{
    return a+b;
}
