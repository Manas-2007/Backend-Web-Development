const express=require('express');
const path=require('path');
const app=express();
const dns=require('dns');
const mongoose=require('mongoose');
const PORT=2000;

dns.setServers([
    '1.1.1.1',
    '8.8.8.8'
]);

app.listen(PORT,()=>{
    console.log(`Server is Live at http://localhost:${PORT}`);
});

app.use(express.urlencoded({extended:true}));33

mongoose.connect("mongodb+srv://manas:manas@clusterdb.5dbbok0.mongodb.net/StudentProfile?appName=ClusterDB")
.then(()=>{
    console.log("Connection Succede with DBMS");
})
.catch((err)=>{
    console.log("Connection with DBMS Failed");
})

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,"index.html"));
});

const userSchema=new mongoose.Schema({
    Name:String,
    Email:String,
    Contact:Number,
    Age:Number,
    Gender:String,
    Course:String,
    Address:String,
    Skills:String
});
const datalist=mongoose.model("datalist",userSchema);

app.post('/register',async(req,res)=>{
    try{
        const newStudent=new datalist({
            Name:req.body.name,
            Email:req.body.email,
            Contact:req.body.phone,
            Age:req.body.age,
            Gender:req.body.gender,
            Course:req.body.course,
            Address:req.body.address,
            Skills:req.body.skills
        })

        await newStudent.save();
        console.log("DATA SAVED TO DBMS");
        res.send("<center><h2>Form Submitted Successfully ✅</h2></center>");
    }

    catch(err){
        console.log("DATA TRANSFER FAILED.....",err);
        res.send("Data Transfer Failed")
    }

})

//Displaying all the data from DBMS
app.get('/datalist',async(req,res)=>{
    try{
        const item=await datalist.find();
        res.json(item);
    }
    catch(err)
    {
        res.send("Error in Fetching data");
    }
});

//Getting data by filter
app.get('/filter',async(req,res)=>{
    const data=await datalist.find({Name:"Pari"});
    res.json(data);
});