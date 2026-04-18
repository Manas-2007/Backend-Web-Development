const express = require("express");
const app = express();
const PORT = 3002;

const userRoutes = require("./routes/userRoutes");

app.use(express.urlencoded({ extended: true }));

app.use("/", userRoutes);

//Started server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});