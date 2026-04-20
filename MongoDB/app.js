const express = require("express");
const app = express();

const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve frontend
app.use(express.static("public"));

// Routes
app.use("/", userRoutes);

// 🚀 Start server (BEST METHOD)
const startServer = async () => {
    try {
        console.log("Connecting to DB...");
        await connectDB();

        app.listen(3000, () => {
            console.log("Server running at http://localhost:3000 🚀");
        });

    } catch (err) {
        console.log("Server failed ❌", err.message);
    }
};

startServer();