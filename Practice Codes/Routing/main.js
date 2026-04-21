const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));

// Routes
const studentRoutes = require('./routes/studentRoutes');
const courseRoutes = require('./routes/courseRoutes');

app.use('/students', studentRoutes);
app.use('/courses', courseRoutes);

// UI
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Server
app.listen(PORT, () => {
    console.log(`Server is LIVE at http://localhost:${PORT}`);
});