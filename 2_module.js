const http=require('http');
const exportfunction = require('./2.TakingUserInput');

const server=http.createServer(exportfunction);

//Server PORT
const PORT=420;
server.listen(PORT,()=>{
    console.log(`Server is Live at http://localhost:${PORT}`);
})