const http=require('http');
const server=http.createServer((req,res)=>{
    console.log(req.url,req.method);
    res.write("<h1>Hello World<?h1>")
    res.end();
});

const PORT=3001;
server.listen(PORT,()=>{
    console.log(`http://localhost:${PORT}`);
})