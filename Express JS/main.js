const express=require('express');
const app=express();
const port=3002;
app.listen(port,()=>{
    console.log(`http://localhost:${port}`);
});

app.use((req,res,next)=>{
    console.log("First Middleware",req.url,req.method);
    res.send("<h1>Hello World using Express</h1>");
});
