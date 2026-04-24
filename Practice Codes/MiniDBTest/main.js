const express=require('express');
const path=require('path');
const mongoose=require('mongoose');
const PORT=2000;
const app=express();
const dns=require('dns');

//DNS Server
dns.setServers([
    '1.1.1.1',
    '8.8.8.8'
])
app.listen(PORT,()=>{
    console.log(`Server is Live at http://localhost:${PORT}`);
});
app.use(express.urlencoded({extended:true}));
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,"index.html"));
});

//Connection String
mongoose.connect("mongodb+srv://manas:manas@clusterdb.5dbbok0.mongodb.net/StudentForm?appName=ClusterDB")
.then(()=>{
    console.log("DBMS connected to Server successfully");
})
.catch((err)=>{
    console.log("Connection with DBMS Failed",err);
})

//Schema Creation
const user=new mongoose.Schema({
    Name:String,
    Email:String,
    Age:Number,
    Course:String
});
const List=mongoose.model('List',user);

//Adding Data in Database
app.post('/student',async(req,res)=>{
    try{
        const newStudent=new List({
            Name:req.body.name,
            Email:req.body.email,
            Age:req.body.age,
            Course:req.body.course
        });

        await newStudent.save();
        console.log("Student data added successfully in DBMS");
        res.redirect('/');
    }

    catch(err)
    {
        console.log("Data Sending Failed",err);
        res.send("Error in Data Sending to DBMS")
    }
    
})