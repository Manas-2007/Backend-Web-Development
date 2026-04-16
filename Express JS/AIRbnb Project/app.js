const express = require('express');
const app = express();

const homeRoutes = require('./router');
const router = require('./router');

const port = 3004;

// middleware for form data
app.use(express.urlencoded({ extended: true }));

// router middleware
app.use('/', router);

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});