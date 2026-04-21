const express=require('express');
const path=require('path');
const app=express();
const PORT=3000;
app.listen(PORT,()=>{
    console.log(`Server Live at http://localhost:${PORT}`);
});

//Displaying form
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'index.html'));
});

//Reading the data from the form
app.use(express.urlencoded({extended:true}));

//Displaying information 
let users=[];
app.post('/save',(req,res)=>{
    users.push({
        Name : req.body.name,
        Password:req.body.password,
        E_Mail:req.body.email,
        Contact:req.body_contact,
    })
    console.log(users);
    res.send(users);
})
