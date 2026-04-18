const express=require('express');
const app=express();
const PORT=3002;
app.listen(PORT,()=>{
    console.log(`Server Live at http://localhost:${PORT}`);
});

//Middleware (for data extraction)
app.use(express.urlencoded({extended:true}));

//Routing
app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/index.html');
}); 

//Posting
app.post('/register',(req,res)=>{
    const {name,email,age}=req.body;
    if(age<18)
    {
        return res.send("Not allowed");
    }
    res.send(`<h2>Your Server Details are:</h2>
        <h3>Username:${name}</h3>
         <h3>E-Mail:${email}</h3>
          <h3>Age:${age}</h3>
        `); 
});
           