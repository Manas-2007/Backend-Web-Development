const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));

// Routes
const postRoutes = require('./routes/postRoutes');
app.use('/', postRoutes);

// UI
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});