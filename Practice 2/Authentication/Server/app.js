const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');

const PORT = 3000;
const app = express();

app.use(express.json());
app.use(cors());

// Attach URL Routes
app.use('/', authRoutes);

app.listen(PORT, () => {
    console.log(`Server is Live at http://localhost:${PORT}`);
});