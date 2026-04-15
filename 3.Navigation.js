const http=require('http');
const server=http.createServer((req,res)=>{
    console.log(req.url,req.method);

    //Working with Navigation via Routing Feature of Node
    res.setHeader('Content-Type','text/html');
    res.write(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <nav style="display: flex; justify-content: space-evenly; text-decoration: none; color: green; font-size: larger;">
        <a href="/">HOME</a>
        <a href="/my-cart">MY CART</a>
        <a href="/library">LIBRARY</a>
        <a href="/tools">TOOLS</a>
        <a href="/features">FEATURES</a>
    </nav>
    
</body>
</html>`)



    if(req.url==='/')
    {
        res.write('<h1>This is Home page</h2>');
        return res.end();
    }
    else if(req.url==='/library')
    {
        res.write('<h1>This is Library section</h2>');
        return res.end();
    }
    else if(req.url==='/tools')
    {
        res.write('<h1>This is Tools section</h2>');
        return res.end();
    }
    else if(req.url==='/features')
    {
        res.write('<h1>This is Features section</h2>');
        return res.end();
    }
    else if(req.url==='/my-cart')
    {
        res.write('<h1>This is My cart section</h2>');
        return res.end();
    }
    else 
    {
        res.write(`<h1>Response Terminated! No Tab Available......</h2>`);
        return res.end();
    }

});

//Server Port
const port=300;
server.listen(port,()=>{
    console.log(`Server is Live at http://localhost:${port}`);
});