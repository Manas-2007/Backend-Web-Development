//Using router
const http = require('http');
const server=http.createServer((req,res)=>{
    console.log(req.headers,req.url);

    //Routing Response
    if(req.url==='/')
    {
        res.setHeader("Content-Type","text/html");
        res.write('<html>');
        res.write('<head><title>Server Designing</title></head>')
        res.write('<body><h1>Welcome to Home Page....</h1></body>')
        res.write('</html>');
        return res.end();
    }
    else if(req.url==='/products')
    {
        res.setHeader("Content-Type","text/html");
        res.write('<html>');
        res.write('<head><title>Server Designing</title></head>')
        res.write('<body><h1>Product Cart is Empty! Try again later..........</h1></body>')
        res.write('</html>');
        return res.end();   
    }
    else
    {
        res.setHeader("Content-Type","text/html");
        res.write('<html>');
        res.write('<head><title>Server Designing</title></head>')
        res.write('<body><h1>This is the End of the Webpage...</h1></body>')
        res.write('</html>');
        return res.end();
    }
});

const PORT=1000;
server.listen(PORT,()=>{
    console.log(`http://localhost:${PORT}`);
});