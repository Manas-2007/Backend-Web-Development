const express=require('express');
const path=require('path');
const app=express();
const PORT=2000;
const mongoose=require('mongoose');
const dns=require('dns');
dns.setServers([
    '1.1.1.1',
    '8.8.8.8'
]);
app.listen(PORT,()=>{
    console.log(`Server is Live at http://localhost:${PORT}`);
});

mongoose.connect("mongodb+srv://manas:manas@clusterdb.5dbbok0.mongodb.net/FilterTest?appName=ClusterDB")
.then(()=>{
    console.log("DBMS successfully connected");
})
.catch((err)=>{
    console.log("Server Connection Failed",err);
});

app.use(express.urlencoded({extended:true}));

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,"index.html"));
});

