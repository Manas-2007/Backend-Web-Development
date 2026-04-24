const express = require('express');
const path = require('path');
const session = require('express-session');
const { body, validationResult } = require('express-validator');
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

// Fake DB
let users = [];

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


// REGISTER POST (✔ WITH VALIDATION)
app.post('/register',
    [
        body('email').isEmail().withMessage('Invalid Email'),
        body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters')
    ],
    (req, res) => {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }

        const { email, password } = req.body;

        users.push({ email, password });

        res.redirect('/login');
    }
);


// 🔐 LOGIN PAGE
app.get('/login', (req, res) => {
    res.render('login');
});


// LOGIN POST (✔ WITH VALIDATION)
app.post('/login',
    [
        body('email').isEmail().withMessage('Invalid Email'),
        body('password').notEmpty().withMessage('Password required')
    ],
    (req, res) => {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }

        const { email, password } = req.body;

        const user = users.find(u => u.email === email && u.password === password);

        if (!user) {
            return res.send("Invalid credentials ❌");
        }

        // SESSION CREATE
        req.session.user = user;

        res.redirect('/dashboard');
    }
);


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