const express = require('express');
const path=require('path');
const app = express();

const router = require('./router');

const port = 3004;

app.use(express.urlencoded({ extended: true }));

app.use('/', router);

// 404 handler
app.use((req, res) => {
    res.status(404).sendFile(
        path.join(__dirname,'error.html')
    );
});
app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});