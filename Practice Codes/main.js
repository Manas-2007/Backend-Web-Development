const express=require('express');
const app=express();
const PORT=3000;
app.use((req,res)=>{
    res.send("Hello world");
})

app.listen(PORT,()=>{
    console.log(`Server is Live at http://localhost:${PORT}`);
});