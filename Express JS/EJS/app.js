const express = require('express');
const app = express();

const port = 3005;

// EJS setup
app.set('view engine', 'ejs');

// Test route
app.get('/', (req, res) => {
    res.render('home', { name: "Pari Sugandhi" });
});

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});