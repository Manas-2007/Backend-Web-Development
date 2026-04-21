const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));

// Routes import
const studentRoutes = require('./routes/studentRoutes');
const courseRoutes = require('./routes/courseRoute');

// Mount routes
app.use('/students', studentRoutes);
app.use('/courses', courseRoutes);

// UI route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Server start
app.listen(PORT, () => {
    console.log(`Server is LIVE at http://localhost:${PORT}`);
});