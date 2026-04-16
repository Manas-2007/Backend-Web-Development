const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true }));

// Middleware 1
app.use((req, res, next) => {
    console.log("Middleware 1", req.url, req.method);
    next();
});

// Middleware 2
app.use((req, res, next) => {
    console.log("Middleware 2", req.url, req.method);
    next();
});

// Routes FIRST (important)
app.get('/', (req, res) => {
    console.log("Home route hit");
    res.send("<h1>This is Home page</h1>");
});

app.get('/contact-us', (req, res) => {
    console.log("Contact route hit");
    res.send(`
        <h1>Contact Page</h1>
        <form action="/contact-us" method="POST">
            <input type="text" name="username" placeholder="Username" required />
            <input type="email" name="email" placeholder="Email" required />
            <button type="submit">Submit</button>
        </form>
    `);
});

app.post('/contact-us', (req, res) => {
    const { username, email } = req.body;
    console.log(username, email);

    res.send(`<h2>Submitted ✔</h2><p>${username} - ${email}</p>`);
});

// START SERVER LAST
app.listen(3003, () => {
    console.log("http://localhost:3003");
});