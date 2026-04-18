const express = require("express");
const app = express();
const PORT = 3002;

const userRoutes = require("./routes/userRoutes");

// Middleware
app.use(express.urlencoded({ extended: true }));

// Use routes
app.use("/", userRoutes);

app.listen(PORT, () => {
    console.log(`Server Live at http://localhost:${PORT}`);
});