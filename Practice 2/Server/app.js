const express=require('express');
const cors=require('cors');
const PORT=3000;
const app=express();
app.listen(PORT,(req,res)=>{
    console.log(`Server is Live at http://localhost:${PORT}`);
});
app.use(express.json());
app.use(cors());
let array=[];
app.post('/mydata',(req,res)=>{
    const data=req.body;
    array.push(data);
    res.json({
        message:"Data Sent",
    });
});
app.get('/mydata',(req,res)=>{
    res.json(array);
});

app.post('/login',(req,res)=>{
    const loginData=req.body;
    const userfound=array.find((user)=>
        user.name.toLowerCase()===loginData.name.toLowerCase()&& user.contact===loginData.contact && user.bloodGroup.toLowerCase()===loginData.bloodGroup.toLowerCase()&& user.city.toLowerCase()===loginData.city.toLowerCase());

    if(userfound){
        res.json(`Welcome back ${userfound.name}`);
        
    }
    else{
        res.json({
            message:"User NOT Registered!....."
        });
    }
});

