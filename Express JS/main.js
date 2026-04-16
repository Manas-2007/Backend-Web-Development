const express=require('express');
const app=express();
const port=3002;
app.listen(port,()=>{
    console.log(`http://localhost:${port}`);
});

//Route Hondling
app.get('/',(req,res)=>{
    console.log("This is home page");
    res.send("<h1>This is home page</h1>");
});

app.get('/submit-details',(req,res)=>{
    console.log("This is Submit Details page");
    res.send("<h1>This is Submit page</h1>") ;
});


