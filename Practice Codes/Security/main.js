const express = require('express');
const path = require('path');
const session = require('express-session');

const app = express();
const PORT = 2000;

// Middleware
app.use(express.urlencoded({ extended: true }));

// Session setup
app.use(session({
    secret: "secretkey",
    resave: false,
    saveUninitialized: false
}));

// EJS setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Fake DB (for learning)
let users = [];

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});


// ================= ROUTES =================

// 🏠 HOME
app.get('/', (req, res) => {
    res.render('home');
});


// 📝 REGISTER PAGE
app.get('/register', (req, res) => {
    res.render('register');
});

// REGISTER POST
app.post('/register', (req, res) => {

    const { email, password } = req.body;

    users.push({ email, password });

    res.redirect('/login');
});


// 🔐 LOGIN PAGE
app.get('/login', (req, res) => {
    res.render('login');
});

// LOGIN POST
app.post('/login', (req, res) => {

    const { email, password } = req.body;

    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
        return res.send("Invalid credentials ❌");
    }

    // SESSION CREATE
    req.session.user = user;

    res.redirect('/dashboard');
});


// 📊 DASHBOARD (PROTECTED)
app.get('/dashboard', (req, res) => {

    if (!req.session.user) {
        return res.redirect('/login');
    }

    res.render('dashboard', { user: req.session.user });
});


// 🚪 LOGOUT
app.get('/logout', (req, res) => {

    req.session.destroy(() => {
        res.redirect('/');
    });
});