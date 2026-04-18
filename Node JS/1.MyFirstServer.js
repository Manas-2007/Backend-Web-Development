const http=require('http');
const server=http.createServer((req,res)=>{
    console.log(req.url,req.method);

    //Webpage interaction
    res.setHeader('Content-Type','text/html');
    res.write(`
        <html>
        <head><title>My First Server</title></head>
        <body><h2>Welcome to My First Node Server.....!</h2></body>
        </html>     
        `)
        return res.end();
})

//Request from the server
const port=2000;
server.listen(port,()=>{
    console.log(`http://localhost:${port}`);
})
