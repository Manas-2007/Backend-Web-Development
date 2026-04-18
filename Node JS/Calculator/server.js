const http = require('http');
const requestHandler = require('./handler');

const server = http.createServer(requestHandler);

const PORT = 500;
server.listen(PORT, () => {
    console.log(`Server is Live at http://localhost:${PORT}`);
});