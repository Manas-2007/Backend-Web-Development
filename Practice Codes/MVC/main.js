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

// Stats route (simple here OR can move later to controller)
const studentModel = require('./models/studentModel');
const courseModel = require('./models/courseModel');

app.get('/stats', (req, res) => {
    res.send(`
        <center>
            <h2>Total Students: ${studentModel.length}</h2>
            <h2>Total Courses: ${courseModel.length}</h2>
        </center>
    `);
});

// Server
app.listen(PORT, () => {
    console.log(`Server is LIVE at http://localhost:${PORT}`);
});