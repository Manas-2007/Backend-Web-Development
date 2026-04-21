const express=require('express');
const PORT=3000;
const path=require('path');
const app=express();
app.listen(PORT,()=>{
    console.log(`Server live at http://localhost:${PORT}`);
});

//Connecting with UI
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'index.html'));
});

//Reading data
app.use(express.urlencoded({extended:true}));

//Displaying Data
let users=[];
app.post('/save',(req,res)=>{
    users.push({
        Name:req.body.name,
        E_Mail:req.body.email,
        Password:req.body.password,
        Confirm_Password:req.body.confirmPassword,
        Contact:req.body.contact,
        Gender:req.body.gender,
        DOB:req.body.dob,
        Country:req.body.country,
        Address:req.body.address     
    });
        console.log(users);
        res.json(users);
});
