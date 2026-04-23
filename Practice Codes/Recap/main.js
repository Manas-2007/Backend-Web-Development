const express = require('express');
const app = express();
const PORT = 3000;
const path = require('path');

const postRoutes = require('./routes/postRoutes');

app.use(express.urlencoded({ extended: true }));

// UI
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Routes
app.use('/', postRoutes);

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});